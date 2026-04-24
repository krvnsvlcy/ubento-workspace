import React from "react";
export type ComponentRegistry = Record<string, React.ComponentType<any>>;
export declare const ComponentRegistryContext: React.Context<ComponentRegistry>;
export declare function ComponentRegistryProvider({ registry, children, }: {
    registry: ComponentRegistry;
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function Component({ id, props, }: {
    id: string;
    props?: Record<string, any>;
}): React.JSX.Element;
//# sourceMappingURL=component.d.ts.map