import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { UbentoSDK } from "@ubento/sdk";
import { queryKeys } from "./libs/keys";

export function createUbentoWorkspaceService({
  ubentoSdk,
}: {
  ubentoSdk: UbentoSDK;
}) {
  return {
    // ===== Workspaces =====

    useWorkspaces: (filters: { team_id?: string } = {}) => {
      return useQuery({
        queryKey: queryKeys.workspaces(filters),
        queryFn: async () => {
          return await ubentoSdk.workspace.listWorkspaces(filters);
        },
      });
    },

    useWorkspace: (workspaceId: string) => {
      return useQuery({
        queryKey: queryKeys.workspace({ workspaceId }),
        queryFn: async () => {
          return await ubentoSdk.workspace.getWorkspace(workspaceId);
        },
        enabled: !!workspaceId,
      });
    },

    useWorkspaceBySlug: ({ slug }: { slug: string }) => {
      return useQuery({
        queryKey: queryKeys.workspaceBySlug({ slug }),
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
          queryClient.invalidateQueries({ queryKey: queryKeys.workspaces() });
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
          queryClient.invalidateQueries({ queryKey: queryKeys.workspaces() });
          queryClient.invalidateQueries({
            queryKey: queryKeys.workspace({ workspaceId }),
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
          queryClient.invalidateQueries({ queryKey: queryKeys.workspaces() });
        },
      });
    },

    // ===== Boards =====

    useBoards: ({ workspace_id }: { workspace_id: string }) => {
      return useQuery({
        queryKey: queryKeys.boards({ workspace_id }),
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
            queryKey: queryKeys.boards({ workspace_id }),
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
          queryClient.invalidateQueries({ queryKey: queryKeys.boards() });
          queryClient.invalidateQueries({
            queryKey: queryKeys.board({ boardId }),
          });
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
          queryClient.invalidateQueries({ queryKey: queryKeys.boards() });
        },
      });
    },

    // ===== Workspace Memberships =====

    useWorkspaceMemberships: (
      filters: { workspace_id?: string; user_id?: string } = {},
    ) => {
      return useQuery({
        queryKey: queryKeys.workspaceMemberships(filters),
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
            queryKey: queryKeys.workspaceMemberships({ workspace_id }),
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
          queryClient.invalidateQueries({
            queryKey: queryKeys.workspaceMemberships(),
          });
        },
      });
    },

    // ===== Workspace Invites =====

    useWorkspaceInvites: ({ workspace_id }: { workspace_id: string }) => {
      return useQuery({
        queryKey: queryKeys.workspaceInvites({ workspace_id }),
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
            queryKey: queryKeys.workspaceInvites({ workspace_id }),
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
          queryClient.invalidateQueries({
            queryKey: queryKeys.workspaceMemberships(),
          });
        },
      });
    },
  };
}
