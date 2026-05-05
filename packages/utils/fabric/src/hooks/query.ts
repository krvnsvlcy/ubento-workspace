import { useCallback, useEffect, useRef, useState } from "react";

export type QueryStatus = "pending" | "success" | "error";
export type FetchStatus = "fetching" | "idle";

export interface UseQueryOptions<TData, TError = Error> {
  queryKey: unknown[];
  queryFn: () => Promise<TData>;
  enabled?: boolean;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  onSettled?: (data: TData | undefined, error: TError | null) => void;
}

export function useQuery<TData = unknown, TError = Error>(
  options: UseQueryOptions<TData, TError>,
) {
  const { queryKey, queryFn, enabled = true } = options;

  const [status, setStatus] = useState<QueryStatus>("pending");
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("idle");
  const [data, setData] = useState<TData | undefined>(undefined);
  const [error, setError] = useState<TError | null>(null);

  // Keep options in a ref to avoid infinite re-renders if inline functions are passed
  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  // Prevent race conditions: keeps track of the latest fetch request
  const fetchIdRef = useRef(0);

  // Stringify the queryKey so React can safely diff it in the dependency array
  const queryKeyHash = JSON.stringify(queryKey);

  const refetch = useCallback(async () => {
    const fetchId = ++fetchIdRef.current;

    setFetchStatus("fetching");
    setError(null);

    // Only revert to "pending" if we don't already have successful data.
    // This allows for background refetching without clearing the UI.
    setStatus((prevStatus) =>
      prevStatus === "success" ? "success" : "pending",
    );

    const currentOptions = optionsRef.current;

    try {
      const result = await currentOptions.queryFn();

      // If a newer fetch was triggered while this one was resolving, ignore this result
      if (fetchId !== fetchIdRef.current) return;

      setData(result);
      setStatus("success");

      if (currentOptions.onSuccess) currentOptions.onSuccess(result);
      if (currentOptions.onSettled) currentOptions.onSettled(result, null);

      return result;
    } catch (err) {
      // Ignore errors from stale requests
      if (fetchId !== fetchIdRef.current) return;

      const castedError = err as TError;
      setError(castedError);
      setStatus("error");

      if (currentOptions.onError) currentOptions.onError(castedError);
      if (currentOptions.onSettled)
        currentOptions.onSettled(undefined, castedError);
    } finally {
      // Only set idle if this is still the active request
      if (fetchId === fetchIdRef.current) {
        setFetchStatus("idle");
      }
    }
  }, []); // No dependencies needed thanks to refs and functional state updates

  useEffect(() => {
    if (enabled) {
      refetch().catch(() => {
        // Errors are caught and handled internally, this prevents unhandled promise warnings
      });
    }
  }, [queryKeyHash, enabled, refetch]);

  return {
    data,
    error,
    status,
    fetchStatus,
    isPending: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
    isFetching: fetchStatus === "fetching",
    // isLoading is only true during the FIRST fetch (no data yet)
    isLoading: status === "pending" && fetchStatus === "fetching",
    refetch,
  };
}
