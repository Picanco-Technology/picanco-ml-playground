import type { ClusterPoint } from "@/types/ml";
import { clamp, randomBetween, randomNormal, seededRandom, type Rng } from "@/lib/math";

export type ClusterShape = "blob" | "circle" | "random";

export type ClusterDataOptions = {
  count?: number;
  clusters?: number;
  spread?: number;
  shape?: ClusterShape;
  seed?: number;
};

/**
 * Generate 2D points for clustering. Cluster assignments are left undefined
 * because clustering is unsupervised — the algorithm discovers them.
 */
export function generateClusterData(options: ClusterDataOptions = {}): ClusterPoint[] {
  const { count = 90, clusters = 3, spread = 0.06, shape = "blob", seed } = options;
  const rng: Rng = seed === undefined ? Math.random : seededRandom(seed);

  if (shape === "random") {
    return Array.from({ length: count }, () => ({
      x: randomBetween(0.05, 0.95, rng),
      y: randomBetween(0.05, 0.95, rng),
    }));
  }

  if (shape === "circle") {
    // A ring of points — the classic case where K-Means struggles.
    return Array.from({ length: count }, () => {
      const angle = randomBetween(0, 2 * Math.PI, rng);
      const radius = 0.36 + randomNormal(rng, 0, 0.03);
      return {
        x: clamp(0.5 + radius * Math.cos(angle), 0, 1),
        y: clamp(0.5 + radius * Math.sin(angle), 0, 1),
      };
    });
  }

  // blob: Gaussian groups around random centers.
  const centers = Array.from({ length: Math.max(1, clusters) }, () => ({
    x: randomBetween(0.15, 0.85, rng),
    y: randomBetween(0.15, 0.85, rng),
  }));
  return Array.from({ length: count }, (_, i) => {
    const c = centers[i % centers.length];
    return {
      x: clamp(c.x + randomNormal(rng, 0, spread), 0, 1),
      y: clamp(c.y + randomNormal(rng, 0, spread), 0, 1),
    };
  });
}
