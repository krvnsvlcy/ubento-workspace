import {
  Component,
  ComponentStore,
  createComponentStore,
} from "./component.js";
import { createDomManager, DomManager } from "./dom.js";
import { createInteractionManager, InteractionManager } from "./interaction.js";
import { createOverlayManager, OverlayManager } from "./overlay.js";
import { ServiceStore } from "./service.js";

export type Environment = {
  serviceStore: ServiceStore;
  componentStore: ComponentStore;
  domManager: DomManager;
  interactionManager: InteractionManager;
  overlayManager: OverlayManager;
};

export function createEnvironment({
  components,
  fallbackComponent,
  errorComponent,
}: {
  components?: Record<string, Component>;
  fallbackComponent?: Component;
  errorComponent?: Component;
} = {}) {
  return {
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
