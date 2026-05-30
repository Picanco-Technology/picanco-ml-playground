export type AlgorithmCategory =
  | "Regression"
  | "Clustering"
  | "Classification"
  | "Deep Learning"
  | "Dimensionality Reduction";

export type AlgorithmDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type AlgorithmStatus = "MVP" | "Coming Soon" | "Advanced";

/** Metadata used to render algorithm cards on the home and playground pages. */
export type AlgorithmInfo = {
  slug: string;
  name: string;
  category: AlgorithmCategory;
  difficulty: AlgorithmDifficulty;
  summary: string;
  controls: string;
  visualization: string;
  status: AlgorithmStatus;
  /** Whether the demo route exists yet. */
  available: boolean;
};
