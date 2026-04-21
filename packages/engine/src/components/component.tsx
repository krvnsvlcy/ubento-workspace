import React, { createContext, useContext, useMemo } from "react";
import { proxy } from "valtio";
import { container } from "./core/container";
import { text } from "./core/text";

export type ComponentRegistry = Record<string, React.ComponentType<any>>;
const coreComponents: ComponentRegistry = {
  [text.name]: text.component,
  [container.name]: container.component,
};

export const ComponentRegistryContext = createContext<ComponentRegistry>(
  proxy(coreComponents),
);

export function ComponentRegistryProvider({
  registry,
  children,
}: {
  registry: ComponentRegistry;
  children: React.ReactNode;
}) {
  const proxyRegistry = useMemo(
    () => proxy({ ...coreComponents, ...registry }),
    [registry],
  );
  return (
    <ComponentRegistryContext value={proxyRegistry}>
      {children}
    </ComponentRegistryContext>
  );
}

export function Component({
  id,
  props = {},
}: {
  id: string;
  props?: Record<string, any>;
}): React.JSX.Element {
  const registry = useContext(ComponentRegistryContext);
  const component = registry[id];
  if (!component) {
    return <></>;
  }

  return React.createElement(component, props);
}
