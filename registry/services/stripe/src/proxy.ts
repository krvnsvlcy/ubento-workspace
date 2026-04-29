import { useMutation, useQuery, useQueryClient, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import Stripe from "stripe";

const QUERY_METHODS = ["list", "retrieve", "search"];

type QueryHook<Method> = Method extends (...args: infer Args) => Promise<infer Result>
  ? (...args: Args) => UseQueryResult<Result, Error>
  : never;

// Advanced type inference to handle different Stripe method signatures
type MutationHook<Method> = Method extends (id: string, params: infer Params, ...rest: any[]) => Promise<infer Result>
  ? () => UseMutationResult<Result, Error, { id: string; params: Params }>
  : Method extends (params: infer Params, ...rest: any[]) => Promise<infer Result>
  ? () => UseMutationResult<Result, Error, Params>
  : Method extends (...args: infer Args) => Promise<infer Result>
  ? () => UseMutationResult<Result, Error, Args>
  : never;

type ResourceHooks<T> = {
  [K in keyof T as K extends string ? `use${Capitalize<K>}` : never]: K extends "list" | "retrieve" | "search"
    ? QueryHook<T[K]>
    : MutationHook<T[K]>;
};

export type UbentoStripeResource<T> = T & ResourceHooks<T>;

export function createResourceProxy<T>(stripeParent: any, resourceName: string): UbentoStripeResource<T> {
  const resource = stripeParent[resourceName];
  if (!resource) return undefined as any;

  return new Proxy(resource, {
    get(target, prop: string) {
      if (prop.startsWith("use")) {
        const methodName = prop.slice(3).charAt(0).toLowerCase() + prop.slice(4);
        const originalMethod = target[methodName];

        if (typeof originalMethod !== "function") {
          return undefined;
        }

        // Return a hook function
        if (QUERY_METHODS.includes(methodName)) {
          return function (...args: any[]) {
            return useQuery({
              queryKey: ["stripe", resourceName, methodName, ...args],
              queryFn: () => originalMethod.apply(target, args),
              enabled: args.length === 0 || args[0] !== undefined, // Basic enabled logic
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
                // Check if it's the { id, params } signature
                if (args && typeof args === "object" && "id" in args && "params" in args && Object.keys(args).length === 2) {
                  return originalMethod.call(target, args.id, args.params);
                }
                return originalMethod.call(target, args);
              },
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["stripe", resourceName] });
              },
            });
          };
        }
      }

      // Fallback to original method
      const value = target[prop];
      if (typeof value === "function") {
        return value.bind(target);
      }
      return value;
    }
  }) as UbentoStripeResource<T>;
}
