/** Guarantees an integer */
export default function guardNumber(
  value: string | undefined,
  fallback: number,
  preRound: (value: number) => number = (v) => v
): number {
  const parsed = parseFloat(value ?? '');

  if (isNaN(parsed)) {
    return fallback;
  }

  return Math.round(preRound(parsed));
}

export function guardNumberPositive(value: string | undefined): number {
  return guardNumber(value, 0, (v) => Math.max(0, v));
}
