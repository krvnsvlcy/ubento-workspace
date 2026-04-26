export const queryKeys = {
  boards: ({ workspace_id }: { workspace_id: string }) => ["boards", { workspace_id }],
  board: ({ boardId }: { boardId: string }) => ["board", boardId],
  workspaces: ({ team_id }: { team_id: string }) => ["workspaces", { team_id }],
  workspace: ({ workspaceId }: { workspaceId: string }) => ["workspace", workspaceId],
  modules: ({ team_id }: { team_id?: string }) => ["modules", { team_id }],
  module: ({ moduleId }: { moduleId: string }) => ["module", moduleId],
};
