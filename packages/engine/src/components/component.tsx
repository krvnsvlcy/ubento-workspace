import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { proxy } from "valtio";
import { text } from "./core/text";

export type ComponentRegistry = Record<string, React.ComponentType<any>>;
const coreComponents: ComponentRegistry = {
  [text.name]: text.component,
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
    <ComponentRegistryContext.Provider value={proxyRegistry}>
      {children}
    </ComponentRegistryContext.Provider>
  );
}

// Cache for remote modules to avoid re-importing
const remoteCache: Record<string, React.ComponentType<any>> = {};

export function Component({
  id,
  props = {},
}: {
  id: string;
  props?: Record<string, any>;
}): React.JSX.Element {
  const registry = useContext(ComponentRegistryContext);
  const [remoteComponent, setRemoteComponent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const localComponent = registry[id];
  const isUrl = id.startsWith("http://") || id.startsWith("https://") || id.endsWith(".js");

  useEffect(() => {
    if (!localComponent && isUrl) {
      if (remoteCache[id]) {
        setRemoteComponent(() => remoteCache[id]);
        return;
      }

      // Dynamic import of the ES module
      import(/* @vite-ignore */ id)
        .then((mod) => {
          const Comp = mod.default;
          remoteCache[id] = Comp;
          setRemoteComponent(() => Comp);
        })
        .catch((err) => {
          console.log(`Failed to load remote component: ${id}`, err);
          setError(err.message);
        });
    }
  }, [id, localComponent, isUrl]);

  if (localComponent) {
    return React.createElement(localComponent, props);
  }

  if (isUrl) {
    if (error) return <div style={{ color: 'red', fontSize: '10px' }}>Error: {error}</div>;
    if (!remoteComponent) return <div style={{ opacity: 0.5 }}>Loading remote {id}...</div>;
    return React.createElement(remoteComponent, props);
  }

  return <></>;
}
