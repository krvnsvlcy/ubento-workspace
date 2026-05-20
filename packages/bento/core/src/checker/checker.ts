import { ObjectSchema } from "./schema";

/**
 * Traverses a dereferenced Object Schema using a dot-notation data path.
 * Maps data paths (like `$.state.users.0.name`) to their corresponding schema definition.
 */
export function getObjectSchemaAtPath(
  schema: ObjectSchema,
  path: string,
): ObjectSchema | undefined {
  if (!path || path === "$" || path === "$.") return schema;

  // 1. Normalize path (strip root context token)
  let cleanPath = path;
  if (cleanPath.startsWith("$.")) cleanPath = cleanPath.slice(2);
  else if (cleanPath.startsWith("$")) cleanPath = cleanPath.slice(1);

  // 2. Convert array indices to dot notation and split
  const keys = cleanPath
    .replace(/\[([^\]]+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);

  let currentSchema: ObjectSchema | undefined = schema;

  for (const key of keys) {
    if (!currentSchema) return undefined;

    // A. Traverse Objects
    if (currentSchema.type === "object") {
      if (!currentSchema.properties || !(key in currentSchema.properties)) {
        return undefined; // Path broken
      }
      currentSchema = currentSchema.properties[key];
      continue;
    }

    // B. Traverse Arrays (key must be a number)
    if (currentSchema.type === "array") {
      if (!Number.isInteger(Number(key))) {
        return undefined; // Attempted to access an array with a string key
      }
      currentSchema = currentSchema.items;
      continue;
    }

    // C. Handle explicit Union branching
    if (currentSchema.type === "union") {
      let foundBranch = false;

      for (const branch of currentSchema.types) {
        // Find the first branch that allows the current path to continue
        if (branch.type === "object" && branch.properties?.[key]) {
          currentSchema = branch.properties[key];
          foundBranch = true;
          break;
        }
      }
      if (foundBranch) continue;
    }

    // Hit a primitive, 'any', or an unsupported structure before the path ended
    return undefined;
  }

  return currentSchema;
}

/**
 * Evaluates if the 'provided' Object Schema (from the Context Graph)
 * can safely satisfy the 'expected' Object Schema (from the UI Component Props).
 */
export function isObjectSchemaCompatible(
  provided: ObjectSchema | undefined,
  expected: ObjectSchema | undefined,
): boolean {
  // 1. Universal Acceptors
  if (!expected || expected.type === "any") {
    return true;
  }
  if (!provided) return false;

  // If the provided value is explicitly typed as "any", it can satisfy strict components
  if (provided.type === "any") {
    return true;
  }

  // ---------------------------------------------------------
  // 2. UNION SUBTYPING
  // ---------------------------------------------------------

  // If the component expects one of several types
  if (expected.type === "union") {
    return expected.types.some((option) =>
      isObjectSchemaCompatible(provided, option),
    );
  }

  // If the context graph provides a union, ALL of its possible types
  // must satisfy the expected component prop to be considered safe.
  if (provided.type === "union") {
    return provided.types.every((option) =>
      isObjectSchemaCompatible(option, expected),
    );
  }

  // ---------------------------------------------------------
  // 3. THE UBENTO FUNCTION DIALECT
  // ---------------------------------------------------------
  if (expected.type === "function") {
    if (provided.type !== "function") return false;

    // A. Validate Returns (Covariant: Provided output must satisfy Expected output)
    if (expected.returns) {
      if (!provided.returns) return false;
      if (!isObjectSchemaCompatible(provided.returns, expected.returns)) {
        return false;
      }
    }

    // B. Validate Parameters (Contravariant: Expected input must satisfy Provided requirements)
    if (provided.parameters && Object.keys(provided.parameters).length > 0) {
      if (!expected.parameters) return false; // Action needs args, UI supplies none

      // Note the parameter swap: Expected must satisfy Provided
      if (!isObjectSchemaCompatible(expected.parameters, provided.parameters)) {
        return false;
      }
    }

    return true;
  }

  // ---------------------------------------------------------
  // 4. STANDARD STRUCTURAL SUBTYPING
  // ---------------------------------------------------------

  // Direct Type Match
  if (expected.type === provided.type) {
    // Deep Object Check
    if (expected.type === "object" && provided.type === "object") {
      const expProps = expected.properties || {};
      const provProps = provided.properties || {};
      const expRequired = expected.required || [];

      for (const key in expProps) {
        const isReq = expRequired.includes(key);
        const pField = provProps[key];

        if (!pField) {
          if (isReq) return false; // Missing a required field
          continue; // Field is optional and missing, which is fine
        }

        if (!isObjectSchemaCompatible(pField, expProps[key])) {
          return false;
        }
      }
      return true;
    }

    // Deep Array Check
    if (expected.type === "array" && provided.type === "array") {
      const expItems = expected.items;
      const provItems = provided.items;

      if (!expItems) return true; // Expected array of anything
      return isObjectSchemaCompatible(provItems, expItems);
    }

    // Primitive matches (strings, numbers, booleans, null)
    return true;
  }

  return false;
}

export * from "./convert";
export * from "./schema";
