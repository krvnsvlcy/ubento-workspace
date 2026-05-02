import {
  BentoEngineState,
  BentoLocalState,
  BentoLocation,
  BentoMode,
} from "./engine.js";
import {
  BoardData,
  ModuleData,
  StableModuleReference,
  WorkspaceData,
} from "./models.js";

export type BentoEngineHostRpcInterface = {
  // connection
  connect: (payload: {}) => void; // sent to initialize connection with the host
  ready: (payload: {}) => void; // sent when engine is ready

  // board
  getBoard: (payload: { boardId: string }) => Promise<BoardData>;
  listBoards: (payload: {}) => Promise<BoardData[]>;
  createBoard: (payload: { name?: string }) => Promise<BoardData>;

  // modules
  getModule: (payload: { moduleId: string }) => Promise<ModuleData>;
  listModules: (payload: any) => Promise<ModuleData[]>;
  createModule: (payload: { name: string }) => Promise<ModuleData>;
  readModule: (payload: StableModuleReference) => Promise<string>;

  // external state
  goTo: (payload: { location: BentoLocation }) => void;
  setMode: (payload: { mode: BentoMode }) => void;

  // Sync
  localStateChanged: (payload: BentoLocalState) => void;
  boardChanged: (payload: { boardId: string; board: BoardData }) => void;
};

export type BentoEngineRuntimeRpcInterface = {
  // connection
  init: (payload: {
    state: BentoEngineState;
    publicModuleUrlTemplate: string;
  }) => void;

  // Engine state
  setMode: (payload: { mode: BentoMode }) => void;
  setLocation: (payload: { location: BentoLocation }) => void;

  updateWorkspace: (payload: { workspace: WorkspaceData }) => void;
  updateBoard: (payload: {
    boardId: string;
    board: Partial<BoardData>;
  }) => void;
  updateModule: (payload: {
    moduleId: string;
    module: Partial<ModuleData>;
  }) => void;
};
