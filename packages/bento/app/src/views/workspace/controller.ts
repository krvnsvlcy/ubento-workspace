import { queryKeys } from "@/hooks/keys";
import { getBoard } from "@/hooks/workspace";
import { QueryClient } from "@tanstack/react-query";
import {
  BlockData,
  BoardData,
  boardDataSchema,
  ElementData,
  EngineMode,
  GuestRpcInterface,
  HostRpcInterface,
  ModuleData,
  WorkspaceContext,
  WorkspaceData,
  workspaceDataSchema,
} from "@ubento/engine";
import {
  createDuplexRpc,
  createWindowPort,
  DuplexRpc,
} from "@ubento/rpc-utils";
import { UbentoSDK } from "@ubento/sdk";
import { proxy, subscribe } from "valtio";
import { BentoHost } from "../../types";

export type WorkspaceState = {
  // status
  loading: boolean;
  error: boolean;

  // context
  context: WorkspaceContext;

  // rpc
  connected: boolean; // the iframe has established communication
  ready: boolean; // the iframe has loaded the workspace and is ready

  // data
  workspace: WorkspaceData | null;
  boards: Record<string, BoardData>;
  modules: Record<string, ModuleData>;
};

export type WorkspaceController = {
  state: WorkspaceState;

  connect: (target: Window) => void;
  dispose: () => void;
  load: () => Promise<void>;

  // actions
  setMode: (mode: EngineMode) => void;
  select: (blockIds: string[]) => void;
  setSelectionScope: (selectionScope?: string) => void;
  goTo: (boardId: string, params?: Record<string, string>) => void;

  // workspace mutators
  setHomeBoardId: (homeBoardId: string) => Promise<void>;

  // board mutators
  createBoard: (init: { name?: string }) => Promise<BoardData>;
  deleteBoard: (boardId: string) => Promise<void>;
  setBoardContent: (boardId: string, content: string[]) => Promise<void>;
  addElement: (
    boardId: string,
    containerId: string,
    element: ElementData,
  ) => Promise<string>;
  deleteElement: (boardId: string, elementId: string) => Promise<void>;

  // element mutators
  setElementStyle: (id: string, style: ElementData["style"]) => void;
  // --> stacks only
  setStackContent: (id: string, content: string[]) => Promise<void>;
  // --> blocks only
  setBlockModule: (
    id: string,
    moduleId: string,
    moduleVersionId: string,
  ) => void;
  setBlockProps: (id: string, props: BlockData["props"]) => void;
};

export function createWorkspaceController({
  initialState,
  ubento,
  queryClient,
  host,
  slug,
}: {
  initialState?: Partial<WorkspaceState>;
  ubento: UbentoSDK;
  queryClient: QueryClient;
  host: BentoHost;
  slug: string;
}): WorkspaceController {
  const state = proxy<WorkspaceState>({
    loading: false,
    error: false,
    context: {
      mode: "edit",
      selection: [],
    },
    connected: false,
    ready: false,
    workspace: null,
    boards: {},
    modules: {},
    ...initialState,
  });

  let rpc: DuplexRpc<HostRpcInterface, GuestRpcInterface> | null = null;

  const cleanupContextSubscription = subscribe(state, (ops) => {
    for (const op of ops) {
      console.log(op[1]);
      // rpc?.egress.contextChanged({
      //   context: JSON.parse(JSON.stringify(state.context)),
      // });
    }
  });

  const controller: WorkspaceController = {
    state,
    connect: (target: Window) => {
      rpc = createDuplexRpc<HostRpcInterface, GuestRpcInterface>({
        port: createWindowPort(window, target),
        handlers: {
          connect: () => {
            state.connected = true;
            if (state.workspace) {
              rpc!.egress.init({
                workspace: JSON.parse(JSON.stringify(state.workspace)),
                moduleUrlTemplate: host.moduleUrlTemplate,
              });
            }
          },
          ready: () => {
            state.ready = true;
          },
          getBoard: async ({ boardId }) => {
            const res = await getBoard({ ubento, queryClient, boardId });
            if (!res) throw new Error("Board not found");
            const board = boardDataSchema.parse({
              id: res.id,
              name: res.name,
              ...(res.data as any),
            });
            state.boards[boardId] = JSON.parse(JSON.stringify(board));
            return board;
          },
          listBoards: async () => {
            if (!state.workspace) return [];
            const boards = await queryClient.fetchQuery({
              queryKey: queryKeys.boards({ workspace_id: state.workspace.id }),
              queryFn: () =>
                ubento.workspace.listBoards({
                  workspace_id: state.workspace!.id,
                }),
            });
            const boardDatas = boards
              .map((p) => {
                const { data: boardData, success } = boardDataSchema.safeParse({
                  id: p.id,
                  name: p.name,
                  ...(p.data as any),
                });
                return success ? boardData : undefined;
              })
              .filter(Boolean) as BoardData[];

            for (const board of boardDatas) {
              state.boards[board.id] = JSON.parse(JSON.stringify(board));
            }
            return boardDatas;
          },
          createBoard: async ({ name }) => {
            if (!state.workspace) throw new Error("No workspace loaded");
            const data: Omit<BoardData, "id" | "name"> = {
              content: ["root"],
              elements: {
                root: {
                  type: "stack",
                  content: [],
                  style: {
                    width: 100,
                    height: 100,
                    background: "#3939dcff",
                    cornerRadius: 20,
                  },
                },
              },
            };
            const res = await ubento.workspace.createBoard({
              workspace_id: state.workspace.id,
              name: name || "New Board",
              data,
            });
            queryClient.invalidateQueries({
              queryKey: queryKeys.boards({ workspace_id: state.workspace.id }),
            });
            const board = boardDataSchema.parse({
              id: res.id,
              name: res.name,
              ...(res.data as any),
            });
            state.boards[board.id] = board;
            return board;
          },
          getModule: async ({ moduleId }) => {
            const res = await queryClient.fetchQuery({
              queryKey: queryKeys.module({ moduleId }),
              queryFn: async () => {
                return await ubento.module.getModule(moduleId);
              },
            });
            const module = {
              latestVersionId: res.latest_version_id,
            };
            state.modules[moduleId] = module;
            return module;
          },
          updateContext: (update) => {
            Object.assign(state.context, update);
          },

          // sync
          boardChanged: ({ boardId, board }) => {
            state.boards[boardId] = board;
            ubento.workspace.updateBoard(boardId, { data: board });
            queryClient.setQueryData(queryKeys.board({ boardId }), board);
          },
          workspaceChanged: ({ workspace }) => {
            state.workspace = workspace;
          },
        },
      });

      rpc.run();
    },
    dispose: () => {
      rpc?.dispose();
      cleanupContextSubscription();
    },
    load: async () => {
      state.loading = true;
      try {
        const workspaceData = await queryClient.fetchQuery({
          queryKey: ["workspace", "slug", slug],
          queryFn: () => ubento.workspace.getWorkspaceBySlug(slug),
        });
        if (!workspaceData) {
          throw new Error("Workspace not found");
        }

        let data: WorkspaceData;
        try {
          data = workspaceDataSchema.parse({
            id: workspaceData.id,
            name: workspaceData.name,
            slug: workspaceData.slug,
            ...(workspaceData.data || {}),
          });
        } catch (err) {
          data = workspaceDataSchema.parse({
            id: workspaceData.id,
            name: workspaceData.name,
            slug: workspaceData.slug,
          });
        }

        state.workspace = data;
        state.loading = false;

        if (rpc && state.connected) {
          rpc.egress.init({
            workspace: data,
            moduleUrlTemplate: host.moduleUrlTemplate,
          });
        }
      } catch (err) {
        state.error = true;
        state.loading = false;
      }
    },

    // actions
    setMode: (mode: EngineMode) => {
      state.context.mode = mode;
    },
    select: (elementIds: string[]) => {
      state.context.selection = elementIds;
    },
    setSelectionScope: (selectionScope?: string) => {
      state.context.selectionScope = selectionScope;
    },
    goTo: (boardId: string, params?: Record<string, string>) => {
      state.context.location = { boardId, params: params || {} };
      host.goToLocation({
        view: "workspace",
        params: { slug, boardId, ...params },
      });
    },

    // workspace mutators
    setHomeBoardId: async (homeBoardId: string) => {
      if (state.workspace) {
        state.workspace.homeBoardId = homeBoardId;
      }
      await rpc?.egress.setHomeBoardId({ homeBoardId });
    },

    // board mutators
    createBoard: async (init: { name?: string }) => {
      if (!state.workspace) throw new Error("No workspace loaded");
      const data: Omit<BoardData, "id" | "name"> = {
        content: ["root"],
        elements: {
          root: {
            type: "stack",
            content: [],
            style: {
              width: 100,
              height: 100,
              background: "#3939dcff",
              cornerRadius: 20,
            },
          },
        },
      };
      const res = await ubento.workspace.createBoard({
        workspace_id: state.workspace.id,
        name: init.name || "New Board",
        data,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.boards({ workspace_id: state.workspace.id }),
      });
      const board = boardDataSchema.parse({
        id: res.id,
        name: res.name,
        ...(res.data as any),
      });
      state.boards[board.id] = board;
      return board;
    },
    deleteBoard: async (boardId: string) => {
      delete state.boards[boardId];
      await rpc?.egress.deleteBoard({ boardId });
    },
    setBoardContent: async (boardId: string, content: string[]) => {
      if (state.boards[boardId]) {
        state.boards[boardId].content = content;
      }
      await rpc?.egress.setBoardContent({ boardId, content });
    },
    addElement: async (boardId, containerId, element) => {
      const elementId = await rpc!.egress.addElement({
        boardId,
        containerId,
        element,
      });
      // State will be updated via boardChanged event
      return elementId;
    },
    deleteElement: async (boardId, elementId) => {
      await rpc?.egress.deleteElement({ boardId, elementId });
    },

    // element mutators
    setElementStyle: (id, style) => {
      rpc?.egress.setElementStyle({ id, style });
    },
    setStackContent: async (id, content) => {
      await rpc?.egress.setStackContent({ id, content });
    },
    setBlockModule: (id, moduleId, moduleVersionId) => {
      rpc?.egress.setBlockModule({ id, moduleId, moduleVersionId });
    },
    setBlockProps: (id, props) => {
      rpc?.egress.setElementProps({ id, props });
    },
  };

  return controller;
}
