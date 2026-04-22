export type CursorPage<T> = [items: T[], next?: () => Promise<CursorPage<T>>];

/**
 * Extracts items and next-page function from a paginated Response.
 */
export async function extractCursorPage<T>(
  response: Response,
  options: {
    items?: T[];
    fetcher?: (request: Request) => Promise<Response>;
  } = {}
): Promise<CursorPage<T>> {
  if (!response.ok) {
    throw new Error(
      `Failed to fetch page: ${response.status} ${response.statusText}`
    );
  }

  const { fetcher = fetch } = options;

  let items: T[];
  if ("items" in options) {
    if (!Array.isArray(options.items)) {
      throw new Error("Provided items is not an array");
    }
    items = options.items;
  } else {
    items = await readItems<T>(response);
  }
  const nextUrl = determineNextUrl(response);

  const next =
    nextUrl != null
      ? async () => {
          const fullUrl = new URL(nextUrl, response.url).toString();
          const req = new Request(fullUrl);
          const res = await fetcher(req);
          return extractCursorPage<T>(res, { fetcher });
        }
      : undefined;

  return [items, next];
}

/* ---------- helpers ---------- */

async function readItems<T>(res: Response): Promise<T[]> {
  const data = await res.clone().json();
  if (!Array.isArray(data)) {
    throw new Error("Response data is not an array");
  }
  return data as T[];
}

function determineNextUrl(res: Response): string | null {
  // 1) Link header
  const link = getHeader(res.headers, "Link");
  const fromLink = parseNextFromLink(link);
  if (fromLink) return fromLink;

  // 2) X-Next-Cursor
  const cursor = getHeader(res.headers, "X-Next-Cursor");
  if (!cursor) return null;

  try {
    const u = new URL(res.url);
    const hasPageCursor = Array.from(u.searchParams.keys()).some(
      (k) => k.toLowerCase() === "page[cursor]"
    );
    const key = hasPageCursor ? "page[cursor]" : "cursor";
    u.searchParams.set(key, cursor);
    return u.toString();
  } catch {
    return null;
  }
}

function parseNextFromLink(linkHeader: string | null): string | null {
  if (!linkHeader) return null;
  const parts = linkHeader.split(/,\s*(?=<)/g);
  for (const part of parts) {
    const m = part.match(/<([^>]+)>\s*;\s*rel="([^"]+)"/i);
    if (m && m[2].toLowerCase() === "next") return m[1];
  }
  return null;
}

function getHeader(h: Headers, name: string): string | null {
  const direct = h.get(name);
  if (direct != null) return direct;
  const needle = name.toLowerCase();
  for (const [k, v] of h.entries()) {
    if (k.toLowerCase() === needle) return v ?? null;
  }
  return null;
}

export async function* iterateCursorPages<T>(
  url: string | URL,
  fetcher: (
    input: RequestInfo | URL,
    init?: RequestInit
  ) => Promise<Response> = fetch
): AsyncGenerator<T[], void, void> {
  let res = await fetcher(url);
  let [items, next] = await extractCursorPage<T>(res, { fetcher });

  yield items;

  while (next) {
    [items, next] = await next();
    yield items;
  }
}
