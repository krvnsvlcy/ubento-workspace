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

  export function httpQueryOptions<
    TService extends string,
    TQuery extends string,
  >(args: {
    service: TService | keyof UbentoServices;
    query: TQuery | (TService extends keyof UbentoServices ? keyof UbentoServices[TService]["queries"] : string);
    args?: ServiceQueryArgs<TService, TQuery>;
    options?: any;
  }): any;

  export function httpInfiniteQueryOptions<
    TService extends string,
    TQuery extends string,
  >(args: {
    service: TService | keyof UbentoServices;
    query: TQuery | (TService extends keyof UbentoServices ? keyof UbentoServices[TService]["queries"] : string);
    args?: ServiceQueryArgs<TService, TQuery>;
    initialPageParam: any;
    getNextPageParam: (lastPage: any, allPages: any[]) => any;
    options?: any;
  }): any;

  export function useHttpMutation<
    TService extends string,
    TAction extends string,
  >(args: {
    service: TService | keyof UbentoServices;
    action: TAction | (TService extends keyof UbentoServices ? keyof UbentoServices[TService]["actions"] : string);
    args?: ServiceActionArgs<TService, TAction>;
    options?: any;
  }): UseMutationResult<
    ServiceActionResult<TService, TAction>,
    any,
    ServiceActionArgs<TService, TAction>
  >;

  export function mongodbFindQueryOptions<
    TService extends keyof UbentoServices,
    TCollection extends keyof UbentoServices[TService]["collections"] & string,
  >(args: {
    service: TService;
    collection: TCollection;
    filter?: any;
    projection?: any;
    sort?: any;
    limit?: number;
    skip?: number;
    options?: any;
  }): any;

  export function mongodbFindOneQueryOptions<
    TService extends keyof UbentoServices,
    TCollection extends keyof UbentoServices[TService]["collections"] & string,
  >(args: {
    service: TService;
    collection: TCollection;
    filter?: any;
    projection?: any;
    options?: any;
  }): any;

  export function mongodbCountDocumentsQueryOptions<
    TService extends keyof UbentoServices,
    TCollection extends keyof UbentoServices[TService]["collections"] & string,
  >(args: {
    service: TService;
    collection: TCollection;
    filter?: any;
    options?: any;
  }): any;

  export function mongodbAggregateQueryOptions<
    TService extends keyof UbentoServices,
    TCollection extends keyof UbentoServices[TService]["collections"] & string,
  >(args: {
    service: TService;
    collection: TCollection;
    pipeline: any[];
    options?: any;
  }): any;

  export function mongodbListCollectionsQueryOptions<
    TService extends keyof UbentoServices,
  >(args: {
    service: TService;
    options?: any;
  }): any;

  export function mongodbListDatabasesQueryOptions<
    TService extends keyof UbentoServices,
  >(args: {
    service: TService;
    options?: any;
  }): any;

  export function mongodbExtractCollectionSchemaQueryOptions<
    TService extends keyof UbentoServices,
    TCollection extends keyof UbentoServices[TService]["collections"] & string,
  >(args: {
    service: TService;
    collection: TCollection;
    sampleSize?: number;
    options?: any;
  }): any;

  export function mongodbExtractDbSchemaQueryOptions<
    TService extends keyof UbentoServices,
  >(args: {
    service: TService;
    sampleSize?: number;
    options?: any;
  }): any;

  export function mongodbInsertOneMutationOptions<
    TService extends keyof UbentoServices,
    TCollection extends keyof UbentoServices[TService]["collections"] & string,
  >(args: {
    service: TService;
    collection: TCollection;
    options?: any;
  }): any;

  export function mongodbInsertManyMutationOptions<
    TService extends keyof UbentoServices,
    TCollection extends keyof UbentoServices[TService]["collections"] & string,
  >(args: {
    service: TService;
    collection: TCollection;
    options?: any;
  }): any;

  export function mongodbUpdateOneMutationOptions<
    TService extends keyof UbentoServices,
    TCollection extends keyof UbentoServices[TService]["collections"] & string,
  >(args: {
    service: TService;
    collection: TCollection;
    options?: any;
  }): any;

  export function mongodbUpdateManyMutationOptions<
    TService extends keyof UbentoServices,
    TCollection extends keyof UbentoServices[TService]["collections"] & string,
  >(args: {
    service: TService;
    collection: TCollection;
    options?: any;
  }): any;

  export function mongodbDeleteOneMutationOptions<
    TService extends keyof UbentoServices,
    TCollection extends keyof UbentoServices[TService]["collections"] & string,
  >(args: {
    service: TService;
    collection: TCollection;
    options?: any;
  }): any;

  export function mongodbDeleteManyMutationOptions<
    TService extends keyof UbentoServices,
    TCollection extends keyof UbentoServices[TService]["collections"] & string,
  >(args: {
    service: TService;
    collection: TCollection;
    options?: any;
  }): any;

  export function mongodbFindOneAndUpdateMutationOptions<
    TService extends keyof UbentoServices,
    TCollection extends keyof UbentoServices[TService]["collections"] & string,
  >(args: {
    service: TService;
    collection: TCollection;
    options?: any;
  }): any;

  export function useLocation(): BentoLocation | undefined;

  export function useNavigation(): {
    goToBoard: (boardId: string, params?: Record<string, string>) => void;
    goHome: () => void;
  };

  export function useParams(): Record<string, string>;
}
`;

