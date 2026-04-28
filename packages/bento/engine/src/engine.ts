import { createContext, useContext } from "react";
import { ExtractState, StoreApi } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";
import {
  BaseStyle,
  BoardData,
  ElementData,
  ModuleData,
  WorkspaceData,
} from "./models.js";

export type EngineMode = "live" | "edit";

export type EngineLocation = {
  boardId: string;
  params: Record<string, string>;
};

export type EngineState = {
  mode: EngineMode;
  location?: EngineLocation;

  selectionScope?: string;
  selection: string[];

  workspace: WorkspaceData | null;
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
  searchModules: (query: string) => Promise<{ id: string; name: string }[]>;
  createModule: (name: string) => Promise<ModuleData & { id: string }>;

  // mutators
  setMode: (mode: EngineMode) => void;
  setWorkspace: (workspace: WorkspaceData) => void;
  setSelection: (selection: string[]) => void;

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

export type EngineStoreApi = StoreApi<EngineStore>;

export const EngineContext = createContext<EngineStoreApi | null>(null);

export function useEngine(): ExtractState<EngineStoreApi>;
export function useEngine<U>(
  selector: (state: ExtractState<EngineStoreApi>) => U,
): U;
export function useEngine<U>(
  selector: (state: ExtractState<EngineStoreApi>) => U,
  equalityFn: (a: U, b: U) => boolean,
): U;
export function useEngine<U>(
  selector?: (state: ExtractState<EngineStoreApi>) => U,
  equalityFn?: (a: U, b: U) => boolean,
) {
  const controller = useContext(EngineContext);

  if (!controller) {
    throw new Error(
      "useEngine must be used within an EngineControllerProvider",
    );
  }

  if (selector) {
    // Use useStoreWithEqualityFn to support the 3rd argument
    return useStoreWithEqualityFn(controller, selector, equalityFn);
  } else {
    return useStoreWithEqualityFn(controller);
  }
}
