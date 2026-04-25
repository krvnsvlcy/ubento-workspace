import type {
  AppData,
  AppEngineLocation,
  EngineMode,
  GuestRpcInterface,
  HostRpcInterface,
  ModuleData,
  PageData,
} from "@ubento/engine";
import {
  createDuplexRpc,
  createWindowPort,
  DuplexRpc,
} from "@ubento/rpc-utils";
import { proxy } from "valtio";

export type AppState = {
  loading: boolean;
  error: boolean;
  mode: EngineMode;
  selectionScope?: string;
  selection: string[];
  connected: boolean; // the iframe has established communication
  ready: boolean; // the iframe has loaded the app and is ready
  location?: AppEngineLocation;
};

export type AppController = {
  state: AppState;
  connect: (target: Window) => void;
  load: (data: AppData) => void;
  dispose: () => void;

  // actions
  setMode: (mode: EngineMode) => void;
  select: (blockIds: string[]) => void;
  setSelectionScope: (selectionScope?: string) => void;
  goTo: (pageId: string, params?: Record<string, string>) => void;
};

export type AppControllerHandlers = {
  getPage: (pageId: string) => Promise<PageData>;
  getModule: (moduleId: string) => Promise<ModuleData>;
};

export function createAppController({
  initialState,
  handlers,
  moduleUrlTemplate,
}: {
  initialState?: Partial<AppState>;
  handlers: AppControllerHandlers;
  moduleUrlTemplate: string;
}): AppController {
  const state = proxy<AppState>({
    loading: false,
    error: false,
    mode: "live",
    selection: [],
    connected: false,
    ready: false,
    ...initialState,
  });

  let pendingLoad: AppData | null = null;

  let rpc: DuplexRpc<HostRpcInterface, GuestRpcInterface> | null = null;

  return {
    state,
    connect: (target: Window) => {
      console.log("[Controller] Connecting to iframe window");
      rpc = createDuplexRpc<HostRpcInterface, GuestRpcInterface>({
        port: createWindowPort(window, target),
        handlers: {
          connect: () => {
            state.connected = true;
            if (pendingLoad) {
              rpc!.egress.init({ app: pendingLoad, moduleUrlTemplate });
              pendingLoad = null;
            }
          },
          ready: () => {},
          getPage: async ({ pageId }) => {
            return await handlers.getPage(pageId);
          },
          getModule: async ({ moduleId }) => {
            return await handlers.getModule(moduleId);
          },
          select: ({ elementIds }) => {
            state.selection = elementIds;
          },
          setSelectionScope: ({ scope }) => {
            state.selectionScope = scope;
          },
          setMode: ({ mode }) => {
            state.mode = mode;
          },
          goTo: ({ pageId, params }) => {
            state.location = { pageId, params: params || {} };
          },
        },
      });

      rpc.run();
    },
    load: (data: AppData) => {
      if (rpc && state.connected) {
        rpc.egress.init({ app: data, moduleUrlTemplate });
      } else {
        pendingLoad = data;
      }
    },
    dispose: () => {
      rpc?.dispose();
    },
    setMode: (mode: EngineMode) => {
      state.mode = mode;
      rpc?.egress.modeChanged({ mode });
    },
    select: (elementIds: string[]) => {
      state.selection = elementIds;
      rpc?.egress.selectionChanged({ elementIds });
    },
    setSelectionScope: (selectionScope?: string) => {
      state.selectionScope = selectionScope;
      rpc?.egress.selectionScopeChanged({ scope: selectionScope });
    },
    goTo: (pageId: string, params?: Record<string, string>) => {
      state.location = { pageId, params: params || {} };
      rpc?.egress.locationChanged({ pageId, params });
    },
  };
}
