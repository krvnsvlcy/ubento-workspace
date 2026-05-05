import {
  createStore,
  useMutation,
  useQuery,
  useStoreEntities,
  useStoreEntity,
  UseStoreOptions,
} from "@ubento/fabric";
import { ubentoEntities } from "@ubento/services.primitives";
import { UbentoSDK, workspaceClient } from "@ubento/services.sdk";
import { UbentoApiPage, ubentoToFabricPagedResponse } from "../libs/pagination";

export function createUbentoWorkspaceService({
  ubentoSdk,
}: {
  ubentoSdk: UbentoSDK;
}) {
  // --- Stores ---

  const workspaceStore = createStore<
    workspaceClient.Workspace,
    { team_id?: string },
    UbentoApiPage
  >({
    namespace: ubentoEntities.workspace.name,
    getKey: (ws) => ws.id,
    fetchOne: async (key) => {
      return await ubentoSdk.workspace.getWorkspace(key);
    },
    fetchMany: async ({ page, params }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.workspace.listWorkspaces({
          cursor: page?.cursor,
          limit: page?.limit,
          team_id: params?.team_id,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities]
        .filter((ws) => {
          if (params?.team_id && ws.team_id !== params.team_id) return false;
          return true;
        })
        .sort((a, b) => a.name.localeCompare(b.name));
    },
  });

  const boardStore = createStore<
    workspaceClient.Board,
    { workspace_id: string; parent_id?: string | null },
    UbentoApiPage
  >({
    namespace: ubentoEntities.board.name,
    getKey: (board) => board.id,
    fetchOne: async (key) => {
      return await ubentoSdk.workspace.getBoard(key);
    },
    fetchMany: async ({ page, params }) => {
      if (!params?.workspace_id) {
        throw new Error("workspace_id is required to list boards");
      }
      return ubentoToFabricPagedResponse(
        await ubentoSdk.workspace.listBoards({
          workspace_id: params.workspace_id,
          parent_id: params?.parent_id,
          cursor: page?.cursor,
          limit: page?.limit,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities]
        .filter((board) => {
          if (
            params?.workspace_id &&
            board.workspace_id !== params.workspace_id
          )
            return false;

          if (
            params &&
            "parent_id" in params &&
            board.parent_id !== params.parent_id
          )
            return false;

          return true;
        })
        .sort((a, b) => a.name.localeCompare(b.name));
    },
  });

  const workspaceMembershipStore = createStore<
    workspaceClient.WorkspaceMembership,
    { workspace_id?: string; user_id?: string },
    UbentoApiPage
  >({
    namespace: ubentoEntities.workspaceMembership.name,
    getKey: (m) => m.id,
    fetchOne: async () => {
      throw new Error("Single workspace membership fetch is not supported");
    },
    fetchMany: async ({ page, params }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.workspace.listWorkspaceMemberships({
          cursor: page?.cursor,
          limit: page?.limit,
          workspace_id: params?.workspace_id,
          user_id: params?.user_id,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities].filter((m) => {
        if (params?.workspace_id && m.workspace_id !== params.workspace_id)
          return false;
        if (params?.user_id && m.user_id !== params.user_id) return false;
        return true;
      });
    },
  });

  const workspaceInviteStore = createStore<
    workspaceClient.WorkspaceInvite,
    { workspace_id: string },
    UbentoApiPage
  >({
    namespace: ubentoEntities.workspaceInvite.name,
    getKey: (inv) => inv.id,
    fetchOne: async () => {
      throw new Error("Single workspace invite fetch is not supported");
    },
    fetchMany: async ({ page, params }) => {
      if (!params?.workspace_id) {
        throw new Error("workspace_id is required to list workspace invites");
      }
      return ubentoToFabricPagedResponse(
        await ubentoSdk.workspace.listWorkspaceInvites({
          workspace_id: params.workspace_id,
          cursor: page?.cursor,
          limit: page?.limit,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities].filter((inv) => {
        if (params?.workspace_id && inv.workspace_id !== params.workspace_id)
          return false;
        return true;
      });
    },
  });

  // --- Hooks ---

  const hooks = {
    // Workspaces
    useWorkspace: (workspaceId: string, options?: UseStoreOptions) => {
      return useStoreEntity(workspaceStore, workspaceId, options);
    },
    useWorkspaceBySlug: (
      { slug }: { slug: string },
      options?: { enabled?: boolean },
    ) => {
      return useQuery({
        queryKey: ["workspace", "slug", slug],
        queryFn: () => ubentoSdk.workspace.getWorkspaceBySlug(slug),
        enabled: options?.enabled !== false && Boolean(slug),
        onSuccess: (ws) => {
          workspaceStore.push(ws);
        },
      });
    },
    useWorkspaces: (
      params?: { team_id?: string },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(workspaceStore, params, options);
    },
    useCreateWorkspace: () => {
      return useMutation({
        mutationFn: async (data: {
          name: string;
          team_id: string;
          description?: string;
          data: Record<string, unknown>;
        }) => {
          return await ubentoSdk.workspace.createWorkspace(data);
        },
        onSuccess: (ws) => {
          workspaceStore.push(ws);
        },
      });
    },
    useUpdateWorkspace: (workspaceId: string) => {
      return useMutation({
        mutationFn: async (data: {
          name?: string;
          description?: string;
          data?: Record<string, unknown>;
        }) => {
          return await ubentoSdk.workspace.updateWorkspace(workspaceId, data);
        },
        onSuccess: (ws) => {
          workspaceStore.push(ws);
        },
      });
    },
    useDeleteWorkspace: () => {
      return useMutation({
        mutationFn: async (workspaceId: string) => {
          return await ubentoSdk.workspace.deleteWorkspace(workspaceId);
        },
        onSuccess: (_, workspaceId) => {
          workspaceStore.remove(workspaceId);
        },
      });
    },

    // Boards
    useBoard: (boardId: string, options?: UseStoreOptions) => {
      return useStoreEntity(boardStore, boardId, options);
    },
    useBoards: (
      params: { workspace_id: string; parent_id?: string | null },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(boardStore, params, options);
    },
    useCreateBoard: () => {
      return useMutation({
        mutationFn: async (data: {
          workspace_id: string;
          name: string;
          data: any;
          parent_id?: string;
        }) => {
          return await ubentoSdk.workspace.createBoard(data);
        },
        onSuccess: (board) => {
          boardStore.push(board);
        },
      });
    },
    useUpdateBoard: (boardId: string) => {
      return useMutation({
        mutationFn: async (data: {
          name?: string;
          data?: any;
          parent_id?: string;
        }) => {
          return await ubentoSdk.workspace.updateBoard(boardId, data);
        },
        onSuccess: (board) => {
          boardStore.push(board);
        },
      });
    },
    useDeleteBoard: () => {
      return useMutation({
        mutationFn: async (boardId: string) => {
          return await ubentoSdk.workspace.deleteBoard(boardId);
        },
        onSuccess: (_, boardId) => {
          boardStore.remove(boardId);
        },
      });
    },

    // Memberships
    useWorkspaceMemberships: (
      params?: { workspace_id?: string; user_id?: string },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(workspaceMembershipStore, params, options);
    },
    useCreateWorkspaceMembership: () => {
      return useMutation({
        mutationFn: async (data: {
          workspace_id: string;
          user_id: string;
          role: string;
        }) => {
          return await ubentoSdk.workspace.createWorkspaceMembership(data);
        },
        onSuccess: (m) => {
          workspaceMembershipStore.push(m);
        },
      });
    },
    useDeleteWorkspaceMembership: () => {
      return useMutation({
        mutationFn: async (membershipId: string) => {
          return await ubentoSdk.workspace.deleteWorkspaceMembership(
            membershipId,
          );
        },
        onSuccess: (_, membershipId) => {
          workspaceMembershipStore.remove(membershipId);
        },
      });
    },

    // Invites
    useWorkspaceInvites: (
      params: { workspace_id: string },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(workspaceInviteStore, params, options);
    },
    useCreateWorkspaceInvite: () => {
      return useMutation({
        mutationFn: async ({
          workspace_id,
          data,
        }: {
          workspace_id: string;
          data: { email: string; role: string };
        }) => {
          return await ubentoSdk.workspace.createWorkspaceInvite(
            workspace_id,
            data,
          );
        },
        onSuccess: (res) => {
          if (res.invite) workspaceInviteStore.push(res.invite);
        },
      });
    },
    useAcceptWorkspaceInvite: () => {
      return useMutation({
        mutationFn: async ({ id, token }: { id: string; token: string }) => {
          return await ubentoSdk.workspace.acceptWorkspaceInvite(id, token);
        },
        onSuccess: (invite) => {
          workspaceInviteStore.push(invite);
          // Invalidate memberships since we just accepted an invite
          workspaceMembershipStore.removeMany(() => true);
        },
      });
    },
  };

  // --- Imperatives ---

  const imperatives = {
    // Workspaces
    getWorkspace: async (workspaceId: string) => {
      const ws = await ubentoSdk.workspace.getWorkspace(workspaceId);
      workspaceStore.push(ws);
      return ws;
    },
    getWorkspaceBySlug: async (slug: string) => {
      const ws = await ubentoSdk.workspace.getWorkspaceBySlug(slug);
      workspaceStore.push(ws);
      return ws;
    },
    getWorkspaces: async (
      params: { team_id?: string; limit?: number; cursor?: string } = {},
    ) => {
      const res = await ubentoSdk.workspace.listWorkspaces(params);
      workspaceStore.pushMany(res.data);
      return res;
    },
    createWorkspace: async (data: {
      name: string;
      team_id: string;
      description?: string;
      data: Record<string, unknown>;
    }) => {
      const ws = await ubentoSdk.workspace.createWorkspace(data);
      workspaceStore.push(ws);
      return ws;
    },
    updateWorkspace: async (
      workspaceId: string,
      data: {
        name?: string;
        description?: string;
        data?: Record<string, unknown>;
      },
    ) => {
      const ws = await ubentoSdk.workspace.updateWorkspace(workspaceId, data);
      workspaceStore.push(ws);
      return ws;
    },
    deleteWorkspace: async (workspaceId: string) => {
      const res = await ubentoSdk.workspace.deleteWorkspace(workspaceId);
      workspaceStore.remove(workspaceId);
      return res;
    },

    // Boards
    getBoard: async (boardId: string) => {
      const board = await ubentoSdk.workspace.getBoard(boardId);
      boardStore.push(board);
      return board;
    },
    listBoards: async (params: {
      workspaceId: string;
      limit?: number;
      cursor?: string;
      parentId?: string;
    }) => {
      const res = await ubentoSdk.workspace.listBoards({
        workspace_id: params.workspaceId,
        limit: params.limit,
        cursor: params.cursor,
        parent_id: params.parentId,
      });
      boardStore.pushMany(res.data);
      return res;
    },
    createBoard: async (data: {
      name: string;
      workspace_id: string;
      data: Record<string, unknown>;
      parentId?: string;
    }) => {
      const board = await ubentoSdk.workspace.createBoard(data);
      boardStore.push(board);
      return board;
    },
    updateBoard: async (
      boardId: string,
      update: {
        name?: string;
        data?: Record<string, unknown>;
        parentId?: string;
      },
    ) => {
      const board = await ubentoSdk.workspace.updateBoard(boardId, update);
      boardStore.push(board);
      return board;
    },
    deleteBoard: async (boardId: string) => {
      const res = await ubentoSdk.workspace.deleteBoard(boardId);
      boardStore.remove(boardId);
      return res;
    },

    // Memberships
    getWorkspaceMemberships: async (params: any = {}) => {
      const res = await ubentoSdk.workspace.listWorkspaceMemberships(params);
      workspaceMembershipStore.pushMany(res.data);
      return res;
    },

    // Invites
    getWorkspaceInvites: async (params: {
      workspace_id: string;
      limit?: number;
      cursor?: string;
    }) => {
      const res = await ubentoSdk.workspace.listWorkspaceInvites(params);
      workspaceInviteStore.pushMany(res.data);
      return res;
    },
  };

  return {
    ...hooks,
    ...imperatives,
  };
}
