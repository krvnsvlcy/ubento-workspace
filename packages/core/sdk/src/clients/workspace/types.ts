export interface paths {
  "/workspaces": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List Workspaces */
    get: {
      parameters: {
        query?: {
          cursor?: components["parameters"]["queryCursor"];
          limit?: components["parameters"]["queryLimit"];
          team_id?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description A list of workspaces */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data: components["schemas"]["Workspace"][];
              nextPage?: {
                /** @enum {string} */
                type: "cursor";
                nextCursor?: string | null;
              };
            };
          };
        };
      };
    };
    put?: never;
    /** Create Workspace */
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
            name: string;
            slug?: string;
            team_id: string;
            description?: string;
          };
        };
      };
      responses: {
        /** @description Workspace created */
        201: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Workspace"];
          };
        };
        400: components["responses"]["ValidationError"];
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/workspaces/slug/{slug}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Workspace by Slug */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          slug: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Workspace details */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Workspace"];
          };
        };
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
  "/workspaces/{workspace_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Workspace */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          workspace_id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Workspace details */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Workspace"];
          };
        };
        404: components["responses"]["NotFound"];
      };
    };
    put?: never;
    post?: never;
    /** Delete Workspace */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          workspace_id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Workspace deleted */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              success?: boolean;
            };
          };
        };
        404: components["responses"]["NotFound"];
      };
    };
    options?: never;
    head?: never;
    /** Update Workspace */
    patch: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          workspace_id: string;
        };
        cookie?: never;
      };
      requestBody?: {
        content: {
          "application/json": {
            name?: string;
            slug?: string;
            description?: string;
          };
        };
      };
      responses: {
        /** @description Workspace updated */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Workspace"];
          };
        };
        404: components["responses"]["NotFound"];
      };
    };
    trace?: never;
  };
  "/boards": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List Boards */
    get: {
      parameters: {
        query: {
          cursor?: components["parameters"]["queryCursor"];
          limit?: components["parameters"]["queryLimit"];
          workspace_id: string;
          parent_id?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description A list of boards */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data: components["schemas"]["Board"][];
              nextPage?: {
                /** @enum {string} */
                type: "cursor";
                nextCursor?: string | null;
              };
            };
          };
        };
      };
    };
    put?: never;
    /** Create Board */
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
            workspace_id: string;
            parent_id?: string;
            name: string;
            path: string;
          };
        };
      };
      responses: {
        /** @description Board created */
        201: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Board"];
          };
        };
        400: components["responses"]["ValidationError"];
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/boards/{board_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Board */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          board_id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Board details */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Board"];
          };
        };
        404: components["responses"]["NotFound"];
      };
    };
    put?: never;
    post?: never;
    /** Delete Board */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          board_id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Board deleted */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              success?: boolean;
            };
          };
        };
        404: components["responses"]["NotFound"];
      };
    };
    options?: never;
    head?: never;
    /** Update Board */
    patch: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          board_id: string;
        };
        cookie?: never;
      };
      requestBody?: {
        content: {
          "application/json": {
            name?: string;
            parent_id?: string | null;
          };
        };
      };
      responses: {
        /** @description Board updated */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Board"];
          };
        };
        404: components["responses"]["NotFound"];
      };
    };
    trace?: never;
  };
  "/workspace-memberships": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List Workspace Memberships */
    get: {
      parameters: {
        query?: {
          cursor?: components["parameters"]["queryCursor"];
          limit?: components["parameters"]["queryLimit"];
          workspace_id?: string;
          user_id?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description A list of workspace memberships */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data: components["schemas"]["WorkspaceMembership"][];
              nextPage?: {
                /** @enum {string} */
                type: "cursor";
                nextCursor?: string | null;
              };
            };
          };
        };
      };
    };
    put?: never;
    /** Create Workspace Membership */
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
            workspace_id: string;
            user_id: string;
            role: string;
          };
        };
      };
      responses: {
        /** @description Workspace membership created */
        201: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["WorkspaceMembership"];
          };
        };
        400: components["responses"]["ValidationError"];
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/workspace-memberships/{membership_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    /** Delete Workspace Membership */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          membership_id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Workspace membership deleted */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              success?: boolean;
            };
          };
        };
        404: components["responses"]["NotFound"];
      };
    };
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/workspace-invites/{workspace_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List Workspace Invites */
    get: {
      parameters: {
        query?: {
          cursor?: components["parameters"]["queryCursor"];
          limit?: components["parameters"]["queryLimit"];
        };
        header?: never;
        path: {
          workspace_id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description A list of workspace invites */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data: components["schemas"]["WorkspaceInvite"][];
              nextPage?: {
                /** @enum {string} */
                type: "cursor";
                nextCursor?: string | null;
              };
            };
          };
        };
      };
    };
    put?: never;
    /** Create Workspace Invite */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          workspace_id: string;
        };
        cookie?: never;
      };
      requestBody: {
        content: {
          "application/json": {
            /** Format: email */
            email: string;
            role: string;
          };
        };
      };
      responses: {
        /** @description Workspace invite created */
        201: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              invite?: components["schemas"]["WorkspaceInvite"];
              token?: string;
            };
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
  "/workspace-invites/{id}/accept": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Accept Workspace Invite */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: string;
        };
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
        /** @description Workspace invite accepted */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["WorkspaceInvite"];
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
}
export type webhooks = TPage<string, never>;
export interface components {
  schemas: {
    Workspace: {
      id: string;
      /** @default workspace */
      entity: string;
      team_id: string;
      name: string;
      slug: string;
      description?: string;
      data: TPage<string, never>;
      /** @default 1 */
      version: number;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
      /** Format: date-time */
      deleted_at?: string;
    };
    Board: {
      id: string;
      /** @default board */
      entity: string;
      workspace_id: string;
      parent_id?: string;
      name: string;
      data: TPage<string, never>;
      /** @default 1 */
      version: number;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
      /** Format: date-time */
      deleted_at?: string;
    };
    WorkspaceMembership: {
      id: string;
      /** @default workspace_membership */
      entity: string;
      workspace_id: string;
      user_id: string;
      role: string;
      /** @default 1 */
      version: number;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
    };
    WorkspaceInvite: {
      id: string;
      /** @default workspace_invite */
      entity: string;
      workspace_id: string;
      email: string;
      role: string;
      invited_by: string;
      /**
       * @default PENDING
       * @enum {string}
       */
      status: "PENDING" | "ACCEPTED" | "REVOKED" | "EXPIRED";
      token_hash?: string;
      /** Format: date-time */
      expires_at: string;
      /** Format: date-time */
      revoked_at?: string;
      revoked_by?: string;
      /** Format: date-time */
      accepted_at?: string;
      accepted_by?: string;
      /** @default 1 */
      version: number;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
    };
    Error: {
      error: {
        code: string;
        message: string;
        details?: TPage<string, never>;
      };
    };
  };
  responses: {
    /** @description Resource not found */
    NotFound: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** @description Validation error */
    ValidationError: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  parameters: {
    queryLimit: number;
    queryCursor: string;
  };
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = TPage<string, never>;
export type operations = TPage<string, never>;
