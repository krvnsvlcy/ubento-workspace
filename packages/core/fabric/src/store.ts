import { createStore as createZustandStore } from "zustand/vanilla";

// --- PAGINATION TYPES ---

export type CursorPageRequest = {
  type: "cursor";
  cursor: string;
  limit?: number;
};
export type OffsetPageRequest = {
  type: "offset";
  offset: number;
  limit?: number;
};
export type FetchPageRequest = CursorPageRequest | OffsetPageRequest;

export type CursorPageResponse = {
  type: "cursor";
  cursor: string;
  hasMore: boolean;
  nextCursor?: string;
};
export type OffsetPageResponse = {
  type: "offset";
  offset: number;
  hasMore: boolean;
  total?: number;
};
export type FetchPageResponse = CursorPageResponse | OffsetPageResponse;

// --- STATE TYPES ---

export type AsyncDataStatus = "pending" | "error" | "success";
export type AsyncDataFetchStatus = "idle" | "fetching";

export type Usage = {
  users: number;
  lastUsed: number;
};

export type QueryState = {
  status: AsyncDataStatus;
  fetchStatus: AsyncDataFetchStatus;
  error: any | undefined;
  page?: FetchPageResponse;
};

// Notice: usage is strictly removed from the reactive tree
export interface StoreState<D> {
  data: Record<string, D>;
  queries: Record<string, QueryState>;
}

export type Entity<D> = {
  data: D;
  query: QueryState;
};

export type EntityList<D> = {
  data: D[];
  query: QueryState;
};

// --- CORE FACTORY ---

export function getEntitiesQueryKey<F extends Record<string, unknown>>(
  filterObj?: F,
) {
  if (!filterObj) return "list:all";
  const sortedKeys = Object.keys(filterObj).sort();
  const normalizedObj = sortedKeys.reduce((acc, key) => {
    (acc as any)[key] = (filterObj as any)[key];
    return acc;
  }, {} as Partial<F>);
  return `list:${JSON.stringify(normalizedObj)}`;
}

export function getEntityQueryKey(key: string) {
  return `item:${key}`;
}

export function createStore<D, F extends Record<string, unknown> = {}>({
  namespace,
  getKey,
  fetchOne,
  fetchMany,
  filter,
  gcTime = 1000 * 60 * 5, // Default GC time: 5 minutes
}: {
  namespace: string;
  getKey: (entity: D) => string;
  fetchOne: (key: string) => Promise<D>;
  fetchMany: (options: { filter?: F; page?: FetchPageRequest }) => Promise<{
    data: D[];
    page: FetchPageResponse;
  }>;
  filter?: (entities: D[], filterObj: F) => D[];
  gcTime?: number;
}) {
  // 1. The Reactive State (Triggers React renders)
  const store = createZustandStore<StoreState<D>>(() => ({
    data: {},
    queries: {},
  }));

  const get = store.getState;
  const set = store.setState;

  // 2. The Shadow State (Invisible to React, handles Garbage Collection)
  const usageTracker = new Map<string, Usage>();
  const gcTimers = new Map<string, NodeJS.Timeout>();

  // --- INTERNAL UTILITIES ---

  return {
    namespace,
    store, // Expose raw vanilla store for React hooks (useStore)

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

            // Clean up the dictionary if it's an item, or clean up the query metadata
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

    // --- INJECTION ---
    push: (item: D) => {
      const key = getKey(item);
      set((state) => ({
        data: { ...state.data, [key]: item },
      }));
    },

    pushMany: (items: D[]) => {
      if (items.length === 0) return;
      set((state) => {
        const newData = { ...state.data };
        items.forEach((item) => {
          newData[getKey(item)] = item;
        });
        return { data: newData };
      });
    },

    // --- EVICTION ---
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
            if (keysOrMatcher(item)) {
              delete newData[getKey(item)];
            }
          });
        }
        return { data: newData };
      });
    },

    // --- UPDATES ---
    update: (key: string, updater: Partial<D> | ((data: D) => Partial<D>)) => {
      set((state) => {
        const currentItem = state.data[key];
        if (!currentItem) return state;

        const patch =
          typeof updater === "function" ? updater(currentItem) : updater;
        return {
          data: {
            ...state.data,
            [key]: { ...currentItem, ...patch },
          },
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
            const patch =
              typeof updater === "function" ? updater(currentItem) : updater;
            newData[key] = { ...currentItem, ...patch };
          }
        });

        return { data: newData };
      });
    },

    // --- QUERIES ---
    fetch: async (key: string) => {
      const queryKey = getEntityQueryKey(key);

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
              status:
                state.queries[queryKey]?.status === "success"
                  ? "success"
                  : "error",
              fetchStatus: "idle",
              error,
            },
          },
        }));
      }
    },

    fetchMany: async (filterObj?: F, pageReq?: FetchPageRequest) => {
      const queryKey = getEntitiesQueryKey(filterObj);

      set((state) => {
        const existingQuery = state.queries[queryKey] || {};
        return {
          queries: {
            ...state.queries,
            [queryKey]: {
              status: existingQuery.status || "pending",
              fetchStatus: "fetching",
              error: undefined,
              page: existingQuery.page,
            },
          },
        };
      });

      try {
        const { data, page: responsePage } = await fetchMany({
          filter: filterObj,
          page: pageReq,
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
                page: responsePage,
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
                status:
                  existingQuery.status === "success" ? "success" : "error",
                fetchStatus: "idle",
                error,
                page: existingQuery.page,
              },
            },
          };
        });
      }
    },

    // --- SELECTORS ---
    selectEntity: (key: string, state: StoreState<D>): Entity<D> => {
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
      state: StoreState<D>,
      filterObj?: F,
    ): EntityList<D> => {
      const queryKey = getEntitiesQueryKey(filterObj);
      const defaultQuery: QueryState = {
        status: "pending",
        fetchStatus: "idle",
        error: undefined,
      };

      const allEntities: D[] = Object.values(state.data);

      const filteredData =
        filterObj && filter ? filter(allEntities, filterObj) : allEntities;

      return {
        data: filteredData,
        query: state.queries[queryKey] || defaultQuery,
      };
    },
  };
}

export type Store<D, F extends Record<string, unknown> = {}> = ReturnType<
  typeof createStore<D, F>
>;
