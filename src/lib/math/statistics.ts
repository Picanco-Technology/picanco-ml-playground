/** Arithmetic mean. Returns 0 for an empty array. */
export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

/** Population variance. Returns 0 for an empty array. */
export function variance(values: number[]): number {
  if (values.length === 0) return 0;
  const m = mean(values);
  return mean(values.map((v) => (v - m) ** 2));
}

/** Population standard deviation. */
export function standardDeviation(values: number[]): number {
  return Math.sqrt(variance(values));
}

/** Mean squared error between actual and predicted values. */
export function meanSquaredError(actual: number[], predicted: number[]): number {
  const n = Math.min(actual.length, predicted.length);
  if (n === 0) return 0;
  let sum = 0;
  for (let i = 0; i < n; i++) sum += (actual[i] - predicted[i]) ** 2;
  return sum / n;
}
