import type { ClusterPoint } from "@/types/ml";
import { clamp, randomBetween, randomNormal, seededRandom, type Rng } from "@/lib/math";

export type ClusterDataOptions = {
  count?: number;
  clusters?: number;
  spread?: number;
  seed?: number;
};

/**
 * Generate Gaussian blobs around random centers. Cluster assignments are left
 * undefined because clustering is unsupervised — the algorithm discovers them.
 */
export function generateClusterData(options: ClusterDataOptions = {}): ClusterPoint[] {
  const { count = 90, clusters = 3, spread = 0.06, seed } = options;
  const rng: Rng = seed === undefined ? Math.random : seededRandom(seed);

  const centers = Array.from({ length: Math.max(1, clusters) }, () => ({
    x: randomBetween(0.15, 0.85, rng),
    y: randomBetween(0.15, 0.85, rng),
  }));

  const points: ClusterPoint[] = [];
  for (let i = 0; i < count; i++) {
    const c = centers[i % centers.length];
    points.push({
      x: clamp(c.x + randomNormal(rng, 0, spread), 0, 1),
      y: clamp(c.y + randomNormal(rng, 0, spread), 0, 1),
    });
  }
  return points;
}
