import { UbentoEngine, UbentoEngineState } from "@/engine/engine";
import { workspaceSpecSchema } from "@ubento/bento.core";
import {
  BentoEngineHostRpcInterface,
  BentoEngineRuntimeRpcInterface,
  BentoLocation,
  BentoMode,
  BentoUserData,
  BentoWorkspaceData,
  BoardData,
  boardDataSchema,
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
  location: BentoLocation;
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
    location: {
      boardId: engine.getState().location.board || "",
      params: engine.getState().location.params || {},
    },
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
          goTo: async ({ location }: { location?: BentoLocation }) => {
            if (location) {
              engine.goToLocation({
                ...engine.getState().location,
                board: location.boardId,
                params: location.params as Record<string, string>,
              });
            }
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

    updateWorkspace: async (data: Partial<WorkspaceState>) => {
      const current = store.getState().workspace;
      if (!current) return;
      const updated = { ...current, ...data } as any;
      await workspaceService.updateWorkspace(current.id, updated);
      store.setState({ workspace: updated });
    },

    goTo: (args: { location?: BentoLocation }) => {
      engine.goToLocation({
        board: args.location?.boardId,
        params: args.location?.params,
      });
    },

    installService: (serviceName: string, ref: ModuleReference) => {
      store.setState((state) => {
        const currentWorkspace = state.workspace;
        if (!currentWorkspace) {
          return state;
        }

        const nextServices = {
          ...(currentWorkspace as any).services,
        } as Record<string, ServiceData>;
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
          workspace: { ...currentWorkspace, services: nextServices },
        };
        return nextState;
      });
    },
  };

  // sync host location to runtime

  function getBentoLocation(
    hostState: UbentoEngineState,
  ): BentoLocation | undefined {
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
