import * as ts from "@tanstack/react-query";
import { ServiceOperationError } from "../../bridge/bridge";
import { useBentoRuntime } from "../../context/runtime";
import { BentoRuntime } from "../../runtime/runtime";
import { InfiniteQueryOptions, MutationOptions } from "./types";

export function httpQueryOptions({
  service,
  query,
  args,
  options,
}: {
  service: string;
  query: string;
  args?: Record<string, any>;
  options?: ts.QueryOptions;
}) {
  return ts.queryOptions({
    ...options,
    queryKey: [service, query, args],
    queryFn: async ({ meta }) => {
      const runtime = meta!.runtime as BentoRuntime;
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
  });
}

export function httpInfiniteQueryOptions({
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
  getNextPageParam: Parameters<
    typeof ts.infiniteQueryOptions
  >[0]["getNextPageParam"];
  options?: InfiniteQueryOptions;
}) {
  return ts.infiniteQueryOptions({
    ...options,
    initialPageParam,
    getNextPageParam,
    queryKey: [service, query, args],
    queryFn: async ({ pageParam, meta }) => {
      const runtime = meta!.runtime as BentoRuntime;
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

export function useHttpMutation({
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
