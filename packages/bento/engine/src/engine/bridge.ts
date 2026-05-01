import { BentoEngineState } from "./engine.js";
import { BoardData, ModuleData, StableModuleReference } from "./models.js";

export type BentoEngineHostRpcInterface = {
  // connection
  connect: (payload: {}) => void; // sent to initialize connection with the host
  ready: (payload: {}) => void; // sent when engine is ready

  // board
  getBoard: (payload: { boardId: string }) => Promise<BoardData>;
  listBoards: (payload: {}) => Promise<BoardData[]>;
  createBoard: (payload: { name?: string }) => Promise<BoardData>;
  updateBoard: (payload: {
    boardId: string;
    updates: Partial<BoardData>;
  }) => Promise<BoardData>;
  deleteBoard: (payload: { boardId: string }) => Promise<void>;

  // modules
  getModule: (payload: { moduleId: string }) => Promise<ModuleData>;
  readModule: (payload: StableModuleReference) => Promise<string>;

  // Sync
  engineStateChanged: (payload: BentoEngineState) => void;
  boardChanged: (payload: { boardId: string; board: BoardData }) => void;
};

export type BentoEngineRuntimeRpcInterface = {
  // connection
  init: (payload: {
    state: BentoEngineState;
    publicModuleUrlTemplate: string;
  }) => void;

  // Engine state
  updateEngineState: (payload: Partial<BentoEngineState>) => void;
  updateBoard: (payload: {
    boardId: string;
    board: Partial<BoardData>;
  }) => void;
  updateModule: (payload: {
    moduleId: string;
    module: Partial<ModuleData>;
  }) => void;
};
