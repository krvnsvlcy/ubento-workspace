import { controller } from "./controller.js";
import { DevToolView, DevToolOptions } from "./view.js";
import { StoreApi } from "zustand";

/**
 * Register a store to the devtool.
 * @param name Unique name for the store
 * @param store The Zustand store API
 */
export function registerStore(name: string, store: StoreApi<any>) {
  controller.getState().addStore(name, store);
}

/**
 * Unregister a store from the devtool.
 * @param name The name of the store to remove
 */
export function unregisterStore(name: string) {
  controller.getState().removeStore(name);
}

/**
 * Initialize the devtool UI.
 * @param options UI configuration options
 */
export function initDevTool(options?: DevToolOptions) {
  return new DevToolView(options);
}

export { controller } from "./controller.js";
export { DevToolView } from "./view.js";
export type { DevToolOptions } from "./view.js";
