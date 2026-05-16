import { ObjectNodeSchema, ObjectSchema } from "./schema";

/**
 * Resolves a local JSON Pointer (e.g., "#/components/schemas/User") against the root document.
 */
function resolveLocalRef(ref: string, root: any): any {
  if (!ref.startsWith("#/")) {
    console.warn(
      `Ubento Compiler: External or absolute $refs are not supported: ${ref}`,
    );
    return undefined;
  }

  const path = ref.slice(2).split("/");
  let current = root;

  for (const segment of path) {
    const key = segment.replace(/~1/g, "/").replace(/~0/g, "~");
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }

  return current;
}

/**
 * Compiles a standard JSON Schema into the strict Ubento ObjectSchema dialect.
 * Recursively dereferences $refs with built-in circular dependency protection.
 * * @param schema The raw JSON Schema to parse.
 * @param rootDocument The full OpenAPI/JSON Schema root.
 * @param visitedAncestors Internal Set to track the reference chain and break infinite loops.
 */
export function jsonToObjectSchema(
  schema: any,
  rootDocument: any = schema,
  visitedAncestors: Set<string> = new Set(),
): ObjectSchema {
  if (!schema || typeof schema !== "object") {
    return { type: "any" };
  }

  // ---------------------------------------------------------
  // 1. SAFE $REF RESOLUTION
  // ---------------------------------------------------------
  if (schema.$ref && typeof schema.$ref === "string") {
    // Break the infinite loop if we have already seen this exact ref in the current chain
    if (visitedAncestors.has(schema.$ref)) {
      console.warn(
        `Ubento Compiler: Circular reference detected at ${schema.$ref}. Breaking loop with 'any' type.`,
      );
      return { type: "any" };
    }

    const resolved = resolveLocalRef(schema.$ref, rootDocument);
    if (!resolved) {
      console.warn(`Ubento Compiler: Failed to resolve pointer ${schema.$ref}`);
      return { type: "any" };
    }

    // Create a new Set with the current ref added to pass down the recursion chain.
    // This prevents false positives (e.g., sibling properties safely referencing the same User schema).
    const nextAncestors = new Set([...visitedAncestors, schema.$ref]);
    return jsonToObjectSchema(resolved, rootDocument, nextAncestors);
  }

  const base = {
    ...(schema.description && { description: schema.description }),
  };

  // ---------------------------------------------------------
  // 2. UNION HANDLING
  // ---------------------------------------------------------
  if (schema.anyOf || schema.oneOf) {
    const rawUnion = schema.anyOf || schema.oneOf;
    const types = rawUnion.map((s: any) =>
      jsonToObjectSchema(s, rootDocument, visitedAncestors),
    );
    return { ...base, type: "union", types };
  }

  if (Array.isArray(schema.type)) {
    const types = schema.type.map((t: string) =>
      jsonToObjectSchema({ type: t }, rootDocument, visitedAncestors),
    );
    return { ...base, type: "union", types };
  }

  let inferredType = schema.type;
  if (!inferredType) {
    if (schema.properties || schema.additionalProperties)
      inferredType = "object";
    else if (schema.items) inferredType = "array";
    else inferredType = "any";
  }

  // ---------------------------------------------------------
  // 3. DIALECT MAPPING
  // ---------------------------------------------------------
  switch (inferredType) {
    case "string":
      return { ...base, type: "string", enum: schema.enum };

    case "number":
    case "integer":
      return { ...base, type: "number" };

    case "boolean":
      return { ...base, type: "boolean" };

    case "null":
      return { ...base, type: "null" };

    case "array":
      return {
        ...base,
        type: "array",
        items: schema.items
          ? jsonToObjectSchema(schema.items, rootDocument, visitedAncestors)
          : undefined,
      };

    case "object": {
      const properties: Record<string, ObjectSchema> = {};

      if (schema.properties) {
        for (const [key, val] of Object.entries(schema.properties)) {
          properties[key] = jsonToObjectSchema(
            val,
            rootDocument,
            visitedAncestors,
          );
        }
      }

      let additionalProperties: boolean | ObjectSchema | undefined = undefined;
      if (typeof schema.additionalProperties === "boolean") {
        additionalProperties = schema.additionalProperties;
      } else if (typeof schema.additionalProperties === "object") {
        additionalProperties = jsonToObjectSchema(
          schema.additionalProperties,
          rootDocument,
          visitedAncestors,
        );
      }

      return {
        ...base,
        type: "object",
        properties: Object.keys(properties).length > 0 ? properties : undefined,
        required: schema.required,
        additionalProperties,
      };
    }

    case "function": {
      const parameters = schema.parameters
        ? jsonToObjectSchema(schema.parameters, rootDocument, visitedAncestors)
        : undefined;

      const safeParameters =
        parameters?.type === "object"
          ? (parameters as ObjectNodeSchema)
          : undefined;

      return {
        ...base,
        type: "function",
        parameters: safeParameters,
        returns: schema.returns
          ? jsonToObjectSchema(schema.returns, rootDocument, visitedAncestors)
          : undefined,
      };
    }

    case "any":
      return { ...base, type: "any" };

    default:
      return { ...base, type: "any" };
  }
}
