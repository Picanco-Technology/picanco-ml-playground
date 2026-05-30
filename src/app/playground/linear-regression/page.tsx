"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, StepForward, RotateCcw, RefreshCw } from "lucide-react";
import { PlaygroundShell } from "@/components/playground/PlaygroundShell";
import { ParameterPanel } from "@/components/playground/ParameterPanel";
import { MetricPanel } from "@/components/playground/MetricPanel";
import { ExplanationPanel } from "@/components/playground/ExplanationPanel";
import { EmptyVisualization } from "@/components/playground/EmptyVisualization";
import { SliderControl } from "@/components/playground/SliderControl";
import { ControlButton } from "@/components/playground/ControlButton";
import { StatusBadge } from "@/components/playground/StatusBadge";
import { RegressionChart } from "@/components/visualizations/RegressionChart";
import { generateRegressionData } from "@/lib/data";
import { clamp } from "@/lib/math";
import {
  MAX_EPOCHS,
  createInitialLinearRegressionState,
  trainLinearRegressionStep,
  type LinearRegressionState,
} from "@/lib/algorithms/linearRegression";
import type { AlgorithmStatus, ModelMetric, RegressionPoint } from "@/types/ml";

const DEFAULTS = { pointCount: 50, noise: 0.15, learningRate: 0.1, epochs: 100, seed: 42 };

const makeData = (pointCount: number, noise: number, seed: number): RegressionPoint[] =>
  generateRegressionData({ count: pointCount, noise, seed });

export default function LinearRegressionPage() {
  const [pointCount, setPointCount] = useState(DEFAULTS.pointCount);
  const [noise, setNoise] = useState(DEFAULTS.noise);
  const [learningRate, setLearningRate] = useState(DEFAULTS.learningRate);
  const [epochs, setEpochs] = useState(DEFAULTS.epochs);
  const [seed, setSeed] = useState(DEFAULTS.seed);

  const [data, setData] = useState<RegressionPoint[]>(() =>
    makeData(DEFAULTS.pointCount, DEFAULTS.noise, DEFAULTS.seed),
  );
  const [model, setModel] = useState<LinearRegressionState>(() =>
    createInitialLinearRegressionState(data),
  );
  const [status, setStatus] = useState<AlgorithmStatus>("ready");
  const [isTraining, setIsTraining] = useState(false);

  // Keep a synchronous copy of the model for the animation loop.
  const modelRef = useRef(model);
  const rafRef = useRef<number | null>(null);

  const applyModel = useCallback((next: LinearRegressionState) => {
    modelRef.current = next;
    setModel(next);
  }, []);

  const stopAnimation = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setIsTraining(false);
  }, []);

  // Regenerate data and reset the model whenever dataset controls change.
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    stopAnimation();
    const next = makeData(pointCount, noise, seed);
    setData(next);
    applyModel(createInitialLinearRegressionState(next));
    setStatus("ready");
  }, [pointCount, noise, seed, applyModel, stopAnimation]);

  useEffect(() => stopAnimation, [stopAnimation]);

  const handleStep = () => {
    stopAnimation();
    if (data.length === 0) return;
    const next = trainLinearRegressionStep(data, modelRef.current, { learningRate, maxEpochs: MAX_EPOCHS });
    applyModel(next);
    setStatus(next.diverged ? "error" : "running");
  };

  const handleTrain = () => {
    if (data.length === 0 || modelRef.current.diverged) return;
    stopAnimation();
    setIsTraining(true);
    setStatus("running");

    let remaining = clamp(epochs, 1, MAX_EPOCHS);
    const stepsPerFrame = Math.max(1, Math.ceil(remaining / 150));
    const config = { learningRate, maxEpochs: MAX_EPOCHS };

    const tick = () => {
      let next = modelRef.current;
      let done = 0;
      while (done < stepsPerFrame && remaining > 0) {
        next = trainLinearRegressionStep(data, next, config);
        remaining -= 1;
        done += 1;
        if (next.diverged) break;
      }
      applyModel(next);

      if (next.diverged) {
        stopAnimation();
        setStatus("error");
      } else if (remaining <= 0) {
        stopAnimation();
        setStatus("converged");
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const handleReset = () => {
    stopAnimation();
    applyModel(createInitialLinearRegressionState(data));
    setStatus(data.length ? "ready" : "idle");
  };

  const handleRegenerate = () => setSeed(Math.floor(Math.random() * 100000));

  const busy = isTraining;
  const blocked = busy || data.length === 0 || model.diverged;

  const metrics: ModelMetric[] = [
    { key: "slope", label: "Slope (m)", value: model.slope.toFixed(3) },
    { key: "intercept", label: "Intercept (b)", value: model.intercept.toFixed(3) },
    {
      key: "mse",
      label: "MSE (loss)",
      value: model.diverged ? "diverged" : model.mse.toFixed(4),
      description: "Mean squared error — lower is a better fit.",
    },
    { key: "epoch", label: "Epoch", value: model.epoch },
  ];

  return (
    <PlaygroundShell
      title="Linear Regression"
      description="Fit a straight line to noisy data using gradient descent. Generate a dataset, then train or step through the optimization and watch the error shrink."
      status={<StatusBadge status={status} />}
      controls={
        <ParameterPanel>
          <SliderControl
            label="Data points"
            value={pointCount}
            min={10}
            max={200}
            step={5}
            onChange={setPointCount}
            helperText="More points make the underlying pattern clearer."
          />
          <SliderControl
            label="Noise"
            value={noise}
            min={0}
            max={0.6}
            step={0.01}
            displayValue={noise.toFixed(2)}
            onChange={setNoise}
            helperText="Higher noise scatters points further from the line."
          />
          <SliderControl
            label="Learning rate"
            value={learningRate}
            min={0.01}
            max={1.5}
            step={0.01}
            displayValue={learningRate.toFixed(2)}
            onChange={setLearningRate}
            helperText="Step size per update. Too high can diverge."
          />
          <SliderControl
            label="Epochs (Train)"
            value={epochs}
            min={10}
            max={500}
            step={10}
            onChange={setEpochs}
            helperText="How many updates the Train button runs."
          />
          <div className="grid grid-cols-2 gap-2 pt-1">
            <ControlButton variant="primary" icon={<Play className="h-4 w-4" />} disabled={blocked} onClick={handleTrain}>
              Train
            </ControlButton>
            <ControlButton icon={<StepForward className="h-4 w-4" />} disabled={blocked} onClick={handleStep}>
              Step
            </ControlButton>
            <ControlButton icon={<RotateCcw className="h-4 w-4" />} disabled={busy} onClick={handleReset}>
              Reset
            </ControlButton>
            <ControlButton
              variant="ghost"
              icon={<RefreshCw className="h-4 w-4" />}
              disabled={busy}
              onClick={handleRegenerate}
            >
              New data
            </ControlButton>
          </div>
        </ParameterPanel>
      }
      visualization={
        data.length === 0 ? (
          <EmptyVisualization hint="Generate a dataset to begin." />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-md bg-slate-800/80 px-2.5 py-1 font-mono text-sm text-indigo-300">
                ŷ = {model.slope.toFixed(2)} · x + {model.intercept.toFixed(2)}
              </span>
              <span className="text-xs text-slate-500">{data.length} points</span>
            </div>
            <RegressionChart points={data} slope={model.slope} intercept={model.intercept} />
          </div>
        )
      }
      info={
        <>
          <MetricPanel metrics={metrics} />
          {model.diverged ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
              Training diverged — the learning rate is too high. Lower it and press Reset.
            </div>
          ) : null}
          <ExplanationPanel
            sections={[
              {
                heading: "What it does",
                body: "Linear regression finds the straight line y = mx + b that best fits the data by minimizing the average squared error.",
              },
              {
                heading: "Slope & intercept",
                body: "The slope (m) is how steep the line is; the intercept (b) is where it crosses the y-axis. Gradient descent nudges both to reduce error.",
              },
              {
                heading: "MSE (loss)",
                body: "Mean squared error averages the squared gaps between predictions and real values. Smaller means a tighter fit.",
              },
              {
                heading: "Learning rate",
                body: "Controls how big each update is. Too small trains slowly; too high overshoots and the loss can blow up (diverge).",
              },
              {
                heading: "Noise & convergence",
                body: "More noise spreads points out, so the best line still leaves error behind. Convergence is when extra epochs barely change the loss.",
              },
            ]}
          >
            <div className="rounded-lg bg-slate-800/50 p-3 text-xs text-slate-400">
              <p className="font-medium text-slate-300">Try this</p>
              <p className="mt-1">Step a few times to watch the line tilt into place, then raise the learning rate past ~1.2 to see it diverge.</p>
            </div>
          </ExplanationPanel>
        </>
      }
    />
  );
}
