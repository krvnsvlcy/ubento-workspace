export const ubentoAuth = {
  audience: "https://api.ubento.pro",
  actions: {
    user: {
      read: "user:read",
      list: "user:list",
      create: "user:create",
      update: "user:update",
      delete: "user:delete",
    },
    team: {
      create: "team:create",
      read: "team:read",
      update: "team:update",
      delete: "team:delete",
      list: "team:list",
    },
    client: {
      create: "client:create",
      read: "client:read",
      update: "client:update",
      delete: "client:delete",
      list: "client:list",
    },
    clientCredential: {
      list: "client_credential:list",
      create: "client_credential:create",
      delete: "client_credential:delete",
    },
    teamInvite: {
      list: "team_invite:list",
      create: "team_invite:create",
      read: "team_invite:read",
      revoke: "team_invite:revoke",
    },
    role: {
      list: "role:list",
      read: "role:read",
      create: "role:create",
      update: "role:update",
      delete: "role:delete",
    },
    roleAssignment: {
      list: "role_assignment:list",
      read: "role_assignment:read",
      create: "role_assignment:create",
      delete: "role_assignment:delete",
    },
    scope: {
      list: "scope:list",
      read: "scope:read",
    },
    scopeKind: {
      list: "scope_kind:list",
      read: "scope_kind:read",
      create: "scope_kind:create",
      update: "scope_kind:update",
      delete: "scope_kind:delete",
    },
    session: {
      list: "session:list",
      read: "session:read",
      revoke: "session:revoke",
    },
    workspace: {
      read: "workspace:read",
      list: "workspace:list",
      create: "workspace:create",
      update: "workspace:update",
      delete: "workspace:delete",
    },
    board: {
      read: "board:read",
      list: "board:list",
      create: "board:create",
      update: "board:update",
      delete: "board:delete",
    },
    component: {
      read: "component:read",
      list: "component:list",
      create: "component:create",
      update: "component:update",
      delete: "component:delete",
    },
    module: {
      read: "module:read",
      list: "module:list",
      create: "module:create",
      update: "module:update",
      delete: "module:delete",
      source: {
        read: "module:source:read",
        update: "module:source:update",
      },
    },
    moduleCollection: {
      read: "module_collection:read",
      list: "module_collection:list",
      create: "module_collection:create",
      update: "module_collection:update",
      delete: "module_collection:delete",
    },
    vertex: {
      invoke: "vertex:invoke",
    },
    setting: {
      read: "setting:read",
      update: "setting:update",
      delete: "setting:delete",
    },
  },
  roles: {
    root: {
      admin: "admin",
      user: "user",
    },
    public: {
      guest: "guest",
    },
    team: {
      owner: "team:owner",
      admin: "team:admin",
      member: "team:member",
    },
    workspace: {
      owner: "workspace:owner",
      admin: "workspace:admin",
      editor: "workspace:editor",
      viewer: "workspace:viewer",
    },
  },
  scopes: {
    root: "/",
    public: "/public",
    user: ({ user_id }: { user_id: string }) => `/user/${user_id}`,
    team: ({ team_id }: { team_id: string }) => `/team/${team_id}`,
    workspace: ({
      team_id,
      workspace_id,
    }: {
      team_id: string;
      workspace_id: string;
    }) => `/team/${team_id}/workspace/${workspace_id}`,
  },
};
