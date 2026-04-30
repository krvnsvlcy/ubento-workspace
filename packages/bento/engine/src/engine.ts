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
  hover?: string;
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
  select: (elementIds: string[], toggle?: boolean) => void;
  setSelectionScope: (id?: string) => void;
  hover: (elementId: string) => void;
  unHover: (elementId: string) => void;

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
  pruneBoard: (boardId: string) => void;
  wrapSelection: (ids: string[]) => void;
  unwrapSelection: (ids: string[]) => void;

  // dom tracking
  setHtmlElement: (id: string, element?: HTMLElement) => void;
  getHtmlElement: (id: string) => HTMLElement | undefined;
  convertElementSizeUnit: (
    id: string,
    dimension: "width" | "height",
    targetUnit: "px" | "%",
  ) => void;

  // selectors
  selectActiveBoard: (state: BentoEngineState) => BoardData | undefined;
};

export function createBentoEngine({
  rpc,
}: {
  rpc: DuplexRpc<GuestRpcInterface, HostRpcInterface>;
}): BentoEngine {
  const moduleValueCache = new Map<string, any>();
  const htmlElements = new Map<string, HTMLElement>();

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

      let nextSelection: string[];
      if (toggle) {
        // Toggle each id: if in selection, remove it; if not, add it.
        nextSelection = [...currentSelection];
        for (const id of elementIds) {
          if (nextSelection.includes(id)) {
            nextSelection = nextSelection.filter((sid) => sid !== id);
          } else {
            nextSelection.push(id);
          }
        }
      } else {
        nextSelection = elementIds;
      }

      rpc.egress.setSelection({
        selection: [...new Set(nextSelection)],
      });
    },
    setSelectionScope: (id?: string) => {
      store.setState({ selectionScope: id });
    },
    hover: (elementId: string) => {
      rpc.egress.setHover({ elementId });
    },
    unHover: (elementId: string) => {
      rpc.egress.clearHover({ elementId });
    },

    // navigation
    goTo: (location: BentoLocation) => {
      rpc.egress.setLocation({ location });
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
      const state = store.getState();
      const targetBoardId =
        boardId || state.location?.boardId || state.workspace?.homeBoardId;

      store.setState((s) => {
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

      if (targetBoardId) {
        engine.pruneBoard(targetBoardId);
      }
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

    pruneBoard: (boardId: string) => {
      store.setState((s) => {
        const board = s.boards[boardId];
        if (!board) return s;

        const nextElements = { ...board.elements };
        let nextContent = [...board.content];
        let changed = true;

        while (changed) {
          changed = false;

          for (const [id, el] of Object.entries(nextElements) as [
            string,
            any,
          ][]) {
            if (id === "root") continue;

            if (el.type === "stack" && el.content.length === 1) {
              const childId = el.content[0];

              // Check board content
              if (nextContent.includes(id)) {
                nextContent = nextContent.map((cid) =>
                  cid === id ? childId : cid,
                );
                delete nextElements[id];
                changed = true;
                break;
              }

              // Check other stacks
              for (const [parentId, parentEl] of Object.entries(
                nextElements,
              ) as [string, any][]) {
                if (parentEl.type === "stack" && parentEl.content.includes(id)) {
                  nextElements[parentId] = {
                    ...parentEl,
                    content: parentEl.content.map((cid) =>
                      cid === id ? childId : cid,
                    ),
                  };
                  delete nextElements[id];
                  changed = true;
                  break;
                }
              }
              if (changed) break;
            }
          }
        }

        return {
          boards: {
            ...s.boards,
            [boardId]: {
              ...board,
              elements: nextElements,
              content: nextContent,
            },
          },
        };
      });
    },

    wrapSelection: (ids: string[]) => {
      if (ids.length === 0) return;

      store.setState((s) => {
        const board = engine.selectActiveBoard(s);
        if (!board) return s;

        const nextElements = { ...board.elements };
        let nextBoardContent = [...board.content];

        // Find parent of the first element
        let parentId: string | null = null;
        if (nextBoardContent.includes(ids[0])) {
          parentId = "root_content";
        } else {
          for (const [pid, pel] of Object.entries(nextElements) as [
            string,
            any,
          ][]) {
            if (pel.type === "stack" && pel.content.includes(ids[0])) {
              parentId = pid;
              break;
            }
          }
        }

        if (!parentId) return s;

        const stackId = crypto.randomUUID();
        const newStack: ElementData = {
          type: "stack",
          content: ids,
          style: {
            width: { value: 1, unit: "fr" },
            height: { value: 1, unit: "fr" },
            direction: "column",
          } as any,
        };

        nextElements[stackId] = newStack;

        // Update parent content
        if (parentId === "root_content") {
          const firstIdx = nextBoardContent.indexOf(ids[0]);
          nextBoardContent = nextBoardContent.filter(
            (id) => !ids.includes(id),
          );
          nextBoardContent.splice(firstIdx, 0, stackId);
        } else {
          const parent = nextElements[parentId] as any;
          const firstIdx = parent.content.indexOf(ids[0]);
          const nextParentContent = parent.content.filter(
            (id: string) => !ids.includes(id),
          );
          nextParentContent.splice(firstIdx, 0, stackId);
          nextElements[parentId] = { ...parent, content: nextParentContent };
        }

        return {
          boards: {
            ...s.boards,
            [board.id]: {
              ...board,
              elements: nextElements,
              content: nextBoardContent,
            },
          },
          selection: [stackId],
        };
      });
    },

    unwrapSelection: (ids: string[]) => {
      if (ids.length === 0) return;

      store.setState((s) => {
        const board = engine.selectActiveBoard(s);
        if (!board) return s;

        const nextElements = { ...board.elements };
        let nextBoardContent = [...board.content];
        let nextSelection = [...s.selection];
        let changed = false;

        for (const id of ids) {
          const el = nextElements[id];
          if (el?.type !== "stack") continue;

          const children = el.content;

          // Find parent
          let parentId: string | null = null;
          if (nextBoardContent.includes(id)) {
            parentId = "root_content";
          } else {
            for (const [pid, pel] of Object.entries(nextElements) as [
              string,
              any,
            ][]) {
              if (pel.type === "stack" && pel.content.includes(id)) {
                parentId = pid;
                break;
              }
            }
          }

          if (!parentId) continue;

          // Replace stack with its children
          if (parentId === "root_content") {
            const idx = nextBoardContent.indexOf(id);
            nextBoardContent.splice(idx, 1, ...children);
          } else {
            const parent = nextElements[parentId] as any;
            const idx = parent.content.indexOf(id);
            const nextParentContent = [...parent.content];
            nextParentContent.splice(idx, 1, ...children);
            nextElements[parentId] = { ...parent, content: nextParentContent };
          }

          delete nextElements[id];
          nextSelection = nextSelection.filter((sid) => sid !== id);
          if (children.length > 0) {
            nextSelection.push(...children);
          }
          changed = true;
        }

        if (!changed) return s;

        return {
          boards: {
            ...s.boards,
            [board.id]: {
              ...board,
              elements: nextElements,
              content: nextBoardContent,
            },
          },
          selection: nextSelection,
        };
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
    setHtmlElement: (id: string, element?: HTMLElement) => {
      if (element) {
        htmlElements.set(id, element);
      } else {
        htmlElements.delete(id);
      }
    },
    getHtmlElement: (id: string) => {
      return htmlElements.get(id);
    },
    convertElementSizeUnit: (id, dimension, targetUnit) => {
      const el = htmlElements.get(id);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement?.getBoundingClientRect();

      let value = 0;
      if (targetUnit === "px") {
        value = Math.round(dimension === "width" ? rect.width : rect.height);
      } else if (targetUnit === "%" && parentRect) {
        const size = dimension === "width" ? rect.width : rect.height;
        const parentSize =
          dimension === "width" ? parentRect.width : parentRect.height;
        if (parentSize > 0) {
          value = Math.round((size / parentSize) * 100);
        }
      }

      engine.setElementStyle(id, {
        [dimension]: { value, unit: targetUnit },
      });
    },

    selectActiveBoard: (state: BentoEngineState) => {
      const activeBoardId = state.location?.boardId;
      return activeBoardId ? state.boards[activeBoardId] : undefined;
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
      store.setState((s) => ({ workspace }));
      if (state) {
        if (state.mode) store.setState((s) => ({ mode: state.mode }));
        if (state.location)
          store.setState((s) => ({ location: state.location }));
        if (state.selectionScope)
          store.setState((s) => ({ selectionScope: state.selectionScope }));
        if (state.selection)
          store.setState((s) => ({ selection: state.selection }));
      }
    },
    modeChanged: async ({ mode }) => {
      store.setState((s) => ({ mode }));
    },
    locationChanged: async ({ location }) => {
      store.setState((s) => ({ location }));
    },
    selectionScopeChanged: async ({ selectionScope }) => {
      store.setState((s) => ({ selectionScope }));
    },
    selectionChanged: async ({ selection }) => {
      store.setState((s) => ({ selection }));
    },
    hoverChanged: async ({ hover }) => {
      store.setState((s) => ({ hover }));
    },
    setHomeBoardId: async ({ homeBoardId }) => {
      store.setState((s) => ({
        workspace: s.workspace ? { ...s.workspace, homeBoardId } : null,
      }));
    },
    updateWorkspace: async ({ workspace }) => {
      store.setState((s) => ({
        workspace: s.workspace ? { ...s.workspace, ...workspace } : null,
      }));
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
