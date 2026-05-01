import { ErrorView, PendingView } from "@ubento/bento-primitives";
import React, { createContext, useContext, useMemo } from "react";
import { useBentoEngine } from "../engine/engine";
import { ServiceData } from "../models";

export const ServicesContext = createContext<Record<string, any>>({});

export function useServices() {
  return useContext(ServicesContext);
}

function ServiceProviderResolver({
  children,
  servicesList,
}: {
  children: React.ReactNode;
  servicesList: [string, ServiceData][];
}) {
  const engine = useBentoEngine();

  const snapshots: {
    name: string;
    snapshot: ReturnType<typeof engine.serviceManager.useService>;
  }[] = [];

  // 1. Loop through services directly from the pre-sorted prop.
  // We must disable the React hooks lint rule here. Because the parent forces a
  // total component remount whenever the list of services changes (via the `key` prop),
  // the number and order of hooks here is mathematically strictly constant per mount.
  for (const [name, service] of servicesList) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const snapshot = engine.serviceManager.useService(
      service.module,
      service.args,
    );
    snapshots.push({ name, snapshot });
  }

  // 2. Compute derived state BEFORE any early component returns
  const isPending = snapshots.some((s) => s.snapshot.status === "pending");
  const errorSnapshot = snapshots.find((s) => s.snapshot.status === "error");

  // 3. Extract instances to form a stable dependency array for memoization
  const serviceInstances = snapshots.map((s) => s.snapshot.service);

  // 4. Memoize the context value to prevent cascading app-wide re-renders
  const values = useMemo(() => {
    const map: Record<string, any> = {};
    for (let i = 0; i < snapshots.length; i++) {
      map[snapshots[i].name] = serviceInstances[i];
    }
    return map;
  }, [...serviceInstances]);

  // 5. Handle UI boundaries safely now that hooks have finished executing
  if (isPending) {
    return <PendingView message="Loading services..." />;
  }

  if (errorSnapshot) {
    return (
      <ErrorView
        error={`Failed to load service '${errorSnapshot.name}': ${errorSnapshot.snapshot.error}`}
      />
    );
  }

  return (
    <ServicesContext.Provider value={values}>
      {children}
    </ServicesContext.Provider>
  );
}

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const engine = useBentoEngine();
  const services = (engine.useState((s) => s.workspace.services) ||
    {}) as Record<string, ServiceData>;

  // 1. Convert the services object into a sorted array of tuples.
  // This guarantees deterministic ordering for the hooks in the child component.
  const sortedServicesList = useMemo(() => {
    return Object.entries(services).sort(([a], [b]) => a.localeCompare(b));
  }, [services]);

  // 2. Generate the remount key based on the sorted keys
  const servicesKey = useMemo(() => {
    const keys = sortedServicesList.map(([name]) => name);
    return `${keys.length}-${keys.join(",")}`;
  }, [sortedServicesList]);

  return (
    <ServiceProviderResolver
      key={servicesKey}
      servicesList={sortedServicesList}
    >
      {children}
    </ServiceProviderResolver>
  );
}
