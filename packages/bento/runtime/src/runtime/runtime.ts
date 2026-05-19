import { Component, createEnvironment, Environment } from "@ubento/bento.core";
import { createStore } from "@ubento/fabric";
import type { DuplexRpc } from "@ubento/rpc";
import { createZustandStateController } from "@ubento/bento.arlo-core";
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

  if (initialState.theme) {
    let styleTag = document.getElementById("theme-variables");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "theme-variables";
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = initialState.theme.css;
  }
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
    setTheme: async ({ css }) => {
      let styleTag = document.getElementById("theme-variables");
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "theme-variables";
        document.head.appendChild(styleTag);
      }
      styleTag.innerHTML = css;
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
        return rpc.egress.runServiceOperation({
          service: args.service,
          type: "query",
          name: args.query,
          args: args.args,
        });
      },
      runAction: async (args) => {
        return rpc.egress.runServiceOperation({
          service: args.service,
          type: "action",
          name: args.action,
          args: args.args,
        });
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
