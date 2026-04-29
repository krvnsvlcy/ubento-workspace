import { useMutation, useQuery, useQueryClient, UseQueryResult, UseMutationResult } from "@tanstack/react-query";

const QUERY_METHODS = ["list", "get", "retrieve", "search"];

type QueryHook<Method> = Method extends (...args: infer Args) => Promise<infer Result>
  ? (...args: Args) => UseQueryResult<Result, Error>
  : never;

type MutationHook<Method> = Method extends (id: string | number, params: infer Params, ...rest: any[]) => Promise<infer Result>
  ? () => UseMutationResult<Result, Error, { id: string | number; params: Params }>
  : Method extends (params: infer Params, ...rest: any[]) => Promise<infer Result>
  ? () => UseMutationResult<Result, Error, Params>
  : Method extends (...args: infer Args) => Promise<infer Result>
  ? () => UseMutationResult<Result, Error, Args>
  : never;

type ResourceHooks<T> = {
  [K in keyof T as K extends string ? `use${Capitalize<K>}` : never]: K extends "list" | "get" | "retrieve" | "search"
    ? QueryHook<T[K]>
    : MutationHook<T[K]>;
};

export type UbentoResource<T> = T & ResourceHooks<T>;

export function createResourceProxy<T>(serviceName: string, parent: any, resourceName: string): UbentoResource<T> {
  const resource = parent[resourceName];
  if (!resource) return undefined as any;

  return new Proxy(resource, {
    get(target, prop: string) {
      if (prop.startsWith("use")) {
        const methodName = prop.slice(3).charAt(0).toLowerCase() + prop.slice(4);
        const originalMethod = target[methodName];

        if (typeof originalMethod !== "function") {
          return undefined;
        }

        if (QUERY_METHODS.includes(methodName)) {
          return function (...args: any[]) {
            return useQuery({
              queryKey: [serviceName, resourceName, methodName, ...args],
              queryFn: () => originalMethod.apply(target, args),
              enabled: args.length === 0 || args[0] !== undefined,
            });
          };
        } else {
          return function () {
            const queryClient = useQueryClient();
            return useMutation({
              mutationFn: (args: any) => {
                if (Array.isArray(args)) {
                  return originalMethod.apply(target, args);
                }
                if (args && typeof args === "object" && "id" in args && "params" in args && Object.keys(args).length === 2) {
                  return originalMethod.call(target, args.id, args.params);
                }
                return originalMethod.call(target, args);
              },
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [serviceName, resourceName] });
              },
            });
          };
        }
      }

      const value = target[prop];
      if (typeof value === "function") {
        return value.bind(target);
      }
      return value;
    }
  }) as UbentoResource<T>;
}
