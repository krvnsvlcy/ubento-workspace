import type { DuplexRpc } from "@ubento/rpc";
import { createZustandStateController } from "@ubento/state";
import { createStore as createZustandStore } from "zustand";
import {
  BentoEngineHostRpcInterface,
  BentoEngineRuntimeRpcInterface,
} from "../bridge/bridge";
import { BentoUserData, BentoWorkspaceData } from "./types";

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

export function createBentoRuntime({
  initialState,
  rpc,
}: {
  initialState: BentoRuntimeState;
  rpc: DuplexRpc<BentoEngineRuntimeRpcInterface, BentoEngineHostRpcInterface>;
}) {
  const store = createZustandStore<BentoRuntimeState>(() => {
    return {
      ...initialState,
    };
  });

  const controller = createZustandStateController(store);

  // Setup RPC Handlers
  rpc.setHandlers({
    setLocation: async ({ location }) => {
      controller.setState({ location });
    },
    setInteractionMode: async ({ mode }) => {
      controller.setState({ mode });
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
  });

  return {
    ...controller,
    rpc,
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
      const workspaceData = await rpc.egress.createBoard(args);
      store.setState({ workspace: workspaceData });
    },
  };
}

export type BentoRuntime = ReturnType<typeof createBentoRuntime>;
