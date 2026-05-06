import { createContext, useContext } from "react";
import { Component, Environment } from "../../environment/environment";

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
export function useDomManager() {
  const context = useEnvironment();
  return context.domManager;
}
export function useComponentStore() {
  const context = useEnvironment();
  return context.componentStore;
}
export function useInteractionManager() {
  const context = useEnvironment();
  return context.interactionManager;
}
