import { AppData, PageData, ElementData } from "@hivary/engine";
export type PageRegistry = Record<string, PageData>;
export interface AgentConfig {
    app: AppData;
    pages: PageRegistry;
}
export type AgentAction = {
    type: "set_route";
    path: string;
    pageId: string;
} | {
    type: "remove_route";
    path: string;
} | {
    type: "create_page";
    id: string;
    rootElement?: ElementData;
} | {
    type: "delete_page";
    id: string;
} | {
    type: "add_element";
    pageId: string;
    parentId: string;
    elementId: string;
    element: ElementData;
    index?: number;
} | {
    type: "update_element";
    pageId: string;
    elementId: string;
    updates: Partial<ElementData>;
} | {
    type: "delete_element";
    pageId: string;
    elementId: string;
} | {
    type: "move_element";
    pageId: string;
    elementId: string;
    targetParentId: string;
    index: number;
};
export declare class AppAgent {
    private app;
    private pages;
    constructor(config: AgentConfig);
    execute(actions: AgentAction[]): void;
    setRoute(path: string, pageId: string): void;
    removeRoute(path: string): void;
    createPage(id: string, rootElement?: ElementData): PageData;
    deletePage(id: string): void;
    addElement(pageId: string, parentId: string, elementId: string, element: ElementData, index?: number): void;
    updateElement(pageId: string, elementId: string, updates: Partial<ElementData>): void;
    deleteElement(pageId: string, elementId: string): void;
    moveElement(pageId: string, elementId: string, targetParentId: string, index: number): void;
    getAppData(): AppData;
    getPages(): PageRegistry;
}
export type LLM = (prompt: string) => Promise<string>;
export declare class ThinkingAgent {
    private agent;
    private llm;
    constructor(agent: AppAgent, llm: LLM);
    process(userPrompt: string): Promise<AgentAction[]>;
}
//# sourceMappingURL=index.d.ts.map