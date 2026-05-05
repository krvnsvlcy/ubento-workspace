import { integrationSchemas as prismaSchemas } from "@ubento/services.database/integration";
import { makeCursorPageResponseSchema } from "@ubento/services.toolkit";

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
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/ConnectionProvider",
                }),
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
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/Connection",
                }),
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
