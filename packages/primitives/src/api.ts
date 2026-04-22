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
      organization: {
        create: "organization:create",
        read: "organization:read",
        update: "organization:update",
        delete: "organization:delete",
        list: "organization:list",
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
      organizationInvite: {
        list: "organization_invite:list",
        create: "organization_invite:create",
        read: "organization_invite:read",
        revoke: "organization_invite:revoke",
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
