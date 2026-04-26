import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { UbentoSDK } from "@ubento/sdk";
import { queryKeys } from "./keys";
import { useUbento } from "./ubento";

// ===== Workspaces =====

export function useWorkspaces(filters: { team_id?: string } = {}) {
  const ubento = useUbento();
  return useQuery({
    queryKey: ["workspaces", filters],
    queryFn: async () => {
      return await ubento.workspace.listWorkspaces(filters);
    },
  });
}

export function useWorkspace(workspaceId: string) {
  const ubento = useUbento();
  return useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => {
      return await ubento.workspace.getWorkspace(workspaceId);
    },
    enabled: !!workspaceId,
  });
}

export function useWorkspaceBySlug({ slug }: { slug: string }) {
  const ubento = useUbento();
  return useQuery({
    queryKey: ["workspace", "slug", slug],
    queryFn: async () => {
      return await ubento.workspace.getWorkspaceBySlug(slug);
    },
    enabled: !!slug,
  });
}

export function useCreateWorkspace() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      team_id: string;
      description?: string;
      data: Record<string, unknown>;
    }) => {
      return await ubento.workspace.createWorkspace(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });
}

export function useUpdateWorkspace() {
  const ubento = useUbento();
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
      return await ubento.workspace.updateWorkspace(workspaceId, data);
    },
    onSuccess: (_, { workspaceId }) => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", workspaceId] });
    },
  });
}

export function useDeleteWorkspace() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (workspaceId: string) => {
      return await ubento.workspace.deleteWorkspace(workspaceId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });
}

// ===== Boards =====

export function useBoards({ workspace_id }: { workspace_id: string }) {
  const ubento = useUbento();
  return useQuery({
    queryKey: ["boards", { workspace_id }],
    queryFn: async () => {
      return await ubento.workspace.listBoards({ workspace_id });
    },
    enabled: !!workspace_id,
  });
}

export function getBoard({
  ubento,
  boardId,
  queryClient,
}: {
  ubento: UbentoSDK;
  queryClient: QueryClient;
  boardId: string;
}) {
  return queryClient.fetchQuery({
    queryKey: queryKeys.board({ boardId }),
    queryFn: async () => {
      return await ubento.workspace.getBoard(boardId);
    },
  });
}

export function useBoard(boardId: string) {
  const ubento = useUbento();
  return useQuery({
    queryKey: queryKeys.board({ boardId }),
    queryFn: async () => {
      return await ubento.workspace.getBoard(boardId);
    },
    enabled: !!boardId,
  });
}

export function useCreateBoard() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      workspace_id: string;
      name: string;
      data: any;
    }) => {
      return await ubento.workspace.createBoard(data);
    },
    onSuccess: (_, { workspace_id }) => {
      queryClient.invalidateQueries({ queryKey: ["boards", { workspace_id }] });
    },
  });
}

export function useUpdateBoard() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      boardId,
      data,
    }: {
      boardId: string;
      data: { name?: string; path?: string; data?: any };
    }) => {
      return await ubento.workspace.updateBoard(boardId, data);
    },
    onSuccess: (_, { boardId }) => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["board", boardId] });
    },
  });
}

export function useDeleteBoard() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (boardId: string) => {
      return await ubento.workspace.deleteBoard(boardId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}


// ===== Workspace Memberships =====

export function useWorkspaceMemberships(
  filters: { workspace_id?: string; user_id?: string } = {},
) {
  const ubento = useUbento();
  return useQuery({
    queryKey: ["workspace-memberships", filters],
    queryFn: async () => {
      return await ubento.workspace.listWorkspaceMemberships(filters);
    },
  });
}

export function useCreateWorkspaceMembership() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      workspace_id: string;
      user_id: string;
      role: string;
    }) => {
      return await ubento.workspace.createWorkspaceMembership(data);
    },
    onSuccess: (_, { workspace_id }) => {
      queryClient.invalidateQueries({
        queryKey: ["workspace-memberships", { workspace_id }],
      });
    },
  });
}

export function useDeleteWorkspaceMembership() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (membershipId: string) => {
      return await ubento.workspace.deleteWorkspaceMembership(membershipId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace-memberships"] });
    },
  });
}

// ===== Workspace Invites =====

export function useWorkspaceInvites({ workspace_id }: { workspace_id: string }) {
  const ubento = useUbento();
  return useQuery({
    queryKey: ["workspace-invites", { workspace_id }],
    queryFn: async () => {
      return await ubento.workspace.listWorkspaceInvites({ workspace_id });
    },
    enabled: !!workspace_id,
  });
}

export function useCreateWorkspaceInvite() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      workspace_id,
      data,
    }: {
      workspace_id: string;
      data: { email: string; role: string };
    }) => {
      return await ubento.workspace.createWorkspaceInvite(workspace_id, data);
    },
    onSuccess: (_, { workspace_id }) => {
      queryClient.invalidateQueries({ queryKey: ["workspace-invites", { workspace_id }] });
    },
  });
}

export function useAcceptWorkspaceInvite() {
  const ubento = useUbento();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, token }: { id: string; token: string }) => {
      return await ubento.workspace.acceptWorkspaceInvite(id, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace-memberships"] });
    },
  });
}
