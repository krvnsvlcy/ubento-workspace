export const ubentoDeclaration = `
declare module "ubento" {
  import { UseQueryResult, UseInfiniteQueryResult, UseMutationResult } from "@tanstack/react-query";

  export interface BentoLocation {
    boardId: string;
    params: Record<string, string>;
  }

  export interface QueryOptions {
    keepPreviousData?: boolean;
    enabled?: boolean;
    retry?: boolean | number | ((failureCount: number, error: any) => boolean);
    staleTime?: number;
    refetchOnWindowFocus?: boolean | "always";
    refetchOnMount?: boolean | "always";
    refetchOnReconnect?: boolean | "always";
    refetchInterval?: number | false | ((data: any | undefined, query: any) => number | false);
  }

  export interface InfiniteQueryOptions {
    enabled?: boolean;
    retry?: boolean | number | ((failureCount: number, error: any) => boolean);
    staleTime?: number;
    refetchOnWindowFocus?: boolean | "always";
    refetchOnMount?: boolean | "always";
    refetchOnReconnect?: boolean | "always";
    refetchInterval?: number | false | ((data: any | undefined, query: any) => number | false);
  }

  export interface MutationOptions {
    onSuccess?: (data: any, variables: any, context: any) => Promise<unknown> | unknown;
    onError?: (error: any, variables: any, context: any) => Promise<unknown> | unknown;
    onSettled?: (data: any | undefined, error: any | null, variables: any, context: any) => Promise<unknown> | unknown;
    onMutate?: (variables: any) => Promise<unknown> | unknown;
    retry?: boolean | number | ((failureCount: number, error: any) => boolean);
  }
  export interface UbentoServices {}

  type ServiceQueryArgs<S extends string, Q extends string> =
    S extends keyof UbentoServices
      ? Q extends keyof UbentoServices[S]["queries"]
        ? UbentoServices[S]["queries"][Q]["args"]
        : Record<string, any>
      : Record<string, any>;

  type ServiceQueryResult<S extends string, Q extends string> =
    S extends keyof UbentoServices
      ? Q extends keyof UbentoServices[S]["queries"]
        ? UbentoServices[S]["queries"][Q]["result"]
        : any
      : any;

  type ServiceActionArgs<S extends string, A extends string> =
    S extends keyof UbentoServices
      ? A extends keyof UbentoServices[S]["actions"]
        ? UbentoServices[S]["actions"][A]["args"]
        : Record<string, any>
      : Record<string, any>;

  type ServiceActionResult<S extends string, A extends string> =
    S extends keyof UbentoServices
      ? A extends keyof UbentoServices[S]["actions"]
        ? UbentoServices[S]["actions"][A]["result"]
        : any
      : any;

  export function useQuery<
    TService extends string,
    TQuery extends string,
  >(args: {
    service: TService | keyof UbentoServices;
    query: TQuery | (TService extends keyof UbentoServices ? keyof UbentoServices[TService]["queries"] : string);
    args?: ServiceQueryArgs<TService, TQuery>;
    options?: QueryOptions;
  }): UseQueryResult<ServiceQueryResult<TService, TQuery>>;

  export function useInfiniteQuery<
    TService extends string,
    TQuery extends string,
  >(args: {
    service: TService | keyof UbentoServices;
    query: TQuery | (TService extends keyof UbentoServices ? keyof UbentoServices[TService]["queries"] : string);
    args?: ServiceQueryArgs<TService, TQuery>;
    initialPageParam: any;
    getNextPageParam: (lastPage: any, allPages: any[]) => any;
    options?: InfiniteQueryOptions;
  }): UseInfiniteQueryResult<ServiceQueryResult<TService, TQuery>>;

  export function useAction<
    TService extends string,
    TAction extends string,
  >(args: {
    service: TService | keyof UbentoServices;
    action: TAction | (TService extends keyof UbentoServices ? keyof UbentoServices[TService]["actions"] : string);
    args?: ServiceActionArgs<TService, TAction>;
    options?: MutationOptions;
  }): UseMutationResult<
    ServiceActionResult<TService, TAction>,
    any,
    ServiceActionArgs<TService, TAction>
  >;

  export function useLocation(): BentoLocation | undefined;

  export function useNavigation(): {
    goToBoard: (boardId: string, params?: Record<string, string>) => void;
    goHome: () => void;
  };

  export function useParams(): Record<string, string>;
}
`;

