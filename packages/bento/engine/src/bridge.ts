import { WorkspaceContext } from "./controller.js";
import { BoardData, ElementData, ModuleData, WorkspaceData } from "./models.js";

export type HostRpcInterface = {
  // connection
  connect: (payload: {}) => void; // sent to initialize connection with the host
  ready: (payload: {}) => void; // sent when engine is ready

  // interactions
  updateContext: (payload: { context: WorkspaceContext }) => void;

  // content retrieval
  getBoard: (payload: { boardId: string }) => Promise<BoardData>;
  listBoards: (payload: {}) => Promise<BoardData[]>;
  createBoard: (payload: { name?: string }) => Promise<BoardData>;
  getModule: (payload: { moduleId: string }) => Promise<ModuleData>;

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
  contextChanged: (payload: { context: WorkspaceContext }) => void;

  // workspace mutators
  setHomeBoardId: (payload: { homeBoardId: string }) => Promise<void>;

  // board mutators
  deleteBoard: (payload: { boardId: string }) => Promise<void>;
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
