import { proxy } from "valtio";

export interface ElementData {
  component: string;
  props?: Record<string, any>;
}
export interface PageData {
  id: string;
  rootId: string;
  elements: Record<string, ElementData>;
}
export interface AppData {
  id: string;
  routes: Record<string, string>; // path -> componentId
}

export function createApp(init: AppData) {
  return proxy(init);
}
export function createPage(init: PageData) {
  return proxy(init);
}
