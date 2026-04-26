import type {
  EngineController,
  EngineState,
  ModuleData,
  BoardData,
} from "@ubento/engine";
import { proxy } from "valtio";
import { rpc } from "./rpc";

let MODULE_URL_TEMPLATE = ""; // to be set on init
export function setModuleUrlTemplate(template: string) {
  MODULE_URL_TEMPLATE = template;
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
} = {}): EngineController {
  const boardCache = new Map<string, BoardData>();
  const moduleCache = new Map<string, ModuleData>();
  const moduleValueCache = new Map<string, any>();

  const state = proxy<EngineState>({
    mode: "live",
    ...initialState,
  });

  const controller: EngineController = {
    state,
    toggleMode: () => {
      rpc.egress.setMode({
        mode: state.mode === "edit" ? "live" : "edit",
      });
    },
    select: (elementIds: string[], toggle?: boolean) => {
      const currentSelection = state.selection || [];
      const newSelection = toggle
        ? currentSelection.filter((id) => !elementIds.includes(id))
        : [...currentSelection, ...elementIds];
      rpc.egress.select({ elementIds: newSelection });
    },
    focusSelectionScope: (scope: string) => {
      rpc.egress.setSelectionScope({ scope });
    },
    blurSelectionScope: () => {
      rpc.egress.setSelectionScope({ scope: undefined });
    },
    goTo: (boardId: string, params: Record<string, string> = {}) => {
      rpc.egress.goTo({ boardId, params });
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
  };

  return controller;
}
