import { createElement, useCallback } from "react";
import { BoardRenderingContextType } from "../context/context";
import { ElementView } from "../renderer";

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
 */
export function setByPath(
  obj: Record<string, any>,
  path: string,
  value: any,
): Record<string, any> {
  if (!path) return obj;

  if (path === "$") {
    return value;
  }

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

  function update(current: any, keys: string[], idx: number): any {
    const key = keys[idx];
    const isLastKey = idx === keys.length - 1;

    let clone: any;
    if (Array.isArray(current)) {
      clone = [...current];
    } else if (current !== null && typeof current === "object") {
      clone = { ...current };
    } else {
      const isNumericKey = Number.isInteger(Number(key));
      clone = isNumericKey ? [] : {};
    }

    if (isLastKey) {
      clone[key] = value;
    } else {
      const nextKey = keys[idx + 1];
      const isNextNumeric = Number.isInteger(Number(nextKey));

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

  // --- EAGER: $use (Path Resolver) ---
  if ("$use" in node && typeof node.$use === "string") {
    return getByPath(context as Record<string, any>, node.$use);
  }

  // --- EAGER: $eval (Computed Expression) ---
  if ("$eval" in node && typeof node.$eval === "string") {
    try {
      const keys = Object.keys(context);
      const values = Object.values(context);
      const evaluator = new Function(...keys, `return ${node.$eval}`);
      return evaluator(...values);
    } catch (err) {
      console.warn(`[Ubento] $eval failed: ${node.$eval}`, err);
      return undefined;
    }
  }

  // --- EAGER: $apply (Context Function Transformation) ---
  if (
    "$apply" in node &&
    typeof node.$apply === "object" &&
    node.$apply !== null
  ) {
    const applyNode = node.$apply as { fn: string; args?: Record<string, any> };
    const targetFn = getByPath(context as Record<string, any>, applyNode.fn);

    if (typeof targetFn !== "function") {
      console.warn(
        `[Ubento] $apply failed: "${applyNode.fn}" is not a valid function.`,
      );
      return undefined;
    }

    const resolvedArgs = applyNode.args
      ? resolveValue(applyNode.args, context)
      : undefined;
    try {
      return targetFn(resolvedArgs);
    } catch (err) {
      console.error(
        `[Ubento] $apply execution failed for: ${applyNode.fn}`,
        err,
      );
      return undefined;
    }
  }

  // --- EAGER: $element (Element Reference) ---
  if ("$element" in node && typeof node.$element === "string") {
    return createElement(ElementView, { id: node.$element });
  }

  // --- LAZY: $call (RPC / Dispatcher) ---
  if (
    "$call" in node &&
    typeof node.$call === "object" &&
    node.$call !== null
  ) {
    const callNode = node.$call as { fn: string; args?: Record<string, any> };
    const targetFn = getByPath(context as Record<string, any>, callNode.fn);

    if (typeof targetFn !== "function") {
      console.warn(
        `[Ubento] $call failed: "${callNode.fn}" is not a valid function.`,
      );
      return async () => {}; // Return safe no-op to prevent crashes
    }

    // Return a closure waiting for an event to trigger it
    return async (runtimeArgs: Record<string, any> = {}) => {
      try {
        const currentContext = { ...context, ...runtimeArgs };
        // Resolve arguments AT THE TIME OF THE EVENT
        const resolvedArgs = callNode.args
          ? resolveValue(callNode.args, currentContext)
          : undefined;
        return await targetFn(resolvedArgs);
      } catch (err) {
        console.error(
          `[Ubento] $call execution failed for: ${callNode.fn}`,
          err,
        );
        throw err;
      }
    };
  }

  // --- LAZY: $run (Side-Effect Handler) ---
  if ("$run" in node && typeof node.$run === "string") {
    return async (arg: Record<string, any> = {}) => {
      try {
        const finalContext = { ...context, ...arg };
        const keys = Object.keys(finalContext);
        const values = Object.values(finalContext);

        const AsyncFunction = Object.getPrototypeOf(
          async function () {},
        ).constructor;
        const runner = new AsyncFunction("$", ...keys, node.$run);
        return await runner(finalContext, ...values);
      } catch (err) {
        console.error(`[Ubento] $run failed: ${node.$run}`, err);
        throw err;
      }
    };
  }

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
  bindings: Record<string, string | { value: string; setValue: string }>,
  context: BoardRenderingContextType,
) {
  const bindingTupples = Object.fromEntries(
    Object.entries(bindings).map(([key, ref]) => {
      if (typeof ref === "string") {
        return [
          key,
          [
            { $use: ref },
            (v: any) => {
              context.setState((currentState) => {
                let statePath = ref;
                if (statePath.startsWith("$.state.")) {
                  statePath = statePath.slice(8);
                } else if (statePath.startsWith("$.")) {
                  statePath = statePath.slice(2);
                } else if (statePath.startsWith("state.")) {
                  statePath = statePath.slice(6);
                }
                const res = setByPath(currentState, statePath, v);
                console.log("SETTING", { currentState, statePath, v, res });
                return res;
              });
            },
          ] as [any, (s: any) => void],
        ];
      } else {
        return [
          key,
          [
            { $use: ref.value },
            (v: any) => {
              const handler = resolveValue({ $use: ref.setValue }, context);
              if (typeof handler === "function") {
                handler(v);
              } else {
                console.error(`${ref.setValue} is not a function.`);
              }
            },
          ] as [any, (s: any) => void],
        ];
      }
    }),
  );

  return resolveValue(bindingTupples, context) as Record<
    string,
    [any, (s: any) => void]
  >;
}

export function useResolvedEventHandler(
  listeners: Record<string, unknown>, // Expects a dictionary of directives (like $call or $run)
  context: BoardRenderingContextType,
) {
  return useCallback(
    async (event: string, payload: any) => {
      const listenerDirective = listeners[event];
      if (!listenerDirective) return;

      // Since the listener is a $call or $run, resolving it returns an async function.
      const handler = resolveValue(listenerDirective, context);

      if (typeof handler !== "function") {
        console.error(
          `[Ubento] Listener for event "${event}" did not resolve to an executable function.`,
        );
        return;
      }

      try {
        // We pass { event: payload } into the resolved lazy function as the runtime argument
        await handler({ event: payload });
      } catch (err) {
        console.error(`[Ubento] Execution failed for event: ${event}`, err);
      }
    },
    [listeners, context],
  );
}
