import { integrationSchemas as prismaSchemas } from "@ubento/database/integration";

export const spec = {
  openapi: "3.0.0",
  info: {
    title: "Integration API",
    version: "1.0.0",
  },
  paths: {
    "/integration/connection-providers": {
      get: {
        summary: "List all connection providers",
        parameters: [
          { name: "organization_id", in: "query", schema: { type: "string" } },
          { name: "name", in: "query", schema: { type: "string" } },
          { name: "cursor", in: "query", schema: { type: "string" } },
          { name: "limit", in: "query", schema: { type: "number" } },
        ],
        responses: {
          "200": {
            description: "A list of connection providers",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/ConnectionProvider" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a connection provider",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  organization_id: { type: "string" },
                  name: { type: "string" },
                  display_name: { type: "string" },
                  description: { type: "string", nullable: true },
                  config: { type: "object", nullable: true },
                },
                required: ["organization_id", "name", "display_name"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The created connection provider",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ConnectionProvider" },
              },
            },
          },
        },
      },
    },
    "/integration/connection-providers/{provider_id}": {
      parameters: [
        {
          name: "provider_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
      ],
      get: {
        summary: "Get a connection provider",
        responses: {
          "200": {
            description: "The connection provider",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ConnectionProvider" },
              },
            },
          },
        },
      },
      patch: {
        summary: "Update a connection provider",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  display_name: { type: "string" },
                  description: { type: "string", nullable: true },
                  config: { type: "object", nullable: true },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The updated connection provider",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ConnectionProvider" },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete a connection provider",
        responses: {
          "200": {
            description: "Confirmation of deletion",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { id: { type: "string" } },
                },
              },
            },
          },
        },
      },
    },
    "/integration/connections": {
      get: {
        summary: "List all connections",
        parameters: [
          { name: "organization_id", in: "query", schema: { type: "string" } },
          { name: "cursor", in: "query", schema: { type: "string" } },
          { name: "limit", in: "query", schema: { type: "number" } },
        ],
        responses: {
          "200": {
            description: "A list of connections",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Connection" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a connection",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  organization_id: { type: "string" },
                  provider_id: { type: "string" },
                  auth: { type: "object", nullable: true },
                },
                required: ["organization_id", "provider_id"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The created connection",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Connection" },
              },
            },
          },
        },
      },
    },
    "/integration/connections/{connection_id}": {
      parameters: [
        {
          name: "connection_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
      ],
      get: {
        summary: "Get a connection",
        responses: {
          "200": {
            description: "The connection",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Connection" },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete a connection",
        responses: {
          "200": {
            description: "Confirmation of deletion",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { id: { type: "string" } },
                },
              },
            },
          },
        },
      },
    },
    "/integration/connections/{connection_id}/auth": {
      parameters: [
        {
          name: "connection_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
      ],
      post: {
        summary: "Update connection auth",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The updated connection",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Connection" },
              },
            },
          },
        },
      },
    },
    "/integration/extensions": {
      get: {
        summary: "List all extensions",
        parameters: [
          {
            name: "ids",
            in: "query",
            schema: { type: "array", items: { type: "string" } },
          },
          { name: "name", in: "query", schema: { type: "string" } },
          { name: "cursor", in: "query", schema: { type: "string" } },
          { name: "limit", in: "query", schema: { type: "number" } },
        ],
        responses: {
          "200": {
            description: "A list of extensions",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Extension" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create an extension",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  organization_id: { type: "string" },
                  name: { type: "string" },
                  description: { type: "string", nullable: true },
                },
                required: ["organization_id", "name"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The created extension",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Extension" },
              },
            },
          },
        },
      },
    },
    "/integration/extensions/{extension_id}": {
      parameters: [
        {
          name: "extension_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
      ],
      get: {
        summary: "Get an extension",
        responses: {
          "200": {
            description: "The extension",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Extension" },
              },
            },
          },
        },
      },
      patch: {
        summary: "Update an extension",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", nullable: true },
                  description: { type: "string", nullable: true },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The updated extension",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Extension" },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete an extension",
        responses: {
          "200": {
            description: "Confirmation of deletion",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { id: { type: "string" } },
                },
              },
            },
          },
        },
      },
    },
    "/integration/extensions/{extension_id}/versions": {
      parameters: [
        {
          name: "extension_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
      ],
      get: {
        summary: "List extension versions by extension ID",
        parameters: [
          { name: "cursor", in: "query", schema: { type: "string" } },
          { name: "limit", in: "query", schema: { type: "number" } },
        ],
        responses: {
          "200": {
            description: "A list of extension versions",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/ExtensionVersion" },
                },
              },
            },
          },
        },
      },
    },
    "/integration/extensions/{extension_id}/versions/{semver}": {
      parameters: [
        {
          name: "extension_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
        {
          name: "semver",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
      ],
      get: {
        summary: "Get an extension version by semver for a given extension ID",
        responses: {
          "200": {
            description: "The extension version",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ExtensionVersion" },
              },
            },
          },
        },
      },
    },
    "/integration/extension-versions": {
      get: {
        summary: "List all extension versions",
        parameters: [
          {
            name: "ids",
            in: "query",
            schema: { type: "array", items: { type: "string" } },
          },
          { name: "extension_name", in: "query", schema: { type: "string" } },
          { name: "semver", in: "query", schema: { type: "string" } },
          { name: "cursor", in: "query", schema: { type: "string" } },
          { name: "limit", in: "query", schema: { type: "number" } },
        ],
        responses: {
          "200": {
            description: "A list of extension versions",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/ExtensionVersion" },
                },
              },
            },
          },
        },
      },
    },
    "/integration/extension-versions/{extension_version_id}": {
      parameters: [
        {
          name: "extension_version_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
      ],
      get: {
        summary: "Get an extension version",
        responses: {
          "200": {
            description: "The extension version",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ExtensionVersion" },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete an extension version",
        responses: {
          "200": {
            description: "Confirmation of deletion",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { id: { type: "string" } },
                },
              },
            },
          },
        },
      },
    },
    "/integration/extension-versions/{extension_version_id}/file/{fileName}": {
      parameters: [
        {
          name: "extension_version_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
        {
          name: "fileName",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
      ],
      get: {
        summary: "Download extension version file",
        responses: {
          "200": {
            description: "File content",
            content: {
              "text/plain": { schema: { type: "string" } },
            },
          },
        },
      },
    },
    "/integration/extension-versions/resolve/{organization_id}/{ref}": {
      parameters: [
        {
          name: "organization_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
        { name: "ref", in: "path", schema: { type: "string" }, required: true },
      ],
      get: {
        summary: "Resolve an extension version by ref",
        responses: {
          "200": {
            description: "The resolved extension version",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ExtensionVersion" },
              },
            },
          },
        },
      },
    },
    "/integration/extensions/deploy": {
      post: {
        summary: "Deploy a new extension version",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  organization_id: { type: "string" },
                  manifest: { type: "object" },
                  files: {
                    type: "object",
                    additionalProperties: { type: "string" },
                  },
                },
                required: ["organization_id", "manifest", "files"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "The deployed extension version",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ExtensionVersion" },
              },
            },
          },
        },
      },
    },
    "/integration/oauth/connect": {
      get: {
        summary: "Start OAuth connection flow",
        parameters: [
          {
            name: "provider_id",
            in: "query",
            schema: { type: "string" },
            required: true,
          },
          {
            name: "organization_id",
            in: "query",
            schema: { type: "string" },
            required: true,
          },
          { name: "state", in: "query", schema: { type: "string" } },
        ],
        responses: {
          "302": { description: "Redirect to provider auth URL" },
        },
      },
    },
    "/integration/oauth/callback": {
      get: {
        summary: "OAuth callback handler",
        parameters: [
          { name: "code", in: "query", schema: { type: "string" } },
          { name: "state", in: "query", schema: { type: "string" } },
          { name: "error", in: "query", schema: { type: "string" } },
        ],
        responses: {
          "200": { description: "Success HTML page" },
        },
      },
    },
  },
  components: {
    schemas: {
      ConnectionProvider: prismaSchemas.definitions.ConnectionProvider,
      Connection: prismaSchemas.definitions.Connection,
      OAuthConnectionState: prismaSchemas.definitions.OAuthConnectionState,
      EncryptedData: prismaSchemas.definitions.EncryptedData,
      Extension: prismaSchemas.definitions.Extension,
      ExtensionVersion: prismaSchemas.definitions.ExtensionVersion,
    },
  },
};
