import type { AlgorithmInfo } from "@/types";

/** Single source of truth for the algorithms shown across the app. */
export const algorithms: AlgorithmInfo[] = [
  {
    slug: "linear-regression",
    name: "Linear Regression",
    category: "Regression",
    difficulty: "Beginner",
    summary:
      "Watch a line learn to fit noisy data with gradient descent, and see the error shrink step by step.",
    controls: "Points, noise, learning rate, epochs",
    visualization: "Scatter plot, regression line, loss curve",
    status: "MVP",
    available: true,
  },
  {
    slug: "kmeans",
    name: "K-Means Clustering",
    category: "Clustering",
    difficulty: "Beginner",
    summary:
      "Group points into clusters and watch centroids move as the algorithm searches for structure.",
    controls: "K, points, dataset shape, step / auto-run",
    visualization: "Colored clusters, moving centroids, inertia",
    status: "MVP",
    available: true,
  },
  {
    slug: "decision-tree",
    name: "Decision Tree",
    category: "Classification",
    difficulty: "Intermediate",
    summary:
      "Split feature space into class regions with simple rules, and explore underfitting vs overfitting.",
    controls: "Max depth, min samples, dataset type",
    visualization: "Decision boundary, tree rules, accuracy",
    status: "MVP",
    available: false,
  },
  {
    slug: "neural-network",
    name: "Neural Network",
    category: "Deep Learning",
    difficulty: "Advanced",
    summary:
      "Train a small feedforward network to learn nonlinear boundaries on classic toy datasets.",
    controls: "Layers, neurons, activation, learning rate",
    visualization: "Decision boundary, loss & accuracy curves",
    status: "Advanced",
    available: false,
  },
  {
    slug: "pca",
    name: "PCA Visualization",
    category: "Dimensionality Reduction",
    difficulty: "Intermediate",
    summary:
      "Project data onto the directions of greatest variance and see how dimensionality reduction works.",
    controls: "Dataset, components, normalize toggle",
    visualization: "Principal directions, projected data, variance",
    status: "Coming Soon",
    available: false,
  },
];
