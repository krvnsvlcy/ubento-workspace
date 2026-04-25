import { AppData, PageData } from "./models";

export type HostRpcInterface = {
  toggleMode: (payload: {}) => void;
  ready: (payload: {}) => void;

  getPage: (payload: { pageId: string }) => PageData;
  getComponent: (payload: { componentId: string }) => void;
};

export type GuestRpcInterface = {
  init: (payload: AppData) => void;
};
