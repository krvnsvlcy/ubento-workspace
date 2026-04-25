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
    app: {
      read: "app:read",
      list: "app:list",
      create: "app:create",
      update: "app:update",
      delete: "app:delete",
    },
    page: {
      read: "page:read",
      list: "page:list",
      create: "page:create",
      update: "page:update",
      delete: "page:delete",
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
    },
  },
  roles: {
    root: {
      admin: "admin",
      user: "user",
    },
    team: {
      owner: "team:owner",
      admin: "team:admin",
      member: "team:member",
    },
    app: {
      owner: "app:owner",
      admin: "app:admin",
      editor: "app:editor",
      viewer: "app:viewer",
    },
  },
  scopes: {
    root: "/",
    team: ({ team_id }: { team_id: string }) => `/team/${team_id}`,
    teamOrHigher: ({ team_id }: { team_id?: string }) =>
      team_id ? `/team/${team_id}` : "/",
    app: ({ team_id, app_id }: { team_id: string; app_id: string }) =>
      `/team/${team_id}/app/${app_id}`,
    appOrHigher: ({
      team_id,
      app_id,
    }: {
      team_id?: string;
      app_id?: string;
    }) =>
      team_id && app_id
        ? `/team/${team_id}/app/${app_id}`
        : team_id
          ? `/team/${team_id}`
          : "/",
  },
};
