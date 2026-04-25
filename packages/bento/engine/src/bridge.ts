import { EngineMode } from "./controller";
import { AppData, ModuleData, PageData } from "./models";

export type HostRpcInterface = {
  // connection
  connect: (payload: {}) => void; // sent to initialize connection with the host
  ready: (payload: {}) => void; // sent when engine is ready

  // interactions
  select: (payload: { elementIds: string[] }) => void;
  setSelectionScope: (payload: { scope?: string }) => void;
  setMode: (payload: { mode: EngineMode }) => void;
  goTo: (payload: { pageId: string; params?: Record<string, string> }) => void;

  // content retrieval
  getPage: (payload: { pageId: string }) => Promise<PageData>;
  getModule: (payload: { moduleId: string }) => Promise<ModuleData>;
};

export type GuestRpcInterface = {
  // connection
  init: (payload: { app: AppData; moduleUrlTemplate: string }) => void; // sent to initialize the guest app

  // state synchronization (events from host)
  modeChanged: (payload: { mode: EngineMode }) => void;
  selectionChanged: (payload: { elementIds: string[] }) => void;
  selectionScopeChanged: (payload: { scope?: string }) => void;
  locationChanged: (payload: { pageId: string; params?: Record<string, string> }) => void;
};


