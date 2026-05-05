export const mixed = Symbol("mixed");
export type MixedType = typeof mixed;

export function isMixed(value: unknown): value is MixedType {
  return value === mixed;
}
