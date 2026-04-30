import { UbentoEngine, UbentoEngineState } from "@/engine/engine";
import {
  BlockData,
  BoardData,
  boardDataSchema,
  ElementData,
  EngineLocation,
  EngineMode,
  GuestRpcInterface,
  HostRpcInterface,
  ModuleData,
  WorkspaceData,
  workspaceDataSchema,
} from "@ubento/engine";
import {
  createDuplexRpc,
  createWindowPort,
  DuplexRpc,
} from "@ubento/rpc-utils";
import { dequal } from "dequal/lite";
import { createStore, StoreApi } from "zustand/vanilla";

export type WorkspaceState = {
  // status
  loading: boolean;
  error: string;

  // context
  mode: EngineMode;
  location?: EngineLocation;
  selectionScope?: string;
  selection: string[];

  // rpc
  connected: boolean; // the iframe has established communication
  ready: boolean; // the iframe has loaded the workspace and is ready

  // data
  workspace: WorkspaceData | null;
  boards: Record<string, BoardData>;
  modules: Record<string, ModuleData>;
};

export type WorkspaceStore = WorkspaceState & {
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
  updateWorkspace: (workspace: Partial<WorkspaceData>) => Promise<void>;

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
  setBoardStyle: (boardId: string, style: BoardData["style"]) => void;

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

export type WorkspaceController = StoreApi<WorkspaceStore>;

export function createWorkspaceController({
  engine,
  slug,
}: {
  engine: UbentoEngine;
  slug: string;
}): WorkspaceController {
  let rpc: DuplexRpc<HostRpcInterface, GuestRpcInterface> | null = null;
  const workspaceService = engine.ubento.workspace;
  const moduleService = engine.ubento.module;

  const store = createStore<WorkspaceStore>()((set, get) => ({
    loading: false,
    error: "",
    mode: "live",
    selection: [],
    connected: false,
    ready: false,
    workspace: null,
    boards: {},
    modules: {},

    connect: (target: Window) => {
      rpc = createDuplexRpc<HostRpcInterface, GuestRpcInterface>({
        port: createWindowPort(window, target),
        handlers: {
          connect: () => {
            set({ connected: true });
            const current = get();
            if (current.workspace) {
              rpc!.egress.init({
                workspace: current.workspace,
                moduleUrlTemplate: engine.moduleUrlTemplate,
              });
            }
          },
          ready: () => {
            set({ ready: true });
          },
          getBoard: async ({ boardId }) => {
            const res = await workspaceService.getBoard(boardId);
            if (!res) throw new Error("Board not found");
            const board = boardDataSchema.parse({
              id: res.id,
              name: res.name,
              ...(res.data as any),
            });
            set((s) => ({
              boards: { ...s.boards, [boardId]: board },
            }));
            return board;
          },
          listBoards: async () => {
            const current = get();
            if (!current.workspace) return [];
            const response = await workspaceService.getBoards({
              workspace_id: current.workspace.id,
            });
            const boardDatas = response.data
              .map((p) => {
                const { data: boardData, success } = boardDataSchema.safeParse({
                  id: p.id,
                  name: p.name,
                  ...(p.data as any),
                });
                return success ? boardData : undefined;
              })
              .filter(Boolean) as BoardData[];

            set((s) => {
              const nextBoards = { ...s.boards };
              for (const board of boardDatas) {
                nextBoards[board.id] = board;
              }
              return { boards: nextBoards };
            });
            return boardDatas;
          },
          createBoard: async ({ name }) => {
            const current = get();
            if (!current.workspace) throw new Error("No workspace loaded");
            const data: Omit<BoardData, "id" | "name"> = {
              content: ["root"],
              elements: {
                root: {
                  type: "stack",
                  content: [],
                  style: {
                    width: 100,
                    height: 100,
                  },
                },
              },
            };
            const res = await workspaceService.createBoard({
              workspace_id: current.workspace.id,
              name: name || "New Board",
              data,
            });
            const board = boardDataSchema.parse({
              id: res.id,
              name: res.name,
              ...(res.data as any),
            });
            set((s) => ({
              boards: { ...s.boards, [board.id]: board },
            }));
            return board;
          },
          getModule: async ({ moduleId }) => {
            const res = await moduleService.getModule(moduleId);
            const module = {
              latestVersionId: res.latest_version_id || "",
            };
            set((s) => ({
              modules: { ...s.modules, [moduleId]: module },
            }));
            return module;
          },
          getModuleArtifact: async ({
            moduleId,
            versionId,
          }: {
            moduleId: string;
            versionId: string;
          }) => {
            return await engine.ubento.module.getModuleVersionArtifact(
              moduleId,
              versionId,
            );
          },
          searchModules: async ({ query }) => {
            const current = get();
            if (!current.workspace) return [];
            const response = await moduleService.getModules({
              team_id: current.workspace.teamId,
            });
            return response.data
              .filter(
                (m) =>
                  m.name.toLowerCase().includes(query.toLowerCase()) ||
                  m.id.toLowerCase().includes(query.toLowerCase()),
              )
              .map((m) => ({ id: m.id, name: m.name }));
          },
          createModule: async ({ name }) => {
            const current = get();
            if (!current.workspace) throw new Error("No workspace loaded");
            const res = await moduleService.createModule({
              name,
              team_id: current.workspace.teamId,
              source: `export default function Component() { return <div>${name}</div> }`,
              scope: "team",
            });
            return {
              id: res.id,
              latestVersionId: res.latest_version_id || "",
            };
          },
          setMode: ({ mode }) => {
            set({ mode });
          },
          setLocation: ({ location }) => {
            if (location) {
              engine.goToLocation({
                view: "workspace",
                params: {
                  slug,
                  boardId: location.boardId,
                },
              });
            } else {
              engine.goToLocation({ view: "workspace", params: { slug } });
            }
          },
          setSelectionScope: ({ selectionScope }) => {
            set({ selectionScope });
          },
          setSelection: ({ selection }) => {
            set({ selection });
          },

          // sync
          boardChanged: ({ boardId, board }) => {
            set((s) => ({
              boards: { ...s.boards, [boardId]: board },
            }));
            workspaceService.updateBoard(boardId, { data: board });
          },
          workspaceChanged: ({ workspace }) => {
            set({ workspace });
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

    load: async () => {
      set({ loading: true });
      try {
        const workspaceData = await workspaceService.getWorkspaceBySlug(slug);
        if (!workspaceData) {
          throw new Error("Workspace not found");
        }

        let data: WorkspaceData;
        try {
          data = workspaceDataSchema.parse({
            id: workspaceData.id,
            name: workspaceData.name,
            slug: workspaceData.slug,
            teamId: workspaceData.team_id,
            ...(workspaceData.data || {}),
          });
        } catch (err) {
          data = workspaceDataSchema.parse({
            id: workspaceData.id,
            name: workspaceData.name,
            slug: workspaceData.slug,
            teamId: workspaceData.team_id,
          });
        }

        set({
          workspace: data,
          loading: false,
        });

        const current = get();
        if (rpc && current.connected) {
          rpc.egress.init({
            workspace: data,
            moduleUrlTemplate: engine.moduleUrlTemplate,
          });
        }
      } catch (err) {
        set({
          error: String(err),
          loading: false,
        });
      }
    },

    // actions
    setMode: (mode: EngineMode) => {
      set({ mode });
    },
    select: (elementIds: string[]) => {
      set({ selection: elementIds });
    },
    setSelectionScope: (selectionScope?: string) => {
      set({ selectionScope });
    },
    goTo: (boardId: string, params?: Record<string, string>) => {
      set({ location: { boardId, params: params || {} } });
      engine.goToLocation({
        view: "workspace",
        params: { slug, boardId, ...params },
      });
    },

    // workspace mutators
    setHomeBoardId: async (homeBoardId: string) => {
      set((s) => ({
        workspace: s.workspace ? { ...s.workspace, homeBoardId } : null,
      }));
      await rpc?.egress.setHomeBoardId({ homeBoardId });
    },
    updateWorkspace: async (workspace: Partial<WorkspaceData>) => {
      set((s) => ({
        workspace: s.workspace ? { ...s.workspace, ...workspace } : null,
      }));
      await rpc?.egress.updateWorkspace({ workspace });
    },

    // board mutators
    createBoard: async (init: { name?: string }) => {
      const current = get();
      if (!current.workspace) throw new Error("No workspace loaded");
      const data: Omit<BoardData, "id" | "name"> = {
        content: ["root"],
        elements: {
          root: {
            type: "stack",
            content: [],
            style: {
              width: 100,
              height: 100,
            },
          },
        },
      };
      const res = await workspaceService.createBoard({
        workspace_id: current.workspace.id,
        name: init.name || "New Board",
        data,
      });
      const board = boardDataSchema.parse({
        id: res.id,
        name: res.name,
        ...(res.data as any),
      });
      set((s) => ({
        boards: { ...s.boards, [board.id]: board },
      }));
      return board;
    },
    deleteBoard: async (boardId: string) => {
      set((s) => {
        const nextBoards = { ...s.boards };
        delete nextBoards[boardId];
        return { boards: nextBoards };
      });
      await rpc?.egress.deleteBoard({ boardId });
    },
    setBoardContent: async (boardId: string, content: string[]) => {
      set((s) => {
        if (!s.boards[boardId]) return s;
        return {
          boards: {
            ...s.boards,
            [boardId]: { ...s.boards[boardId], content },
          },
        };
      });
      await rpc?.egress.setBoardContent({ boardId, content });
    },
    addElement: async (boardId, containerId, element) => {
      const elementId = await rpc!.egress.addElement({
        boardId,
        containerId,
        element,
      });
      return elementId;
    },
    deleteElement: async (boardId, elementId) => {
      await rpc?.egress.deleteElement({ boardId, elementId });
    },
    setBoardStyle: (boardId, style) => {
      rpc?.egress.setBoardStyle({ boardId, style });
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
  }));

  // sync host location

  engine.subscribe((curr: UbentoEngineState, prev: UbentoEngineState) => {
    if (!dequal(curr.location, prev.location)) {
      const location = curr.location;
      if (location?.view === "workspace" && location?.params?.slug) {
        store.setState((s) => ({
          ...s,
          location: location.params.boardId
            ? {
                boardId: location.params.boardId,
                params: location.params,
              }
            : undefined,
        }));
      }
    }
  });

  store.subscribe((curr, prev) => {
    if (curr.mode !== prev.mode) {
      rpc?.egress.modeChanged({ mode: curr.mode });
    }
    if (!dequal(curr.location, prev.location)) {
      rpc?.egress.locationChanged({ location: curr.location });
    }
    if (curr.selectionScope !== prev.selectionScope) {
      rpc?.egress.selectionScopeChanged({
        selectionScope: curr.selectionScope,
      });
    }
    if (!dequal(curr.selection, prev.selection)) {
      rpc?.egress.selectionChanged({ selection: curr.selection });
    }
  });

  return store;
}
