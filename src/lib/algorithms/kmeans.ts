import type { ClusterPoint, Point2D, TrainingStep } from "@/types/ml";
import { clamp, euclideanDistance, mean, seededRandom, shuffleArray, squaredDistance } from "@/lib/math";

/** Hard cap on iterations to keep the browser responsive. */
export const MAX_ITERATIONS = 100;

export type KMeansPoint = ClusterPoint;
export type KMeansCentroid = Point2D;

export type KMeansState = {
  centroids: KMeansCentroid[];
  /** Cluster index for each point (parallel to the points array), -1 if unassigned. */
  assignments: number[];
  inertia: number;
  iteration: number;
  converged: boolean;
  /** Inertia recorded at each iteration. */
  history: TrainingStep[];
};

export type KMeansConfig = {
  k: number;
  seed?: number;
  maxIterations?: number;
  tolerance?: number;
};

const DEFAULT_TOLERANCE = 1e-4;

/** Fresh, un-initialized state: no centroids, all points unassigned. */
export function createInitialKMeansState(points: Point2D[] = []): KMeansState {
  return {
    centroids: [],
    assignments: points.map(() => -1),
    inertia: 0,
    iteration: 0,
    converged: false,
    history: [],
  };
}

/** Forgy initialization: pick K distinct data points as starting centroids. */
export function initializeCentroids(points: Point2D[], k: number, seed?: number): KMeansCentroid[] {
  if (points.length === 0) return [];
  const count = clamp(Math.floor(k), 1, points.length);
  const rng = seed === undefined ? Math.random : seededRandom(seed);
  return shuffleArray(points, rng)
    .slice(0, count)
    .map((p) => ({ x: p.x, y: p.y }));
}

/** Assign each point to the index of its nearest centroid (Euclidean distance). */
export function assignPointsToCentroids(points: Point2D[], centroids: KMeansCentroid[]): number[] {
  if (centroids.length === 0) return points.map(() => -1);
  return points.map((p) => {
    let best = 0;
    let bestDist = Infinity;
    for (let c = 0; c < centroids.length; c++) {
      const d = squaredDistance(p, centroids[c]);
      if (d < bestDist) {
        bestDist = d;
        best = c;
      }
    }
    return best;
  });
}

/** Move each centroid to the mean of its assigned points; keep empty clusters in place. */
export function updateCentroids(
  points: Point2D[],
  assignments: number[],
  k: number,
  prevCentroids: KMeansCentroid[],
): KMeansCentroid[] {
  const next: KMeansCentroid[] = [];
  for (let c = 0; c < k; c++) {
    const xs: number[] = [];
    const ys: number[] = [];
    for (let i = 0; i < points.length; i++) {
      if (assignments[i] === c) {
        xs.push(points[i].x);
        ys.push(points[i].y);
      }
    }
    // Empty cluster: keep its previous position so it stays valid and can attract points later.
    next.push(xs.length === 0 ? (prevCentroids[c] ?? { x: 0.5, y: 0.5 }) : { x: mean(xs), y: mean(ys) });
  }
  return next;
}

/** Total sum of squared distances from points to their assigned centroid. */
export function calculateInertia(points: Point2D[], centroids: KMeansCentroid[], assignments: number[]): number {
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    const c = assignments[i];
    if (c >= 0 && c < centroids.length) sum += squaredDistance(points[i], centroids[c]);
  }
  return sum;
}

/** Converged when no centroid moves more than the tolerance. */
export function hasConverged(prev: KMeansCentroid[], next: KMeansCentroid[], tolerance = DEFAULT_TOLERANCE): boolean {
  if (prev.length === 0 || prev.length !== next.length) return false;
  return prev.every((c, i) => euclideanDistance(c, next[i]) <= tolerance);
}

/** One Lloyd iteration: assign points, then move centroids. */
export function trainKMeansStep(points: Point2D[], state: KMeansState, config: KMeansConfig): KMeansState {
  if (points.length === 0 || state.centroids.length === 0 || state.converged) return state;

  const assignments = assignPointsToCentroids(points, state.centroids);
  const centroids = updateCentroids(points, assignments, state.centroids.length, state.centroids);
  const inertia = calculateInertia(points, centroids, assignments);
  const iteration = state.iteration + 1;
  const converged = hasConverged(state.centroids, centroids, config.tolerance);

  return { centroids, assignments, inertia, iteration, converged, history: [...state.history, { step: iteration, inertia }] };
}

/** Run several iterations, stopping early on convergence. */
export function trainKMeans(points: Point2D[], state: KMeansState, config: KMeansConfig, iterations: number): KMeansState {
  const limit = Math.min(Math.max(0, Math.floor(iterations)), config.maxIterations ?? MAX_ITERATIONS);
  let current = state;
  for (let i = 0; i < limit && !current.converged; i++) {
    current = trainKMeansStep(points, current, config);
  }
  return current;
}
