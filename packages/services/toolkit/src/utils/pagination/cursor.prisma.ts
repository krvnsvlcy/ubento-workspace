import {
  CursorPagedResponse,
  decodeCursor,
  encodeCursor,
  EncodedCursor,
} from "./pagination.js";

/* ---------- Minimal Prisma delegate type (no dependency) ---------- */
export type PrismaDelegate = {
  findMany: (args: any) => Promise<unknown[]>;
};

/* ---------- Utility type extractors ---------- */
type FindManyArgs<D extends PrismaDelegate> = Parameters<D["findMany"]>[0];
type FindManyResult<D extends PrismaDelegate> = Awaited<
  ReturnType<D["findMany"]>
>;
type FindManyItem<D extends PrismaDelegate> =
  FindManyResult<D> extends Array<infer U> ? U : never;
type PrismaCursorPayload<D extends PrismaDelegate> = NonNullable<
  FindManyArgs<D>["cursor"]
>;

/* ---------- API ---------- */

export async function prismaListWithCursor<D extends PrismaDelegate>(
  delegate: D,
  {
    limit = 20,
    cursor,
    where,
    orderBy,
    select,
    include,
    resolveCursor,
  }: {
    limit?: number;
    cursor?: EncodedCursor;
    where?: FindManyArgs<D>["where"];
    orderBy: FindManyArgs<D>["orderBy"];
    select?: FindManyArgs<D>["select"];
    include?: FindManyArgs<D>["include"];
    resolveCursor: (item: FindManyItem<D>) => PrismaCursorPayload<D>;
  },
): Promise<CursorPagedResponse<FindManyItem<D>>> {
  const decoded = decodeCursor<PrismaCursorPayload<D>>(cursor);

  // Build args with accurate shape, but keep flexible for different models.
  const findArgs: FindManyArgs<D> & {
    take: number;
    skip?: number;
    cursor?: Record<string, any>;
  } = {
    where,
    orderBy,
    take: limit + 1,
    select,
    include,
  };

  if (decoded && Object.keys(decoded).length) {
    findArgs.cursor = decoded;
    findArgs.skip = 1; // skip the cursor row to avoid duplication
  }

  const results = (await delegate.findMany(findArgs)) as FindManyItem<D>[];
  const hasNext = results.length > limit;
  const items = hasNext
    ? (results.slice(0, limit) as FindManyItem<D>[])
    : results;

  let nextCursor: EncodedCursor | undefined;
  if (hasNext && items.length) {
    const last = items[items.length - 1];
    const cursorObj = resolveCursor(last);
    nextCursor = encodeCursor(cursorObj);
  }

  return {
    data: items,
    nextPage: nextCursor ? { cursor: nextCursor, limit } : undefined,
  };
}
