export const appModalRoutes = {
  team: {
    tab: (tab: string) => `/team/${tab}`,
    root: "/team/general",
    general: "/team/general",
    billing: "/team/billing",
    connections: "/team/connections",
    modules: "/team/modules",
    createCollection: "/team/modules/create-collection",
    collectionDetails: "/team/modules/collection-details",
  },
  account: {
    root: "/account/general",
    general: "/account/general",
    appearance: "/account/appearance",
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
    serviceHttp: "/services/service-http",
    serviceMongo: "/services/service-mongo",
    create: "/services/create",
    createHttp: "/services/create-http",
    createMongo: "/services/create-mongo",
    edit: "/services/edit",
    editHttp: "/services/edit-http",
    editMongo: "/services/edit-mongo",
    createProvider: "/services/create-provider",
    editProvider: "/services/edit-provider",
  },
  assets: {
    browse: "/assets",
    packages: "/packages",
    package: "/packages/package",
  },
};

export function routeMatch(location: string, path: string): boolean {
  return path == location || location.startsWith(path + "/");
}
