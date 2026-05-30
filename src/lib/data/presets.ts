import type { DatasetPreset } from "@/types/ml";

export const classificationPresets: DatasetPreset[] = [
  { id: "linear", name: "Linear", shape: "linear", description: "Two blobs separable by a line." },
  { id: "circle", name: "Circle", shape: "circle", description: "An inner cluster inside a ring." },
  { id: "moon", name: "Moons", shape: "moon", description: "Two interleaving half-circles." },
  { id: "xor", name: "XOR", shape: "xor", description: "Diagonal exclusive-or pattern." },
];

export const clusterPresets: DatasetPreset[] = [
  { id: "blob", name: "Blobs", shape: "blob", description: "Well-separated Gaussian groups." },
  { id: "random", name: "Random", shape: "random", description: "Uniformly scattered points." },
  { id: "circle", name: "Ring", shape: "circle", description: "Ring shape K-Means struggles with." },
];
