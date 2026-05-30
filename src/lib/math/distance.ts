import type { Point2D } from "@/types/ml";

/** Squared Euclidean distance (cheaper than euclideanDistance for comparisons). */
export function squaredDistance(a: Point2D, b: Point2D): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

/** Euclidean distance between two 2D points. */
export function euclideanDistance(a: Point2D, b: Point2D): number {
  return Math.sqrt(squaredDistance(a, b));
}
