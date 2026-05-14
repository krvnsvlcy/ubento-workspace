import {
  Component,
  ComponentStore,
  createComponentStore,
} from "./component.js";
import { createDomManager, DomManager } from "./dom.js";
import { createInteractionManager, InteractionManager } from "./interaction.js";
import { createOverlayManager, OverlayManager } from "./overlay.js";

export type SessionApi = {
  user: { id: string; name: string; email: string; picture: string };
  team: { id: string; name: string; picture: string };
};

export type WorkspaceApi = {
  goTo: (args: { boardId: string; params?: Record<string, string> }) => void;
};
export type ServiceApi = {
  runQuery: ({
    service,
    query,
    args,
  }: {
    service: string;
    query: string;
    args?: Record<string, unknown>;
  }) => Promise<unknown>;
  runAction: ({
    service,
    action,
    args,
  }: {
    service: string;
    action: string;
    args?: Record<string, unknown>;
  }) => Promise<unknown>;
};

export type Environment = {
  sessionApi: SessionApi;
  workspaceApi: WorkspaceApi;
  serviceApi: ServiceApi;
  componentStore: ComponentStore;
  domManager: DomManager;
  interactionManager: InteractionManager;
  overlayManager: OverlayManager;
};

export function createEnvironment({
  sessionApi,
  workspaceApi,
  serviceApi,
  components,
  fallbackComponent,
  errorComponent,
}: {
  sessionApi: SessionApi;
  workspaceApi: WorkspaceApi;
  serviceApi: ServiceApi;
  components?: Record<string, Component>;
  fallbackComponent?: Component;
  errorComponent?: Component;
}): Environment {
  return {
    sessionApi,
    workspaceApi,
    serviceApi,
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
