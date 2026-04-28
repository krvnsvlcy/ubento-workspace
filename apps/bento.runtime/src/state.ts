import type {
  BaseStyle,
  ElementData,
  EngineState,
  EngineStore,
  WorkspaceData,
} from "@ubento/engine";
import { immer } from "zustand/middleware/immer";
import { createStore } from "zustand/vanilla";
import { rpc } from "./rpc";

function generateId() {
  return Math.random().toString(36).substring(2, 11);
}

export type InternalEngineStore = EngineStore & {
  workspace: WorkspaceData | null;
  setWorkspace: (workspace: WorkspaceData) => void;
  setHomeBoardId: (homeBoardId: string) => void;
  updateWorkspace: (workspace: Partial<WorkspaceData>) => void;
  deleteBoard: (boardId: string) => void;
  setBoardContent: (boardId: string, content: string[]) => void;
  addElement: (
    containerId: string,
    element: ElementData,
    boardId?: string,
  ) => string;
  deleteElement: (elementId: string, boardId?: string) => void;
  replaceElement: (id: string, element: ElementData) => void;
  setBoardStyle: (boardId: string, style: Partial<BaseStyle>) => void;
  setElementStyle: (id: string, style: Partial<BaseStyle>) => void;
  setElementProps: (id: string, props: any) => void;
  setStackContent: (id: string, content: string[]) => void;
  setBlockModule: (
    id: string,
    moduleId: string,
    moduleVersionId: string,
  ) => void;
};

export function createEngineController({
  initialState,
}: {
  initialState?: Partial<EngineState>;
} = {}) {
  const moduleValueCache = new Map<string, any>();

  const store = createStore<InternalEngineStore>()(
    immer((set, get) => ({
      mode: "edit",
      selection: [],
      boards: {},
      modules: {},
      workspace: null,
      ...initialState,

      // interaction
      toggleMode: () => {
        rpc.egress.updateContext({
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

        rpc.egress.updateContext({
          selection: nextSelection,
        });
      },

      focusSelectionScope: (scope: string) => {
        rpc.egress.updateContext({
          selectionScope: scope,
        });
      },

      blurSelectionScope: () => {
        rpc.egress.updateContext({
          selectionScope: undefined,
        });
      },

      // navigation
      goTo: (boardId: string, params?: Record<string, string>) => {
        rpc.egress.updateContext({
          location: { boardId, params: params || {} },
        });
      },

      // workspace mutators
      setWorkspace: (workspace: WorkspaceData) => {
        set((s) => {
          s.workspace = workspace;
        });
      },

      setHomeBoardId: (homeBoardId: string) => {
        set((s) => {
          if (s.workspace) {
            s.workspace.homeBoardId = homeBoardId;
          }
        });
      },
      updateWorkspace: (workspace: Partial<WorkspaceData>) => {
        set((s) => {
          if (s.workspace) {
            Object.assign(s.workspace, workspace);
          }
        });
      },

      // board mutators
      getBoard: async (boardId: string) => {
        const current = get();
        if (current.boards[boardId]) {
          return current.boards[boardId];
        }
        const board = await rpc.egress.getBoard({ boardId });
        set((s) => {
          s.boards[boardId] = board;
        });
        return board;
      },

      listBoards: async () => {
        const boards = await rpc.egress.listBoards({});
        set((s) => {
          for (const board of boards) {
            s.boards[board.id] = board;
          }
        });
        return boards;
      },

      createBoard: async (name?: string) => {
        const board = await rpc.egress.createBoard({ name });
        set((s) => {
          s.boards[board.id] = board;
        });
        return board;
      },

      deleteBoard: (boardId: string) => {
        set((s) => {
          delete s.boards[boardId];
        });
      },

      setBoardContent: (boardId: string, content: string[]) => {
        set((s) => {
          if (s.boards[boardId]) {
            s.boards[boardId].content = content;
          }
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
          if (!targetBoardId || !s.boards[targetBoardId]) return;

          const board = s.boards[targetBoardId];
          board.elements[id] = element;

          const container = board.elements[containerId];
          if (container && container.type === "stack") {
            container.content.push(id);
          }
        });
        return id;
      },

      deleteElement: (elementId: string, boardId?: string) => {
        set((s) => {
          const targetBoardId = boardId || s.workspace?.homeBoardId;
          if (!targetBoardId || !s.boards[targetBoardId]) return;

          const board = s.boards[targetBoardId];
          delete board.elements[elementId];

          // remove from stacks
          for (const el of Object.values(board.elements)) {
            if (el.type === "stack") {
              el.content = el.content.filter((id) => id !== elementId);
            }
          }

          // remove from board content
          board.content = board.content.filter((id) => id !== elementId);
        });
      },

      replaceElement: (id: string, element: ElementData) => {
        set((s) => {
          // find which board has this element
          for (const board of Object.values(s.boards)) {
            if (board.elements[id]) {
              board.elements[id] = element;
              break;
            }
          }
        });
      },

      setBoardStyle: (boardId: string, style: Partial<BaseStyle>) => {
        set((s) => {
          if (s.boards[boardId]) {
            s.boards[boardId].style = {
              ...s.boards[boardId].style,
              ...style,
            };
          }
        });
      },

      // element mutators
      setElementStyle: (id: string, style: Partial<BaseStyle>) => {
        set((s) => {
          for (const board of Object.values(s.boards)) {
            if (board.elements[id]) {
              board.elements[id].style = {
                ...board.elements[id].style,
                ...style,
              } as any;
              break;
            }
          }
        });
      },

      setElementProps: (id: string, props: any) => {
        set((s) => {
          for (const board of Object.values(s.boards)) {
            const el = board.elements[id];
            if (el && el.type === "block") {
              el.props = {
                ...el.props,
                ...props,
              };
              break;
            }
          }
        });
      },

      setStackContent: (id: string, content: string[]) => {
        set((s) => {
          for (const board of Object.values(s.boards)) {
            const el = board.elements[id];
            if (el && el.type === "stack") {
              el.content = content;
              break;
            }
          }
        });
      },

      setBlockModule: (
        id: string,
        moduleId: string,
        moduleVersionId: string,
      ) => {
        set((s) => {
          for (const board of Object.values(s.boards)) {
            const el = board.elements[id];
            if (el && el.type === "block") {
              el.moduleId = moduleId;
              el.moduleVersionId = moduleVersionId;
              break;
            }
          }
        });
      },

      // external data retrieval
      getModule: async (moduleId: string) => {
        const current = get();
        if (current.modules[moduleId]) {
          return current.modules[moduleId];
        }
        const moduleData = await rpc.egress.getModule({ moduleId });
        set((s) => {
          s.modules[moduleId] = moduleData;
        });
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
        set((s) => {
          s.modules[res.id] = { latestVersionId: res.latestVersionId };
        });
        return res;
      },
    })),
  );

  // Sync changes back to host with debounce
  let boardSyncTimeouts: Record<string, any> = {};
  store.subscribe((curr, prev) => {
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

  return store;
}
