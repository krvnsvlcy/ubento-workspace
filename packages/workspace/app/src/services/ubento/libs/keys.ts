export const queryKeys = {
  // IAM
  user: ({ userId }: { userId: string }) => ["user", userId],
  userTeams: ({ userId }: { userId: string }) => ["user-teams", userId],
  teams: (filters?: any) => (filters ? ["teams", filters] : ["teams"]),
  team: ({ teamId }: { teamId: string }) => ["team", teamId],
  teamInvites: ({ teamId }: { teamId: string }) => ["team-invites", teamId],

  // Workspace
  workspaces: (filters?: any) =>
    filters ? ["workspaces", filters] : ["workspaces"],
  workspace: ({ workspaceId }: { workspaceId: string }) => [
    "workspace",
    workspaceId,
  ],
  workspaceBySlug: ({ slug }: { slug: string }) => ["workspace", "slug", slug],
  workspaceMemberships: (filters?: any) =>
    filters ? ["workspace-memberships", filters] : ["workspace-memberships"],
  workspaceInvites: ({ workspace_id }: { workspace_id: string }) => [
    "workspace-invites",
    { workspace_id },
  ],

  // Boards
  boards: (filters?: any) => (filters ? ["boards", filters] : ["boards"]),
  board: ({ boardId }: { boardId: string }) => ["board", boardId],

  // Modules
  modules: (filters?: any) => (filters ? ["modules", filters] : ["modules"]),
  module: ({ moduleId }: { moduleId: string }) => ["module", moduleId],
};
