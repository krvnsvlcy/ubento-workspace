import * as ts from "@tanstack/react-query";
import { ServiceOperationError } from "../bridge/bridge";
import { useBentoRuntime } from "../context/runtime";

export function useQuery({
  service,
  query,
  params,
}: {
  service: string;
  query: string;
  params?: Record<string, any>;
  initialData?: any;
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
}) {
  const runtime = useBentoRuntime();
  return ts.useQuery({
    queryKey: [service, query, params],
    queryFn: async () => {
      const res = await runtime.runServiceOperation({
        service,
        operation: query,
        type: "query",
        args: params,
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
  });
}

export function useAction({
  service,
  action,
  params,
}: {
  service: string;
  action: string;
  params?: Record<string, any>;
  initialData?: any;
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
}) {
  const runtime = useBentoRuntime();
  return ts.useMutation({
    mutationKey: [service, action],
    mutationFn: async (variables?: Record<string, any>) => {
      const res = await runtime.runServiceOperation({
        service,
        operation: action,
        type: "action",
        args: { ...params, ...variables },
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
  });
}
