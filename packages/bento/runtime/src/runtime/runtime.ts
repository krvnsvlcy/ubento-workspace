import { Component, createEnvironment, Environment } from "@ubento/bento.core";
import { createStore } from "@ubento/fabric";
import type { DuplexRpc } from "@ubento/rpc";
import { createZustandStateController } from "@ubento/workspace.primitives";
import { dequal } from "dequal";
import { createStore as createZustandStore } from "zustand";
import {
  BentoEngineHostRpcInterface,
  BentoEngineRuntimeRpcInterface,
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
    readBoard: async ({ boardId }) => {
      return boardStore.getCached(boardId);
    },
    writeBoard: async ({ boardId, data }) => {
      boardStore.update(boardId, data);
    },
    setTheme: async ({ css }) => {
      let styleTag = document.getElementById("theme-variables");
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "theme-variables";
        document.head.appendChild(styleTag);
      }
      styleTag.innerHTML = css;
    },
  });

  const environment: Environment = createEnvironment({
    serviceApi: {
      runQuery: async (args) => {
        return rpc.egress.runQuery(args);
      },
      runAction: async (args) => {
        return rpc.egress.runAction(args);
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

  return {
    ...controller,
    environment,
    boardStore,
    goHome: () => {
      rpc.egress.goTo({ location: undefined });
    },
    goToBoard: (boardId: string, params: Record<string, string> = {}) => {
      rpc.egress.goTo({ location: { boardId, params } });
    },
  };
}

export type BentoRuntime = ReturnType<typeof createBentoRuntime>;
