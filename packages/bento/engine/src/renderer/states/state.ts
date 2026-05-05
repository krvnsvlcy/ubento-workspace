import { createStore } from "zustand";
import { StateSpec } from "../../spec/state";

export type DataStatus = "pending" | "ready" | "error";
export type DataFetchStatus = "idle" | "running" | "success" | "error";

export type EntityState<T> = {
  data?: T;
  status: DataStatus;
  fetchStatus: DataFetchStatus;
  error?: Error;
  isFetching: boolean;
  isError: boolean;
  fetch: () => Promise<T>;
};
export type EntityListState<T, Params> = {
  data?: T[];
  params?: Params;
  status: DataStatus;
  fetchStatus: DataFetchStatus;
  error?: Error;
  isFetching: boolean;
  isError: boolean;
  fetch: () => Promise<T[]>;
};
export type PagedEntityListState<T, Params> = {
  data?: T[];
  params?: Params;
  status: DataStatus;
  fetchStatus: DataFetchStatus;
  error?: Error;
  isFetching: boolean;
  isError: boolean;
  // page info
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  itemCount: number;
  // navigation
  hasPrevPage: boolean;
  hasNextPage: boolean;
  nextPage: () => void;
  prevPage: () => void;
};
export type InfiniteEntityListState<T, Params> = {
  data?: T[];
  params?: Params;
  status: DataStatus;
  fetchStatus: DataFetchStatus;
  error?: Error;
  isFetching: boolean;
  isError: boolean;
  // page info
  hasMore: boolean;
  fetchMore: () => void;
};

export type StateBuilderContext = {};

export function buildBoardState({
  init = {},
  spec,
  context,
}: {
  init?: Record<string, unknown>;
  spec: StateSpec;
  context: StateBuilderContext;
}) {
  let initialState: any = {};

  for (const [name, entry] of Object.entries(spec)) {
    switch (entry.type) {
      case "string":
        initialState[name] = "";
        break;
      case "number":
        initialState[name] = 0;
        break;
      case "boolean":
        initialState[name] = false;
        break;
      case "array":
        initialState[name] = [];
        break;
      case "object":
        initialState[name] = {};
      case "entity":
        break;
      case "entity-list":
        initialState[name] = [];
        break;
      case "set":
        break;
      case "map":
        break;
      case "ref":
        break;
    }
  }

  const store = createStore()(() => initialState);
}
