import { createZustandStateController } from "@ubento/bento-primitives";
import { createStore } from "@ubento/fabric";
import { DuplexRpc } from "@ubento/rpc-utils";
import { createContext, useContext } from "react";
import { createStore as createZustandStore } from "zustand";
import {
  BentoEngineHostRpcInterface,
  BentoEngineRuntimeRpcInterface,
} from "./bridge.js";
import {
  BaseStyle,
  BoardData,
  BoardStyle,
  ElementData,
  WorkspaceData,
} from "./models.js";
import { createModuleManager } from "./module_manager.js";
import { createServiceManager } from "./service_manager.js";

export type BentoMode = "live" | "edit";

export type BentoLocation = {
  boardId: string;
  params: Record<string, string>;
};

// local state synced to host
export type BentoLocalState = {
  selection: string[];
  selectionScope?: string;
  hover?: string;
};

export type BentoEngineState = BentoLocalState & {
  // remote state synced from host
  mode: BentoMode;
  workspace: WorkspaceData;
  location?: BentoLocation;
};

export function createBentoEngine({
  rpc,
  state,
  publicModuleUrlTemplate,
}: {
  rpc: DuplexRpc<BentoEngineRuntimeRpcInterface, BentoEngineHostRpcInterface>;
  state: BentoEngineState;
  publicModuleUrlTemplate: string;
}) {
  const moduleManager = createModuleManager({ rpc, publicModuleUrlTemplate });
  const serviceManager = createServiceManager({ moduleManager });
  const htmlElements = new Map<string, HTMLElement>();

  const boardStore = createStore<BoardData>({
    namespace: "board",
    getKey: (entity: BoardData) => entity.id,
    fetchOne: async (key: string) => {
      const board = await rpc.egress.getBoard({ boardId: key });
      return board;
    },
    fetchMany: async ({ params }) => {
      const boards = await rpc.egress.listBoards(params || {});
      return { data: boards };
    },
  });

  const store = createZustandStore<BentoEngineState>()(() => state);
  const controller = createZustandStateController(store);

  const engine = {
    ...controller,

    // state management
    toggleMode: () => {
      store.setState((s) => ({
        mode: s.mode === "edit" ? "live" : "edit",
      }));
    },

    // selection
    select: (elementIds: string[], toggle?: boolean) => {
      const current = store.getState();
      const currentSelection = current.selection || [];

      let nextSelection: string[];
      if (toggle) {
        nextSelection = [...currentSelection];
        for (const id of elementIds) {
          if (nextSelection.includes(id)) {
            nextSelection = nextSelection.filter((sid) => sid !== id);
          } else {
            nextSelection.push(id);
          }
        }
      } else {
        nextSelection = elementIds;
      }

      store.setState({
        selection: [...new Set(nextSelection)],
      });
    },
    setSelectionScope: (id?: string) => {
      store.setState({ selectionScope: id });
    },
    hover: (elementId: string) => {
      store.setState({ hover: elementId });
    },
    unHover: (elementId: string) => {
      store.setState((s) => (s.hover === elementId ? { hover: undefined } : s));
    },

    // navigation
    goTo: (location: BentoLocation) => {
      rpc.egress.goTo({ location });
    },

    // board operations
    createBoard: async (name?: string) => {
      const board = await rpc.egress.createBoard({ name });
      boardStore.push(board);
      return board;
    },
    updateBoardStyle: (boardId: string, updates: Partial<BoardStyle>) => {
      boardStore.update(boardId, (board) => ({
        style: { ...board.style, ...updates },
      }));
    },
    setBoardContent: (boardId: string, content: string[]) => {
      boardStore.update(boardId, { content });
    },
    pruneBoard: (boardId: string) => {
      boardStore.update(boardId, (board) => {
        const nextElements = { ...board.elements } as Record<
          string,
          ElementData
        >;
        let nextContent = [...board.content];
        let changed = true;

        while (changed) {
          changed = false;

          for (const [id, el] of Object.entries(nextElements)) {
            if (id === "root") continue;

            if (el.type === "stack" && el.content.length === 1) {
              const childId = el.content[0];

              // Check board content
              if (nextContent.includes(id)) {
                nextContent = nextContent.map((cid) =>
                  cid === id ? childId : cid,
                );
                delete nextElements[id];
                changed = true;
                break;
              }

              // Check other stacks
              for (const [parentId, parentEl] of Object.entries(nextElements)) {
                if (
                  parentEl.type === "stack" &&
                  parentEl.content.includes(id)
                ) {
                  nextElements[parentId] = {
                    ...parentEl,
                    content: parentEl.content.map((cid) =>
                      cid === id ? childId : cid,
                    ),
                  };
                  delete nextElements[id];
                  changed = true;
                  break;
                }
              }
              if (changed) break;
            }
          }
        }

        return {
          elements: nextElements,
          content: nextContent,
        };
      });
    },

    // element operations
    addElement: (
      boardId: string,
      containerId: string,
      element: ElementData,
    ) => {
      const id = crypto.randomUUID();

      boardStore.update(boardId, (board) => {
        const nextElements = { ...board.elements, [id]: element };

        const container = nextElements[containerId];
        if (container && container.type === "stack") {
          nextElements[containerId] = {
            ...container,
            content: [...container.content, id],
          };
        }

        return {
          elements: nextElements,
        };
      });

      return id;
    },
    deleteElement: (boardId: string, elementId: string) => {
      boardStore.update(boardId, (board) => {
        const nextElements = { ...board.elements } as Record<
          string,
          ElementData
        >;
        delete nextElements[elementId];

        // remove from stacks
        for (const [id, el] of Object.entries(nextElements)) {
          if (el.type === "stack" && el.content.includes(elementId)) {
            nextElements[id] = {
              ...el,
              content: el.content.filter((cid: string) => cid !== elementId),
            };
          }
        }

        return {
          elements: nextElements,
          content: board.content.filter((id) => id !== elementId),
        };
      });

      engine.pruneBoard(boardId);
    },
    replaceElement: (boardId: string, id: string, element: ElementData) => {
      boardStore.update(boardId, (board) => ({
        elements: { ...board.elements, [id]: element },
      }));
    },
    wrapWithStack: (
      boardId: string,
      elementIds: string[],
      parentId: string,
    ) => {
      if (elementIds.length === 0) return;
      const stackId = crypto.randomUUID();

      boardStore.update(boardId, (board) => {
        const nextElements = { ...board.elements };
        let nextBoardContent = [...board.content];

        const newStack: ElementData = {
          type: "stack",
          content: elementIds,
          style: {
            width: { value: 1, unit: "fr" },
            height: { value: 1, unit: "fr" },
            direction: "column",
          } as any,
        };

        nextElements[stackId] = newStack;

        // Update parent content
        if (parentId === "root_content") {
          const firstIdx = nextBoardContent.indexOf(elementIds[0]);
          nextBoardContent = nextBoardContent.filter(
            (id) => !elementIds.includes(id),
          );
          nextBoardContent.splice(firstIdx, 0, stackId);
        } else {
          const parent = nextElements[parentId] as any;
          const firstIdx = parent.content.indexOf(elementIds[0]);
          const nextParentContent = parent.content.filter(
            (id: string) => !elementIds.includes(id),
          );
          nextParentContent.splice(firstIdx, 0, stackId);
          nextElements[parentId] = { ...parent, content: nextParentContent };
        }

        return {
          elements: nextElements,
          content: nextBoardContent,
        };
      });

      return stackId;
    },
    unwrapStack: (boardId: string, stackId: string, parentId: string) => {
      let children: string[] = [];
      boardStore.update(boardId, (board) => {
        const nextElements = { ...board.elements };
        let nextBoardContent = [...board.content];

        const el = nextElements[stackId];
        if (el?.type !== "stack") return board;

        children = el.content;

        // Replace stack with its children
        if (parentId === "root_content") {
          const idx = nextBoardContent.indexOf(stackId);
          if (idx !== -1) {
            nextBoardContent.splice(idx, 1, ...children);
          }
        } else {
          const parent = nextElements[parentId] as any;
          if (parent && parent.type === "stack") {
            const idx = parent.content.indexOf(stackId);
            if (idx !== -1) {
              const nextParentContent = [...parent.content];
              nextParentContent.splice(idx, 1, ...children);
              nextElements[parentId] = {
                ...parent,
                content: nextParentContent,
              };
            }
          }
        }

        delete nextElements[stackId];

        return {
          elements: nextElements,
          content: nextBoardContent,
        };
      });

      return children;
    },

    // element mutators
    setElementStyle: (
      boardId: string,
      elementId: string,
      style: Partial<BaseStyle>,
    ) => {
      boardStore.update(boardId, (board) => ({
        elements: {
          ...board.elements,
          [elementId]: {
            ...board.elements[elementId],
            style: { ...board.elements[elementId].style, ...style } as any,
          },
        },
      }));
    },
    setElementProps: (boardId: string, elementId: string, props: any) => {
      boardStore.update(boardId, (board) => {
        const el = board.elements[elementId];
        if (el.type !== "block") return board;
        return {
          elements: {
            ...board.elements,
            [elementId]: {
              ...el,
              props: { ...el.props, ...props },
            },
          },
        };
      });
    },
    setStackContent: (
      boardId: string,
      elementId: string,
      content: string[],
    ) => {
      boardStore.update(boardId, (board) => {
        const el = board.elements[elementId];
        if (el.type !== "stack") return board;
        return {
          elements: {
            ...board.elements,
            [elementId]: { ...el, content },
          },
        };
      });
    },
    setBlockModule: (
      boardId: string,
      id: string,
      moduleId: string,
      moduleVersionId: string,
    ) => {
      boardStore.update(boardId, (board) => {
        const el = board.elements[id];
        if (el.type !== "block") return board;
        return {
          elements: {
            ...board.elements,
            [id]: { ...el, moduleId, moduleVersionId },
          },
        };
      });
    },

    // DOM & helpers
    setHtmlElement: (id: string, element?: HTMLElement) => {
      if (element) {
        htmlElements.set(id, element);
      } else {
        htmlElements.delete(id);
      }
    },
    getHtmlElement: (id: string) => {
      return htmlElements.get(id);
    },
    convertElementSizeUnit: (
      boardId: string,
      elementId: string,
      dimension: "width" | "height",
      targetUnit: "px" | "%" | "fr",
    ) => {
      const el = htmlElements.get(elementId);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement?.getBoundingClientRect();

      let value = 0;
      if (targetUnit === "px") {
        value = Math.round(dimension === "width" ? rect.width : rect.height);
      } else if (targetUnit === "%" && parentRect) {
        const size = dimension === "width" ? rect.width : rect.height;
        const parentSize =
          dimension === "width" ? parentRect.width : parentRect.height;
        if (parentSize > 0) {
          value = Math.round((size / parentSize) * 100);
        }
      }

      engine.setElementStyle(boardId, elementId, {
        [dimension]: { value, unit: targetUnit },
      });
    },

    // stores
    boardStore,
    moduleManager,
    serviceManager,
  };

  // RPC Communication

  // Sync state to host
  store.subscribe((curr) => {
    rpc.egress.localStateChanged(curr);
  });

  // Sync boards to host
  boardStore.store.subscribe((curr, prev) => {
    for (const [id, data] of Object.entries(curr.data)) {
      if (data !== prev.data[id]) {
        rpc.egress.boardChanged({ boardId: id, board: data });
      }
    }
  });

  // Handle Host requests
  rpc.setHandlers({
    setMode: ({ mode }) => {
      store.setState({ mode });
    },
    setLocation: ({ location }) => {
      store.setState({ location });
    },
    updateWorkspace: ({ workspace }) => {
      store.setState({ workspace });
    },
    updateBoard: ({ boardId, board }) => {
      boardStore.update(boardId, board);
    },
    updateModule: ({ moduleId, module }) => {
      moduleManager.moduleStore.update(moduleId, module);
    },
  });

  return engine;
}

export type BentoEngine = ReturnType<typeof createBentoEngine>;

export const EngineContext = createContext<BentoEngine | null>(null);

export function useBentoEngine() {
  const context = useContext(EngineContext);
  if (!context) {
    throw new Error(
      "useBentoEngine must be used within an EngineControllerProvider",
    );
  }
  return context;
}
