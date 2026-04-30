import { createStore as createZustandStore } from "zustand/vanilla";

// --- STATE TYPES ---

export type AsyncDataStatus = "pending" | "error" | "success";
export type AsyncDataFetchStatus = "idle" | "fetching";
export type FetchPolicy =
  | "cache-first" // Return cache if available, otherwise fetch
  | "network-only" // Always fetch, ignore cache
  | "cache-and-network" // Return cache if available, but always fetch in background
  | "cache-only"; // Only return cache, never fetch

export type Usage = {
  users: number;
  lastUsed: number;
};

export type QueryState<P = unknown> = {
  status: AsyncDataStatus;
  fetchStatus: AsyncDataFetchStatus;
  error: any | undefined;
  previousPage?: P;
  nextPage?: P;
};

export interface StoreState<D, P = unknown> {
  data: Record<string, D>;
  queries: Record<string, QueryState<P>>;
}

export type Entity<D> = {
  data: D;
  query: QueryState;
};

export type EntityList<D, P = unknown> = {
  data: D[];
  query: QueryState<P>;
};

export interface FetchOptions {
  fetchPolicy?: FetchPolicy;
}

export interface FetchManyOptions<J, P> extends FetchOptions {
  params?: J;
  page?: P;
}

// --- INTERNAL UTILITIES ---

export function getEntityProjectionQueryKey<J extends Record<string, unknown>>(
  params?: J,
) {
  if (!params) return "list:all";
  const sortedKeys = Object.keys(params).sort();
  const normalizedObj = sortedKeys.reduce((acc, key) => {
    (acc as any)[key] = (params as any)[key];
    return acc;
  }, {} as Partial<J>);
  return `list:${JSON.stringify(normalizedObj)}`;
}

export function getEntityQueryKey(key: string) {
  return `item:${key}`;
}

// --- CORE FACTORY ---

export function createStore<
  D,
  J extends Record<string, unknown> = {},
  P extends Record<string, unknown> = {},
>({
  namespace,
  getKey,
  fetchOne,
  fetchMany: fetchManyApi,
  project,
  gcTime = 1000 * 60 * 5,
}: {
  namespace: string;
  getKey: (entity: D) => string;
  fetchOne: (key: string) => Promise<D>;
  fetchMany: (options: { params?: J; page?: P }) => Promise<{
    data: D[];
    previousPage?: P;
    nextPage?: P;
  }>;
  project?: (entities: D[], params?: J) => D[];
  gcTime?: number;
}) {
  const store = createZustandStore<StoreState<D, P>>(() => ({
    data: {},
    queries: {},
  }));

  const get = store.getState;
  const set = store.setState;

  const usageTracker = new Map<string, Usage>();
  const gcTimers = new Map<string, NodeJS.Timeout>();

  return {
    namespace,
    store,

    // --- GARBAGE COLLECTION API ---
    retain: (cacheKey: string) => {
      const current = usageTracker.get(cacheKey) || {
        users: 0,
        lastUsed: Date.now(),
      };
      usageTracker.set(cacheKey, { ...current, users: current.users + 1 });

      if (gcTimers.has(cacheKey)) {
        clearTimeout(gcTimers.get(cacheKey));
        gcTimers.delete(cacheKey);
      }
    },

    release: (cacheKey: string) => {
      const current = usageTracker.get(cacheKey);
      if (!current) return;

      const newUsers = Math.max(0, current.users - 1);
      usageTracker.set(cacheKey, { users: newUsers, lastUsed: Date.now() });

      if (newUsers === 0) {
        const timer = setTimeout(() => {
          set((state) => {
            const newData = { ...state.data };
            const newQueries = { ...state.queries };

            if (cacheKey.startsWith("item:")) {
              const id = cacheKey.replace("item:", "");
              delete newData[id];
            }
            delete newQueries[cacheKey];

            return { data: newData, queries: newQueries };
          });

          usageTracker.delete(cacheKey);
          gcTimers.delete(cacheKey);
        }, gcTime);

        gcTimers.set(cacheKey, timer);
      }
    },

    // --- INJECTION & EVICTION ---
    push: (item: D) => {
      const key = getKey(item);
      set((state) => ({ data: { ...state.data, [key]: item } }));
    },

    pushMany: (items: D[]) => {
      if (items.length === 0) return;
      set((state) => {
        const newData = { ...state.data };
        items.forEach((item) => (newData[getKey(item)] = item));
        return { data: newData };
      });
    },

    remove: (key: string) => {
      set((state) => {
        const newData = { ...state.data };
        delete newData[key];
        return { data: newData };
      });
    },

    removeMany: (keysOrMatcher: string[] | ((data: D) => boolean)) => {
      set((state) => {
        const newData = { ...state.data };
        if (Array.isArray(keysOrMatcher)) {
          keysOrMatcher.forEach((key) => delete newData[key]);
        } else {
          Object.values(newData).forEach((item) => {
            if (keysOrMatcher(item)) delete newData[getKey(item)];
          });
        }
        return { data: newData };
      });
    },

    update: (key: string, updater: Partial<D> | ((data: D) => Partial<D>)) => {
      set((state) => {
        const currentItem = state.data[key];
        if (!currentItem) return state;

        const patch = typeof updater === "function" ? updater(currentItem) : updater;
        return {
          data: { ...state.data, [key]: { ...currentItem, ...patch } },
        };
      });
    },

    updateMany: (
      match: string[] | ((data: D) => boolean),
      updater: Partial<D> | ((data: D) => Partial<D>),
    ) => {
      set((state) => {
        const newData = { ...state.data };
        const keysToUpdate = Array.isArray(match)
          ? match
          : Object.values(newData).filter(match).map(getKey);

        keysToUpdate.forEach((key) => {
          const currentItem = newData[key];
          if (currentItem) {
            const patch = typeof updater === "function" ? updater(currentItem) : updater;
            newData[key] = { ...currentItem, ...patch };
          }
        });

        return { data: newData };
      });
    },

    // --- QUERIES ---
    fetch: async (key: string, options?: FetchOptions) => {
      const { fetchPolicy = "cache-first" } = options || {};
      const queryKey = getEntityQueryKey(key);
      const isCached = get().data[key] !== undefined;

      // Apply Fetch Policy Rules
      if (fetchPolicy === "cache-only") return;
      if (fetchPolicy === "cache-first" && isCached) return;

      set((state) => ({
        queries: {
          ...state.queries,
          [queryKey]: {
            status: state.queries[queryKey]?.status || "pending",
            fetchStatus: "fetching",
            error: undefined,
          },
        },
      }));

      try {
        const data = await fetchOne(key);
        set((state) => ({
          data: { ...state.data, [key]: data },
          queries: {
            ...state.queries,
            [queryKey]: {
              status: "success",
              fetchStatus: "idle",
              error: undefined,
            },
          },
        }));
      } catch (error) {
        set((state) => ({
          queries: {
            ...state.queries,
            [queryKey]: {
              status: state.queries[queryKey]?.status === "success" ? "success" : "error",
              fetchStatus: "idle",
              error,
            },
          },
        }));
      }
    },

    fetchMany: async (options?: FetchManyOptions<J, P>) => {
      const { params, page, fetchPolicy = "cache-first" } = options || {};
      const queryKey = getEntityProjectionQueryKey(params);
      const isCached = get().queries[queryKey]?.status === "success";

      // Apply Fetch Policy Rules (Pagination bypasses cache-first)
      if (fetchPolicy === "cache-only") return;
      if (fetchPolicy === "cache-first" && isCached && page === undefined) return;

      set((state) => {
        const existingQuery = state.queries[queryKey] || {};
        return {
          queries: {
            ...state.queries,
            [queryKey]: {
              status: existingQuery.status || "pending",
              fetchStatus: "fetching",
              error: undefined,
              nextPage: existingQuery.nextPage,
              previousPage: existingQuery.previousPage,
            },
          },
        };
      });

      try {
        const { data, nextPage, previousPage } = await fetchManyApi({
          params,
          page,
        });

        set((state) => {
          const newData = { ...state.data };
          data.forEach((item) => {
            newData[getKey(item)] = item;
          });

          return {
            data: newData,
            queries: {
              ...state.queries,
              [queryKey]: {
                status: "success",
                fetchStatus: "idle",
                error: undefined,
                nextPage,
                previousPage,
              },
            },
          };
        });
      } catch (error) {
        set((state) => {
          const existingQuery = state.queries[queryKey] || {};
          return {
            queries: {
              ...state.queries,
              [queryKey]: {
                status: existingQuery.status === "success" ? "success" : "error",
                fetchStatus: "idle",
                error,
                nextPage: existingQuery.nextPage,
                previousPage: existingQuery.previousPage,
              },
            },
          };
        });
      }
    },

    // --- SELECTORS ---
    selectEntity: (key: string, state: StoreState<D, P>): Entity<D> => {
      const queryKey = getEntityQueryKey(key);
      const defaultQuery: QueryState = {
        status: "pending",
        fetchStatus: "idle",
        error: undefined,
      };

      return {
        data: state.data[key],
        query: state.queries[queryKey] || defaultQuery,
      };
    },

    selectManyEntities: (
      state: StoreState<D, P>,
      params?: J,
    ): EntityList<D, P> => {
      const queryKey = getEntityProjectionQueryKey(params);
      const defaultQuery: QueryState<P> = {
        status: "pending",
        fetchStatus: "idle",
        error: undefined,
      };

      const allEntities: D[] = Object.values(state.data);
      const projectedData = project ? project(allEntities, params) : allEntities;

      return {
        data: projectedData,
        query: state.queries[queryKey] || defaultQuery,
      };
    },
  };
}

export type Store<
  D,
  J extends Record<string, unknown> = {},
  P extends Record<string, unknown> = {},
> = ReturnType<typeof createStore<D, J, P>>;