import type { Request } from "express";

function ensureArray<T>(val: T | T[] | undefined): T[] {
  if (val === undefined) return [];
  return Array.isArray(val) ? val : [val];
}

/**
 * Parse a string list from query, splitting by comma.
 * Example: ?ids=1,2,3 → ["1","2","3"]
 */
export function parseStringListQuery(
  req: Request,
  key: string,
  defaultValue: string[]
): string[];
export function parseStringListQuery(
  req: Request,
  key: string
): string[] | undefined;
export function parseStringListQuery(
  req: Request,
  key: string,
  defaultValue?: string[]
): string[] | undefined {
  const raw = req.query[key];
  if (!raw) return defaultValue;

  return ensureArray(raw)
    .flatMap((s) => String(s).split(","))
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Parse a single string.
 */
export function parseStringQuery(
  req: Request,
  key: string
): string | undefined {
  const val = req.query[key];
  return val ? String(val) : undefined;
}

/**
 * Parse a number, with optional default.
 */
export function parseNumberQuery(
  req: Request,
  key: string,
  defaultValue?: number
): number | undefined {
  const val = req.query[key];
  if (val === undefined) return defaultValue;
  const num = Number(val);
  return Number.isNaN(num) ? defaultValue : num;
}

/**
 * Parse a boolean. Accepts: true/false, 1/0, yes/no.
 */
export function parseBooleanQuery(
  req: Request,
  key: string,
  defaultValue = false
): boolean {
  const val = req.query[key];
  if (val === undefined) return defaultValue;
  const s = String(val).toLowerCase();
  return ["true", "1", "yes", "y"].includes(s);
}
