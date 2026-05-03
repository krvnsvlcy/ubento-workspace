import { UbentoEngine, UbentoEngineState } from "@/engine/engine";
import { UbentoLocation } from "@/engine/location";
import { createZustandStateController } from "@ubento/bento-primitives";
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
} from "@ubento/engine";
import {
  createDuplexRpc,
  createWindowPort,
  DuplexRpc,
} from "@ubento/rpc-utils";
import { dequal } from "dequal/lite";
import { createStore as createZustandStore } from "zustand/vanilla";

export type WorkspaceState = {
  // status
  workspaceStatus: "pending" | "loaded" | "error";
  workspaceError?: any;
  runtimeStatus: "pending" | "connected" | "ready";
  runtimeError?: any;

  // local state
  mode: BentoMode;
  location: UbentoLocation;
  workspaceData?: WorkspaceData;

  // synced from runtime
  boards: Record<string, BoardData>;
  selectionScope?: string;
  selection: string[];
  hover?: string;

  // drag and drop
  dropRects: DropRect[];
};

export function createWorkspaceEngine({
  workspaceId,
  engine,
}: {
  workspaceId: string;
  engine: UbentoEngine;
}) {
  let rpc: DuplexRpc<
    BentoEngineHostRpcInterface,
    BentoEngineRuntimeRpcInterface
  > | null = null;
  const workspaceService = engine.ubento.workspace;
  const moduleService = engine.ubento.module;

  const store = createZustandStore<WorkspaceState>()(() => ({
    workspaceStatus: "pending",
    runtimeStatus: "pending",
    mode: "live",
    location: engine.getState().location,
    boards: {},
    selection: [],
    dropRects: [],
  }));

  const controller = createZustandStateController(store);
  const workspacePromise = workspaceService
    .getWorkspace(workspaceId)
    .then((w) => {
      const workspaceData = workspaceDataSchema.parse({
        ...(w.data as any),
        id: w.id,
        name: w.name,
      });
      store.setState({ workspaceData, workspaceStatus: "loaded" });
      return w;
    })
    .catch((err) => {
      store.setState({ workspaceStatus: "error", workspaceError: err });
      return;
    });

  const workspaceEngine = {
    ...controller,

    init: async (target: Window) => {
      async function initRuntime() {
        const workspaceData = await workspacePromise;
        if (!workspaceData) {
          // error already handled in promise
          return;
        }

        rpc?.egress.init({
          publicModuleUrlTemplate: "/engine-module/{artifactId}",
          state: {
            mode: "live",
            workspace: workspaceData,
            selection: [],
          },
        });
      }

      rpc = createDuplexRpc<
        BentoEngineHostRpcInterface,
        BentoEngineRuntimeRpcInterface
      >({
        port: createWindowPort(window, target),
        channel: "workspace",
        handlers: {
          connect: async () => {
            store.setState({ runtimeStatus: "connected" });
            initRuntime();
          },
          ready: () => {
            store.setState({ runtimeStatus: "ready" });
          },
          goTo: ({ location }) => {
            engine.goToLocation({
              ...engine.getState().location,
              board: location.boardId,
              params: location.params,
            });
          },
          setMode: ({ mode }) => {
            store.setState({ mode });
          },
          getBoard: async ({ boardId }) => {
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
              workspaceId: workspaceId,
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
          createBoard: async ({ name }) => {
            const data: Omit<BoardData, "id" | "name"> = {
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
              workspace_id: workspaceId,
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
          getModule: async ({ moduleId }) => {
            const res = await moduleService.getModule(moduleId);
            return {
              id: res.id,
              latestVersionId: res.latest_version_id || "",
            };
          },
          readModule: async (ref) => {
            return await moduleService.readModuleVersionFile(
              ref.id,
              ref.versionId,
              "index.js",
            );
          },
          listModules: async (params) => {
            return [];
          },
          createModule: async ({ name }) => {
            throw new Error("not implemented");
          },
          localStateChanged: (state) => {
            store.setState({
              hover: state.hover,
              selection: state.selection,
              selectionScope: state.selectionScope,
            });
          },
          boardChanged: ({ boardId, board }) => {
            store.setState((s) => ({
              boards: { ...s.boards, [boardId]: board },
            }));
          },
          openComponentBrowser: () => {
            engine.goToLocation({ tab: "assets" });
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
