// Shared machine-learning domain types used across every playground module.

export type Point2D = { x: number; y: number };

export type Point3D = { x: number; y: number; z: number };

/** A 2D point with a discrete class label (classification). */
export type LabeledPoint2D = Point2D & { label: number };

/** A 2D point where x is the input feature and y is the target value. */
export type RegressionPoint = Point2D;

/** A 2D point with an optional assigned cluster index (clustering). */
export type ClusterPoint = Point2D & { cluster?: number };

/** A scalar metric value suitable for display. */
export type MetricValue = number | string;

/** A labelled metric entry rendered in the metric panel. */
export type ModelMetric = {
  key: string;
  label: string;
  value: MetricValue;
  unit?: string;
  description?: string;
};

/** A single iteration of a training/optimization loop, used for loss curves. */
export type TrainingStep = {
  step: number;
  loss?: number;
  accuracy?: number;
  inertia?: number;
};

/** Runtime lifecycle status of an algorithm in a playground. */
export type AlgorithmStatus = "idle" | "ready" | "running" | "converged" | "error";

/** Shapes a synthetic dataset generator can produce. */
export type DatasetShape = "linear" | "blob" | "circle" | "moon" | "xor" | "random";

/** A selectable dataset preset shown in dataset controls. */
export type DatasetPreset = {
  id: string;
  name: string;
  shape: DatasetShape;
  description: string;
};

/** Generic, extensible parameter bag for a playground module. */
export type PlaygroundConfig = {
  pointCount: number;
  seed?: number;
  noise?: number;
  [key: string]: number | string | boolean | undefined;
};
