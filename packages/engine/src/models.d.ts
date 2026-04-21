export interface BaseStyle {
    width?: string | number;
    height?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;
    minHeight?: string | number;
    maxHeight?: string | number;
    background?: string;
    cornerRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    overflow?: "visible" | "hidden" | "scroll" | "auto";
    padding?: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };
}
export interface ContainerStyle extends BaseStyle {
    layout?: "flex" | "grid" | "none";
    direction?: "row" | "column";
    gap?: {
        x?: number;
        y?: number;
    };
    columns?: number;
    rows?: number;
    alignItems?: "start" | "end" | "center" | "stretch";
    justifyContent?: "start" | "end" | "center" | "stretch" | "space-between";
}
export interface ContainerData {
    type: "container";
    style: ContainerStyle;
    content: string[];
}
export interface BlockData {
    type: "block";
    component: string;
    props: Record<string, any>;
    style: BaseStyle;
}
export type ElementData = ContainerData | BlockData;
export interface PageData {
    id: string;
    rootId: string;
    elements: Record<string, ElementData>;
}
export interface AppData {
    id: string;
    routes: Record<string, string>;
}
export type EditorMode = "edit" | "view";
export interface EditorContext {
    mode: EditorMode;
    selection: string[];
}
export declare function createApp(init: AppData): AppData;
export declare function createPage(init: PageData): PageData;
export declare const editorContext: EditorContext;
//# sourceMappingURL=models.d.ts.map