import { decodeCursor, encodeCursor, EncodedCursor } from "./pagination.js";

/* ---------- Minimal types ---------- */
export type MongoSort = Record<string, 1 | -1>;
export type MongoFilter = Record<string, any>;
export type MongoProjection = Record<string, 0 | 1>;

type FindOptions = {
  sort?: MongoSort;
  limit?: number;
  projection?: MongoProjection;
};
type FindFn<T> = (filter?: MongoFilter, options?: FindOptions) => Promise<T[]>;

/* ---------- Internals ---------- */

/** Ensure sort is stable by appending `_id` as last key if missing. */
function normalizeSort(sort: MongoSort): MongoSort {
  if (!sort || typeof sort !== "object") return { _id: 1 };
  if (!Object.prototype.hasOwnProperty.call(sort, "_id")) {
    const lastDir = (Object.values(sort).slice(-1)[0] ?? 1) as 1 | -1;
    return { ...sort, _id: lastDir };
  }
  return sort;
}

/** Build lexicographic "seek after" filter for multi-field sorting (dir-aware). */
function buildSeekFilter(
  sort: MongoSort,
  cursorObj: Record<string, any> | undefined,
): MongoFilter | undefined {
  if (!cursorObj || Object.keys(cursorObj).length === 0) return undefined;

  const entries = Object.entries(sort);
  const ors: MongoFilter[] = [];

  for (let i = 0; i < entries.length; i++) {
    const andClause: MongoFilter = {};
    for (let j = 0; j < i; j++) {
      const [field] = entries[j];
      if (!(field in cursorObj)) return undefined;
      andClause[field] = cursorObj[field];
    }
    const [field, dir] = entries[i];
    if (!(field in cursorObj)) return undefined;
    const op = dir === -1 ? "$lt" : "$gt";
    andClause[field] = { [op]: cursorObj[field] };
    ors.push(andClause);
  }

  return ors.length ? { $or: ors } : undefined;
}

/* ---------- API ---------- */

type ResolveCursor<T> = (item: T) => Record<string, any>; // must include every sort key

export async function mongoListWithCursor<T>(
  find: FindFn<T>,
  {
    limit = 20,
    cursor,
    filter,
    sort,
    projection,
    resolveCursor,
  }: {
    limit?: number;
    cursor?: EncodedCursor;
    filter?: MongoFilter;
    sort: MongoSort; // e.g. { created_at: -1 } or { organization_id: 1, name: 1, _id: 1 }
    projection?: MongoProjection;
    resolveCursor: ResolveCursor<T>; // must return values for all sort keys (incl. _id if present)
  },
): Promise<{ items: T[]; nextCursor?: EncodedCursor }> {
  const normalizedSort = normalizeSort(sort);
  const decoded = decodeCursor<Record<string, any>>(cursor);

  const seekFilter = buildSeekFilter(normalizedSort, decoded);
  const effectiveFilter = seekFilter
    ? filter
      ? { $and: [filter, seekFilter] }
      : seekFilter
    : (filter ?? {});

  // fetch limit + 1 to detect next page
  const results = await find(effectiveFilter, {
    sort: normalizedSort,
    limit: limit + 1,
    projection,
  });

  const hasNext = results.length > limit;
  const items = hasNext ? results.slice(0, limit) : results;

  let nextCursor: EncodedCursor | undefined;
  if (hasNext && items.length) {
    const last = items[items.length - 1];
    nextCursor = encodeCursor(resolveCursor(last));
  }

  return { items, nextCursor };
}
