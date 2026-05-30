/** A pseudo-random number generator returning a float in [0, 1). */
export type Rng = () => number;

/**
 * Deterministic PRNG (mulberry32). Given the same seed it always produces the
 * same sequence, which keeps dataset generation reproducible.
 */
export function seededRandom(seed: number): Rng {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Uniform random number in [min, max). */
export function randomBetween(min: number, max: number, rng: Rng = Math.random): number {
  return min + (max - min) * rng();
}

/** Normally distributed random number via the Box-Muller transform. */
export function randomNormal(rng: Rng = Math.random, mean = 0, std = 1): number {
  const u = 1 - rng();
  const v = rng();
  const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return mean + z * std;
}

/** Return a new array with the elements shuffled (Fisher-Yates). */
export function shuffleArray<T>(array: T[], rng: Rng = Math.random): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
