import * as ts from "@tanstack/react-query";
import { ServiceOperationError } from "../bridge/bridge";
import { useBentoRuntime } from "../context/runtime";

export type QueryOptions = Omit<
  Parameters<typeof ts.useQuery>[0],
  "queryKey" | "queryFn"
> & {
  keepPreviousData?: boolean;
};

export function useQuery({
  service,
  query,
  args,
  options,
}: {
  service: string;
  query: string;
  args?: Record<string, any>;
  options?: QueryOptions;
}) {
  const { keepPreviousData, ...restOptions } = options ?? {};
  const runtime = useBentoRuntime();
  return ts.useQuery({
    ...restOptions,
    queryKey: [service, query, args],
    queryFn: async () => {
      const res = await runtime.runServiceOperation({
        service,
        operation: query,
        type: "query",
        args,
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
    placeholderData: keepPreviousData ? ts.keepPreviousData : undefined,
  });
}

export type InfiniteQueryOptions = Omit<
  Parameters<typeof ts.useInfiniteQuery>[0],
  "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
>;

export function useInfiniteQuery({
  service,
  query,
  args,
  initialPageParam,
  getNextPageParam,
  options,
}: {
  service: string;
  query: string;
  args?: Record<string, any>;
  initialPageParam: any;
  getNextPageParam: Parameters<typeof ts.useInfiniteQuery>[0]["getNextPageParam"];
  options?: InfiniteQueryOptions;
}) {
  const runtime = useBentoRuntime();
  return ts.useInfiniteQuery({
    ...options,
    initialPageParam,
    getNextPageParam,
    queryKey: [service, query, args],
    queryFn: async ({ pageParam }) => {
      const res = await runtime.runServiceOperation({
        service,
        operation: query,
        type: "query",
        args: {
          ...args,
          ...(pageParam && typeof pageParam === "object"
            ? pageParam
            : pageParam !== undefined
              ? { cursor: pageParam }
              : {}),
        },
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
  });
}

export type MutationOptions = Omit<
  Parameters<typeof ts.useMutation>[0],
  "mutationKey" | "mutationFn"
>;

export function useAction({
  service,
  action,
  args,
  options,
}: {
  service: string;
  action: string;
  args?: Record<string, any>;
  options?: MutationOptions;
}) {
  const runtime = useBentoRuntime();
  return ts.useMutation({
    ...options,
    mutationKey: [service, action],
    mutationFn: async (mArgs?: Record<string, any>) => {
      const res = await runtime.runServiceOperation({
        service,
        operation: action,
        type: "action",
        args: { ...args, ...mArgs },
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
  });
}
