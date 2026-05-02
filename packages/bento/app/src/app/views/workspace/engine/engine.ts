import { UbentoEngine, UbentoEngineState } from "@/engine/engine";
import { createZustandStateController } from "@ubento/bento-primitives";
import {
  BentoEngineHostRpcInterface,
  BentoEngineRuntimeRpcInterface,
  BentoMode,
  BoardData,
  boardDataSchema,
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

  // synced from runtime
  selectionScope?: string;
  selection: string[];
  hover?: string;
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
    selection: [],
    connected: false,
    ready: false,
  }));

  const controller = createZustandStateController(store);
  const workspacePromise = workspaceService
    .getWorkspace(workspaceId)
    .then((w) => {
      store.setState({ workspaceStatus: "loaded" });
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
        const workspaceEntityData = await workspacePromise;
        if (!workspaceEntityData) {
          // error already handled in promise
          return;
        }

        const workspaceData = workspaceDataSchema.parse({
          ...(workspaceEntityData.data as any),
          id: workspaceEntityData.id,
          name: workspaceEntityData.name,
        });

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
            return "";
            // return await moduleService.readModuleArtifact(
            //   ref.id,
            //   ref.versionId,
            // );
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
            console.log("board changed", boardId, board);
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
    },
  };

  // sync host location

  engine.subscribe((curr: UbentoEngineState, prev: UbentoEngineState) => {
    if (
      curr.location.board &&
      curr.location.board !== prev.location.board &&
      !dequal(curr.location.params, prev.location.params)
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
