import type { RegressionPoint } from "@/types/ml";
import { randomBetween, randomNormal, seededRandom, type Rng } from "@/lib/math";

export type RegressionDataOptions = {
  count?: number;
  noise?: number;
  slope?: number;
  intercept?: number;
  xMin?: number;
  xMax?: number;
  seed?: number;
};

/** Generate points scattered around the line y = slope*x + intercept. */
export function generateRegressionData(options: RegressionDataOptions = {}): RegressionPoint[] {
  const {
    count = 40,
    noise = 0.15,
    slope = 1.2,
    intercept = 0.2,
    xMin = 0,
    xMax = 1,
    seed,
  } = options;
  const rng: Rng = seed === undefined ? Math.random : seededRandom(seed);

  const points: RegressionPoint[] = [];
  for (let i = 0; i < count; i++) {
    const x = randomBetween(xMin, xMax, rng);
    const y = slope * x + intercept + randomNormal(rng, 0, noise);
    points.push({ x, y });
  }
  return points;
}
