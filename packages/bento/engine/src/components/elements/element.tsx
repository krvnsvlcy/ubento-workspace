import React, { createContext, useContext } from "react";
import { ElementData } from "../../models";
import { Block } from "./block";
import { Stack } from "./stack/stack";

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
  return (
    <ElementRegistryContext.Provider value={registry}>
      {children}
    </ElementRegistryContext.Provider>
  );
}

export function Element({ id }: { id: string }): React.JSX.Element {
  const registry = useContext(ElementRegistryContext);
  const element = registry[id];

  if (!element) {
    return <>Element {id} not found</>;
  }

  switch (element.type) {
    case "stack":
      return <Stack id={id} data={element} />;
    case "block":
      return <Block id={id} data={element} />;
    default:
      return <>Unknown element type</>;
  }
}
