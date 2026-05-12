import { BoardRenderingContextApi } from "./context";

/**
 * Safely retrieves a nested value from an object.
 * Supports dot notation, bracket notation, and safely ignores optional chaining syntax.
 */
function getByPath(obj: Record<string, any>, path: string): any {
  if (!path) return undefined;

  // 1. Remove optional chaining '?' (our getter is inherently safe)
  // 2. Convert bracket notation '[0]' to dot notation '.0'
  // 3. Split by '.' and filter out empty strings (handles leading dots like '.field')
  const normalizedKeys = path
    .replace(/\?/g, "")
    .replace(/\[([^\]]+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);

  return normalizedKeys.reduce((acc, part) => {
    return acc && acc[part] !== undefined ? acc[part] : undefined;
  }, obj);
}

/**
 * Recursively walks a schema node and resolves Ubento directives.
 */
export function resolveValue(
  raw: unknown,
  context: BoardRenderingContextApi,
): unknown {
  // 1. Base case: Primitives and null return as-is
  if (typeof raw !== "object" || raw === null) {
    return raw;
  }

  // 2. Arrays: Recursively resolve each item
  if (Array.isArray(raw)) {
    return raw.map((item) => resolveValue(item, context));
  }

  // 3. Objects: Check for Directives
  const node = raw as Record<string, unknown>;

  // Intercept the $state directive
  if ("$state" in node && typeof node.$state === "string") {
    return getByPath(context.state, node.$state);
  }

  // (Future directives like $function or $if can be added here)

  // 4. Standard Objects: Recursively resolve each property
  return Object.fromEntries(
    Object.entries(node).map(([key, value]) => [
      key,
      resolveValue(value, context),
    ]),
  );
}

export function useResolvedValue<T>(
  raw: T,
  context: BoardRenderingContextApi,
): T {
  return resolveValue(raw, context) as T;
}
