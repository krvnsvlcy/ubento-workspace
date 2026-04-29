import { useEffect, useMemo, useRef } from "react";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { getEntitiesQueryKey, Store } from "./store.js";

export type UseStoreOptions = {
  enabled?: boolean;
};

/**
 * Subscribes to a single entity.
 * Exposes a TanStack Query-compatible API.
 */
export function useStoreEntity<D>(
  store: Store<D>,
  key: string,
  options: UseStoreOptions = {},
) {
  const { enabled = true } = options;
  const cacheKey = `item:${key}`;

  // 1. Garbage Collection Lifecycle
  useEffect(() => {
    store.retain(cacheKey);
    return () => store.release(cacheKey);
  }, [store, cacheKey]);

  // 2. Auto-Fetch Lifecycle (Stale-While-Revalidate)
  useEffect(() => {
    if (enabled) {
      store.fetch(key);
    }
  }, [store, key, enabled]);

  // 3. Strict Subscription
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

  // 4. TanStack Query Adapter
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
 * Subscribes to a filtered list of entities.
 * Exposes a TanStack Query-compatible API.
 */
export function useStoreEntities<D, F extends Record<string, unknown>>(
  store: Store<D, F>,
  filterObj?: F,
  options: UseStoreOptions = {},
) {
  const { enabled = true } = options;
  const queryKey = useMemo(() => getEntitiesQueryKey(filterObj), [filterObj]);

  const filterRef = useRef(filterObj);
  useEffect(() => {
    filterRef.current = filterObj;
  }, [filterObj]);

  // 1. Garbage Collection Lifecycle
  useEffect(() => {
    store.retain(queryKey);
    return () => store.release(queryKey);
  }, [store, queryKey]);

  // 2. Auto-Fetch Lifecycle (Stale-While-Revalidate)
  useEffect(() => {
    if (enabled) {
      store.fetchMany(filterRef.current);
    }
  }, [store, queryKey, enabled]);

  // 3. Query Metadata & Projection Subscription
  const result = useStoreWithEqualityFn(
    store.store,
    (state) => store.selectManyEntities(state, filterObj),
    (oldQ, newQ) =>
      oldQ.query.status === newQ.query.status &&
      oldQ.query.fetchStatus === newQ.query.fetchStatus &&
      oldQ.query.page === newQ.query.page,
  );

  // 4. TanStack Query Adapter
  const { data, query } = result;
  const { status, fetchStatus, error, page } = query;

  return {
    data,
    page, // Preserve your custom pagination metadata
    status,
    fetchStatus,
    error,
    isPending: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
    isFetching: fetchStatus === "fetching",
    isLoading: status === "pending" && fetchStatus === "fetching",
    refetch: () => store.fetchMany(filterRef.current),
  };
}
