import { Component, ComponentStore, createComponentStore } from "./component";
import { createDomManager, DomManager } from "./dom";

export type Environment = {
  componentStore: ComponentStore;
  domManager: DomManager;
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
  };
}

export * from "./component";
export * from "./dom";
