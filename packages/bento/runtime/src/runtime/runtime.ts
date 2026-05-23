import { Component, createEnvironment, Environment } from "@ubento/bento.core";
import { createStore } from "@ubento/fabric";
import type { DuplexRpc } from "@ubento/rpc";
import { createZustandStateController } from "@ubento/state";
import { dequal } from "dequal";
import { createStore as createZustandStore } from "zustand";
import {
  BentoEngineHostRpcInterface,
  BentoEngineRuntimeRpcInterface,
  ServiceOperationError,
} from "../bridge/bridge";
import { BentoBoardData, BentoUserData, BentoWorkspaceData } from "./types";

export type BentoLocation = {
  boardId: string;
  params: Record<string, string>;
};

export type BentoRuntimeState = {
  workspace: BentoWorkspaceData;
  user: BentoUserData;
  location?: BentoLocation;
  theme?: { css: string };
  mode?: "edit" | "live";
};

export function createBentoRuntime({
  initialState,
  rpc,
  components,
  fallbackComponent,
  errorComponent,
}: {
  initialState: BentoRuntimeState;
  rpc: DuplexRpc<BentoEngineRuntimeRpcInterface, BentoEngineHostRpcInterface>;
  components?: Record<string, Component>;
  fallbackComponent?: Component;
  errorComponent?: Component;
}) {
  const store = createZustandStore<BentoRuntimeState>(() => {
    return {
      ...initialState,
    };
  });

  const controller = createZustandStateController(store);

  const boardStore = createStore<BentoBoardData, { parentId?: string }, string>(
    {
      namespace: "board",
      getKey: (board) => board.id,
      fetchOne: async (key) => {
        return rpc.egress.getBoard({
          boardId: key,
        });
      },
      fetchMany: async ({ params, page }) => {
        const res = await rpc.egress.listBoards({
          cursor: page,
          parentId: params?.parentId,
          limit: 100,
        });
        return {
          data: res.boards,
          nextPage: res.nextCursor,
        };
      },
    },
  );

  boardStore.store.subscribe((state, prev) => {
    for (const boardId in state.data) {
      const board = state.data[boardId];
      const prevBoard = prev.data[boardId];
      if (!dequal(board, prevBoard)) {
        rpc.egress.boardUpdated({ data: board });
      }
    }
  });

  // Setup RPC Handlers
  rpc.setHandlers({
    setLocation: async ({ location }) => {
      controller.setState({ location });
    },
    setInteractionMode: async ({ mode }) => {
      controller.setState({ mode });
    },
    readBoard: async ({ boardId }) => {
      return boardStore.getCached(boardId);
    },
    writeBoard: async ({ data }) => {
      boardStore.push(data);
    },
    listComponents: async (_: {}) => {
      return Object.fromEntries(
        Object.entries(components || {}).map(([key, value]) => [
          key,
          value.summary,
        ]),
      );
    },
    describeComponents: async ({ names }) => {
      const result: Record<string, unknown> = {};
      for (const name of names) {
        const comp = components?.[name];
        if (comp) {
          result[name] = {
            name,
            props: comp.props.toJSONSchema(),
            events: comp.events?.toJSONSchema(),
            bindings: comp.bindings?.toJSONSchema(),
            summary: comp.summary,
            instruction: comp.instructions,
          };
        }
      }
      return result;
    },
    getCatalog: async (args) => {
      return Object.fromEntries(
        Object.entries(components || {}).map(([key, comp]) => [
          key,
          {
            props: comp.props.toJSONSchema(),
            events: comp.events?.toJSONSchema(),
            bindings: comp.bindings?.toJSONSchema(),
            summary: comp.summary,
            instruction: comp.instructions,
          },
        ]),
      );
    },
  });

  const environment: Environment = createEnvironment({
    serviceApi: {
      runQuery: async (args) => {
        const result = await rpc.egress.runServiceOperation({
          service: args.service,
          type: "query",
          name: args.query,
          args: args.args,
        });
        if (!result.ok) {
          throw new ServiceOperationError(result.error);
        }
        return result.result;
      },
      runAction: async (args) => {
        const result = await rpc.egress.runServiceOperation({
          service: args.service,
          type: "action",
          name: args.action,
          args: args.args,
        });
        if (!result.ok) {
          throw new ServiceOperationError(result.error);
        }
        return result.result;
      },
    },
    sessionApi: {
      user: {
        id: "",
        name: "",
        email: "",
        picture: "",
      },
      team: {
        id: "",
        name: "",
        picture: "",
      },
    },
    workspaceApi: {
      goTo: function (args: {
        boardId: string;
        params?: Record<string, string>;
      }): void {
        rpc.egress.goTo({
          location: { boardId: args.boardId, params: args.params || {} },
        });
      },
    },
    components,
    fallbackComponent,
    errorComponent,
  });

  environment.interactionManager.subscribe((state) => {
    rpc.egress.selectionUpdated({ selection: state.selection });
  });

  return {
    ...controller,
    environment,
    rpc,
    boardStore,
    goHome: () => {
      rpc.egress.goTo({ location: undefined });
    },
    goToBoard: (boardId: string, params: Record<string, string> = {}) => {
      rpc.egress.goTo({ location: { boardId, params } });
    },
    createBoard: async (args?: {
      title?: string;
      parentId?: string;
      spec?: any;
    }) => {
      const board = await rpc.egress.createBoard(args);
      boardStore.push(board);
      return board;
    },
  };
}

export type BentoRuntime = ReturnType<typeof createBentoRuntime>;
