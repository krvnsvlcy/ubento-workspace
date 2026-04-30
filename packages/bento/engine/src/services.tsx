import { ErrorView, PendingView } from "@ubento/bento-primitives";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useBentoEngine } from "./engine.js";

export const ServicesContext = createContext<Record<string, any>>({});

export function useServices() {
  return useContext(ServicesContext);
}

export function ServicesProvider({ children }: { children: React.ReactNode }) {
  const engine = useBentoEngine();
  const runtimeServices = engine.useState((s) => s.runtimeServices);
  const [resolvedServices, setResolvedServices] = useState<Record<
    string,
    any
  > | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const services = Object.entries(runtimeServices);

    if (services.length === 0) {
      setResolvedServices({});
      return;
    }

    // Function to check all services and update state
    const checkServices = () => {
      const newResolved: Record<string, any> = {};
      let anyLoading = false;
      let firstError: Error | null = null;

      for (const [name, service] of services) {
        const state = service.getState();
        if (state.status === "loading") {
          anyLoading = true;
        } else if (state.status === "error") {
          firstError = state.error;
          break;
        } else if (state.status === "ready") {
          newResolved[name] = state.api;
        }
      }

      if (firstError) {
        setError(firstError);
      } else if (!anyLoading) {
        setResolvedServices(newResolved);
      } else {
        setResolvedServices(null);
      }
    };

    // Initial check
    checkServices();

    // Subscribe to all services to re-check when they change
    const unsubscribes = services.map(([_, service]) =>
      service.subscribe(() => checkServices()),
    );

    return () => {
      unsubscribes.forEach((un) => un());
    };
  }, [runtimeServices]);

  if (error) {
    return <ErrorView message={`Failed to load services: ${error.message}`} />;
  }

  if (!resolvedServices) {
    return <PendingView message="Initializing services..." />;
  }

  return (
    <ServicesContext.Provider value={resolvedServices}>
      {children}
    </ServicesContext.Provider>
  );
}
