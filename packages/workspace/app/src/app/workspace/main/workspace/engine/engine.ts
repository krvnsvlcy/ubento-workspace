import { UbentoEngine, UbentoEngineState } from "@/engine/engine";
import { UbentoLocation } from "@/engine/location";
import {
  BentoEngineHostRpcInterface,
  BentoEngineRuntimeRpcInterface,
  BentoMode,
  BoardData,
  boardDataSchema,
  BoardStyle,
  DropContent,
  DropRect,
  ModuleReference,
  ServiceData,
  WorkspaceData,
  workspaceDataSchema,
} from "@ubento/bento.engine";
import { createDuplexRpc, createWindowPort, DuplexRpc } from "@ubento/rpc";
import { createZustandStateController } from "@ubento/workspace.primitives";
import { registerStore } from "@ubento/zustand-devtool";
import { dequal } from "dequal/lite";
import { createStore as createZustandStore } from "zustand/vanilla";

export type WorkspaceState = {
  // status
  status: "pending" | "connected" | "ready" | "error";
  error?: any;

  // local state
  mode: BentoMode;
  location: UbentoLocation;
  workspaceData: WorkspaceData;

  // synced from runtime
  boards: Record<string, BoardData>;
  selectionScope?: string;
  selection: string[];
  hover?: string;

  // drag and drop
  dropRects: DropRect[];
  leftPanelOpen: boolean;
};

export function createWorkspaceEngine({
  workspace,
  engine,
}: {
  workspace: WorkspaceData;
  engine: UbentoEngine;
}) {
  let rpc: DuplexRpc<
    BentoEngineHostRpcInterface,
    BentoEngineRuntimeRpcInterface
  > | null = null;
  const workspaceService = engine.ubento.workspace;
  const moduleService = engine.ubento.module;

  const store = createZustandStore<WorkspaceState>()(() => ({
    status: "pending",
    mode: "live",
    location: engine.getState().location,
    boards: {},
    selection: [],
    dropRects: [],
    leftPanelOpen: true,
    workspaceData: workspaceDataSchema.parse({
      ...workspace,
      id: workspace.id,
      name: workspace.name,
    }),
  }));

  const controller = createZustandStateController(store);
  registerStore("workspaceEngine", store);
  const workspaceEngine = {
    ...controller,

    init: async (target: Window) => {
      rpc = createDuplexRpc<
        BentoEngineHostRpcInterface,
        BentoEngineRuntimeRpcInterface
      >({
        port: createWindowPort(window, target),
        channel: "workspace",
        handlers: {
          connect: async () => {
            store.setState({ status: "connected" });
          },
          ready: async () => {
            store.setState({ status: "ready" });
          },
          goTo: async ({
            location,
          }: {
            location: { boardId: string; params?: Record<string, any> };
          }) => {
            engine.goToLocation({
              ...engine.getState().location,
              board: location.boardId,
              params: location.params as Record<string, string>,
            });
          },
          setMode: async ({ mode }: { mode: BentoMode }) => {
            store.setState({ mode });
          },
          getBoard: async ({ boardId }: { boardId: string }) => {
            const res = await workspaceService.getBoard(boardId);
            const board = boardDataSchema.parse({
              id: res.id,
              name: res.name,
              ...(res.data as any),
            });
            return board;
          },
          listBoards: async () => {
            const res = await workspaceService.listBoards({
              workspaceId: workspace.id,
            });
            const boards = res.data
              .map((b) => {
                const safeParseResult = boardDataSchema.safeParse({
                  id: b.id,
                  name: b.name,
                  ...(b.data as any),
                });
                if (!safeParseResult.success) {
                  console.warn(
                    "Failed to parse board",
                    b.id,
                    safeParseResult.error,
                  );
                  return null;
                }
                return safeParseResult.data;
              })
              .filter((b) => !!b);
            return boards;
          },
          createBoard: async ({ name }: { name?: string }) => {
            const data: Omit<BoardData, "id" | "name"> = {
              title: name || "New Board",
              content: ["root"],
              elements: {
                root: {
                  type: "stack",
                  content: ["left", "right"],
                  style: {
                    width: {
                      value: 100,
                      unit: "%",
                    },
                    height: {
                      value: 300,
                      unit: "px",
                    },
                  },
                },
                left: {
                  type: "stack",
                  content: [],
                  style: {
                    width: {
                      value: 1,
                      unit: "fr",
                    },
                    height: {
                      value: 1,
                      unit: "fr",
                    },
                  },
                },
                right: {
                  type: "stack",
                  content: [],
                  style: {
                    width: {
                      value: 1,
                      unit: "fr",
                    },
                    height: {
                      value: 1,
                      unit: "fr",
                    },
                  },
                },
              },
            };
            const res = await workspaceService.createBoard({
              workspace_id: workspace.id,
              name: name || "New Board",
              data,
            });
            const board = boardDataSchema.parse({
              id: res.id,
              name: res.name,
              ...(res.data as any),
            });
            return board;
          },
          getModule: async ({ moduleId }: { moduleId: string }) => {
            const res = await moduleService.getModule(moduleId);
            return {
              id: res.id,
              latestVersionId: res.latest_version_id || "",
            };
          },
          readModule: async (ref: ModuleReference) => {
            return await moduleService.readModuleVersionFile(
              ref.id,
              ref.versionId,
              "index.js",
            );
          },
          listModules: async (params: any) => {
            return [];
          },
          createModule: async ({ name }: { name: string }) => {
            throw new Error("not implemented");
          },
          localStateChanged: async (state: {
            selection: string[];
            selectionScope?: string;
            hover?: string;
          }) => {
            store.setState({
              hover: state.hover,
              selection: state.selection,
              selectionScope: state.selectionScope,
            });
          },
          boardChanged: async ({
            boardId,
            board,
          }: {
            boardId: string;
            board: BoardData;
          }) => {
            store.setState((s) => ({
              boards: { ...s.boards, [boardId]: board },
            }));
          },
          openComponentBrowser: async () => {
            engine.goToLocation({ workspaceTab: "assets" });
          },
        },
      });

      rpc.watch((event) => {
        console.log(`[host.rpc.event] ${event.type}`, event);
      });

      rpc.run();
    },

    dispose: () => {
      rpc?.dispose();
    },

    // actions
    setMode: (mode: BentoMode) => {
      store.setState({ mode });
      rpc?.egress.setMode({ mode });
    },

    updateBoardStyle: (boardId: string, style: Partial<BoardStyle>) => {
      rpc?.egress.updateBoardStyle({ boardId, style });
    },

    setBoardName: (boardId: string, name: string) => {
      rpc?.egress.updateBoard({ boardId, board: { name } });
    },

    deleteBoard: async (boardId: string) => {
      await workspaceService.deleteBoard(boardId);
      store.setState((s) => {
        const boards = { ...s.boards };
        delete boards[boardId];
        return { boards };
      });
    },

    createBoard: async (args: { name?: string }) => {
      const board = await rpc?.egress.createBoard(args);
      if (board) {
        store.setState((s) => ({
          boards: { ...s.boards, [board.id]: board },
        }));
      }
      return board;
    },

    updateWorkspace: async (data: Partial<WorkspaceData>) => {
      const current = store.getState().workspaceData;
      if (!current) return;
      const updated = { ...current, ...data };
      await workspaceService.updateWorkspace(current.id, updated);
      store.setState({ workspaceData: updated });
    },

    goTo: (args: {
      location: { boardId: string; params?: Record<string, any> };
    }) => {
      rpc?.egress.setLocation({ location: args.location });
    },

    toggleLeftPanel: () => {
      store.setState((s) => ({ leftPanelOpen: !s.leftPanelOpen }));
    },

    setBlockModule: (
      elementId: string,
      moduleId: string,
      versionId: string,
    ) => {
      const boardId = store.getState().location.board;
      if (!boardId) return;
      rpc?.egress.updateBoard({
        boardId,
        board: {
          elements: {
            [elementId]: {
              moduleId,
              moduleVersionId: versionId,
            },
          } as any,
        },
      });
    },

    refreshDropRects: async () => {
      if (rpc) {
        const dropRects = await rpc.egress.getDropRects({});
        store.setState({ dropRects });
      }
    },

    performDrop: (targetId: string, content: DropContent[]) => {
      rpc?.egress.drop({ targetId, content });
    },

    installService: (serviceName: string, ref: ModuleReference) => {
      store.setState((state) => {
        const currentWorkspace = state.workspaceData;
        if (!currentWorkspace) {
          return state;
        }

        const nextServices = { ...currentWorkspace.services } as Record<
          string,
          ServiceData
        >;
        let finalName = serviceName;
        let i = 1;
        while (finalName in nextServices) {
          finalName = `${serviceName}${i}`;
          i++;
        }
        nextServices[finalName] = {
          module: ref,
        };

        const nextState = {
          ...state,
          workspaceData: { ...currentWorkspace, services: nextServices },
        };
        return nextState;
      });
    },
  };

  // sync host location

  engine.subscribe((curr: UbentoEngineState, prev: UbentoEngineState) => {
    if (curr.location !== prev.location) {
      store.setState({ location: curr.location });
    }

    if (curr.dragActive && !prev.dragActive) {
      workspaceEngine.refreshDropRects();
    }

    if (
      curr.location.board &&
      (curr.location.board !== prev.location.board ||
        !dequal(curr.location.params, prev.location.params))
    ) {
      rpc?.egress.setLocation({
        location: {
          boardId: curr.location.board,
          params: curr.location.params || {},
        },
      });
    }
  });

  return workspaceEngine;
}

export type WorkspaceEngine = ReturnType<typeof createWorkspaceEngine>;
