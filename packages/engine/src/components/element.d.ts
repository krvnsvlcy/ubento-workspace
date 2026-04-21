import React from "react";
import { ElementData } from "../models";
export type ElementRegistry = {
    [key: string]: ElementData;
};
export declare const ElementRegistryContext: React.Context<ElementRegistry>;
export declare function ElementRegistryProvider({ children, registry, }: {
    children: React.ReactNode;
    registry: ElementRegistry;
}): React.JSX.Element;
export declare function Element({ id }: {
    id: string;
}): React.JSX.Element;
//# sourceMappingURL=element.d.ts.map