export interface paths {
  "/integration/connection-providers": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List all connection providers */
    get: {
      parameters: {
        query?: {
          organization_id?: string;
          name?: string;
          cursor?: string;
          limit?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description A list of connection providers */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data: components["schemas"]["ConnectionProvider"][];
              page: {
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
    /** Create a connection provider */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: {
        content: {
          "application/json": {
            organization_id: string;
            name: string;
            display_name: string;
            description?: string | null;
            config?: TPage<string, never> | null;
          };
        };
      };
      responses: {
        /** @description The created connection provider */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["ConnectionProvider"];
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
  "/integration/connection-providers/{provider_id}": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        provider_id: string;
      };
      cookie?: never;
    };
    /** Get a connection provider */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          provider_id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description The connection provider */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["ConnectionProvider"];
          };
        };
      };
    };
    put?: never;
    post?: never;
    /** Delete a connection provider */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          provider_id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Confirmation of deletion */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              id?: string;
            };
          };
        };
      };
    };
    options?: never;
    head?: never;
    /** Update a connection provider */
    patch: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          provider_id: string;
        };
        cookie?: never;
      };
      requestBody?: {
        content: {
          "application/json": {
            name?: string;
            display_name?: string;
            description?: string | null;
            config?: TPage<string, never> | null;
          };
        };
      };
      responses: {
        /** @description The updated connection provider */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["ConnectionProvider"];
          };
        };
      };
    };
    trace?: never;
  };
  "/integration/connections": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List all connections */
    get: {
      parameters: {
        query?: {
          organization_id?: string;
          cursor?: string;
          limit?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description A list of connections */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              data: components["schemas"]["Connection"][];
              page: {
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
    /** Create a connection */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: {
        content: {
          "application/json": {
            organization_id: string;
            provider_id: string;
            auth?: TPage<string, never> | null;
          };
        };
      };
      responses: {
        /** @description The created connection */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Connection"];
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
  "/integration/connections/{connection_id}": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        connection_id: string;
      };
      cookie?: never;
    };
    /** Get a connection */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          connection_id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description The connection */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Connection"];
          };
        };
      };
    };
    put?: never;
    post?: never;
    /** Delete a connection */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          connection_id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Confirmation of deletion */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              id?: string;
            };
          };
        };
      };
    };
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/integration/connections/{connection_id}/auth": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        connection_id: string;
      };
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Update connection auth */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          connection_id: string;
        };
        cookie?: never;
      };
      requestBody?: {
        content: {
          "application/json": TPage<string, never>;
        };
      };
      responses: {
        /** @description The updated connection */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Connection"];
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
    ConnectionProvider: {
      id: string;
      /** @default connection_provider */
      entity: string;
      organization_id: string;
      name: string;
      display_name: string;
      description?: string;
      config?: TPage<string, never>;
      /** @default 1 */
      version: number;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
    };
    Connection: {
      id: string;
      /** @default connection */
      entity: string;
      organization_id: string;
      provider_id: string;
      auth_strategy?: string;
      auth?: components["schemas"]["EncryptedData"] | null;
      /** @default 1 */
      version: number;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
    };
    OAuthConnectionState: {
      id: string;
      /** @default oauth_connection_state */
      entity: string;
      organization_id: string;
      provider_id: string;
      state?: string;
      redirect_uri?: string;
      /** Format: date-time */
      expires_at: string;
      /** @default 1 */
      version: number;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
    };
    EncryptedData: {
      iv: string;
      auth_tag: string;
      cipher_text: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = TPage<string, never>;
export type operations = TPage<string, never>;
