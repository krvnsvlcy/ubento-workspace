import { createContext, useContext } from "react";
import {
  ActionState,
  EntityListState,
  EntityState,
  InfiniteEntityListState,
  PagedEntityListState,
  QueryState,
} from "../../environment/service";
import { State, StateValue } from "../../environment/state";
import { BoardSpec } from "../../spec/board";

export type EntityStoreEntryStateType = StateValue<EntityState["state"]> &
  Omit<EntityState, "state"> & {
    isLoading: boolean;
    isError: boolean;
  };

export type EntityListStoreEntryStateType = StateValue<
  EntityListState<unknown, unknown>["state"]
> &
  Omit<EntityListState<unknown, unknown>, "state"> & {
    isLoading: boolean;
    isError: boolean;
  };

export type PagedEntityListStoreEntryStateType = StateValue<
  PagedEntityListState<unknown, unknown>["state"]
> &
  Omit<PagedEntityListState<unknown, unknown>, "state"> & {
    isLoading: boolean;
    isError: boolean;
    pageCount: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };

export type InfiniteEntityListStoreEntryStateType = StateValue<
  InfiniteEntityListState<unknown, unknown>["state"]
> &
  Omit<InfiniteEntityListState<unknown, unknown>, "state"> & {
    isLoading: boolean;
    isError: boolean;
  };

export type QueryStoreEntryStateType = StateValue<
  QueryState<unknown, unknown>["state"]
> &
  Omit<QueryState<unknown, unknown>, "state"> & {
    isLoading: boolean;
    isError: boolean;
  };

export type ActionStoreEntryStateType = StateValue<
  ActionState<unknown, unknown>["state"]
> &
  Omit<ActionState<unknown, unknown>, "state"> & {
    isLoading: boolean;
    isError: boolean;
  };

export type StoreEntryStateType =
  | EntityStoreEntryStateType
  | EntityListStoreEntryStateType
  | PagedEntityListStoreEntryStateType
  | InfiniteEntityListStoreEntryStateType
  | QueryStoreEntryStateType
  | ActionStoreEntryStateType;

export type BoardStateType = {
  session: SessionApi;
  params: Record<string, unknown>;
  state: Record<string, unknown>;
  store: Record<string, StoreEntryStateType>;
  workspace: {
    state: Record<string, unknown>;
    api: WorkspaceApi;
  };
};

export type SessionApi = {
  user: { id: string; name: string; email: string; picture: string };
  team: { id: string; name: string; picture: string };
};

export type WorkspaceApi = {
  goTo: (args: { boardId: string; params?: Record<string, unknown> }) => void;
  notify: (args: {
    type?: "success" | "error" | "info" | "warning";
    title: string;
    message: string;
  }) => void;
};

export type BoardContextType = {
  spec: BoardSpec;
  state: State<BoardStateType>;
};
export const BoardContext = createContext<BoardSpec | null>(null);

export function useBoardContext() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be used within a BoardContext");
  }
  return context;
}

export function useBoardState(): State {
  const context = useBoardContext();
  return context.state;
}

export function useBoardElement(id: string) {
  const context = useBoardContext();
  const element = context.elements?.[id];
  if (!element) {
    throw new Error("Element not found");
  }
  return element;
}
