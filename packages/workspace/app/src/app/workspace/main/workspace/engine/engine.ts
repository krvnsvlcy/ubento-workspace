import { UbentoEngine, UbentoEngineState } from "@/engine/engine";
import { BoardStyle, workspaceSpecSchema } from "@ubento/bento.core";
import {
  BentoEngineHostRpcInterface,
  BentoEngineRuntimeRpcInterface,
  BentoLocation,
  BentoMode,
  BentoUserData,
  BentoWorkspaceData,
  BoardData,
  boardDataSchema,
  DropContent,
  DropRect,
  ModuleReference,
  ParsedSpec,
  ServiceData,
} from "@ubento/bento.runtime";
import { createDuplexRpc, createWindowPort, DuplexRpc } from "@ubento/rpc";
import { workspaceClient } from "@ubento/services.sdk";
import { createZustandStateController } from "@ubento/workspace.primitives";
import { registerStore } from "@ubento/zustand-devtool";
import { dequal } from "dequal/lite";
import z from "zod";
import { createStore as createZustandStore } from "zustand/vanilla";

function parseSpecData<S extends z.ZodTypeAny>(
  schema: S,
  data: unknown,
): ParsedSpec<z.infer<S>> {
  const spec = schema.safeParse(data);
  if (!spec.success) {
    return {
      status: "invalid",
      data: data,
      errors: [String(spec.error)],
    };
  } else {
    return {
      status: "valid",
      data: spec.data,
    };
  }
}

export type WorkspaceState = {
  // status
  status: "pending" | "connected" | "ready" | "error";
  error?: any;

  // local state
  mode: BentoMode;
  workspace: BentoWorkspaceData;

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
  user,
}: {
  workspace: workspaceClient.Workspace;
  user: BentoUserData;
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
    workspace: {
      id: workspace.id,
      title: workspace.name,
      slug: workspace.slug,
      spec: parseSpecData(workspaceSpecSchema, workspace),
    },
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
            const engineState = engine.getState();
            const state = store.getState();
            return {
              initialState: {
                location: getBentoLocation(engineState),
                workspace: state.workspace,
                user,
              },
            };
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
            const data = await workspaceService.getBoard(boardId);
            return {
              id: data.id,
              title: data.name,
              spec: parseSpecData(boardDataSchema, data.data),
            };
          },
          listBoards: async ({}) => {
            const res = await workspaceService.listBoards({
              workspaceId: workspace.id,
            });
            const boards = res.data
              .map((b) => {
                return {
                  id: b.id,
                  title: b.name,
                  spec: parseSpecData(boardDataSchema, b.data),
                };
              })
              .filter((b) => !!b);
            return {
              boards,
              nextCursor: res.nextPage?.cursor,
            };
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

    goTo: (args: { location?: BentoLocation }) => {
      engine.goToLocation({
        board: args.location?.boardId,
        params: args.location?.params,
      });
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
        const currentWorkspace = state.workspace;
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

  // sync host location to runtime

  function getBentoLocation(hostState: UbentoEngineState) {
    const location = hostState.location;
    return location.board
      ? {
          boardId: location.board,
          params: location.params || {},
        }
      : undefined;
  }
  engine.subscribe((curr: UbentoEngineState, prev: UbentoEngineState) => {
    if (
      curr.location.board !== prev.location.board ||
      !dequal(curr.location.params, prev.location.params)
    ) {
      rpc?.egress.setLocation({ location: getBentoLocation(curr) });
    }
  });

  return workspaceEngine;
}

export type WorkspaceEngine = ReturnType<typeof createWorkspaceEngine>;
