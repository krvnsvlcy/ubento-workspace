import React, { createContext, useContext, useMemo } from "react";
import { proxy, useSnapshot } from "valtio";
import { PageData } from "../models";
import { Element, ElementRegistryProvider } from "./element";

export interface PageRegistry {
  [key: string]: PageData;
}
export const PageRegistryContext = createContext<PageRegistry>(proxy({}));

export function PageRegistryProvider({
  children,
  registry,
}: {
  children: React.ReactNode;
  registry: PageRegistry;
}): React.JSX.Element {
  const proxyRegistry = useMemo(() => proxy(registry), [registry]);

  return (
    <PageRegistryContext.Provider value={proxyRegistry}>
      {children}
    </PageRegistryContext.Provider>
  );
}

export function Page({ id }: { id: string }): React.JSX.Element {
  const registry = useSnapshot(useContext(PageRegistryContext));
  const page = registry[id];

  if (!page) {
    return <></>;
  }

  return (
    <ElementRegistryProvider registry={page.elements as any}>
      <Element id={page.rootId} />
    </ElementRegistryProvider>
  );
}
