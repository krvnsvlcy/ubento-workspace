// env.ts

/* ────────────────────────────────────────────────────────────────────────── *
 * Environment variable helpers (TypeScript)
 * - Safe getters (string | number | boolean | json)
 * - Helpful errors for required vars and parse failures
 * - defineEnv<D>() with precise inferred return types
 * ────────────────────────────────────────────────────────────────────────── */

type EnvType = "string" | "number" | "boolean" | "json";

type EnvTypeMap = {
  string: string;
  number: number;
  boolean: boolean;
  json: unknown;
};

export type EnvEntryDefinition<T extends EnvType = EnvType> = {
  /** The target type to parse the environment variable into. */
  type: T;
  /** If true, throws when the variable is missing (after considering defaults). */
  required?: boolean;
  /** Default value when the variable is absent or empty string. */
  default?: EnvTypeMap[T];
  /**
   * Optional custom parser to convert the raw string into the desired type.
   * If provided, it overrides the built-in parser for this entry.
   */
  parser?: (raw: string) => EnvTypeMap[T];
};

export type EnvDefinition = Record<string, EnvEntryDefinition>;

/** Compute the value type for a given entry definition. */
export type EnvEntryTypeInterface<T extends EnvType> = T extends "string"
  ? string
  : T extends "number"
    ? number
    : T extends "boolean"
      ? boolean
      : T extends "json"
        ? unknown
        : never;

/**
 * If required=true → value type
 * Else if default is provided → value type (not optional)
 * Else → value type | undefined
 */
export type EnvEntryInterface<D extends EnvEntryDefinition> =
  D["required"] extends true
    ? EnvEntryTypeInterface<D["type"]>
    : undefined extends D["default"]
      ? EnvEntryTypeInterface<D["type"]> | undefined
      : EnvEntryTypeInterface<D["type"]>;

export type EnvInterface<D extends EnvDefinition> = {
  [K in keyof D]: EnvEntryInterface<D[K]>;
};

/* ──────────────────────────── low-level getters ─────────────────────────── */

export function getEnv(name: string, required = false): string | undefined {
  // Toneionally trim so stray whitespace/newlines don’t cause subtle bugs.
  const raw = process.env[name];
  const value = raw?.trim();
  if (required && (value === undefined || value === "")) {
    throw new Error(`Missing required environment variable ${name}`);
  }
  return value === "" ? undefined : value;
}

export function getRequiredEnv(name: string): string {
  const v = getEnv(name, true);
  // v cannot be undefined because required=true
  return v as string;
}

export function getEnvAsNumber(
  name: string,
  required = false,
): number | undefined {
  const v = getEnv(name, required);
  if (v === undefined) return undefined;
  const n = Number.parseInt(v, 10);
  if (Number.isNaN(n)) {
    throw new Error(
      `Environment variable ${name} must be a valid integer, got "${v}"`,
    );
  }
  return n;
}

export function getRequiredEnvAsNumber(name: string): number {
  const n = getEnvAsNumber(name, true);
  return n as number;
}

export function getEnvAsBoolean(
  name: string,
  required = false,
): boolean | undefined {
  const v = getEnv(name, required);
  if (v === undefined) return undefined;
  // Accept a few common truthy/falsy spellings
  const s = v.toLowerCase();
  if (["true", "1", "yes", "y", "on"].includes(s)) return true;
  if (["false", "0", "no", "n", "off"].includes(s)) return false;
  throw new Error(
    `Environment variable ${name} must be a boolean (true/false/1/0/yes/no/on/off), got "${v}"`,
  );
}

export function getRequiredEnvAsBoolean(name: string): boolean {
  const b = getEnvAsBoolean(name, true);
  return b as boolean;
}

export function getEnvAsJSON(name: string, required = false): unknown {
  const v = getEnv(name, required);
  if (v === undefined) return undefined;
  try {
    return JSON.parse(v);
  } catch (e) {
    throw new Error(
      `Environment variable ${name} must be valid JSON: ${(e as Error).message}`,
    );
  }
}

export function getRequiredEnvAsJSON(name: string): unknown {
  const j = getEnvAsJSON(name, true);
  return j as unknown;
}

/* ───────────────────────────── defineEnv<D>() ───────────────────────────── */

export function defineEnv<D extends EnvDefinition>(
  definition: D,
): EnvInterface<D> {
  const out: Record<string, unknown> = {};

  for (const key of Object.keys(definition) as (keyof D)[]) {
    const entry = definition[key];
    const { type, required = false } = entry;

    // Fetch raw value (string | undefined), already trims and checks when required=true later.
    let raw = getEnv(String(key), false);

    // Apply default if missing/empty
    let hasValue = !(raw === undefined || raw === "");
    let value: unknown;

    // If no raw value, we’ll consider default below
    if (hasValue) {
      if (entry.parser) {
        // Custom parser wins
        try {
          value = entry.parser(raw!);
        } catch (e) {
          throw new Error(
            `Failed to parse env ${String(key)} via custom parser: ${
              (e as Error).message
            }`,
          );
        }
      } else {
        // Built-in parsers
        switch (type) {
          case "string": {
            value = raw!;
            break;
          }
          case "number": {
            const n = Number.parseInt(raw!, 10);
            if (Number.isNaN(n)) {
              throw new Error(
                `Environment variable ${String(
                  key,
                )} must be a valid integer, got "${raw}"`,
              );
            }
            value = n;
            break;
          }
          case "boolean": {
            const s = raw!.toLowerCase();
            if (["true", "1", "yes", "y", "on"].includes(s)) value = true;
            else if (["false", "0", "no", "n", "off"].includes(s))
              value = false;
            else {
              throw new Error(
                `Environment variable ${String(
                  key,
                )} must be a boolean (true/false/1/0/yes/no/on/off), got "${raw}"`,
              );
            }
            break;
          }
          case "json": {
            try {
              value = JSON.parse(raw!);
            } catch (e) {
              throw new Error(
                `Environment variable ${String(key)} must be valid JSON: ${
                  (e as Error).message
                }`,
              );
            }
            break;
          }
          default:
            // Exhaustive check
            const neverType: never = type;
            throw new Error(
              `Unsupported environment variable type: ${String(neverType)}`,
            );
        }
      }
    }

    // Fallback to default if needed
    if (value === undefined || value === null) {
      if (entry.default !== undefined) {
        value = entry.default as unknown;
        hasValue = true;
      }
    }

    // Final required check
    if (required && (value === undefined || value === null)) {
      throw new Error(`Missing required environment variable ${String(key)}`);
    }

    out[String(key)] = value as unknown;
  }

  return out as EnvInterface<D>;
}
