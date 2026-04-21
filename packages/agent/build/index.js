import { createPage } from "@ubento/engine";
export class AppAgent {
    app;
    pages;
    constructor(config) {
        this.app = config.app;
        this.pages = config.pages;
    }
    execute(actions) {
        for (const action of actions) {
            switch (action.type) {
                case "set_route":
                    this.setRoute(action.path, action.pageId);
                    break;
                case "remove_route":
                    this.removeRoute(action.path);
                    break;
                case "create_page":
                    this.createPage(action.id, action.rootElement);
                    break;
                case "delete_page":
                    this.deletePage(action.id);
                    break;
                case "add_element":
                    this.addElement(action.pageId, action.parentId, action.elementId, action.element, action.index);
                    break;
                case "update_element":
                    this.updateElement(action.pageId, action.elementId, action.updates);
                    break;
                case "delete_element":
                    this.deleteElement(action.pageId, action.elementId);
                    break;
                case "move_element":
                    this.moveElement(action.pageId, action.elementId, action.targetParentId, action.index);
                    break;
            }
        }
    }
    // --- App Structure ---
    setRoute(path, pageId) {
        this.app.routes[path] = pageId;
    }
    removeRoute(path) {
        delete this.app.routes[path];
    }
    // --- Page Operations ---
    createPage(id, rootElement) {
        const rootId = "root";
        const newPage = createPage({
            id,
            rootId,
            elements: {
                [rootId]: rootElement || {
                    type: "container",
                    style: {
                        layout: "flex",
                        direction: "column",
                        height: "100vh",
                        width: "100%",
                        background: "#ffffff"
                    },
                    content: []
                }
            }
        });
        this.pages[id] = newPage;
        return newPage;
    }
    deletePage(id) {
        delete this.pages[id];
        // Clean up routes pointing to this page
        for (const [path, pageId] of Object.entries(this.app.routes)) {
            if (pageId === id) {
                delete this.app.routes[path];
            }
        }
    }
    // --- Element Operations ---
    addElement(pageId, parentId, elementId, element, index) {
        const page = this.pages[pageId];
        if (!page)
            throw new Error(`Page ${pageId} not found`);
        const parent = page.elements[parentId];
        if (!parent || parent.type !== "container") {
            throw new Error(`Parent ${parentId} not found or is not a container`);
        }
        // Add element to registry
        page.elements[elementId] = element;
        // Add to parent content
        if (index !== undefined) {
            parent.content.splice(index, 0, elementId);
        }
        else {
            parent.content.push(elementId);
        }
    }
    updateElement(pageId, elementId, updates) {
        const page = this.pages[pageId];
        if (!page)
            throw new Error(`Page ${pageId} not found`);
        const element = page.elements[elementId];
        if (!element)
            throw new Error(`Element ${elementId} not found`);
        // Deep merge or just direct assign for simple cases
        // For now, let's keep it simple
        Object.assign(element, updates);
    }
    deleteElement(pageId, elementId) {
        const page = this.pages[pageId];
        if (!page)
            throw new Error(`Page ${pageId} not found`);
        // Recursively find and remove from parent's content
        for (const el of Object.values(page.elements)) {
            if (el.type === "container") {
                const index = el.content.indexOf(elementId);
                if (index > -1) {
                    el.content.splice(index, 1);
                }
            }
        }
        // Delete from registry
        delete page.elements[elementId];
    }
    moveElement(pageId, elementId, targetParentId, index) {
        const page = this.pages[pageId];
        if (!page)
            throw new Error(`Page ${pageId} not found`);
        // Remove from old parent
        for (const el of Object.values(page.elements)) {
            if (el.type === "container") {
                const idx = el.content.indexOf(elementId);
                if (idx > -1) {
                    el.content.splice(idx, 1);
                }
            }
        }
        // Add to new parent
        const targetParent = page.elements[targetParentId];
        if (!targetParent || targetParent.type !== "container") {
            throw new Error(`Target parent ${targetParentId} not found or is not a container`);
        }
        targetParent.content.splice(index, 0, elementId);
    }
    // --- Utility ---
    getAppData() {
        return this.app;
    }
    getPages() {
        return this.pages;
    }
}
export class ThinkingAgent {
    agent;
    llm;
    constructor(agent, llm) {
        this.agent = agent;
        this.llm = llm;
    }
    async process(userPrompt) {
        const context = {
            app: this.agent.getAppData(),
            pages: this.agent.getPages()
        };
        const systemPrompt = `You are an AI UI Agent for the Ubento Engine. 
Your task is to generate a JSON array of AgentActions to fulfill the user's request.

Current App State:
${JSON.stringify(context, null, 2)}

Available AgentAction types:
- set_route: { path: string, pageId: string }
- remove_route: { path: string }
- create_page: { id: string, rootElement?: ElementData }
- delete_page: { id: string }
- add_element: { pageId: string, parentId: string, elementId: string, element: ElementData, index?: number }
- update_element: { pageId: string, elementId: string, updates: Partial<ElementData> }
- delete_element: { pageId: string, elementId: string }
- move_element: { pageId: string, elementId: string, targetParentId: string, index: number }

ElementData schema:
- type: "container" | "block"
- If type: "container" -> { style: ContainerStyle, content: string[] }
- If type: "block" -> { component: string, props: Record<string, any>, style: BaseStyle }

Available Style properties:
- width, height, background, cornerRadius, padding, gap, layout (flex|grid), direction (row|column), etc.

Respond ONLY with the JSON array of actions. No explanations.`;
        const response = await this.llm(`${systemPrompt}\n\nUser Request: ${userPrompt}`);
        try {
            // Basic extraction of JSON array from response
            const jsonStr = response.match(/\[.*\]/s)?.[0] || response;
            const actions = JSON.parse(jsonStr);
            this.agent.execute(actions);
            return actions;
        }
        catch (e) {
            console.error("Failed to parse agent actions:", e);
            throw new Error(`Invalid response from LLM: ${response}`);
        }
    }
}
//# sourceMappingURL=index.js.map