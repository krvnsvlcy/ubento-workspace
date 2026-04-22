export interface paths {
  "/organizations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List Organizations */
    get: {
      parameters: {
        query?: {
          cursor?: string;
          limit?: number;
          ids?: string[];
          name?: string;
          owner?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description A list of organizations */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Organization"][];
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/organizations/{organization_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Organization */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          organization_id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Organization details */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Organization"];
          };
        };
        /** @description Invalid organization id */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Error"];
          };
        };
        /** @description Organization not found */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Error"];
          };
        };
      };
    };
    put?: never;
    post?: never;
    /** Delete Organization */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          organization_id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Organization deleted */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": string;
          };
        };
        /** @description Organization not found */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Error"];
          };
        };
      };
    };
    options?: never;
    head?: never;
    /** Update Organization */
    patch: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          organization_id: string;
        };
        cookie?: never;
      };
      requestBody?: {
        content: {
          "application/json": {
            name?: string;
          };
        };
      };
      responses: {
        /** @description Organization updated */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Organization"];
          };
        };
        /** @description Invalid organization id or validation error */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Error"];
          };
        };
        /** @description Organization not found */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Error"];
          };
        };
      };
    };
    trace?: never;
  };
  "/organizations/{organization_id}/invites": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List organization invites */
    get: {
      parameters: {
        query?: {
          /** @example 20 */
          limit?: components["parameters"]["queryLimit"];
          cursor?: components["parameters"]["queryCursor"];
          /** @example PENDING,ACCEPTED */
          statuses?: components["schemas"]["InviteStatus"][];
          invitee_email?: string;
        };
        header?: never;
        path: {
          organization_id: components["parameters"]["pathOrganizationId"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Invites page */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              items: components["schemas"]["OrganizationInvite"][];
              next_cursor?: string | null;
            };
          };
        };
        401: components["responses"]["Unauthorized"];
      };
    };
    put?: never;
    /**
     * Create an invite
     * @description Creates a single-use invite and returns a plaintext token once. The token must be stored client-side for composing an accept URL.
     */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          organization_id: components["parameters"]["pathOrganizationId"];
        };
        cookie?: never;
      };
      requestBody: {
        content: {
          "application/json": {
            /** Format: email */
            invitee_email: string;
            role: string;
            inviter_id: string;
            /** @default 259200 */
            expires_in_seconds?: number;
          };
        };
      };
      responses: {
        /** @description Invite created */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              invite: components["schemas"]["OrganizationInvite"];
              /** @description Plaintext token (returned once) */
              token: string;
              /** @description Optional convenience URL if your backend constructs it */
              accept_url?: string;
            };
          };
        };
        400: components["responses"]["ValidationError"];
        /** @description An active (PENDING) invite already exists for this email */
        409: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Message"];
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/invites/{invite_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get invite (admin/issuer view) */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          invite_id: components["parameters"]["pathInviteId"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Invite */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["OrganizationInvite"];
          };
        };
        401: components["responses"]["Unauthorized"];
        404: components["responses"]["NotFound"];
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/invites/{invite_id}/revoke": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Revoke invite */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          invite_id: components["parameters"]["pathInviteId"];
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Invite revoked */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["OrganizationInvite"];
          };
        };
        401: components["responses"]["Unauthorized"];
        404: components["responses"]["NotFound"];
        /** @description Invite not revocable (already accepted/expired/revoked) */
        409: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Message"];
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/invites/resolve": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Resolve invite by token (public-safe view)
     * @description Resolves an invite using a plaintext token, returning limited information so the client can display a confirmation screen before acceptance.
     */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          "application/json": {
            token: string;
          };
        };
      };
      responses: {
        /** @description Resolved invite (public-safe) */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              invite: components["schemas"]["ResolvedInvitePublic"];
            };
          };
        };
        400: components["responses"]["ValidationError"];
        404: components["responses"]["NotFound"];
        /** @description Invite not acceptable (expired, revoked, already accepted) */
        409: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Message"];
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/invites/accept": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Accept invite by token
     * @description Accepts a PENDING invite using a plaintext token and creates a membership for the specified user.
     */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          "application/json": {
            token: string;
            acceptor_id: string;
          };
        };
      };
      responses: {
        /** @description Invite accepted and membership granted */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              invite: components["schemas"]["OrganizationInvite"];
              organization: components["schemas"]["Organization"];
              membership: {
                id: string;
                role: string;
              };
            };
          };
        };
        400: components["responses"]["ValidationError"];
        404: components["responses"]["NotFound"];
        /** @description Invite not acceptable (expired, revoked, already accepted) */
        409: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Message"];
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/user": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get or Create User */
    get: {
      parameters: {
        query: {
          provider: string;
          provider_id: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description User details */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["User"];
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users/{user_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get User */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          user_id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description User details */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["User"];
          };
        };
        /** @description User not found */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Error"];
          };
        };
      };
    };
    put?: never;
    post?: never;
    /** Delete User */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          user_id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description User deleted */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": string;
          };
        };
        /** @description User not found */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Error"];
          };
        };
      };
    };
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users/{user_id}/organizations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get User Organizations */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          user_id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description User organizations */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Organization"][];
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    Organization: {
      id: string;
      /** @default organization */
      entity: string;
      handle: string;
      name: string;
      picture?: string | null;
      /** @default 1 */
      version: number;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
    };
    OrganizationMembership: {
      id: string;
      /** @default organization_membership */
      entity: string;
      organization_id: string;
      user_id: string;
      role: string;
      /** @default 1 */
      version: number;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
    };
    OrganizationInvite: {
      id: string;
      /** @default organization_invite */
      entity: string;
      organization_id: string;
      invitee_email: string;
      role: string;
      token_hash: string;
      /**
       * @default PENDING
       * @enum {string}
       */
      status: "PENDING" | "ACCEPTED" | "EXPIRED" | "REVOKED";
      inviter_id: string;
      acceptor_id?: string | null;
      /** Format: date-time */
      expires_at: string;
      /** Format: date-time */
      accepted_at?: string | null;
      /** Format: date-time */
      revoked_at?: string | null;
      /** @default 1 */
      version: number;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
    };
    User: {
      id: string;
      /** @default user */
      entity: string;
      provider: string;
      provider_id: string;
      email?: string | null;
      name?: string | null;
      picture?: string | null;
      email_verified?: boolean | null;
      /** Format: date-time */
      last_synced_at?: string | null;
      /** @default 1 */
      version: number;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
    };
    /** @enum {string} */
    InviteStatus: "PENDING" | "ACCEPTED" | "REVOKED" | "EXPIRED";
    ResolvedInvitePublic: {
      /** @description Invite id (safe to reveal) */
      id: string;
      organization: {
        id: string;
        name: string;
      };
      /**
       * Format: email
       * @description Target email; you may obfuscate on the server if preferred.
       */
      invitee_email: string;
      role: string;
      status: components["schemas"]["InviteStatus"];
      /** Format: date-time */
      expires_at: string;
      /** @description Display name of inviter if available. */
      invited_by_display?: string | null;
    };
    Message: {
      message: string;
    };
    Error: {
      error: {
        code: string;
        message: string;
        details?: Record<string, never>;
      };
    };
  };
  responses: {
    /** @description Unauthorized */
    Unauthorized: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Message"];
      };
    };
    /** @description Validation error */
    ValidationError: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          error: {
            /** @example VALIDATION_ERROR */
            code: string;
            message: string;
            details?: Record<string, never>;
          };
        };
      };
    };
    /** @description Resource not found */
    NotFound: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Message"];
      };
    };
  };
  parameters: {
    pathOrganizationId: string;
    pathInviteId: string;
    /** @example 20 */
    queryLimit: number;
    queryCursor: string;
  };
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
