import React, { createContext, useContext, useMemo } from "react";
import { proxy } from "valtio";
import { ElementData } from "../models";
import { Component } from "./component";

export type ElementRegistry = {
  [key: string]: ElementData;
};

export const ElementRegistryContext = createContext<ElementRegistry>({});

export function ElementRegistryProvider({
  children,
  registry,
}: {
  children: React.ReactNode;
  registry: ElementRegistry;
}): React.JSX.Element {
  const proxyRegistry = useMemo(() => proxy(registry), [registry]);

  return (
    <ElementRegistryContext value={proxyRegistry}>
      {children}
    </ElementRegistryContext>
  );
}

export function Element({ id }: { id: string }): React.JSX.Element {
  const registry = useContext(ElementRegistryContext);
  const element = registry[id];
  if (!element) {
    return <></>;
  }

  return <Component id={element.component} props={element.props} />;
}
