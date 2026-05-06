import { UbentoService } from "@/services/ubento/ubento";
import {
  ComponentEngineRuntimeHostRpcInterface,
  ComponentEngineRuntimeRpcInterface,
} from "@ubento/bento.runtime";
import { createDuplexRpc, createWindowPort, DuplexRpc } from "@ubento/rpc";
import { createZustandStateController } from "@ubento/workspace.primitives";
import { createStore as createZustandStore } from "zustand/vanilla";

const dummyComponentCode = `
function Component({ name }: { name: string }) {
  return <div>Hello {name}</div>;
}
export default Component;
`;

export type LogEntry = {
  id: string;
  type: "log" | "error" | "warn" | "info";
  args: any[];
  timestamp: number;
};

export type ViewMode = "code" | "preview" | "split";

export type ComponentState = {
  status: "pending" | "loaded" | "error";
  error?: any;
  module?: any;
  logs: LogEntry[];
  isReady: boolean;
  viewMode: ViewMode;
  source: string;
  splitPosition: number;
  lastSplitPosition: number;
};

export function createComponentEngine({
  componentId,
  ubento,
}: {
  componentId: string;
  ubento: UbentoService;
}) {
  const store = createZustandStore<ComponentState>()(() => ({
    status: "pending",
    logs: [],
    isReady: false,
    viewMode: "split",
    source: "",
    splitPosition: 50,
    lastSplitPosition: 50,
  }));

  const controller = createZustandStateController(store);

  let rpc: DuplexRpc<
    ComponentEngineRuntimeHostRpcInterface,
    ComponentEngineRuntimeRpcInterface
  > | null = null;

  // Initial Data Fetching
  const initPromise = (async () => {
    try {
      const module = await ubento.module.getModule(componentId);
      const source = await ubento.module.readModuleVersionFile(
        componentId,
        module.latest_version_id || "",
        "index.tsx",
      );

      store.setState({
        status: "loaded",
        module,
        source: source || "",
      });

      return { module, source };
    } catch (error) {
      console.error("[ComponentEngine] Failed to load component:", error);
      store.setState({ status: "error", error });
      throw error;
    }
  })();

  const componentEngine = {
    ...controller,

    init: (target: Window) => {
      rpc = createDuplexRpc<
        ComponentEngineRuntimeHostRpcInterface,
        ComponentEngineRuntimeRpcInterface
      >({
        port: createWindowPort(window, target),
        channel: "component",
        handlers: {
          connect: async () => {
            console.log("[ComponentEngine] Connected");
          },
          ready: async () => {
            console.log("[ComponentEngine] Ready");
            store.setState({ isReady: true });

            const { source } = await initPromise;
            rpc?.egress.init({
              code: source || dummyComponentCode,
            });
          },
          log: async ({
            type,
            args,
          }: {
            type: LogEntry["type"];
            args: any[];
          }) => {
            const entry: LogEntry = {
              id: Math.random().toString(36).substring(7),
              type,
              args,
              timestamp: Date.now(),
            };
            store.setState((s) => ({
              logs: [...s.logs, entry].slice(-100),
            }));
          },
        },
      });

      rpc.run();
    },

    setViewMode: (viewMode: ViewMode) => {
      const { lastSplitPosition } = store.getState();
      let splitPosition = lastSplitPosition;

      if (viewMode === "code") splitPosition = 100;
      if (viewMode === "preview") splitPosition = 0;

      store.setState({ viewMode, splitPosition });
    },

    setSplitPosition: (splitPosition: number) => {
      const { viewMode } = store.getState();
      const updates: Partial<ComponentState> = { splitPosition };

      if (viewMode === "split") {
        updates.lastSplitPosition = splitPosition;
      }

      store.setState(updates);
    },

    setSource: (source: string) => {
      store.setState({ source });
      if (store.getState().isReady) {
        rpc?.egress.updateCode({ code: source });
      }
    },

    save: async () => {
      const current = store.getState();
      await ubento.module.saveModuleVersion(componentId, current.source);
    },

    clearLogs: () => {
      store.setState({ logs: [] });
    },

    dispose: () => {
      rpc?.dispose();
      rpc = null;
      store.setState({ isReady: false, logs: [] });
    },
  };

  return componentEngine;
}

export type ComponentEngine = ReturnType<typeof createComponentEngine>;
