import type {
  BaseStyle,
  ElementData,
  EngineLocation,
  EngineMode,
  EngineState,
  EngineStore,
  WorkspaceData,
} from "@ubento/engine";
import { createStore } from "zustand/vanilla";
import { rpc } from "./rpc";
function generateId() {
  return Math.random().toString(36).substring(2, 11);
}

export function createEngine({
  initialState,
}: {
  initialState?: Partial<EngineState>;
} = {}) {
  const moduleValueCache = new Map<string, any>();

  const engine = createStore<EngineStore>()((set, get) => ({
    mode: "edit",
    selection: [],
    boards: {},
    modules: {},
    workspace: null,
    ...initialState,
    setMode: (mode: EngineMode) => {
      set({ mode });
    },
    setSelection: (selection: string[]) => {
      set({ selection });
    },
    setLocation: (location: EngineLocation) => {
      set({ location });
    },

    // interaction
    toggleMode: () => {
      rpc.egress.setMode({
        mode: get().mode === "edit" ? "live" : "edit",
      });
    },

    // selection
    select: (elementIds: string[], toggle?: boolean) => {
      const current = get();
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

    focusSelectionScope: (scope: string) => {
      rpc.egress.setSelectionScope({
        selectionScope: scope,
      });
    },

    blurSelectionScope: () => {
      rpc.egress.setSelectionScope({
        selectionScope: undefined,
      });
    },

    // navigation
    goTo: (boardId: string, params?: Record<string, string>) => {
      rpc.egress.setLocation({
        location: { boardId, params: params || {} },
      });
    },

    // workspace mutators
    setWorkspace: (workspace: WorkspaceData) => {
      set({ workspace });
    },

    setHomeBoardId: (homeBoardId: string) => {
      set((s) => ({
        workspace: s.workspace ? { ...s.workspace, homeBoardId } : null,
      }));
    },

    updateWorkspace: (workspace: Partial<WorkspaceData>) => {
      set((s) => ({
        workspace: s.workspace ? { ...s.workspace, ...workspace } : null,
      }));
    },

    // board mutators
    getBoard: async (boardId: string) => {
      const current = get();
      if (current.boards[boardId]) {
        return current.boards[boardId];
      }
      const board = await rpc.egress.getBoard({ boardId });
      set((s) => ({
        boards: { ...s.boards, [boardId]: board },
      }));
      return board;
    },

    listBoards: async () => {
      const boards = await rpc.egress.listBoards({});
      set((s) => {
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
      set((s) => ({
        boards: { ...s.boards, [board.id]: board },
      }));
      return board;
    },

    deleteBoard: (boardId: string) => {
      set((s) => {
        const nextBoards = { ...s.boards };
        delete nextBoards[boardId];
        return { boards: nextBoards };
      });
    },

    setBoardContent: (boardId: string, content: string[]) => {
      set((s) => {
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
      const id = generateId();
      set((s) => {
        const targetBoardId = boardId || s.workspace?.homeBoardId;
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
      set((s) => {
        const targetBoardId = boardId || s.workspace?.homeBoardId;
        if (!targetBoardId || !s.boards[targetBoardId]) return s;

        const board = s.boards[targetBoardId];
        const nextElements = { ...board.elements };
        delete nextElements[elementId];

        // remove from stacks
        for (const [id, el] of Object.entries(nextElements)) {
          if (el.type === "stack" && el.content.includes(elementId)) {
            nextElements[id] = {
              ...el,
              content: el.content.filter((cid) => cid !== elementId),
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
      set((s) => {
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
      set((s) => {
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
      set((s) => {
        const nextBoards = { ...s.boards };
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
      set((s) => {
        const nextBoards = { ...s.boards };
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
      set((s) => {
        const nextBoards = { ...s.boards };
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
      set((s) => {
        const nextBoards = { ...s.boards };
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
      const current = get();
      if (current.modules[moduleId]) {
        return current.modules[moduleId];
      }
      const moduleData = await rpc.egress.getModule({ moduleId });
      set((s) => ({
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
      set((s) => ({
        modules: {
          ...s.modules,
          [res.id]: { latestVersionId: res.latestVersionId },
        },
      }));
      return res;
    },
  }));

  // Sync changes back to host with debounce
  let boardSyncTimeouts: Record<string, any> = {};
  engine.subscribe((curr, prev) => {
    for (const boardId in curr.boards) {
      if (curr.boards[boardId] !== prev.boards[boardId]) {
        if (boardSyncTimeouts[boardId])
          clearTimeout(boardSyncTimeouts[boardId]);
        boardSyncTimeouts[boardId] = setTimeout(() => {
          rpc.egress.boardChanged({
            boardId,
            board: curr.boards[boardId],
          });
        }, 500);
      }
    }
  });

  // set rpc handlers
  rpc.setHandlers({
    init: ({ workspace }: { workspace: WorkspaceData }) => {
      engine.getState().setWorkspace(workspace);
      rpc.egress.ready({});
    },
    modeChanged: ({ mode }) => {
      engine.getState().setMode(mode);
    },
    selectionChanged: ({ selection }) => {
      engine.getState().setSelection(selection);
    },
    locationChanged: ({ location }) => {
      engine.getState().setLocation(location);
    },

    // mutations
    setHomeBoardId: async ({ homeBoardId }) => {
      alert(homeBoardId);
      engine.getState().setHomeBoardId(homeBoardId);
    },
    updateWorkspace: async ({ workspace }) => {
      engine.getState().updateWorkspace(workspace);
    },
    setBoardContent: async ({ boardId, content }) => {
      engine.getState().setBoardContent(boardId, content);
    },
    addElement: async ({ boardId, containerId, element }) => {
      return engine.getState().addElement(containerId, element, boardId);
    },
    deleteElement: async ({ boardId, elementId }) => {
      engine.getState().deleteElement(elementId, boardId);
    },
    setElementStyle: ({ id, style }) => {
      engine.getState().setElementStyle(id, style);
    },
    setElementProps: ({ id, props }) => {
      engine.getState().setElementProps(id, props);
    },
    setStackContent: async ({ id, content }) => {
      engine.getState().setStackContent(id, content);
    },
    setBlockModule: ({ id, moduleId, moduleVersionId }) => {
      engine.getState().setBlockModule(id, moduleId, moduleVersionId);
    },
    setBoardStyle: ({ boardId, style }) => {
      engine.getState().setBoardStyle(boardId, style);
    },
  });

  // connect to host
  rpc.egress.connect({});

  return engine;
}
