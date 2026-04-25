import { AppData } from "./models";

export type HostRpcInterface = {
  toggleMode: (payload: {}) => void;
  ready: (payload: {}) => void;
};

export type GuestRpcInterface = {
  init: (payload: AppData) => void;
};
