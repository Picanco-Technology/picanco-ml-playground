"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Sparkles, StepForward, Play, RotateCcw, RefreshCw, Spline } from "lucide-react";
import { PlaygroundShell } from "@/components/playground/PlaygroundShell";
import { ParameterPanel } from "@/components/playground/ParameterPanel";
import { MetricPanel } from "@/components/playground/MetricPanel";
import { ExplanationPanel } from "@/components/playground/ExplanationPanel";
import { EmptyVisualization } from "@/components/playground/EmptyVisualization";
import { SliderControl } from "@/components/playground/SliderControl";
import { SelectControl } from "@/components/playground/SelectControl";
import { ControlButton } from "@/components/playground/ControlButton";
import { StatusBadge } from "@/components/playground/StatusBadge";
import { KMeansChart } from "@/components/visualizations/KMeansChart";
import { generateClusterData, type ClusterShape } from "@/lib/data";
import { clamp } from "@/lib/math";
import {
  MAX_ITERATIONS,
  assignPointsToCentroids,
  calculateInertia,
  createInitialKMeansState,
  initializeCentroids,
  trainKMeansStep,
  type KMeansState,
} from "@/lib/algorithms/kmeans";
import type { AlgorithmStatus, ClusterPoint, ModelMetric } from "@/types/ml";

const DEFAULTS = { pointCount: 120, k: 3, shape: "blob" as ClusterShape, iterations: 10, seed: 42 };

const makeData = (count: number, shape: ClusterShape, seed: number): ClusterPoint[] =>
  generateClusterData({ count, clusters: 3, spread: 0.05, shape, seed });

/** Build a freshly-initialized K-Means state (centroids placed, points assigned). */
function buildInitialized(points: ClusterPoint[], k: number, seed: number): KMeansState {
  const centroids = initializeCentroids(points, k, seed);
  const assignments = assignPointsToCentroids(points, centroids);
  const inertia = calculateInertia(points, centroids, assignments);
  return { centroids, assignments, inertia, iteration: 0, converged: false, history: [{ step: 0, inertia }] };
}

export default function KMeansPage() {
  const [pointCount, setPointCount] = useState(DEFAULTS.pointCount);
  const [k, setK] = useState(DEFAULTS.k);
  const [shape, setShape] = useState<ClusterShape>(DEFAULTS.shape);
  const [iterations, setIterations] = useState(DEFAULTS.iterations);
  const [seed, setSeed] = useState(DEFAULTS.seed);
  const [showLines, setShowLines] = useState(false);

  const [data, setData] = useState<ClusterPoint[]>(() =>
    makeData(DEFAULTS.pointCount, DEFAULTS.shape, DEFAULTS.seed),
  );
  const [state, setState] = useState<KMeansState>(() => createInitialKMeansState(data));
  const [status, setStatus] = useState<AlgorithmStatus>("ready");
  const [isRunning, setIsRunning] = useState(false);

  const stateRef = useRef(state);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const applyState = useCallback((next: KMeansState) => {
    stateRef.current = next;
    setState(next);
  }, []);

  const stopAnimation = useCallback(() => {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  }, []);

  // Regenerate data and reset the clustering whenever dataset controls change.
  const firstData = useRef(true);
  useEffect(() => {
    if (firstData.current) {
      firstData.current = false;
      return;
    }
    stopAnimation();
    const next = makeData(pointCount, shape, seed);
    setData(next);
    applyState(createInitialKMeansState(next));
    setStatus("ready");
  }, [pointCount, shape, seed, applyState, stopAnimation]);

  // Reinitialize centroids when K changes (only if already initialized).
  const firstK = useRef(true);
  useEffect(() => {
    if (firstK.current) {
      firstK.current = false;
      return;
    }
    if (data.length === 0 || stateRef.current.centroids.length === 0) return;
    stopAnimation();
    applyState(buildInitialized(data, k, seed));
    setStatus("ready");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [k]);

  useEffect(() => stopAnimation, [stopAnimation]);

  const initialized = state.centroids.length > 0;
  const canStep = initialized && !state.converged && data.length > 0;
  const config = { k, seed, maxIterations: MAX_ITERATIONS, tolerance: 1e-4 };

  const handleInitialize = () => {
    stopAnimation();
    if (data.length === 0) return;
    applyState(buildInitialized(data, k, seed));
    setStatus("ready");
  };

  const handleStep = () => {
    stopAnimation();
    if (!canStep) return;
    const next = trainKMeansStep(data, stateRef.current, config);
    applyState(next);
    setStatus(next.converged ? "converged" : "ready");
  };

  const handleRun = () => {
    if (!canStep) return;
    stopAnimation();
    setIsRunning(true);
    setStatus("running");
    let remaining = clamp(iterations, 1, MAX_ITERATIONS);
    intervalRef.current = setInterval(() => {
      const next = trainKMeansStep(data, stateRef.current, config);
      applyState(next);
      remaining -= 1;
      if (next.converged || remaining <= 0) {
        stopAnimation();
        setStatus(next.converged ? "converged" : "ready");
      }
    }, 400);
  };

  const handleReset = () => {
    stopAnimation();
    applyState(createInitialKMeansState(data));
    setStatus(data.length ? "ready" : "idle");
  };

  const handleRegenerate = () => setSeed(Math.floor(Math.random() * 100000));

  const metrics: ModelMetric[] = [
    { key: "k", label: "Clusters (K)", value: k },
    { key: "iter", label: "Iteration", value: state.iteration },
    {
      key: "inertia",
      label: "Inertia (SSE)",
      value: initialized ? state.inertia.toFixed(3) : "—",
      description: "Sum of squared distances from points to their centroid.",
    },
    { key: "points", label: "Data Points", value: data.length },
  ];

  return (
    <PlaygroundShell
      title="K-Means Clustering"
      description="Group unlabeled points into K clusters. Initialize centroids, then step or run the algorithm to watch points get assigned and centroids drift toward their cluster centers."
      status={<StatusBadge status={status} />}
      controls={
        <ParameterPanel>
          <SliderControl
            label="Data points"
            value={pointCount}
            min={20}
            max={300}
            step={10}
            onChange={setPointCount}
            helperText="More points give a denser, more detailed dataset."
          />
          <SliderControl
            label="Clusters (K)"
            value={k}
            min={1}
            max={8}
            step={1}
            onChange={setK}
            helperText="How many clusters K-Means tries to find."
          />
          <SelectControl
            label="Dataset shape"
            value={shape}
            onChange={(v) => setShape(v as ClusterShape)}
            options={[
              { label: "Blob", value: "blob" },
              { label: "Circle", value: "circle" },
              { label: "Random", value: "random" },
            ]}
            helperText="Circle shows where K-Means struggles."
          />
          <SliderControl
            label="Iterations (Run)"
            value={iterations}
            min={1}
            max={50}
            step={1}
            onChange={setIterations}
            helperText="Max iterations the Run button performs."
          />
          <div className="grid grid-cols-2 gap-2 pt-1">
            <ControlButton variant="primary" icon={<Sparkles className="h-4 w-4" />} disabled={isRunning || data.length === 0} onClick={handleInitialize}>
              Initialize
            </ControlButton>
            <ControlButton icon={<StepForward className="h-4 w-4" />} disabled={isRunning || !canStep} onClick={handleStep}>
              Step
            </ControlButton>
            <ControlButton icon={<Play className="h-4 w-4" />} disabled={isRunning || !canStep} onClick={handleRun}>
              Run
            </ControlButton>
            <ControlButton icon={<RotateCcw className="h-4 w-4" />} disabled={isRunning} onClick={handleReset}>
              Reset
            </ControlButton>
            <ControlButton variant="ghost" icon={<RefreshCw className="h-4 w-4" />} disabled={isRunning} onClick={handleRegenerate}>
              New data
            </ControlButton>
            <ControlButton
              variant={showLines ? "primary" : "secondary"}
              icon={<Spline className="h-4 w-4" />}
              onClick={() => setShowLines((s) => !s)}
            >
              Lines
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
                Iteration {state.iteration}
              </span>
              <span className="text-xs text-slate-500">
                {data.length} points · K = {k}
              </span>
            </div>
            <KMeansChart
              points={data}
              assignments={state.assignments}
              centroids={state.centroids}
              showAssignmentLines={showLines}
            />
            {!initialized ? (
              <p className="mt-2 text-center text-xs text-slate-500">Click Initialize to place {k} centroids.</p>
            ) : null}
          </div>
        )
      }
      info={
        <>
          <MetricPanel metrics={metrics} />
          <ExplanationPanel
            sections={[
              {
                heading: "What it does",
                body: "K-Means is unsupervised learning — it groups points into K clusters using only their positions, with no labels to guide it.",
              },
              {
                heading: "K & centroids",
                body: "K is the number of clusters to find. Each cluster has a centroid: a moving center point that represents it.",
              },
              {
                heading: "Two repeating steps",
                body: "Every iteration (1) assigns each point to its nearest centroid, then (2) moves each centroid to the average position of its points.",
              },
              {
                heading: "Inertia & convergence",
                body: "Inertia is the total squared distance from points to their centroid. It drops as clusters tighten and levels off; when centroids stop moving, the model has converged.",
              },
              {
                heading: "Choosing K & shape",
                body: "Too few clusters merge distinct groups; too many split them. K-Means assumes round blobs, so it struggles with ring shapes — try the Circle dataset to see it split the ring.",
              },
            ]}
          >
            <div className="rounded-lg bg-slate-800/50 p-3 text-xs text-slate-400">
              <p className="font-medium text-slate-300">Try this</p>
              <p className="mt-1">Initialize Blobs with K=3 and Run, then press New data to see how a different start changes the result. Switch to Circle and watch K-Means struggle.</p>
            </div>
          </ExplanationPanel>
        </>
      }
    />
  );
}
