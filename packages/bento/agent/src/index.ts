import { WorkspaceData, ElementData, BoardData, createBoard } from "@ubento/engine";

export type BoardRegistry = Record<string, BoardData>;

export interface AgentConfig {
  workspace: WorkspaceData;
  boards: BoardRegistry;
}

export type AgentAction =
  | { type: "set_route"; path: string; boardId: string }
  | { type: "remove_route"; path: string }
  | { type: "create_board"; id: string; rootElement?: ElementData }
  | { type: "delete_board"; id: string }
  | {
      type: "add_element";
      boardId: string;
      parentId: string;
      elementId: string;
      element: ElementData;
      index?: number;
    }
  | {
      type: "update_element";
      boardId: string;
      elementId: string;
      updates: Partial<ElementData>;
    }
  | { type: "delete_element"; boardId: string; elementId: string }
  | {
      type: "move_element";
      boardId: string;
      elementId: string;
      targetParentId: string;
      index: number;
    };

export class WorkspaceAgent {
  private workspace: WorkspaceData;
  private boards: BoardRegistry;

  constructor(config: AgentConfig) {
    this.workspace = config.workspace;
    this.boards = config.boards;
  }

  public execute(actions: AgentAction[]) {
    for (const action of actions) {
      switch (action.type) {
        case "set_route":
          this.setRoute(action.path, action.boardId);
          break;
        case "remove_route":
          this.removeRoute(action.path);
          break;
        case "create_board":
          this.createBoard(action.id, action.rootElement);
          break;
        case "delete_board":
          this.deleteBoard(action.id);
          break;
        case "add_element":
          this.addElement(
            action.boardId,
            action.parentId,
            action.elementId,
            action.element,
            action.index,
          );
          break;
        case "update_element":
          this.updateElement(action.boardId, action.elementId, action.updates);
          break;
        case "delete_element":
          this.deleteElement(action.boardId, action.elementId);
          break;
        case "move_element":
          this.moveElement(
            action.boardId,
            action.elementId,
            action.targetParentId,
            action.index,
          );
          break;
      }
    }
  }

  // --- Workspace Structure ---

  public setRoute(path: string, boardId: string) {
    if (!this.workspace.routes) this.workspace.routes = {};
    this.workspace.routes[path] = boardId;
  }

  public removeRoute(path: string) {
    if (this.workspace.routes) {
      delete this.workspace.routes[path];
    }
  }

  // --- Board Operations ---

  public createBoard(id: string, rootElement?: ElementData) {
    const rootId = "root";
    const newBoard = createBoard({
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
            background: "#ffffff",
          },
          content: [],
        },
      },
    });
    this.boards[id] = newBoard;
    return newBoard;
  }

  public deleteBoard(id: string) {
    delete this.boards[id];
    // Clean up routes pointing to this board
    if (this.workspace.routes) {
      for (const [path, boardId] of Object.entries(this.workspace.routes)) {
        if (boardId === id) {
          delete this.workspace.routes[path];
        }
      }
    }
  }

  // --- Element Operations ---

  public addElement(
    boardId: string,
    parentId: string,
    elementId: string,
    element: ElementData,
    index?: number,
  ) {
    const board = this.boards[boardId];
    if (!board) throw new Error(`Board ${boardId} not found`);

    const parent = board.elements[parentId];
    if (!parent || parent.type !== "container") {
      throw new Error(`Parent ${parentId} not found or is not a container`);
    }

    // Add element to registry
    board.elements[elementId] = element;

    // Add to parent content
    if (index !== undefined) {
      parent.content.splice(index, 0, elementId);
    } else {
      parent.content.push(elementId);
    }
  }

  public updateElement(
    boardId: string,
    elementId: string,
    updates: Partial<ElementData>,
  ) {
    const board = this.boards[boardId];
    if (!board) throw new Error(`Board ${boardId} not found`);

    const element = board.elements[elementId];
    if (!element) throw new Error(`Element ${elementId} not found`);

    // Deep merge or just direct assign for simple cases
    // For now, let's keep it simple
    Object.assign(element, updates);
  }

  public deleteElement(boardId: string, elementId: string) {
    const board = this.boards[boardId];
    if (!board) throw new Error(`Board ${boardId} not found`);

    // Recursively find and remove from parent's content
    for (const el of Object.values(board.elements) as ElementData[]) {
      if (el.type === "container") {
        const index = el.content.indexOf(elementId);
        if (index > -1) {
          el.content.splice(index, 1);
        }
      }
    }

    // Delete from registry
    delete board.elements[elementId];
  }

  public moveElement(
    boardId: string,
    elementId: string,
    targetParentId: string,
    index: number,
  ) {
    const board = this.boards[boardId];
    if (!board) throw new Error(`Board ${boardId} not found`);

    // Remove from old parent
    for (const el of Object.values(board.elements) as ElementData[]) {
      if (el.type === "container") {
        const idx = el.content.indexOf(elementId);
        if (idx > -1) {
          el.content.splice(idx, 1);
        }
      }
    }

    // Add to new parent
    const targetParent = board.elements[targetParentId];
    if (!targetParent || targetParent.type !== "container") {
      throw new Error(
        `Target parent ${targetParentId} not found or is not a container`,
      );
    }

    targetParent.content.splice(index, 0, elementId);
  }

  // --- Utility ---

  public getWorkspaceData() {
    return this.workspace;
  }

  public getBoards() {
    return this.boards;
  }
}

export type LLM = (prompt: string) => Promise<string>;

export class ThinkingAgent {
  private agent: WorkspaceAgent;
  private llm: LLM;

  constructor(agent: WorkspaceAgent, llm: LLM) {
    this.agent = agent;
    this.llm = llm;
  }

  public async process(userPrompt: string) {
    const context = {
      workspace: this.agent.getWorkspaceData(),
      boards: this.agent.getBoards(),
    };

    const systemPrompt = `You are an AI UI Agent for the Ubento Engine. 
Your task is to generate a JSON array of AgentActions to fulfill the user's request.

Current Workspace State:
${JSON.stringify(context, null, 2)}

Available AgentAction types:
- set_route: { path: string, boardId: string }
- remove_route: { path: string }
- create_board: { id: string, rootElement?: ElementData }
- delete_board: { id: string }
- add_element: { boardId: string, parentId: string, elementId: string, element: ElementData, index?: number }
- update_element: { boardId: string, elementId: string, updates: Partial<ElementData> }
- delete_element: { boardId: string, elementId: string }
- move_element: { boardId: string, elementId: string, targetParentId: string, index: number }

ElementData schema:
- type: "container" | "block"
- If type: "container" -> { style: ContainerStyle, content: string[] }
- If type: "block" -> { component: string, props: Record<string, any>, style: BaseStyle }

Available Style properties:
- width, height, background, cornerRadius, padding, gap, layout (flex|grid), direction (row|column), etc.

Respond ONLY with the JSON array of actions. No explanations.`;

    const response = await this.llm(
      `${systemPrompt}\n\nUser Request: ${userPrompt}`,
    );

    try {
      // Basic extraction of JSON array from response
      const jsonStr = response.match(/\[.*\]/s)?.[0] || response;
      const actions = JSON.parse(jsonStr) as AgentAction[];
      this.agent.execute(actions);
      return actions;
    } catch (e) {
      console.error("Failed to parse agent actions:", e);
      throw new Error(`Invalid response from LLM: ${response}`);
    }
  }
}
