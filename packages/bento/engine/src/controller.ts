import { createContext, useContext } from "react";
import { BoardData, ModuleData } from "./models.js";

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

export type EngineState = WorkspaceContext;

export type EngineController = {
  state: EngineState;

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
};

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
