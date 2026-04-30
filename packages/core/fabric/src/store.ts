import { createStore as createZustandStore } from "zustand/vanilla";

// --- STATE TYPES ---

export type AsyncDataStatus = "pending" | "error" | "success";
export type AsyncDataFetchStatus = "idle" | "fetching";

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

// Notice: usage is strictly removed from the reactive tree
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
  fetchMany,
  project,
  gcTime = 1000 * 60 * 5, // Default GC time: 5 minutes
}: {
  namespace: string;
  getKey: (entity: D) => string;
  fetchOne: (key: string) => Promise<D>;
  fetchMany: (options: { params?: J; page?: P }) => Promise<{
    data: D[];
    previousPage?: P;
    nextPage?: P;
  }>;
  // project runs even if params are undefined to establish default sorting
  project?: (entities: D[], params?: J) => D[];
  gcTime?: number;
}) {
  // 1. The Reactive State (Triggers React renders)
  const store = createZustandStore<StoreState<D, P>>(() => ({
    data: {},
    queries: {},
  }));

  const get = store.getState;
  const set = store.setState;

  // 2. The Shadow State (Invisible to React, handles Garbage Collection)
  const usageTracker = new Map<string, Usage>();
  const gcTimers = new Map<string, NodeJS.Timeout>();

  return {
    namespace,
    store, // Expose raw vanilla store for React hooks

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

    fetchMany: async (params?: J, page?: P) => {
      const queryKey = getEntityProjectionQueryKey(params);

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
        const { data, nextPage, previousPage } = await fetchMany({
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
                status:
                  existingQuery.status === "success" ? "success" : "error",
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

      // Execute projection even if params are missing to ensure default sorting
      const projectedData = project
        ? project(allEntities, params)
        : allEntities;

      return {
        data: projectedData,
        query: state.queries[queryKey] || defaultQuery,
      };
    },
  };
}

// Extract the inferred type to avoid manual interface maintenance
export type Store<
  D,
  J extends Record<string, unknown> = {},
  P extends Record<string, unknown> = {},
> = ReturnType<typeof createStore<D, J, P>>;
