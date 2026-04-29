import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { UbentoSDK } from "@ubento/sdk";
import { queryKeys } from "./keys";

export function createUbentoWorkspaceService({
  ubentoSdk,
}: {
  ubentoSdk: UbentoSDK;
}) {
  return {
    // ===== Workspaces =====

    useWorkspaces: (filters: { team_id?: string } = {}) => {
      return useQuery({
        queryKey: ["workspaces", filters],
        queryFn: async () => {
          return await ubentoSdk.workspace.listWorkspaces(filters);
        },
      });
    },

    useWorkspace: (workspaceId: string) => {
      return useQuery({
        queryKey: ["workspace", workspaceId],
        queryFn: async () => {
          return await ubentoSdk.workspace.getWorkspace(workspaceId);
        },
        enabled: !!workspaceId,
      });
    },

    useWorkspaceBySlug: ({ slug }: { slug: string }) => {
      return useQuery({
        queryKey: ["workspace", "slug", slug],
        queryFn: async () => {
          return await ubentoSdk.workspace.getWorkspaceBySlug(slug);
        },
        enabled: !!slug,
      });
    },

    useCreateWorkspace: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: async (data: {
          name: string;
          team_id: string;
          description?: string;
          data: Record<string, unknown>;
        }) => {
          return await ubentoSdk.workspace.createWorkspace(data);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        },
      });
    },

    useUpdateWorkspace: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: async ({
          workspaceId,
          data,
        }: {
          workspaceId: string;
          data: {
            name?: string;
            description?: string;
            data: Record<string, unknown>;
          };
        }) => {
          return await ubentoSdk.workspace.updateWorkspace(workspaceId, data);
        },
        onSuccess: (_, { workspaceId }) => {
          queryClient.invalidateQueries({ queryKey: ["workspaces"] });
          queryClient.invalidateQueries({
            queryKey: ["workspace", workspaceId],
          });
        },
      });
    },

    useDeleteWorkspace: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: async (workspaceId: string) => {
          return await ubentoSdk.workspace.deleteWorkspace(workspaceId);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        },
      });
    },

    // ===== Boards =====

    useBoards: ({ workspace_id }: { workspace_id: string }) => {
      return useQuery({
        queryKey: ["boards", { workspace_id }],
        queryFn: async () => {
          return await ubentoSdk.workspace.listBoards({ workspace_id });
        },
        enabled: !!workspace_id,
      });
    },

    fetchBoard: ({
      boardId,
      queryClient,
    }: {
      queryClient: QueryClient;
      boardId: string;
    }) => {
      return queryClient.fetchQuery({
        queryKey: queryKeys.board({ boardId }),
        queryFn: async () => {
          return await ubentoSdk.workspace.getBoard(boardId);
        },
      });
    },

    useBoard: (boardId: string) => {
      return useQuery({
        queryKey: queryKeys.board({ boardId }),
        queryFn: async () => {
          return await ubentoSdk.workspace.getBoard(boardId);
        },
        enabled: !!boardId,
      });
    },

    useCreateBoard: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: async (data: {
          workspace_id: string;
          name: string;
          data: any;
        }) => {
          return await ubentoSdk.workspace.createBoard(data);
        },
        onSuccess: (_, { workspace_id }) => {
          queryClient.invalidateQueries({
            queryKey: ["boards", { workspace_id }],
          });
        },
      });
    },

    useUpdateBoard: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: async ({
          boardId,
          data,
        }: {
          boardId: string;
          data: { name?: string; path?: string; data?: any };
        }) => {
          return await ubentoSdk.workspace.updateBoard(boardId, data);
        },
        onSuccess: (_, { boardId }) => {
          queryClient.invalidateQueries({ queryKey: ["boards"] });
          queryClient.invalidateQueries({ queryKey: ["board", boardId] });
        },
      });
    },

    useDeleteBoard: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: async (boardId: string) => {
          return await ubentoSdk.workspace.deleteBoard(boardId);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["boards"] });
        },
      });
    },

    // ===== Workspace Memberships =====

    useWorkspaceMemberships: (
      filters: { workspace_id?: string; user_id?: string } = {},
    ) => {
      return useQuery({
        queryKey: ["workspace-memberships", filters],
        queryFn: async () => {
          return await ubentoSdk.workspace.listWorkspaceMemberships(filters);
        },
      });
    },

    useCreateWorkspaceMembership: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: async (data: {
          workspace_id: string;
          user_id: string;
          role: string;
        }) => {
          return await ubentoSdk.workspace.createWorkspaceMembership(data);
        },
        onSuccess: (_, { workspace_id }) => {
          queryClient.invalidateQueries({
            queryKey: ["workspace-memberships", { workspace_id }],
          });
        },
      });
    },

    useDeleteWorkspaceMembership: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: async (membershipId: string) => {
          return await ubentoSdk.workspace.deleteWorkspaceMembership(
            membershipId,
          );
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["workspace-memberships"] });
        },
      });
    },

    // ===== Workspace Invites =====

    useWorkspaceInvites: ({ workspace_id }: { workspace_id: string }) => {
      return useQuery({
        queryKey: ["workspace-invites", { workspace_id }],
        queryFn: async () => {
          return await ubentoSdk.workspace.listWorkspaceInvites({
            workspace_id,
          });
        },
        enabled: !!workspace_id,
      });
    },

    useCreateWorkspaceInvite: () => {
      const queryClient = useQueryClient();
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
        onSuccess: (_, { workspace_id }) => {
          queryClient.invalidateQueries({
            queryKey: ["workspace-invites", { workspace_id }],
          });
        },
      });
    },

    useAcceptWorkspaceInvite: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: async ({ id, token }: { id: string; token: string }) => {
          return await ubentoSdk.workspace.acceptWorkspaceInvite(id, token);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["workspace-memberships"] });
        },
      });
    },
  };
}
