import { proxy } from "valtio";

export type AppInteractionMode = "edit" | "live";

export interface AppInteractorState {
  mode: AppInteractionMode;
  scope?: string;
  selection: string[];
}

export function createAppInteractorState(init: AppInteractorState) {
  return proxy(init);
}
