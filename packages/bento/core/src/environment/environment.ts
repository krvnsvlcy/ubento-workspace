import { Component, ComponentStore, createComponentStore } from "./component";
import { createDomManager, DomManager } from "./dom";
import { createInteractionManager, InteractionManager } from "./interaction";

export type Environment = {
  componentStore: ComponentStore;
  domManager: DomManager;
  interactionManager: InteractionManager;
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
  };
}

export * from "./component";
export * from "./dom";
export * from "./interaction";
