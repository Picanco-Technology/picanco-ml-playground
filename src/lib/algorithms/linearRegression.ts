import type { Point2D, RegressionPoint, TrainingStep } from "@/types/ml";
import { meanSquaredError } from "@/lib/math";

/** Hard cap on training iterations to keep the browser responsive. */
export const MAX_EPOCHS = 2000;

export type LinearRegressionState = {
  slope: number;
  intercept: number;
  mse: number;
  epoch: number;
  /** Loss recorded at each epoch, for loss curves. */
  history: TrainingStep[];
  /** True when training blew up (e.g. learning rate too high). */
  diverged: boolean;
};

export type LinearRegressionConfig = {
  learningRate: number;
  maxEpochs?: number;
};

/** Linear model prediction: y = mx + b. */
export function predictLinear(x: number, slope: number, intercept: number): number {
  return slope * x + intercept;
}

/** Mean squared error of the line against the data. */
export function calculateLinearRegressionLoss(
  points: RegressionPoint[],
  slope: number,
  intercept: number,
): number {
  if (points.length === 0) return 0;
  const actual = points.map((p) => p.y);
  const predicted = points.map((p) => predictLinear(p.x, slope, intercept));
  return meanSquaredError(actual, predicted);
}

/** Fresh model: a flat line (slope 0, intercept 0) and its starting loss. */
export function createInitialLinearRegressionState(
  points: RegressionPoint[] = [],
): LinearRegressionState {
  const mse = calculateLinearRegressionLoss(points, 0, 0);
  return { slope: 0, intercept: 0, mse, epoch: 0, history: [{ step: 0, loss: mse }], diverged: false };
}

/** One gradient-descent update of slope and intercept. */
export function trainLinearRegressionStep(
  points: RegressionPoint[],
  state: LinearRegressionState,
  config: LinearRegressionConfig,
): LinearRegressionState {
  if (points.length === 0 || state.diverged) return state;

  const n = points.length;
  let gradSlope = 0;
  let gradIntercept = 0;
  for (const p of points) {
    const error = predictLinear(p.x, state.slope, state.intercept) - p.y;
    gradSlope += error * p.x;
    gradIntercept += error;
  }
  // Gradients of MSE w.r.t. slope and intercept.
  gradSlope = (2 / n) * gradSlope;
  gradIntercept = (2 / n) * gradIntercept;

  const slope = state.slope - config.learningRate * gradSlope;
  const intercept = state.intercept - config.learningRate * gradIntercept;
  const mse = calculateLinearRegressionLoss(points, slope, intercept);
  const epoch = state.epoch + 1;

  // Detect divergence and stop updating to avoid NaN/Infinity in the UI.
  if (!Number.isFinite(slope) || !Number.isFinite(intercept) || !Number.isFinite(mse) || mse > 1e12) {
    return { ...state, epoch, diverged: true };
  }

  return { slope, intercept, mse, epoch, history: [...state.history, { step: epoch, loss: mse }], diverged: false };
}

/** Run several gradient-descent epochs and return the final state with history. */
export function trainLinearRegression(
  points: RegressionPoint[],
  state: LinearRegressionState,
  config: LinearRegressionConfig,
  epochs: number,
): LinearRegressionState {
  const limit = Math.min(Math.max(0, Math.floor(epochs)), config.maxEpochs ?? MAX_EPOCHS);
  let current = state;
  for (let i = 0; i < limit && !current.diverged; i++) {
    current = trainLinearRegressionStep(points, current, config);
  }
  return current;
}

/** Two endpoints of the regression line across [xMin, xMax], for drawing. */
export function getRegressionLinePoints(
  slope: number,
  intercept: number,
  xMin: number,
  xMax: number,
): Point2D[] {
  return [
    { x: xMin, y: predictLinear(xMin, slope, intercept) },
    { x: xMax, y: predictLinear(xMax, slope, intercept) },
  ];
}
