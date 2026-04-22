export const ubentoApi = {
  audience: "https://api.ubento.dev",
  permissions: {
    identity: {
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
    },
  },
};
