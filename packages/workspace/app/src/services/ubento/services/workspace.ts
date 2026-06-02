import { useQuery } from "@tanstack/react-query";
import {
  createStore,
  Store,
  useMutation,
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

  const workspaceStore: Store<
    workspaceClient.Workspace,
    { team_id?: string },
    UbentoApiPage
  > = createStore({
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
        .sort((a, b) => a.title.localeCompare(b.title));
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

    useWorkspaces: (
      params?: { team_id?: string },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(workspaceStore, params, options);
    },
    useCreateWorkspace: () => {
      return useMutation({
        mutationFn: async (data: {
          title: string;
          team_id: string;
          metadata: Record<string, unknown>;
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
          title?: string;
          metadata?: Record<string, unknown>;
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
    getWorkspaces: async (
      params: { team_id?: string; limit?: number; cursor?: string } = {},
    ) => {
      const res = await ubentoSdk.workspace.listWorkspaces(params);
      workspaceStore.pushMany(res.data);
      return res;
    },
    createWorkspace: async (data: {
      title: string;
      team_id: string;
      metadata: Record<string, unknown>;
      data: Record<string, unknown>;
    }) => {
      const ws = await ubentoSdk.workspace.createWorkspace(data);
      workspaceStore.push(ws);
      return ws;
    },
    updateWorkspace: async (
      workspaceId: string,
      data: {
        title?: string;
        metadata?: Record<string, unknown>;
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
    workspaceStore,
    workspaceMembershipStore,
    workspaceInviteStore,
    ...hooks,
    ...imperatives,
  };
}
