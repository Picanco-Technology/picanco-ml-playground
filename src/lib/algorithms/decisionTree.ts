import type { LabeledPoint2D, Point2D } from "@/types/ml";
import { clamp } from "@/lib/math";

export type SplitCriterion = "gini" | "entropy";

export type DecisionTreeConfig = {
  maxDepth: number;
  minSamplesSplit: number;
  criterion: SplitCriterion;
};

export type DecisionTreeNode = {
  /** Set on leaves: the predicted class. Internal nodes leave this undefined. */
  prediction?: number;
  /** Set on internal nodes: the feature and threshold to split on. */
  feature?: "x" | "y";
  threshold?: number;
  left?: DecisionTreeNode;
  right?: DecisionTreeNode;
  samples: number;
  impurity: number;
  classCounts: Record<number, number>;
  depth: number;
};

export type DecisionTreeState = {
  tree: DecisionTreeNode | null;
  /** Decision-boundary class grid over the [0,1] square, grid[row][col]. */
  grid: number[][];
  accuracy: number;
  confusion: number[][];
  leaves: number;
  depth: number;
  trained: boolean;
};

export function createInitialDecisionTreeState(): DecisionTreeState {
  return { tree: null, grid: [], accuracy: 0, confusion: [[0, 0], [0, 0]], leaves: 0, depth: 0, trained: false };
}

function classCounts(labels: number[]): Record<number, number> {
  const counts: Record<number, number> = {};
  for (const l of labels) counts[l] = (counts[l] ?? 0) + 1;
  return counts;
}

/** Gini impurity: 1 - Σ p_c². 0 means a pure (single-class) group. */
export function calculateGiniImpurity(labels: number[]): number {
  const n = labels.length;
  if (n === 0) return 0;
  let sum = 0;
  for (const c of Object.values(classCounts(labels))) sum += (c / n) ** 2;
  return 1 - sum;
}

/** Shannon entropy: -Σ p_c·log2(p_c). */
export function calculateEntropy(labels: number[]): number {
  const n = labels.length;
  if (n === 0) return 0;
  let e = 0;
  for (const c of Object.values(classCounts(labels))) {
    const p = c / n;
    e -= p * Math.log2(p);
  }
  return e;
}

function impurityOf(labels: number[], criterion: SplitCriterion): number {
  return criterion === "entropy" ? calculateEntropy(labels) : calculateGiniImpurity(labels);
}

/** Drop in impurity from splitting a parent group into left/right children. */
export function calculateInformationGain(
  parent: number[],
  left: number[],
  right: number[],
  criterion: SplitCriterion,
): number {
  const n = parent.length;
  if (n === 0) return 0;
  const weighted = (left.length / n) * impurityOf(left, criterion) + (right.length / n) * impurityOf(right, criterion);
  return impurityOf(parent, criterion) - weighted;
}

export type BestSplit = { feature: "x" | "y"; threshold: number; gain: number };

/** Scan both features and candidate thresholds for the split with the highest gain. */
export function findBestSplit(points: LabeledPoint2D[], criterion: SplitCriterion): BestSplit | null {
  if (points.length < 2) return null;
  const parent = points.map((p) => p.label);
  let best: BestSplit | null = null;

  for (const feature of ["x", "y"] as const) {
    const sorted = Array.from(new Set(points.map((p) => p[feature]))).sort((a, b) => a - b);
    for (let i = 0; i < sorted.length - 1; i++) {
      const threshold = (sorted[i] + sorted[i + 1]) / 2;
      const left: number[] = [];
      const right: number[] = [];
      for (const p of points) (p[feature] <= threshold ? left : right).push(p.label);
      if (left.length === 0 || right.length === 0) continue;
      const gain = calculateInformationGain(parent, left, right, criterion);
      if (!best || gain > best.gain) best = { feature, threshold, gain };
    }
  }
  return best;
}

function makeLeaf(points: LabeledPoint2D[], criterion: SplitCriterion, depth: number): DecisionTreeNode {
  const labels = points.map((p) => p.label);
  const counts = classCounts(labels);
  let prediction = 0;
  let max = -1;
  for (const [label, c] of Object.entries(counts)) {
    if (c > max) {
      max = c;
      prediction = Number(label);
    }
  }
  return { prediction, samples: points.length, impurity: impurityOf(labels, criterion), classCounts: counts, depth };
}

/** Recursively build a classification tree, respecting depth and min-samples limits. */
export function buildDecisionTree(points: LabeledPoint2D[], config: DecisionTreeConfig, depth = 0): DecisionTreeNode {
  if (points.length === 0) return { prediction: 0, samples: 0, impurity: 0, classCounts: {}, depth };

  const labels = points.map((p) => p.label);
  const impurity = impurityOf(labels, config.criterion);

  // Stop: hit max depth, too few samples, or already pure.
  if (depth >= config.maxDepth || points.length < config.minSamplesSplit || impurity === 0) {
    return makeLeaf(points, config.criterion, depth);
  }

  const split = findBestSplit(points, config.criterion);
  if (!split || split.gain <= 0) return makeLeaf(points, config.criterion, depth);

  const left: LabeledPoint2D[] = [];
  const right: LabeledPoint2D[] = [];
  for (const p of points) (p[split.feature] <= split.threshold ? left : right).push(p);
  if (left.length === 0 || right.length === 0) return makeLeaf(points, config.criterion, depth);

  return {
    feature: split.feature,
    threshold: split.threshold,
    left: buildDecisionTree(left, config, depth + 1),
    right: buildDecisionTree(right, config, depth + 1),
    samples: points.length,
    impurity,
    classCounts: classCounts(labels),
    depth,
  };
}

/** Predict the class of a single point by walking the tree. */
export function predictDecisionTree(tree: DecisionTreeNode | null, point: Point2D): number {
  let node = tree;
  while (node) {
    if (node.feature === undefined) return node.prediction ?? 0;
    const value = node.feature === "x" ? point.x : point.y;
    node = value <= (node.threshold ?? 0) ? node.left ?? null : node.right ?? null;
  }
  return 0;
}

/** Predict over a resolution×resolution grid of the [0,1] square for boundary rendering. */
export function predictDecisionBoundaryGrid(tree: DecisionTreeNode | null, resolution: number): number[][] {
  const res = clamp(Math.floor(resolution), 2, 120);
  const grid: number[][] = [];
  for (let row = 0; row < res; row++) {
    const y = (row + 0.5) / res;
    const cols: number[] = [];
    for (let col = 0; col < res; col++) cols.push(predictDecisionTree(tree, { x: (col + 0.5) / res, y }));
    grid.push(cols);
  }
  return grid;
}

export function calculateDecisionTreeAccuracy(tree: DecisionTreeNode | null, points: LabeledPoint2D[]): number {
  if (points.length === 0) return 0;
  let correct = 0;
  for (const p of points) if (predictDecisionTree(tree, p) === p.label) correct += 1;
  return correct / points.length;
}

export function calculateConfusionMatrix(
  tree: DecisionTreeNode | null,
  points: LabeledPoint2D[],
  numClasses = 2,
): number[][] {
  const m = Array.from({ length: numClasses }, () => Array<number>(numClasses).fill(0));
  for (const p of points) {
    const pred = predictDecisionTree(tree, p);
    if (p.label < numClasses && pred < numClasses) m[p.label][pred] += 1;
  }
  return m;
}

export function countLeaves(node: DecisionTreeNode | null): number {
  if (!node) return 0;
  if (node.feature === undefined) return 1;
  return countLeaves(node.left ?? null) + countLeaves(node.right ?? null);
}

export function getTreeDepth(node: DecisionTreeNode | null): number {
  if (!node || node.feature === undefined) return 0;
  return 1 + Math.max(getTreeDepth(node.left ?? null), getTreeDepth(node.right ?? null));
}
