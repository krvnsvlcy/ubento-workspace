import type {
  BaseStyle,
  BoardData,
  ElementData,
  EngineController,
  EngineState,
  ModuleData,
  WorkspaceData,
} from "@ubento/engine";
import { proxy, snapshot, subscribe } from "valtio";
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

export function createEngineController({
  initialState,
}: {
  initialState?: Partial<EngineState>;
} = {}): EngineController & {
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
} {
  const boardCache = new Map<string, BoardData>();
  const moduleCache = new Map<string, ModuleData>();
  const moduleValueCache = new Map<string, any>();
  let workspaceProxy: WorkspaceData | null = null;

  const state = proxy<EngineState>({
    mode: "edit",
    selection: [],
    ...initialState,
  });

  const controller = {
    state,
    toggleMode: () => {
      state.mode = state.mode === "edit" ? "live" : "edit";
    },
    select: (elementIds: string[], toggle?: boolean) => {
      const currentSelection = state.selection || [];
      state.selection = toggle
        ? currentSelection.filter((id) => !elementIds.includes(id))
        : [...currentSelection, ...elementIds];
    },
    focusSelectionScope: (scope: string) => {
      state.selectionScope = scope;
    },
    blurSelectionScope: () => {
      state.selectionScope = undefined;
    },
    goTo: (boardId: string, params: Record<string, string> = {}) => {
      state.location = { boardId, params };
    },
    listBoards: async () => {
      const boards = await rpc.egress.listBoards({});
      return boards.map((p) => {
        const board = proxy(p);
        boardCache.set(p.id, board);
        return board;
      });
    },
    createBoard: async (name) => {
      const boardData = await rpc.egress.createBoard({
        name,
      });
      const board = proxy(boardData);
      boardCache.set(boardData.id, board);
      return board;
    },
    getBoard: async (boardId: string) => {
      const cachedBoard = boardCache.get(boardId);
      if (cachedBoard) {
        return cachedBoard;
      }
      const boardData = await rpc.egress.getBoard({ boardId });
      const board = proxy(boardData);

      // Sync changes back to host with debounce
      let timeout: any;
      subscribe(board, () => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          rpc.egress.boardChanged({
            boardId,
            board: snapshot(board) as BoardData,
          });
        }, 500);
      });

      boardCache.set(boardId, board);
      return board;
    },
    getModule: async (moduleId: string) => {
      const cachedModule = moduleCache.get(moduleId);
      if (cachedModule) {
        return cachedModule;
      }
      const moduleData = await rpc.egress.getModule({ moduleId });
      const module = proxy(moduleData);
      moduleCache.set(moduleId, module);
      return module;
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

      return await import(url);
    },

    // internal helpers for RPC
    setWorkspace: (workspace: WorkspaceData) => {
      workspaceProxy = proxy(workspace);
      // Sync changes back to host with debounce
      let timeout: any;
      subscribe(workspaceProxy, () => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          rpc.egress.workspaceChanged({
            workspace: snapshot(workspaceProxy!) as WorkspaceData,
          });
        }, 500);
      });
    },
    setHomeBoardId: (homeBoardId: string) => {
      if (!workspaceProxy) return;
      workspaceProxy.homeBoardId = homeBoardId;
    },
    deleteBoard: (boardId: string) => {
      boardCache.delete(boardId);
      // Note: Actual deletion from persistence is usually handled by host if needed,
      // but here we just remove it from cache.
    },
    setBoardContent: (boardId: string, content: string[]) => {
      const board = boardCache.get(boardId);
      if (!board) return;
      board.content = content;
    },
    addElement: (
      boardId: string,
      containerId: string,
      element: ElementData,
    ) => {
      const board = boardCache.get(boardId);
      if (!board) return "";
      const elementId = generateId();
      board.elements[elementId] = element;

      if (containerId === "root") {
        board.content.push(elementId);
      } else {
        const container = board.elements[containerId];
        if (container && container.type === "stack") {
          container.content.push(elementId);
        }
      }
      return elementId;
    },
    deleteElement: (boardId: string, elementId: string) => {
      const board = boardCache.get(boardId);
      if (!board) return;

      // Remove from elements record
      delete board.elements[elementId];

      // Remove from any content arrays
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
    },
    setElementStyle: (id: string, style: Partial<BaseStyle>) => {
      const boardId = state.location?.boardId;
      if (!boardId) return;
      const board = boardCache.get(boardId);
      if (!board) return;
      const element = board.elements[id];
      if (!element) return;
      element.style = { ...(element.style || {}), ...style } as any;
    },
    setElementProps: (id: string, props: any) => {
      const boardId = state.location?.boardId;
      if (!boardId) return;
      const board = boardCache.get(boardId);
      if (!board) return;
      const element = board.elements[id];
      if (!element || element.type !== "block") return;
      element.props = { ...(element.props || {}), ...props };
    },
    setStackContent: (id: string, content: string[]) => {
      const boardId = state.location?.boardId;
      if (!boardId) return;
      const board = boardCache.get(boardId);
      if (!board) return;
      const element = board.elements[id];
      if (!element || element.type !== "stack") return;
      element.content = content;
    },
    setBlockModule: (id: string, moduleId: string, moduleVersionId: string) => {
      const boardId = state.location?.boardId;
      if (!boardId) return;
      const board = boardCache.get(boardId);
      if (!board) return;
      const element = board.elements[id];
      if (!element || element.type !== "block") return;
      element.moduleId = moduleId;
      element.moduleVersionId = moduleVersionId;
    },
  };

  return controller;
}
