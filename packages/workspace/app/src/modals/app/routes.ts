export const appModalRoutes = {
  team: {
    tab: (tab: string) => `/team/${tab}`,
    root: "/team/general",
    general: "/team/general",
    billing: "/team/billing",
    connections: "/team/connections",
  },
  account: {
    root: "/account/general",
    general: "/account/general",
  },
  workspace: {
    root: "/workspace/general",
    general: "/workspace/general",
  },
  providers: {
    providers: "/providers",
    create: "/providers/create",
  },
  provider: {
    provider: "/provider", // must be passed the provider code as params
    oauthClient: "/provider/oauth", // must be passed the provider code as params
    createConnection: "/provider/create-connection", // must be passed the provider code as params
    editConnection: "/provider/edit-connection", // must be passed the connection id as params
  },
  services: {
    services: "/services",
    service: "/services/service", // must be passed the id of the service
    create: "/services/create",
    edit: "/services/edit",
    createProvider: "/services/create-provider",
    editProvider: "/services/edit-provider",
  },
};

export function routeMatch(location: string, path: string): boolean {
  return path == location || location.startsWith(path + "/");
}
