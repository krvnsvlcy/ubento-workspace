export const queryKeys = {
  pages: ({ app_id }: { app_id: string }) => ["pages", { app_id }],
  page: ({ pageId }: { pageId: string }) => ["page", pageId],
  apps: ({ team_id }: { team_id: string }) => ["apps", { team_id }],
  app: ({ appId }: { appId: string }) => ["app", appId],
  modules: ({ team_id }: { team_id?: string }) => ["modules", { team_id }],
  module: ({ moduleId }: { moduleId: string }) => ["module", moduleId],
};
