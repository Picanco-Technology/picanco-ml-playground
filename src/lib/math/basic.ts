/** Constrain a value to the [min, max] range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation between a and b by factor t in [0, 1]. */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Map a value from [min, max] to [0, 1]. Returns 0 when the range is empty. */
export function normalizeValue(value: number, min: number, max: number): number {
  return max === min ? 0 : (value - min) / (max - min);
}

/** Scale an array of numbers into the [0, 1] range using min-max scaling. */
export function minMaxScale(values: number[]): number[] {
  if (values.length === 0) return [];
  const min = Math.min(...values);
  const max = Math.max(...values);
  return values.map((v) => normalizeValue(v, min, max));
}
