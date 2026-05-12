import { createZustandStateController } from "@ubento/workspace.primitives";
import { createStore as createZustandStore } from "zustand";
import { State } from "./state";

export type DataStatus = "pending" | "ready" | "error";
export type DataFetchStatus = "idle" | "running" | "success" | "error";
export type DataStateValue<T> = {
  data: T;
  status: DataStatus;
  fetchStatus: DataFetchStatus;
  error?: unknown;
};

export type EntityState<T = unknown> = State<DataStateValue<T>>;
export type EntityListState<T, Params> = State<
  DataStateValue<T[]> & { params?: Params }
>;
export type PagedEntityListState<T, Params> = State<
  DataStateValue<T[]> & {
    params?: Params;
    pageIndex: number; // 0 based index
    pageSize: number;
    itemCount: number;
  }
>;
export type InfiniteEntityListState<T, Params> = State<
  DataStateValue<T[]> & {
    params?: Params;
    hasMore: boolean;
  }
>;
export type QueryState<T, Params> = State<
  DataStateValue<T> & { params?: Params }
>;
export type ActionState<T, Params> = State<
  DataStateValue<T> & { params?: Params }
>;

export type StoreEntryState =
  | EntityState<unknown>
  | EntityListState<unknown, unknown>
  | PagedEntityListState<unknown, unknown>
  | InfiniteEntityListState<unknown, unknown>
  | QueryState<unknown, unknown>
  | ActionState<unknown, unknown>;

export type Service = {
  entity: <T>(params: {
    entity: string;
    id: string;
    enabled?: boolean;
  }) => EntityState<T>;
  entityList: <T, Params>(params: {
    entity: string;
    params: Params;
  }) => EntityListState<T, Params>;
  pagedEntityList: <T, Params>(params: {
    entity: string;
    params: Params;
    pageIndex?: number;
    pageSize?: number;
  }) => PagedEntityListState<T, Params>;
  infiniteEntityList: <T, Params>({
    entity,
    params,
  }: {
    entity: string;
    params: Params;
  }) => InfiniteEntityListState<T, Params>;
  query: <T, Params>({
    query,
    params,
  }: {
    query: string;
    params: Params;
  }) => QueryState<T, Params>;
  action: <T, Params>({
    action,
    params,
  }: {
    action: string;
    params: Params;
  }) => ActionState<T, Params>;
};

export type ServiceStoreState = {
  services: Record<string, Service>;
};

export const fallbackService: Service = {
  entity: () => ({
    state: {
      getSnapshot: () => ({
        data: undefined as any,
        status: "error",
        fetchStatus: "idle",
        error: new Error("Service not found"),
      }),
      subscribe: () => () => {},
    },
    fetch: () => {},
  }),
  entityList: () => ({
    state: {
      getSnapshot: () => ({
        data: [],
        params: undefined,
        status: "error",
        fetchStatus: "idle",
        error: new Error("Service not found"),
      }),
      subscribe: () => () => {},
    },
    fetch: () => {},
  }),
  pagedEntityList: () => ({
    state: {
      getSnapshot: () => ({
        data: [],
        params: undefined,
        status: "error",
        fetchStatus: "idle",
        error: new Error("Service not found"),
        pageNumber: 1,
        pageSize: 10,
        itemCount: 0,
      }),
      subscribe: () => () => {},
    },
    nextPage: () => {},
    prevPage: () => {},
  }),
  infiniteEntityList: () => ({
    state: {
      getSnapshot: () => ({
        data: [],
        params: undefined,
        status: "error",
        fetchStatus: "idle",
        error: new Error("Service not found"),
        hasMore: false,
      }),
      subscribe: () => () => {},
    },
    fetchMore: () => {},
  }),
  query: () => ({
    state: {
      getSnapshot: () => ({
        data: undefined,
        params: undefined,
        status: "error",
        fetchStatus: "idle",
        error: new Error("Service not found"),
      }),
      subscribe: () => () => {},
    },
    fetch: () => {},
  }),
  action: () => ({
    state: {
      getSnapshot: () => ({
        data: undefined,
        params: undefined,
        status: "error",
        fetchStatus: "idle",
        error: new Error("Service not found"),
      }),
      subscribe: () => () => {},
    },
    fetch: () => {},
  }),
};

export function createServiceStore(initialState?: Partial<ServiceStoreState>) {
  const store = createZustandStore<ServiceStoreState>()(() => ({
    services: {},
    ...initialState,
  }));

  const controller = createZustandStateController(store);

  return {
    ...controller,
    addService: (name: string, service: Service) => {
      controller.setState((state) => ({
        ...state,
        services: {
          ...state.services,
          [name]: service,
        },
      }));
    },
    removeService: (name: string) => {
      controller.setState((state) => {
        const nextState = { ...state, services: { ...state.services } };
        delete nextState.services[name];
        return nextState;
      });
    },
  };
}

export type ServiceStore = ReturnType<typeof createServiceStore>;
