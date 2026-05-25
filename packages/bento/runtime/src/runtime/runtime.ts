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

const logBuffer: { timestamp: number; type: string; args: any[] }[] = [];

if (typeof window !== "undefined" && !(console as any).__instrumented) {
  (console as any).__instrumented = true;
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalInfo = console.info;

  console.log = (...args) => {
    logBuffer.push({ timestamp: Date.now(), type: "log", args });
    originalLog(...args);
  };
  console.error = (...args) => {
    logBuffer.push({ timestamp: Date.now(), type: "error", args });
    originalError(...args);
  };
  console.warn = (...args) => {
    logBuffer.push({ timestamp: Date.now(), type: "warn", args });
    originalWarn(...args);
  };
  console.info = (...args) => {
    logBuffer.push({ timestamp: Date.now(), type: "info", args });
    originalInfo(...args);
  };
}

function getValueAtPath(obj: any, path: string) {
  if (!path) return obj;
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    if (current == null) return undefined;
    current = current[part];
  }
  return current;
}

function getContextNodeData(value: any) {
  if (value === null || value === undefined) {
    return [];
  }
  if (typeof value !== "object") {
    return [];
  }
  return Object.entries(value).map(([key, val]) => {
    const type =
      val === null ? "null" : Array.isArray(val) ? "array" : typeof val;
    const hasChildren =
      val !== null && (typeof val === "object" || Array.isArray(val));
    let displayValue: string | undefined = undefined;
    if (!hasChildren) {
      displayValue = val === undefined ? "undefined" : JSON.stringify(val);
    }
    return {
      key,
      type,
      hasChildren,
      value: displayValue,
    };
  });
}

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
  const subscriptions = new Map<string, { path: string; lastData: string }>();

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
    select: async ({ selection }) => {
      environment.interactionManager.select(selection);
    },
    hover: async ({ elementId }) => {
      environment.interactionManager.hover(elementId);
    },
    unhover: async ({ elementId }) => {
      if (environment.interactionManager.getState().hovered === elementId) {
        environment.interactionManager.hover(undefined);
      }
    },
    watchContextNode: async ({ path }) => {
      const key = Math.random().toString(36).substring(7);
      const context = environment.contextManager.getState().context;
      const value = getValueAtPath(context, path);
      const representation = getContextNodeData(value);

      subscriptions.set(key, {
        path,
        lastData: JSON.stringify(representation),
      });

      setTimeout(() => {
        const currentContext = environment.contextManager.getState().context;
        const currentVal = getValueAtPath(currentContext, path);
        const currentRep = getContextNodeData(currentVal);
        rpc.egress.contextNodeUpdated({ path, data: currentRep });
      }, 0);

      return key;
    },
    unwatchContextNode: async ({ key }) => {
      subscriptions.delete(key);
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
    readNode: async ({ selector }) => {
      const element = document.querySelector(selector);
      if (!element) {
        throw new Error(`Element with selector "${selector}" not found`);
      }
      return element.outerHTML;
    },
    clickNode: async ({ selector }) => {
      const element = document.querySelector(selector);
      if (!element) {
        throw new Error(`Element with selector "${selector}" not found`);
      }
      if (element instanceof HTMLElement) {
        element.click();
      }
      element.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true }),
      );
    },
    setValue: async ({ selector, value }) => {
      const element = document.querySelector(selector);
      if (!element) {
        throw new Error(`Element with selector "${selector}" not found`);
      }
      const inputEl =
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLSelectElement
          ? element
          : element.querySelector("input, textarea, select");

      if (inputEl) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          Object.getPrototypeOf(inputEl),
          "value",
        )?.set;
        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(inputEl, value);
        } else {
          (inputEl as any).value = value;
        }
        inputEl.dispatchEvent(new Event("input", { bubbles: true }));
        inputEl.dispatchEvent(new Event("change", { bubbles: true }));
      } else {
        (element as any).value = value;
        element.dispatchEvent(new Event("input", { bubbles: true }));
        element.dispatchEvent(new Event("change", { bubbles: true }));
      }
    },
    getValue: async ({ selector }) => {
      const element = document.querySelector(selector);
      if (!element) {
        throw new Error(`Element with selector "${selector}" not found`);
      }
      const inputEl =
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLSelectElement
          ? element
          : element.querySelector("input, textarea, select");

      if (inputEl) {
        return (inputEl as any).value || "";
      }
      return element.textContent || "";
    },
    readLogs: async ({ from, count }) => {
      const start = from ?? 0;
      const limit = count ?? logBuffer.length;
      const sliced = logBuffer.slice(start, start + limit);
      return sliced
        .map(
          (log) =>
            `[${new Date(log.timestamp).toISOString()}] [${log.type}] ${log.args
              .map((arg) =>
                typeof arg === "object" ? JSON.stringify(arg) : String(arg),
              )
              .join(" ")}`,
        )
        .join("\n");
    },
    readContext: async ({ path }) => {
      const context = environment.contextManager.getState().context;
      return getValueAtPath(context, path);
    },
  });

  const environment: Environment = createEnvironment({
    serviceApi: {
      runQuery: async (args) => {
        const result = await rpc.egress.runServiceOperation(
          {
            service: args.service,
            type: "query",
            name: args.query,
            args: args.args,
          },
          {
            timeout: 1000 * 60 * 5, // 5 minutes
          },
        );
        if (!result.ok) {
          throw new ServiceOperationError(result.error);
        }
        return result.result;
      },
      runAction: async (args) => {
        const result = await rpc.egress.runServiceOperation(
          {
            service: args.service,
            type: "action",
            name: args.action,
            args: args.args,
          },
          {
            timeout: 1000 * 60 * 5, // 5 minutes
          },
        );
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
    rpc.egress.hoverUpdated({ hovered: state.hovered });
  });

  environment.contextManager.subscribe((state) => {
    const context = state.context;
    for (const [key, sub] of subscriptions.entries()) {
      const value = getValueAtPath(context, sub.path);
      const representation = getContextNodeData(value);
      const serialized = JSON.stringify(representation);
      if (serialized !== sub.lastData) {
        sub.lastData = serialized;
        rpc.egress.contextNodeUpdated({ path: sub.path, data: representation });
      }
    }
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
