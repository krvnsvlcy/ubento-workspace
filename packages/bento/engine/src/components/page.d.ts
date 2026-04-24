import React from "react";
import { PageData } from "../models";
export interface PageRegistry {
    [key: string]: PageData;
}
export declare const PageRegistryContext: React.Context<PageRegistry>;
export declare function PageRegistryProvider({ children, registry, }: {
    children: React.ReactNode;
    registry: PageRegistry;
}): React.JSX.Element;
export declare function Page({ id }: {
    id: string;
}): React.JSX.Element;
//# sourceMappingURL=page.d.ts.map