import type { Request, Response } from "express";

export type EncodedCursor = string | undefined;

export function encodeCursor<T extends object>(
  v: T | undefined
): EncodedCursor {
  if (!v) return undefined;
  const json = JSON.stringify(v);
  const b64 = Buffer.from(json, "utf8").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function decodeCursor<T extends object>(
  c: EncodedCursor
): T | undefined {
  if (!c) return undefined;
  const b64 = c.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 ? 4 - (b64.length % 4) : 0;
  const b64p = b64 + "=".repeat(pad);
  const json = Buffer.from(b64p, "base64").toString("utf8");
  return JSON.parse(json) as T;
}

/** Parse ?limit= / ?cursor= from query with sane caps */
export function parseCursorQuery(
  req: Request,
  {
    defaultLimit = 20,
    maxLimit = 100,
  }: { defaultLimit?: number; maxLimit?: number } = {}
) {
  const limitRaw = req.query.limit as string | undefined;
  const limit = Math.min(
    Math.max(parseInt(limitRaw ?? "", 10) || defaultLimit, 1),
    maxLimit
  );
  const cursor = (req.query.cursor as string | undefined) ?? undefined;
  return { limit, cursor };
}

/** Set Link: <path?…&cursor=…&limit=…>; rel="next" (or clear if none) */
export function setNextLink(
  req: Request,
  res: Response,
  nextCursor?: EncodedCursor,
  limit?: number
) {
  if (!nextCursor) {
    // no next page → ensure Link is not set
    res.removeHeader("Link");
    return;
  }
  const params = new URLSearchParams();
  // preserve existing query params but override cursor/limit
  for (const [k, v] of Object.entries(req.query)) {
    if (v == null) continue;
    // flatten array-style values into first value; adjust if you support multi
    params.set(k, Array.isArray(v) ? String(v[0]) : String(v));
  }
  params.set("cursor", nextCursor);
  if (limit) params.set("limit", String(limit));

  const path = new URL(req.originalUrl, "http://domain.com").pathname;
  const url = `${path}?${params.toString()}`;
  res.setHeader("Link", `<${url}>; rel="next"`);
}
