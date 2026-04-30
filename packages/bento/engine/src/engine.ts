import {
  createZustandStateController,
  StateController,
} from "@ubento/bento-primitives";
import { DuplexRpc } from "@ubento/rpc-utils";
import { createContext, useContext } from "react";
import { createStore as createZustandStore } from "zustand";
import { GuestRpcInterface, HostRpcInterface } from "./bridge.js";
import {
  BaseStyle,
  BoardData,
  ElementData,
  ModuleData,
  WorkspaceData,
} from "./models.js";
import { createRuntimeService, RuntimeService } from "./runtime_service.js";

export type BentoMode = "live" | "edit";

export type BentoLocation = {
  boardId: string;
  params: Record<string, string>;
};

export type BentoEngineState = {
  mode: BentoMode;
  location?: BentoLocation;

  selectionScope?: string;
  selection: string[];

  workspace: WorkspaceData | null;
  boards: Record<string, BoardData>;
  modules: Record<string, ModuleData>;

  runtimeServices: Record<string, RuntimeService>;
};

export type BentoEngine = StateController<BentoEngineState> & {
  // interaction
  toggleMode: () => void;

  // selection
  select: (blockIds: string[], toggle?: boolean) => void;

  // navigation
  goTo: (location: BentoLocation) => void;

  // content retrieval
  getBoard: (boardId: string) => Promise<BoardData>;
  listBoards: () => Promise<BoardData[]>;
  createBoard: (name?: string) => Promise<BoardData>;
  deleteBoard: (boardId: string) => void;
  getModule: (moduleId: string) => Promise<ModuleData>;
  resolveModuleValue: (moduleId: string, versionId: string) => Promise<any>;
  searchModules: (query: string) => Promise<{ id: string; name: string }[]>;
  createModule: (name: string) => Promise<ModuleData & { id: string }>;

  // mutators
  setMode: (mode: BentoMode) => void;
  setWorkspace: (workspace: WorkspaceData) => void;
  setSelection: (selection: string[]) => void;
  setLocation: (location?: BentoLocation) => void;
  setSelectionScope: (selectionScope?: string) => void;
  setRuntimeService: (name: string, service: any) => void;

  setHomeBoardId: (homeBoardId: string) => void;
  updateWorkspace: (workspace: Partial<WorkspaceData>) => void;

  setBoardStyle: (boardId: string, style: Partial<BaseStyle>) => void;
  setBoardContent: (boardId: string, content: string[]) => void;

  setElementStyle: (id: string, style: Partial<BaseStyle>) => void;
  setElementProps: (id: string, props: any) => void;
  setStackContent: (id: string, content: string[]) => void;
  setBlockModule: (
    id: string,
    moduleId: string,
    moduleVersionId: string,
  ) => void;

  addElement: (
    containerId: string,
    element: ElementData,
    boardId?: string,
  ) => string;
  deleteElement: (id: string, boardId?: string) => void;
  replaceElement: (id: string, element: ElementData) => void;
};

export function createBentoEngine({
  rpc,
}: {
  rpc: DuplexRpc<GuestRpcInterface, HostRpcInterface>;
}): BentoEngine {
  const moduleValueCache = new Map<string, any>();

  const store = createZustandStore<BentoEngineState>()(() => ({
    mode: "live",
    selection: [],
    boards: {},
    modules: {},
    workspace: null,
    runtimeServices: {},
  }));

  const controller = createZustandStateController(store);

  const engine: BentoEngine = {
    ...controller,
    setMode: (mode: BentoMode) => {
      store.setState({ mode });
    },
    setSelection: (selection: string[]) => {
      store.setState({ selection });
    },
    setLocation: (location?: BentoLocation) => {
      store.setState({ location });
    },
    setSelectionScope: (selectionScope?: string) => {
      store.setState({ selectionScope });
    },
    setRuntimeService: (name: string, service: any) => {
      store.setState((s) => ({
        runtimeServices: { ...s.runtimeServices, [name]: service },
      }));
    },

    // interaction
    toggleMode: () => {
      rpc.egress.setMode({
        mode: store.getState().mode === "edit" ? "live" : "edit",
      });
    },

    // selection
    select: (elementIds: string[], toggle?: boolean) => {
      const current = store.getState();
      const currentSelection = current.selection || [];
      const nextSelection = [
        ...new Set(
          toggle
            ? currentSelection.filter((id) => !elementIds.includes(id))
            : elementIds,
        ),
      ];

      rpc.egress.setSelection({
        selection: nextSelection,
      });
    },

    // navigation
    goTo: (location: BentoLocation) => {
      rpc.egress.setLocation({ location });
    },

    // workspace mutators
    setWorkspace: (workspace: WorkspaceData) => {
      store.setState({ workspace });
    },

    setHomeBoardId: (homeBoardId: string) => {
      store.setState((s) => ({
        workspace: s.workspace ? { ...s.workspace, homeBoardId } : null,
      }));
    },

    updateWorkspace: (workspace: Partial<WorkspaceData>) => {
      store.setState((s) => ({
        workspace: s.workspace ? { ...s.workspace, ...workspace } : null,
      }));
    },

    // board mutators
    getBoard: async (boardId: string) => {
      const current = store.getState();
      if (current.boards[boardId]) {
        return current.boards[boardId];
      }
      const board = await rpc.egress.getBoard({ boardId });
      store.setState((s) => ({
        boards: { ...s.boards, [boardId]: board },
      }));
      return board;
    },

    listBoards: async () => {
      const boards = await rpc.egress.listBoards({});
      store.setState((s) => {
        const nextBoards = { ...s.boards };
        for (const board of boards) {
          nextBoards[board.id] = board;
        }
        return { boards: nextBoards };
      });
      return boards;
    },

    createBoard: async (name?: string) => {
      const board = await rpc.egress.createBoard({ name });
      store.setState((s) => ({
        boards: { ...s.boards, [board.id]: board },
      }));
      return board;
    },

    deleteBoard: (boardId: string) => {
      store.setState((s) => {
        const nextBoards = { ...s.boards };
        delete nextBoards[boardId];
        return { boards: nextBoards };
      });
    },

    setBoardContent: (boardId: string, content: string[]) => {
      store.setState((s) => {
        if (!s.boards[boardId]) return s;
        return {
          boards: {
            ...s.boards,
            [boardId]: { ...s.boards[boardId], content },
          },
        };
      });
    },

    addElement: (
      containerId: string,
      element: ElementData,
      boardId?: string,
    ) => {
      const id = crypto.randomUUID();
      store.setState((s) => {
        const targetBoardId =
          boardId || s.location?.boardId || s.workspace?.homeBoardId;
        if (!targetBoardId || !s.boards[targetBoardId]) return s;

        const board = s.boards[targetBoardId];
        const nextElements = { ...board.elements, [id]: element };

        const container = nextElements[containerId];
        if (container && container.type === "stack") {
          nextElements[containerId] = {
            ...container,
            content: [...container.content, id],
          };
        }

        return {
          boards: {
            ...s.boards,
            [targetBoardId]: {
              ...board,
              elements: nextElements,
            },
          },
        };
      });
      return id;
    },

    deleteElement: (elementId: string, boardId?: string) => {
      store.setState((s) => {
        const targetBoardId =
          boardId || s.location?.boardId || s.workspace?.homeBoardId;
        if (!targetBoardId || !s.boards[targetBoardId]) return s;

        const board = s.boards[targetBoardId];
        const nextElements = { ...board.elements };
        delete nextElements[elementId];

        // remove from stacks
        for (const [id, el] of Object.entries(nextElements) as [
          string,
          any,
        ][]) {
          if (el.type === "stack" && el.content.includes(elementId)) {
            nextElements[id] = {
              ...el,
              content: el.content.filter((cid: string) => cid !== elementId),
            };
          }
        }

        return {
          boards: {
            ...s.boards,
            [targetBoardId]: {
              ...board,
              elements: nextElements,
              content: board.content.filter((id) => id !== elementId),
            },
          },
        };
      });
    },

    replaceElement: (id: string, element: ElementData) => {
      store.setState((s) => {
        const nextBoards = { ...s.boards };
        let found = false;

        for (const [boardId, board] of Object.entries(nextBoards)) {
          if (board.elements[id]) {
            nextBoards[boardId] = {
              ...board,
              elements: {
                ...board.elements,
                [id]: element,
              },
            };
            found = true;
            break;
          }
        }

        return found ? { boards: nextBoards } : s;
      });
    },

    setBoardStyle: (boardId: string, style: Partial<BaseStyle>) => {
      store.setState((s) => {
        if (!s.boards[boardId]) return s;
        return {
          boards: {
            ...s.boards,
            [boardId]: {
              ...s.boards[boardId],
              style: {
                ...s.boards[boardId].style,
                ...style,
              },
            },
          },
        };
      });
    },

    // element mutators
    setElementStyle: (id: string, style: Partial<BaseStyle>) => {
      store.setState((s) => {
        const nextBoards = { ...s.boards };
        const currentBoardId = s.location?.boardId;

        // Prioritize current board
        if (currentBoardId && nextBoards[currentBoardId]?.elements[id]) {
          const board = nextBoards[currentBoardId];
          nextBoards[currentBoardId] = {
            ...board,
            elements: {
              ...board.elements,
              [id]: {
                ...board.elements[id],
                style: {
                  ...board.elements[id].style,
                  ...style,
                } as any,
              },
            },
          };
          return { boards: nextBoards };
        }

        let found = false;
        for (const [boardId, board] of Object.entries(nextBoards)) {
          if (board.elements[id]) {
            nextBoards[boardId] = {
              ...board,
              elements: {
                ...board.elements,
                [id]: {
                  ...board.elements[id],
                  style: {
                    ...board.elements[id].style,
                    ...style,
                  } as any,
                },
              },
            };
            found = true;
            break;
          }
        }

        return found ? { boards: nextBoards } : s;
      });
    },

    setElementProps: (id: string, props: any) => {
      store.setState((s) => {
        const nextBoards = { ...s.boards };
        const currentBoardId = s.location?.boardId;

        // Prioritize current board
        if (currentBoardId && nextBoards[currentBoardId]?.elements[id]) {
          const board = nextBoards[currentBoardId];
          const el = board.elements[id];
          if (el.type === "block") {
            nextBoards[currentBoardId] = {
              ...board,
              elements: {
                ...board.elements,
                [id]: {
                  ...el,
                  props: {
                    ...el.props,
                    ...props,
                  },
                },
              },
            };
            return { boards: nextBoards };
          }
        }

        let found = false;
        for (const [boardId, board] of Object.entries(nextBoards)) {
          const el = board.elements[id];
          if (el && el.type === "block") {
            nextBoards[boardId] = {
              ...board,
              elements: {
                ...board.elements,
                [id]: {
                  ...el,
                  props: {
                    ...el.props,
                    ...props,
                  },
                },
              },
            };
            found = true;
            break;
          }
        }

        return found ? { boards: nextBoards } : s;
      });
    },

    setStackContent: (id: string, content: string[]) => {
      store.setState((s) => {
        const nextBoards = { ...s.boards };
        const currentBoardId = s.location?.boardId;

        // Prioritize current board
        if (currentBoardId && nextBoards[currentBoardId]?.elements[id]) {
          const board = nextBoards[currentBoardId];
          const el = board.elements[id];
          if (el.type === "stack") {
            nextBoards[currentBoardId] = {
              ...board,
              elements: {
                ...board.elements,
                [id]: {
                  ...el,
                  content,
                },
              },
            };
            return { boards: nextBoards };
          }
        }

        let found = false;
        for (const [boardId, board] of Object.entries(nextBoards)) {
          const el = board.elements[id];
          if (el && el.type === "stack") {
            nextBoards[boardId] = {
              ...board,
              elements: {
                ...board.elements,
                [id]: {
                  ...el,
                  content,
                },
              },
            };
            found = true;
            break;
          }
        }

        return found ? { boards: nextBoards } : s;
      });
    },

    setBlockModule: (id: string, moduleId: string, moduleVersionId: string) => {
      store.setState((s) => {
        const nextBoards = { ...s.boards };
        const currentBoardId = s.location?.boardId;

        // Prioritize current board
        if (currentBoardId && nextBoards[currentBoardId]?.elements[id]) {
          const board = nextBoards[currentBoardId];
          const el = board.elements[id];
          if (el.type === "block") {
            nextBoards[currentBoardId] = {
              ...board,
              elements: {
                ...board.elements,
                [id]: {
                  ...el,
                  moduleId,
                  moduleVersionId,
                },
              },
            };
            return { boards: nextBoards };
          }
        }

        let found = false;
        for (const [boardId, board] of Object.entries(nextBoards)) {
          const el = board.elements[id];
          if (el && el.type === "block") {
            nextBoards[boardId] = {
              ...board,
              elements: {
                ...board.elements,
                [id]: {
                  ...el,
                  moduleId,
                  moduleVersionId,
                },
              },
            };
            found = true;
            break;
          }
        }

        return found ? { boards: nextBoards } : s;
      });
    },

    // external data retrieval
    getModule: async (moduleId: string) => {
      const current = store.getState();
      if (current.modules[moduleId]) {
        return current.modules[moduleId];
      }
      const moduleData = await rpc.egress.getModule({ moduleId });
      store.setState((s) => ({
        modules: { ...s.modules, [moduleId]: moduleData },
      }));
      return moduleData;
    },

    resolveModuleValue: async (moduleId: string, versionId: string) => {
      const cacheKey = `${moduleId}:${versionId}`;
      const cachedValue = moduleValueCache.get(cacheKey);
      if (cachedValue) return cachedValue;

      const artifact = await rpc.egress.getModuleArtifact({
        moduleId,
        versionId,
      });

      const blob = new Blob([artifact], { type: "application/javascript" });
      const url = URL.createObjectURL(blob);

      try {
        // Use dynamic import with the object URL
        const mod = await import(/* @vite-ignore */ url);
        moduleValueCache.set(cacheKey, mod);
        return mod;
      } finally {
        // Revoke URL after a delay to ensure import has finished
        setTimeout(() => URL.revokeObjectURL(url), 10000);
      }
    },

    searchModules: async (query: string) => {
      return await rpc.egress.searchModules({ query });
    },

    createModule: async (name: string) => {
      const res = await rpc.egress.createModule({ name });
      store.setState((s) => ({
        modules: {
          ...s.modules,
          [res.id]: { latestVersionId: res.latestVersionId },
        },
      }));
      return res;
    },
  };

  // Sync workspace services

  store.subscribe((curr, prev) => {
    if (curr.workspace?.services !== prev.workspace?.services) {
      const nextServices = curr.workspace?.services || {};
      const currentRuntimeServices = curr.runtimeServices;
      const nextRuntimeServices = { ...currentRuntimeServices };
      let changed = false;

      // 1. Remove or update existing services
      for (const [name, runtimeService] of Object.entries(
        currentRuntimeServices,
      )) {
        if (!nextServices[name]) {
          // Remove service
          delete nextRuntimeServices[name];
          changed = true;
        } else {
          // Update service
          runtimeService.update(nextServices[name]);
        }
      }

      // 2. Add new services
      for (const [name, serviceData] of Object.entries(nextServices) as [
        string,
        any,
      ][]) {
        if (!currentRuntimeServices[name]) {
          nextRuntimeServices[name] = createRuntimeService(
            name,
            serviceData,
            engine,
          );
          changed = true;
        }
      }

      if (changed) {
        store.setState({ runtimeServices: nextRuntimeServices });
      }
    }
  });

  // RPC Communication

  // Sync
  store.subscribe((curr, prev) => {
    // Sync boards back to host
    for (const boardId in curr.boards) {
      if (curr.boards[boardId] !== prev.boards[boardId]) {
        rpc.egress.boardChanged({
          boardId,
          board: curr.boards[boardId],
        });
      }
    }

    // Sync workspace back to host
    if (curr.workspace && curr.workspace !== prev.workspace) {
      rpc.egress.workspaceChanged({ workspace: curr.workspace });
    }
  });

  // Handle Host requests
  rpc.setHandlers({
    init: async ({ workspace, state }) => {
      engine.setWorkspace(workspace);
      if (state) {
        if (state.mode) engine.setMode(state.mode);
        if (state.location) engine.setLocation(state.location);
        if (state.selectionScope)
          engine.setSelectionScope(state.selectionScope);
        if (state.selection) engine.setSelection(state.selection);
      }
    },
    modeChanged: async ({ mode }) => {
      engine.setMode(mode);
    },
    locationChanged: async ({ location }) => {
      engine.setLocation(location);
    },
    selectionScopeChanged: async ({ selectionScope }) => {
      engine.setSelectionScope(selectionScope);
    },
    selectionChanged: async ({ selection }) => {
      engine.setSelection(selection);
    },
    setHomeBoardId: async ({ homeBoardId }) => {
      engine.setHomeBoardId(homeBoardId);
    },
    updateWorkspace: async ({ workspace }) => {
      engine.updateWorkspace(workspace);
    },
    deleteBoard: async ({ boardId }) => {
      engine.deleteBoard(boardId);
    },
    setBoardStyle: async ({ boardId, style }) => {
      engine.setBoardStyle(boardId, style);
    },
    setBoardContent: async ({ boardId, content }) => {
      engine.setBoardContent(boardId, content);
    },
    addElement: async ({ boardId, containerId, element }) => {
      return engine.addElement(containerId, element, boardId);
    },
    deleteElement: async ({ boardId, elementId }) => {
      engine.deleteElement(elementId, boardId);
    },
    setElementStyle: async ({ id, style }) => {
      engine.setElementStyle(id, style);
    },
    setElementProps: async ({ id, props }) => {
      engine.setElementProps(id, props);
    },
    setStackContent: async ({ id, content }) => {
      engine.setStackContent(id, content);
    },
    setBlockModule: async ({ id, moduleId, moduleVersionId }) => {
      engine.setBlockModule(id, moduleId, moduleVersionId);
    },
  });

  rpc.egress.connect({});

  return engine;
}

export const EngineContext = createContext<BentoEngine | null>(null);

export function useBentoEngine() {
  const context = useContext(EngineContext);
  if (!context) {
    throw new Error(
      "useBentoEngine must be used within an EngineControllerProvider",
    );
  }
  return context;
}
