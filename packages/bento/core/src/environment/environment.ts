import {
  Component,
  ComponentStore,
  createComponentStore,
} from "./component.js";
import { createDomManager, DomManager } from "./dom.js";
import { createInteractionManager, InteractionManager } from "./interaction.js";
import { createOverlayManager, OverlayManager } from "./overlay.js";
import { createServiceStore, ServiceStore } from "./service.js";

export type SessionApi = {
  user: { id: string; name: string; email: string; picture: string };
  team: { id: string; name: string; picture: string };
};

export type WorkspaceApi = {
  goTo: (args: { boardId: string; params?: Record<string, string> }) => void;
};

export type Environment = {
  sessionApi: SessionApi;
  workspaceApi: WorkspaceApi;
  serviceStore: ServiceStore;
  componentStore: ComponentStore;
  domManager: DomManager;
  interactionManager: InteractionManager;
  overlayManager: OverlayManager;
};

export function createEnvironment({
  sessionApi,
  workspaceApi,
  components,
  fallbackComponent,
  errorComponent,
}: {
  sessionApi: SessionApi;
  workspaceApi: WorkspaceApi;
  components?: Record<string, Component>;
  fallbackComponent?: Component;
  errorComponent?: Component;
}): Environment {
  return {
    sessionApi,
    workspaceApi,
    serviceStore: createServiceStore(),
    componentStore: createComponentStore({
      components,
      fallbackComponent,
      errorComponent,
    }),
    domManager: createDomManager(),
    interactionManager: createInteractionManager(),
    overlayManager: createOverlayManager(),
  };
}

export * from "./component.js";
export * from "./dom.js";
export * from "./interaction.js";
export * from "./overlay.js";
