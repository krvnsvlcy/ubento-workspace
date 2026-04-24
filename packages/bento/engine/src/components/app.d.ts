import React from "react";
import { BaseLocationHook } from "wouter";
import { AppData } from "../models";
export declare function App({ app, locationHook, }: {
    app: AppData;
    locationHook?: BaseLocationHook;
}): React.JSX.Element;
export declare class Bridge {
    static send(target: Window, type: string, payload: any): void;
    static listen(callback: (type: string, payload: any) => void): () => void;
}
//# sourceMappingURL=app.d.ts.map