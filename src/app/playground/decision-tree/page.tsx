"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, RefreshCw } from "lucide-react";
import { PlaygroundShell } from "@/components/playground/PlaygroundShell";
import { ParameterPanel } from "@/components/playground/ParameterPanel";
import { MetricPanel } from "@/components/playground/MetricPanel";
import { ExplanationPanel } from "@/components/playground/ExplanationPanel";
import { EmptyVisualization } from "@/components/playground/EmptyVisualization";
import { SliderControl } from "@/components/playground/SliderControl";
import { SelectControl } from "@/components/playground/SelectControl";
import { ControlButton } from "@/components/playground/ControlButton";
import { StatusBadge } from "@/components/playground/StatusBadge";
import { DecisionTreeChart, CLASS_COLORS } from "@/components/visualizations/DecisionTreeChart";
import { TreeStructure } from "@/components/visualizations/TreeStructure";
import {
  generateCircleData,
  generateClassificationData,
  generateMoonData,
  generateXorData,
} from "@/lib/data";
import { minMaxScale } from "@/lib/math";
import {
  buildDecisionTree,
  calculateConfusionMatrix,
  calculateDecisionTreeAccuracy,
  countLeaves,
  createInitialDecisionTreeState,
  getTreeDepth,
  predictDecisionBoundaryGrid,
  type DecisionTreeState,
  type SplitCriterion,
} from "@/lib/algorithms/decisionTree";
import type { AlgorithmStatus, LabeledPoint2D, ModelMetric } from "@/types/ml";

type ClassShape = "linear" | "moon" | "circle" | "xor";
const GRID_RES = 40;
const DEFAULTS = { pointCount: 120, shape: "moon" as ClassShape, maxDepth: 4, minSamplesSplit: 2, criterion: "gini" as SplitCriterion, seed: 42 };

/** Generate data for a shape and normalize both axes into the [0,1] square. */
function makeData(count: number, shape: ClassShape, seed: number): LabeledPoint2D[] {
  const raw =
    shape === "moon"
      ? generateMoonData({ count, seed })
      : shape === "circle"
        ? generateCircleData({ count, seed })
        : shape === "xor"
          ? generateXorData({ count, seed })
          : generateClassificationData({ count, seed });
  const xs = minMaxScale(raw.map((p) => p.x));
  const ys = minMaxScale(raw.map((p) => p.y));
  return raw.map((p, i) => ({ x: xs[i], y: ys[i], label: p.label }));
}

export default function DecisionTreePage() {
  const [pointCount, setPointCount] = useState(DEFAULTS.pointCount);
  const [shape, setShape] = useState<ClassShape>(DEFAULTS.shape);
  const [maxDepth, setMaxDepth] = useState(DEFAULTS.maxDepth);
  const [minSamplesSplit, setMinSamplesSplit] = useState(DEFAULTS.minSamplesSplit);
  const [criterion, setCriterion] = useState<SplitCriterion>(DEFAULTS.criterion);
  const [seed, setSeed] = useState(DEFAULTS.seed);

  const [data, setData] = useState<LabeledPoint2D[]>(() =>
    makeData(DEFAULTS.pointCount, DEFAULTS.shape, DEFAULTS.seed),
  );
  const [state, setState] = useState<DecisionTreeState>(createInitialDecisionTreeState);
  const [status, setStatus] = useState<AlgorithmStatus>("ready");

  // Regenerate data and clear the tree when dataset controls change.
  const firstData = useRef(true);
  useEffect(() => {
    if (firstData.current) {
      firstData.current = false;
      return;
    }
    setData(makeData(pointCount, shape, seed));
    setState(createInitialDecisionTreeState());
    setStatus("ready");
  }, [pointCount, shape, seed]);

  // Changing model controls invalidates the current tree; require a retrain.
  const firstModel = useRef(true);
  useEffect(() => {
    if (firstModel.current) {
      firstModel.current = false;
      return;
    }
    setState(createInitialDecisionTreeState());
    setStatus("ready");
  }, [maxDepth, minSamplesSplit, criterion]);

  const handleTrain = () => {
    if (data.length === 0) return;
    const tree = buildDecisionTree(data, { maxDepth, minSamplesSplit, criterion });
    setState({
      tree,
      grid: predictDecisionBoundaryGrid(tree, GRID_RES),
      accuracy: calculateDecisionTreeAccuracy(tree, data),
      confusion: calculateConfusionMatrix(tree, data),
      leaves: countLeaves(tree),
      depth: getTreeDepth(tree),
      trained: true,
    });
    setStatus("converged");
  };

  const handleReset = () => {
    setState(createInitialDecisionTreeState());
    setStatus("ready");
  };

  const handleRegenerate = () => setSeed(Math.floor(Math.random() * 100000));

  const metrics: ModelMetric[] = [
    { key: "depth", label: "Tree depth", value: state.trained ? `${state.depth} / ${maxDepth}` : "—" },
    { key: "leaves", label: "Leaves", value: state.trained ? state.leaves : "—" },
    { key: "acc", label: "Accuracy", value: state.trained ? (state.accuracy * 100).toFixed(1) : "—", unit: state.trained ? "%" : undefined },
    { key: "crit", label: "Criterion", value: criterion },
    { key: "minsplit", label: "Min split", value: minSamplesSplit },
    { key: "points", label: "Points", value: data.length },
  ];

  const cm = state.confusion;

  return (
    <PlaygroundShell
      title="Decision Tree"
      description="Classify 2D points by splitting the feature space with simple rules. Train the tree, then change the depth or dataset to explore underfitting, overfitting, and blocky decision boundaries."
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
            helperText="More points give the tree more to learn from."
          />
          <SelectControl
            label="Dataset shape"
            value={shape}
            onChange={(v) => setShape(v as ClassShape)}
            options={[
              { label: "Linear", value: "linear" },
              { label: "Moons", value: "moon" },
              { label: "Circle", value: "circle" },
              { label: "XOR", value: "xor" },
            ]}
          />
          <SliderControl
            label="Max depth"
            value={maxDepth}
            min={1}
            max={10}
            step={1}
            onChange={setMaxDepth}
            helperText="Low = underfit, high = overfit."
          />
          <SliderControl
            label="Min samples split"
            value={minSamplesSplit}
            min={2}
            max={20}
            step={1}
            onChange={setMinSamplesSplit}
            helperText="Higher stops splitting small nodes (simpler tree)."
          />
          <SelectControl
            label="Criterion"
            value={criterion}
            onChange={(v) => setCriterion(v as SplitCriterion)}
            options={[
              { label: "Gini", value: "gini" },
              { label: "Entropy", value: "entropy" },
            ]}
            helperText="How split quality is measured."
          />
          <div className="grid grid-cols-2 gap-2 pt-1">
            <ControlButton variant="primary" icon={<Play className="h-4 w-4" />} disabled={data.length === 0} onClick={handleTrain}>
              Train
            </ControlButton>
            <ControlButton icon={<RotateCcw className="h-4 w-4" />} disabled={!state.trained} onClick={handleReset}>
              Reset
            </ControlButton>
            <ControlButton variant="ghost" icon={<RefreshCw className="h-4 w-4" />} onClick={handleRegenerate}>
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
              <div className="flex items-center gap-3 text-xs text-slate-400">
                {[0, 1].map((c) => (
                  <span key={c} className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: CLASS_COLORS[c] }} />
                    Class {c}
                  </span>
                ))}
              </div>
              <span className="text-xs text-slate-500">
                {state.trained ? `depth ${state.depth} · ${state.leaves} leaves` : "not trained"}
              </span>
            </div>
            <DecisionTreeChart points={data} grid={state.grid} />
            {!state.trained ? (
              <p className="mt-2 text-center text-xs text-slate-500">Press Train to grow the tree and draw its decision boundary.</p>
            ) : null}
          </div>
        )
      }
      info={
        <>
          <MetricPanel metrics={metrics} />
          {state.trained ? (
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Confusion matrix</h2>
              <div className="mt-3 grid grid-cols-[auto_1fr_1fr] gap-1.5 text-center text-xs">
                <span />
                <span className="text-slate-500">Pred 0</span>
                <span className="text-slate-500">Pred 1</span>
                <span className="flex items-center text-slate-500">Act 0</span>
                <span className="rounded bg-slate-800/80 py-1.5 font-mono text-slate-100">{cm[0][0]}</span>
                <span className="rounded bg-slate-800/80 py-1.5 font-mono text-slate-100">{cm[0][1]}</span>
                <span className="flex items-center text-slate-500">Act 1</span>
                <span className="rounded bg-slate-800/80 py-1.5 font-mono text-slate-100">{cm[1][0]}</span>
                <span className="rounded bg-slate-800/80 py-1.5 font-mono text-slate-100">{cm[1][1]}</span>
              </div>
            </div>
          ) : null}
          <ExplanationPanel
            sections={[
              {
                heading: "What it does",
                body: "A decision tree classifies points by asking a sequence of yes/no questions about their x and y values, carving the space into class regions.",
              },
              {
                heading: "Splits & purity",
                body: "Each split picks the feature and threshold that best separates the classes. Gini and entropy both measure how mixed a group is; information gain is the impurity drop after a split.",
              },
              {
                heading: "Depth & min samples",
                body: "Max depth limits how many questions deep the tree goes; min samples split stops tiny nodes from splitting. Both control complexity.",
              },
              {
                heading: "Under vs overfitting",
                body: "A shallow tree underfits — the boundary is too simple. A very deep tree overfits — it wraps tiny regions around individual points and generalizes poorly.",
              },
              {
                heading: "Why boundaries look blocky",
                body: "Every split is a vertical or horizontal cut (x ≤ t or y ≤ t), so regions are always axis-aligned rectangles — hence the stair-stepped look.",
              },
            ]}
          >
            <div className="rounded-lg bg-slate-800/50 p-3 text-xs text-slate-400">
              <p className="font-medium text-slate-300">Try this</p>
              <p className="mt-1">Set max depth = 1 on the Moons data to see underfitting, then raise it to 9 on XOR to watch the boundary fragment. Compare Gini vs Entropy.</p>
            </div>
          </ExplanationPanel>
        </>
      }
      notes={
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Learned rules</h2>
          <div className="mt-3">
            <TreeStructure tree={state.tree} />
          </div>
        </div>
      }
    />
  );
}
