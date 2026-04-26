import type {
  WorkspaceData,
  EngineLocation,
  EngineMode,
  GuestRpcInterface,
  HostRpcInterface,
  ModuleData,
  BoardData,
} from "@ubento/engine";
import {
  createDuplexRpc,
  createWindowPort,
  DuplexRpc,
} from "@ubento/rpc-utils";
import { proxy } from "valtio";

export type WorkspaceState = {
  loading: boolean;
  error: boolean;
  mode: EngineMode;
  selectionScope?: string;
  selection: string[];
  connected: boolean; // the iframe has established communication
  ready: boolean; // the iframe has loaded the workspace and is ready
  location?: EngineLocation;
};

export type WorkspaceController = {
  state: WorkspaceState;
  workspace: WorkspaceData | null;
  connect: (target: Window) => void;
  load: (data: WorkspaceData) => void;
  dispose: () => void;

  // actions
  setMode: (mode: EngineMode) => void;
  select: (blockIds: string[]) => void;
  setSelectionScope: (selectionScope?: string) => void;
  goTo: (boardId: string, params?: Record<string, string>) => void;
};

export type WorkspaceControllerHandlers = {
  getBoard: (boardId: string) => Promise<BoardData>;
  listBoards: () => Promise<BoardData[]>;
  createBoard: (name?: string) => Promise<BoardData>;
  getModule: (moduleId: string) => Promise<ModuleData>;
  onGoTo?: (boardId: string, params?: Record<string, string>) => void;
};

export function createWorkspaceController({
  initialState,
  handlers,
  moduleUrlTemplate,
}: {
  initialState?: Partial<WorkspaceState>;
  handlers: WorkspaceControllerHandlers;
  moduleUrlTemplate: string;
}): WorkspaceController {
  let workspace: WorkspaceData | null = null;
  const state = proxy<WorkspaceState>({
    loading: false,
    error: false,
    mode: "live",
    selection: [],
    connected: false,
    ready: false,
    ...initialState,
  });

  let pendingLoad: WorkspaceData | null = null;

  let rpc: DuplexRpc<HostRpcInterface, GuestRpcInterface> | null = null;

  return {
    state,
    get workspace() {
      return workspace;
    },
    connect: (target: Window) => {
      rpc = createDuplexRpc<HostRpcInterface, GuestRpcInterface>({
        port: createWindowPort(window, target),
        handlers: {
          connect: () => {
            console.log("[Controller] Connected to iframe window");
            state.connected = true;
            if (pendingLoad) {
              rpc!.egress.init({ workspace: pendingLoad, moduleUrlTemplate });
              pendingLoad = null;
            }
          },
          ready: () => {},
          getBoard: async ({ boardId }) => {
            return await handlers.getBoard(boardId);
          },
          listBoards: async () => {
            return await handlers.listBoards();
          },
          createBoard: async ({ name }) => {
            return await handlers.createBoard(name);
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
          goTo: ({ boardId, params }) => {
            handlers.onGoTo?.(boardId, params);
          },
        },
      });

      rpc.run();
    },
    load: (data: WorkspaceData) => {
      workspace = data;
      if (rpc && state.connected) {
        rpc.egress.init({ workspace: data, moduleUrlTemplate });
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
    goTo: (boardId: string, params?: Record<string, string>) => {
      state.location = { boardId, params: params || {} };
      rpc?.egress.locationChanged({ boardId, params });
    },
  };
}
