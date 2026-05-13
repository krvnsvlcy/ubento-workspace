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

export type QueryState<T, Params> = State<
  DataStateValue<T> & { params?: Params }
>;
export type ActionState<T, Params> = State<
  DataStateValue<T> & { params?: Params }
>;

export type StoreEntryState =
  | QueryState<unknown, unknown>
  | ActionState<unknown, unknown>;

export type Service = {
  runQuery: <T, Params>({
    query,
    params,
  }: {
    query: string;
    params: Params;
  }) => Promise<T>;
  runAction: <T, Params>({
    action,
    params,
  }: {
    action: string;
    params: Params;
  }) => Promise<T>;
};

export type ServiceStoreState = {
  services: Record<string, Service>;
};

export const fallbackService: Service = {
  runQuery: async () => {
    throw new Error("Service not found");
  },
  runAction: async () => {
    throw new Error("Service not found");
  },
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
