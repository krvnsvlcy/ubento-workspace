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
