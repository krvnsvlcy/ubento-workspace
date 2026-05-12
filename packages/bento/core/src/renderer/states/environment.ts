import { createContext, useContext } from "react";
import { Component, Environment } from "../../environment/environment";
import { fallbackService } from "../../environment/service";

export const EnvironmentContext = createContext<Environment | null>(null);

export function useEnvironment() {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error(
      "useEnvironmentContext must be used within a EnvironmentContext",
    );
  }
  return context;
}

// Component

export function useEnvironmentComponent(name: string): Component | undefined {
  const context = useEnvironment();
  return context.componentStore.useState((state) => state.components[name]);
}
export function useEnvironmentFallBackComponent(): Component | undefined {
  const context = useEnvironment();
  return context.componentStore.useState((state) => state.fallbackComponent);
}
export function useEnvironmentErrorComponent(): Component | undefined {
  const context = useEnvironment();
  return context.componentStore.useState((state) => state.errorComponent);
}

// Service

export function useService(name: string) {
  const environment = useEnvironment();
  return environment.serviceStore.useState(
    (state) => state.services[name] ?? fallbackService,
  );
}

// DOM & Interaction

export function useDomManager() {
  const context = useEnvironment();
  return context.domManager;
}
export function useInteractionManager() {
  const context = useEnvironment();
  return context.interactionManager;
}
