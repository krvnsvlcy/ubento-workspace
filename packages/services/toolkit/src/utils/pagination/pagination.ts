import type { Request } from "express";

export type EncodedCursor = string | undefined;

// --- CURSOR ENCODING ---

export function encodeCursor<T extends object>(
  v: T | undefined,
): EncodedCursor {
  if (!v) return undefined;
  const json = JSON.stringify(v);
  const b64 = Buffer.from(json, "utf8").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function decodeCursor<T extends object>(
  c: EncodedCursor,
): T | undefined {
  if (!c) return undefined;
  const b64 = c.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 ? 4 - (b64.length % 4) : 0;
  const b64p = b64 + "=".repeat(pad);
  const json = Buffer.from(b64p, "base64").toString("utf8");
  return JSON.parse(json) as T;
}

// --- REQUEST PARSING ---

/** Parse ?limit= / ?cursor= from query with sane caps */
export function parseCursorQuery(
  req: Request,
  {
    defaultLimit = 20,
    maxLimit = 100,
  }: { defaultLimit?: number; maxLimit?: number } = {},
) {
  const limitRaw = req.query.limit as string | undefined;
  const limit = Math.min(
    Math.max(parseInt(limitRaw ?? "", 10) || defaultLimit, 1),
    maxLimit,
  );
  const cursor = (req.query.cursor as string | undefined) ?? undefined;
  return { limit, cursor };
}

// --- STANDARDIZED RESPONSE ENVELOPE ---
export type CursorPage = {
  cursor: string;
  limit: number;
};
export interface CursorPagedResponse<T> {
  data: T[];
  nextPage?: CursorPage;
  previousPage?: CursorPage;
}

export function makeCursorPageResponse<T>(res: CursorPagedResponse<T>): CursorPagedResponse<T> {
  return res;
}

export function makeCursorPageResponseSchema(
  dataSchema: Record<string, any>,
): any {
  return {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: dataSchema,
      },
      nextPage: {
        type: "object",
        properties: {
          cursor: { type: "string" },
          limit: { type: "number" },
        },
        required: ["cursor", "limit"],
      },
      previousPage: {
        type: "object",
        properties: {
          cursor: { type: "string" },
          limit: { type: "number" },
        },
        required: ["cursor", "limit"],
      },
    },
    required: ["data"],
  };
}
