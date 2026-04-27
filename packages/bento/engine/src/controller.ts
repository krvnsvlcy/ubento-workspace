import { createContext, useContext } from "react";
import { StoreApi } from "zustand";
import { BaseStyle, BoardData, ElementData, ModuleData } from "./models.js";

export type EngineMode = "live" | "edit";

export type EngineLocation = {
  boardId: string;
  params: Record<string, string>;
};

export type WorkspaceContext = {
  mode: EngineMode;
  location?: EngineLocation;
  selectionScope?: string;
  selection: string[];
};

export type EngineState = WorkspaceContext & {
  boards: Record<string, BoardData>;
  modules: Record<string, ModuleData>;
};

export type EngineStore = EngineState & {
  // interaction
  toggleMode: () => void;

  // selection
  select: (blockIds: string[], toggle?: boolean) => void;
  focusSelectionScope: (scope: string) => void;
  blurSelectionScope: () => void;

  // navigation
  goTo: (boardId: string, params?: Record<string, string>) => void;

  // content retrieval
  getBoard: (boardId: string) => Promise<BoardData>;
  listBoards: () => Promise<BoardData[]>;
  createBoard: (name?: string) => Promise<BoardData>;
  getModule: (moduleId: string) => Promise<ModuleData>;
  resolveModuleValue: (moduleId: string, versionId: string) => Promise<any>;

  // mutators
  setElementStyle: (id: string, style: Partial<BaseStyle>) => void;
  setElementProps: (id: string, props: any) => void;
  setStackContent: (id: string, content: string[]) => void;
  setBlockModule: (
    id: string,
    moduleId: string,
    moduleVersionId: string,
  ) => void;

  addElement: (containerId: string, element: ElementData) => string;
  deleteElement: (id: string) => void;
  replaceElement: (id: string, element: ElementData) => void;
};

export type EngineController = StoreApi<EngineStore>;

export const EngineControllerContext =
  createContext<EngineController | null>(null);

export function useEngineController() {
  const controller = useContext(EngineControllerContext);

  if (!controller) {
    throw new Error(
      "useEngineController must be used within an EngineControllerProvider",
    );
  }

  return controller;
}
