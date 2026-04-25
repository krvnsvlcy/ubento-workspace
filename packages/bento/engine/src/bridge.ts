import { AppData, ModuleData, PageData } from "./models";

export type HostRpcInterface = {
  toggleMode: (payload: {}) => void;
  ready: (payload: {}) => void;

  getPage: (payload: { pageId: string }) => Promise<PageData>;
  getModule: (payload: { moduleId: string }) => Promise<ModuleData>;
};

export type GuestRpcInterface = {
  init: (payload: AppData) => void;
};
