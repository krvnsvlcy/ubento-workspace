import { useEffect, useState, useMemo } from "react";
import { useMutation } from "@ubento/fabric";

const QUERY_METHODS = ["list", "get", "retrieve", "search"];

export type QueryHook<Method> = Method extends (...args: infer Args) => Promise<infer Result>
  ? (...args: Args) => { data: Result | null; loading: boolean; error: Error | null; refetch: () => void }
  : never;

export type MutationHook<Method> = Method extends (id: string | number, params: infer Params, ...rest: any[]) => Promise<infer Result>
  ? () => { mutate: (args: { id: string | number; params: Params }) => void; mutateAsync: (args: { id: string | number; params: Params }) => Promise<Result>; status: string; isPending: boolean; isSuccess: boolean; isError: boolean; error: Error | null }
  : Method extends (params: infer Params, ...rest: any[]) => Promise<infer Result>
  ? () => { mutate: (params: Params) => void; mutateAsync: (params: Params) => Promise<Result>; status: string; isPending: boolean; isSuccess: boolean; isError: boolean; error: Error | null }
  : Method extends (...args: infer Args) => Promise<infer Result>
  ? () => { mutate: (args: Args) => void; mutateAsync: (args: Args) => Promise<Result>; status: string; isPending: boolean; isSuccess: boolean; isError: boolean; error: Error | null }
  : never;

export type ResourceHooks<T> = {
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
            const [data, setData] = useState<any>(null);
            const [loading, setLoading] = useState(false);
            const [error, setError] = useState<Error | null>(null);

            const refetch = useMemo(() => {
              return async () => {
                setLoading(true);
                setError(null);
                try {
                  const res = await originalMethod.apply(target, args);
                  setData(res);
                } catch (err: any) {
                  setError(err);
                } finally {
                  setLoading(false);
                }
              };
            }, [args]);

            useEffect(() => {
              const enabled = args.length === 0 || args[0] !== undefined;
              if (enabled) {
                refetch();
              }
            }, [refetch]);

            return { data, loading, error, refetch };
          } as any;
        } else {
          return function () {
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
            });
          } as any;
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

