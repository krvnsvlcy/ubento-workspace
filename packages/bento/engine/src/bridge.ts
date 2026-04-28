import { EngineLocation, EngineMode } from "./engine.js";
import { BoardData, ElementData, ModuleData, WorkspaceData } from "./models.js";

export type HostRpcInterface = {
  // connection
  connect: (payload: {}) => void; // sent to initialize connection with the host
  ready: (payload: {}) => void; // sent when engine is ready

  // interactions
  setMode: (payload: { mode: EngineMode }) => void;
  setLocation: (payload: { location?: EngineLocation }) => void;
  setSelectionScope: (payload: { selectionScope?: string }) => void;
  setSelection: (payload: { selection: string[] }) => void;

  // content retrieval
  getBoard: (payload: { boardId: string }) => Promise<BoardData>;
  listBoards: (payload: {}) => Promise<BoardData[]>;
  createBoard: (payload: { name?: string }) => Promise<BoardData>;
  getModule: (payload: { moduleId: string }) => Promise<ModuleData>;
  getModuleArtifact: (payload: {
    moduleId: string;
    versionId: string;
  }) => Promise<string>;
  searchModules: (payload: {
    query: string;
  }) => Promise<{ id: string; name: string }[]>;
  createModule: (payload: {
    name: string;
  }) => Promise<ModuleData & { id: string }>;

  // state synchronization (events from guest)
  boardChanged: (payload: { boardId: string; board: BoardData }) => void;
  workspaceChanged: (payload: { workspace: WorkspaceData }) => void;
};

export type GuestRpcInterface = {
  // connection
  init: (payload: {
    workspace: WorkspaceData;
    moduleUrlTemplate: string;
  }) => void; // sent to initialize the guest app

  // state synchronization (events from host)
  modeChanged: (payload: { mode: EngineMode }) => void;
  locationChanged: (payload: { location?: EngineLocation }) => void;
  selectionScopeChanged: (payload: { selectionScope?: string }) => void;
  selectionChanged: (payload: { selection: string[] }) => void;

  // workspace mutators
  setHomeBoardId: (payload: { homeBoardId: string }) => Promise<void>;
  updateWorkspace: (payload: {
    workspace: Partial<WorkspaceData>;
  }) => Promise<void>;

  // board mutators
  deleteBoard: (payload: { boardId: string }) => Promise<void>;
  setBoardStyle: (payload: { boardId: string; style: any }) => void;
  setBoardContent: (payload: {
    boardId: string;
    content: string[];
  }) => Promise<void>;
  addElement: (payload: {
    boardId: string;
    containerId: string;
    element: ElementData;
  }) => Promise<string>;
  deleteElement: (payload: {
    boardId: string;
    elementId: string;
  }) => Promise<void>;

  // element mutators
  setElementStyle: (payload: { id: string; style: any }) => void;
  setElementProps: (payload: { id: string; props: any }) => void;
  setStackContent: (payload: {
    id: string;
    content: string[];
  }) => Promise<void>;
  setBlockModule: (payload: {
    id: string;
    moduleId: string;
    moduleVersionId: string;
  }) => void;
};

export type ComponentHostRpcInterface = {
  // connection
  connect: (payload: {}) => void; // sent to initialize connection with the host
  ready: (payload: {}) => void; // sent when engine is ready
};

export type ComponentGuestRpcInterface = {
  // connection
  init: (payload: { code: string; props: any }) => void; // sent to initialize the guest app

  // state synchronization (events from host)
  updateCode: (payload: { code: string }) => void;
  updateProps: (payload: { props: any }) => void;
};
