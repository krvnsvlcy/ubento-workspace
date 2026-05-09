import dlv from "dlv";

/**
 * Recursively traverses an object/array and replaces any
 * { "$resolve": "path.to.value" } signatures with the actual value from the context.
 */
export function resolveObject<T = any>(
  template: any,
  context: Record<string, any>,
): T {
  // 1. Base case: Return null, undefined, or primitive values directly
  if (template === null || typeof template !== "object") {
    return template as unknown as T;
  }

  // 2. Handle Arrays: Map over items recursively
  if (Array.isArray(template)) {
    return template.map((item) => resolveObject(item, context)) as unknown as T;
  }

  // 3. Handle the Resolution Signature
  // Strict check: It must contain $resolve AND be the only key in the object
  if (
    "$resolve" in template &&
    typeof template.$resolve === "string" &&
    Object.keys(template).length === 1
  ) {
    // dlv returns undefined if the path doesn't exist, which is standard JS behavior
    return dlv(context, template.$resolve) as unknown as T;
  }

  // 4. Handle standard Objects: Iterate keys and recurse
  const resolvedObject: Record<string, any> = {};
  for (const [key, value] of Object.entries(template)) {
    resolvedObject[key] = resolveObject(value, context);
  }

  return resolvedObject as unknown as T;
}
