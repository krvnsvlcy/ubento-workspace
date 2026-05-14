import { useCallback } from "react";
import { ListenerSpec } from "../../spec/board";
import { BoardRenderingContextType } from "../context/context";

/**
 * Safely retrieves a nested value from an object.
 * Supports dot notation, bracket notation, and safely ignores optional chaining syntax.
 * The "$" character represents the root object.
 */
function getByPath(obj: Record<string, any>, path: string): any {
  if (!path) return undefined;

  // 1. Return the full root object if the path is exactly "$"
  if (path === "$") {
    return obj;
  }

  // 2. Strip the leading "$." or "$" token so the rest of the path can be resolved
  let resolvingPath = path;
  if (resolvingPath.startsWith("$.")) {
    resolvingPath = resolvingPath.slice(2);
  } else if (resolvingPath.startsWith("$")) {
    resolvingPath = resolvingPath.slice(1);
  }

  // 3. Remove optional chaining '?'
  // 4. Convert bracket notation '[0]' to dot notation '.0'
  // 5. Split by '.' and filter out empty strings
  const normalizedKeys = resolvingPath
    .replace(/\?/g, "")
    .replace(/\[([^\]]+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);

  return normalizedKeys.reduce((acc, part) => {
    return acc && acc[part] !== undefined ? acc[part] : undefined;
  }, obj);
}

/**
 * Safely sets a nested value in an object immutably.
 * Supports dot notation, bracket notation, and the "$" root token.
 * Returns a new object with the updated path, preserving structural sharing.
 */
export function setByPath(
  obj: Record<string, any>,
  path: string,
  value: any,
): Record<string, any> {
  if (!path) return obj;

  // 1. If the path is exactly the root token, the new value replaces the root
  if (path === "$") {
    return value;
  }

  // 2. Normalize the path (matching getByPath logic)
  let resolvingPath = path;
  if (resolvingPath.startsWith("$.")) {
    resolvingPath = resolvingPath.slice(2);
  } else if (resolvingPath.startsWith("$")) {
    resolvingPath = resolvingPath.slice(1);
  }

  const normalizedKeys = resolvingPath
    .replace(/\?/g, "")
    .replace(/\[([^\]]+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);

  if (normalizedKeys.length === 0) return obj;

  // 3. Recursive function to immutably update the path
  function update(current: any, keys: string[], idx: number): any {
    const key = keys[idx];
    const isLastKey = idx === keys.length - 1;

    // Determine the type of the current node to clone it properly
    let clone: any;
    if (Array.isArray(current)) {
      clone = [...current];
    } else if (current !== null && typeof current === "object") {
      clone = { ...current };
    } else {
      // If the current node doesn't exist, we must initialize it.
      // If the current key is a number, we initialize an array; otherwise, an object.
      const isNumericKey = Number.isInteger(Number(key));
      clone = isNumericKey ? [] : {};
    }

    // Base case: set the value at the leaf node
    if (isLastKey) {
      clone[key] = value;
    }
    // Recursive case: continue drilling down
    else {
      const nextKey = keys[idx + 1];
      const isNextNumeric = Number.isInteger(Number(nextKey));

      // Pass down the existing nested object/array, or initialize a new one if undefined
      const nextVal =
        current && current[key] !== undefined
          ? current[key]
          : isNextNumeric
            ? []
            : {};

      clone[key] = update(nextVal, keys, idx + 1);
    }

    return clone;
  }

  return update(obj, normalizedKeys, 0);
}

/**
 * Recursively walks a schema node and resolves Ubento directives.
 */
export function resolveValue(
  raw: unknown,
  context: Record<string, unknown>,
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

  // Intercept the $use directive
  if ("$use" in node && typeof node.$use === "string") {
    // We now pass the entire `context` object to allow `$` to represent the root
    return getByPath(context as unknown as Record<string, any>, node.$use);
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
  context: BoardRenderingContextType,
): T {
  return resolveValue(raw, context) as T;
}

export function useResolvedBindings(
  bindings: Record<string, string>,
  context: BoardRenderingContextType,
) {
  const bindingTupples = Object.fromEntries(
    Object.entries(bindings).map(([key, ref]) => {
      return [
        key,
        [
          // 1. The getter still resolves against the FULL context tree
          { $use: ref },

          // 2. The setter strictly updates the state tree
          (v: any) => {
            context.setState((currentState) => {
              // We assume 'ref' might be formatted as "$.state.user.name"
              // We need to strip "$.state." so setByPath operates cleanly on currentState
              let statePath = ref;
              if (statePath.startsWith("$.state.")) {
                statePath = statePath.slice(8);
              } else if (statePath.startsWith("$.")) {
                statePath = statePath.slice(2);
              }

              // Update the currentState immutably
              return setByPath(currentState, statePath, v);
            });
          },
        ] as [any, (s: any) => void],
      ];
    }),
  );

  return resolveValue(bindingTupples, context) as Record<
    string,
    [any, (s: any) => void]
  >;
}
export function useResolvedEventHandler(
  listeners: Record<string, ListenerSpec>,
  context: BoardRenderingContextType,
) {
  return useCallback(
    async (event: string, payload: any) => {
      const listener = listeners[event];
      if (!listener) {
        console.warn(`Unsupported event: ${event}`);
        return;
      }

      const handler = resolveValue({ $use: listener.handler }, context);
      const args = resolveValue(listener.args || {}, {
        ...context,
        event: payload,
      });
      if (typeof handler !== "function") {
        console.error(`${listener.handler} is not a function.`);
        return;
      }

      try {
        await handler(args);
      } catch {
        console.error(`${listener.handler} failed.`);
      }
    },
    [listeners, context],
  );
}
