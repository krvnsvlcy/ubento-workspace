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
  return context.components?.[name];
}
export function useEnvironmentFallBackComponent(): Component | undefined {
  const context = useEnvironment();
  return context.fallBackComponent;
}
export function useEnvironmentErrorComponent(): Component | undefined {
  const context = useEnvironment();
  return context.errorComponent;
}
