import type { LabeledPoint2D } from "@/types/ml";
import { randomBetween, randomNormal, seededRandom, type Rng } from "@/lib/math";

export type ClassificationDataOptions = {
  count?: number;
  noise?: number;
  seed?: number;
};

function makeRng(seed?: number): Rng {
  return seed === undefined ? Math.random : seededRandom(seed);
}

/** Two Gaussian blobs separable by a straight line (classes 0 and 1). */
export function generateClassificationData(
  options: ClassificationDataOptions = {},
): LabeledPoint2D[] {
  const { count = 80, noise = 0.08, seed } = options;
  const rng = makeRng(seed);
  const centers = [
    { x: 0.32, y: 0.35 },
    { x: 0.68, y: 0.65 },
  ];

  const points: LabeledPoint2D[] = [];
  for (let i = 0; i < count; i++) {
    const label = i % 2;
    const c = centers[label];
    points.push({
      x: c.x + randomNormal(rng, 0, noise + 0.06),
      y: c.y + randomNormal(rng, 0, noise + 0.06),
      label,
    });
  }
  return points;
}

/** Two interleaving half-circles ("moons"), not linearly separable. */
export function generateMoonData(options: ClassificationDataOptions = {}): LabeledPoint2D[] {
  const { count = 100, noise = 0.06, seed } = options;
  const rng = makeRng(seed);
  const half = Math.max(1, Math.floor(count / 2));

  const points: LabeledPoint2D[] = [];
  for (let i = 0; i < count; i++) {
    const label = i < half ? 0 : 1;
    const t = Math.PI * ((i % half) / half);
    const x = label === 0 ? Math.cos(t) : 1 - Math.cos(t);
    const y = label === 0 ? Math.sin(t) : 0.5 - Math.sin(t);
    points.push({
      x: x + randomNormal(rng, 0, noise),
      y: y + randomNormal(rng, 0, noise),
      label,
    });
  }
  return points;
}

/** An inner cluster (class 0) wrapped by an outer ring (class 1). */
export function generateCircleData(options: ClassificationDataOptions = {}): LabeledPoint2D[] {
  const { count = 100, noise = 0.04, seed } = options;
  const rng = makeRng(seed);

  const points: LabeledPoint2D[] = [];
  for (let i = 0; i < count; i++) {
    const label = i % 2;
    const radius = label === 0 ? randomBetween(0, 0.35, rng) : randomBetween(0.6, 0.95, rng);
    const angle = randomBetween(0, 2 * Math.PI, rng);
    points.push({
      x: radius * Math.cos(angle) + randomNormal(rng, 0, noise),
      y: radius * Math.sin(angle) + randomNormal(rng, 0, noise),
      label,
    });
  }
  return points;
}

/** XOR pattern: class is the exclusive-or of the x and y signs. */
export function generateXorData(options: ClassificationDataOptions = {}): LabeledPoint2D[] {
  const { count = 100, noise = 0.05, seed } = options;
  const rng = makeRng(seed);

  const points: LabeledPoint2D[] = [];
  for (let i = 0; i < count; i++) {
    const x = randomBetween(-1, 1, rng);
    const y = randomBetween(-1, 1, rng);
    const label = x > 0 !== y > 0 ? 1 : 0;
    points.push({
      x: x + randomNormal(rng, 0, noise),
      y: y + randomNormal(rng, 0, noise),
      label,
    });
  }
  return points;
}
