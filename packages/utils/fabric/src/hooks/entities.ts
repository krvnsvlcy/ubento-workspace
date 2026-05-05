import { useEffect, useMemo, useRef } from "react";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { FetchOptions, getEntityProjectionQueryKey, Store } from "../store.js";

export type UseStoreOptions = FetchOptions & {
  enabled?: boolean;
};

/**
 * Subscribes to a single entity.
 * Exposes a TanStack Query-compatible API.
 */
export function useStoreEntity<D, J, P>(
  store: Store<D, J, P>,
  key: string,
  options: UseStoreOptions = {},
) {
  const { enabled = true, fetchPolicy = "cache-first" } = options;
  const cacheKey = `item:${key}`;

  useEffect(() => {
    store.retain(cacheKey);
    return () => store.release(cacheKey);
  }, [store, cacheKey]);

  useEffect(() => {
    if (enabled) {
      store.fetch(key, { fetchPolicy });
    }
  }, [store, key, enabled, fetchPolicy]);

  const entity = useStoreWithEqualityFn(
    store.store,
    (state) => store.selectEntity(key, state),
    (oldVal, newVal) => {
      return (
        oldVal.data === newVal.data &&
        oldVal.query.status === newVal.query.status &&
        oldVal.query.fetchStatus === newVal.query.fetchStatus
      );
    },
  );

  const { data, query } = entity;
  const { status, fetchStatus, error } = query;

  return {
    data,
    status,
    fetchStatus,
    error,
    isPending: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
    isFetching: fetchStatus === "fetching",
    isLoading: status === "pending" && fetchStatus === "fetching",
    refetch: () => store.fetch(key),
  };
}

/**
 * Subscribes to a projected list of entities.
 * Exposes a TanStack Query-compatible API.
 */
export function useStoreEntities<D, J, P>(
  store: Store<D, J, P>,
  params?: J,
  options: UseStoreOptions = {},
) {
  const { enabled = true, fetchPolicy = "cache-first" } = options;
  const queryKey = useMemo(() => getEntityProjectionQueryKey(params), [params]);

  const paramsRef = useRef(params);
  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  useEffect(() => {
    store.retain(queryKey);
    return () => store.release(queryKey);
  }, [store, queryKey]);

  useEffect(() => {
    if (enabled) {
      store.fetchMany({
        params: paramsRef.current,
        fetchPolicy,
      });
    }
  }, [store, queryKey, enabled, fetchPolicy]);

  const result = useStoreWithEqualityFn(
    store.store,
    (state) => store.selectManyEntities(state, params),
    (oldVal, newVal) => {
      // 1. Check Query Metadata Equality
      if (
        oldVal.query.status !== newVal.query.status ||
        oldVal.query.fetchStatus !== newVal.query.fetchStatus ||
        oldVal.query.nextPage !== newVal.query.nextPage ||
        oldVal.query.previousPage !== newVal.query.previousPage
      ) {
        return false;
      }

      // 2. Check Projected Data Array Equality
      const oldData = oldVal.data;
      const newData = newVal.data;
      if (oldData.length !== newData.length) return false;
      return oldData.every((item, index) => item === newData[index]);
    },
  );

  const { data, query } = result;
  const { status, fetchStatus, error, nextPage, previousPage } = query;

  return {
    data,
    nextPage,
    previousPage,
    status,
    fetchStatus,
    error,
    isPending: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
    isFetching: fetchStatus === "fetching",
    isLoading: status === "pending" && fetchStatus === "fetching",
    refetch: () =>
      store.fetchMany({
        params: paramsRef.current,
        fetchPolicy,
      }),
    // Helper to fetch the next page seamlessly
    fetchNextPage: () => {
      if (nextPage) {
        store.fetchMany({
          params: paramsRef.current,
          page: nextPage as P,
          fetchPolicy,
        });
      }
    },
  };
}
