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

let MODULE_URL_TEMPLATE = ""; // to be set on init
export function setModuleUrlTemplate(template: string) {
  MODULE_URL_TEMPLATE = template;
}

function generateId() {
  return Math.random().toString(36).substring(2, 11);
}

function buildModuleUrl({
  template,
  moduleId,
  versionId,
}: {
  template: string;
  moduleId: string;
  versionId: string;
}) {
  return template
    .replace("{moduleId}", moduleId)
    .replace("{versionId}", versionId);
}

export type InternalEngineStore = EngineStore & {
  setWorkspace: (workspace: WorkspaceData) => void;
  setHomeBoardId: (homeBoardId: string) => void;
  deleteBoard: (boardId: string) => void;
  setBoardContent: (boardId: string, content: string[]) => void;
  addElement: (
    boardId: string,
    containerId: string,
    element: ElementData,
  ) => string;
  deleteElement: (boardId: string, elementId: string) => void;
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
      ...initialState,

      // interaction
      toggleMode: () => {
        set((s) => {
          s.mode = s.mode === "edit" ? "live" : "edit";
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
              : [...currentSelection, ...elementIds],
          ),
        ];

        rpc.egress.updateContext({
          selection: nextSelection,
        });
      },

      focusSelectionScope: (scope: string) => {
        set((s) => {
          s.selectionScope = scope;
        });
      },

      blurSelectionScope: () => {
        set((s) => {
          s.selectionScope = undefined;
        });
      },

      // navigation
      goTo: (boardId: string, params: Record<string, string> = {}) => {
        set((s) => {
          s.location = { boardId, params };
        });
      },

      // content retrieval
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
        const boardData = await rpc.egress.createBoard({
          name,
        });
        set((s) => {
          s.boards[boardData.id] = boardData;
        });
        return boardData;
      },

      getBoard: async (boardId: string) => {
        const current = get();
        if (current.boards[boardId]) {
          return current.boards[boardId];
        }
        const boardData = await rpc.egress.getBoard({ boardId });
        set((s) => {
          s.boards[boardId] = boardData;
        });
        return boardData;
      },

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
        if (!MODULE_URL_TEMPLATE) {
          throw new Error(
            "Module URL template not set. Make sure the engine is initialized before calling this method.",
          );
        }

        const url = buildModuleUrl({
          template: MODULE_URL_TEMPLATE,
          moduleId,
          versionId,
        });

        const cachedValue = moduleValueCache.get(url);
        if (cachedValue) return cachedValue;

        const mod = await import(url);
        moduleValueCache.set(url, mod);
        return mod;
      },

      // mutations
      setWorkspace: (workspace: WorkspaceData) => {
        // sync if needed
      },
      setHomeBoardId: (homeBoardId: string) => {
        // sync if needed
      },
      deleteBoard: (boardId: string) => {
        set((s) => {
          delete s.boards[boardId];
        });
      },
      setBoardContent: (boardId: string, content: string[]) => {
        set((s) => {
          const board = s.boards[boardId];
          if (board) {
            board.content = content;
          }
        });
      },
      addElement: (boardId, containerId, element) => {
        const elementId = generateId();
        set((s) => {
          const board = s.boards[boardId];
          if (!board) return;
          board.elements[elementId] = element;

          if (containerId === "root") {
            board.content.push(elementId);
          } else {
            const container = board.elements[containerId];
            if (container && container.type === "stack") {
              container.content.push(elementId);
            }
          }
        });
        return elementId;
      },
      deleteElement: (boardId, elementId) => {
        set((s) => {
          const board = s.boards[boardId];
          if (!board) return;

          delete board.elements[elementId];

          const removeFromContent = (content: string[]) => {
            const index = content.indexOf(elementId);
            if (index > -1) {
              content.splice(index, 1);
              return true;
            }
            return false;
          };

          if (!removeFromContent(board.content)) {
            for (const el of Object.values(board.elements)) {
              if (el.type === "stack") {
                if (removeFromContent(el.content)) break;
              }
            }
          }
        });
      },
      setElementStyle: (id, style) => {
        set((s) => {
          const boardId = s.location?.boardId;
          if (!boardId) return;
          const board = s.boards[boardId];
          if (!board) return;
          const element = board.elements[id];
          if (!element) return;
          element.style = { ...(element.style || {}), ...style } as any;
        });
      },
      setElementProps: (id, props) => {
        set((s) => {
          const boardId = s.location?.boardId;
          if (!boardId) return;
          const board = s.boards[boardId];
          if (!board) return;
          const element = board.elements[id];
          if (!element || element.type !== "block") return;
          element.props = { ...(element.props || {}), ...props };
        });
      },
      setStackContent: (id, content) => {
        set((s) => {
          const boardId = s.location?.boardId;
          if (!boardId) return;
          const board = s.boards[boardId];
          if (!board) return;
          const element = board.elements[id];
          if (!element || element.type !== "stack") return;
          element.content = content;
        });
      },
      setBlockModule: (id, moduleId, moduleVersionId) => {
        set((s) => {
          const boardId = s.location?.boardId;
          if (!boardId) return;
          const board = s.boards[boardId];
          if (!board) return;
          const element = board.elements[id];
          if (!element || element.type !== "block") return;
          element.moduleId = moduleId;
          element.moduleVersionId = moduleVersionId;
        });
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
