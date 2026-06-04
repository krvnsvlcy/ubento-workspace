import { vertexSchemas as prismaSchemas } from "@ubento/services.database/vertex";
import { makeCursorPageResponseSchema } from "@ubento/services.toolkit";

export const spec = {
  openapi: "3.0.0",
  info: {
    title: "Vertex API",
    version: "1.0.0",
  },
  paths: {
    "/vertex/http-connection-providers": {
      get: {
        summary: "List all http connection providers",
        parameters: [
          { name: "team_id", in: "query", schema: { type: "string" } },
          { name: "name", in: "query", schema: { type: "string" } },
          { name: "cursor", in: "query", schema: { type: "string" } },
          { name: "limit", in: "query", schema: { type: "number" } },
          {
            name: "tags",
            in: "query",
            schema: { type: "array", items: { type: "string" } },
          },
        ],
        responses: {
          "200": {
            description: "A list of http connection providers",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/HttpConnectionProvider",
                }),
              },
            },
          },
        },
      },
      post: {
        summary: "Create an http connection provider",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  team_id: { type: "string" },
                  name: { type: "string" },
                  display_name: { type: "string" },
                  description: { type: "string", nullable: true },
                  config: { type: "object", nullable: true },
                  tags: { type: "array", items: { type: "string" } },
                },
                required: ["team_id", "name", "display_name"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The created http connection provider",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpConnectionProvider" },
              },
            },
          },
        },
      },
    },
    "/vertex/http-connection-providers/{provider_id}": {
      parameters: [
        {
          name: "provider_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
      ],
      get: {
        summary: "Get an http connection provider",
        responses: {
          "200": {
            description: "The http connection provider",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpConnectionProvider" },
              },
            },
          },
        },
      },
      patch: {
        summary: "Update an http connection provider",
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
                  tags: { type: "array", items: { type: "string" } },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The updated http connection provider",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpConnectionProvider" },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete an http connection provider",
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
    "/vertex/http-connection-providers/{provider_id}/image": {
      parameters: [
        {
          name: "provider_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
      ],
      post: {
        summary: "Upload image for http connection provider",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  image: { type: "string", format: "binary" },
                },
                required: ["image"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The updated http connection provider with image_url",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpConnectionProvider" },
              },
            },
          },
        },
      },
    },
    "/vertex/http-connection-providers/by-handle/{handle}": {
      parameters: [
        {
          name: "handle",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
      ],
      get: {
        summary: "Get an http connection provider by handle",
        responses: {
          "200": {
            description: "The http connection provider",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HttpConnectionProvider" },
              },
            },
          },
        },
      },
    },
    "/vertex/connections": {
      get: {
        summary: "List all connections",
        parameters: [
          { name: "team_id", in: "query", schema: { type: "string" } },
          { name: "tags", in: "query", schema: { type: "string" } },
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
                  name: { type: "string" },
                  team_id: { type: "string" },
                  provider_id: { type: "string" },
                  credentials: { type: "object", nullable: true },
                  description: { type: "string", nullable: true },
                },
                required: ["name", "team_id", "provider_id"],
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
    "/vertex/connections/{connection_id}": {
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
      patch: {
        summary: "Update a connection",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  credentials: { type: "object", nullable: true },
                  data: { type: "object", nullable: true },
                },
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
    "/vertex/connections/{connection_id}/mongodb/schema": {
      parameters: [
        {
          name: "connection_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
        {
          name: "sampleSize",
          in: "query",
          schema: { type: "number" },
          required: false,
        },
        {
          name: "database",
          in: "query",
          schema: { type: "string" },
          required: true,
        },
      ],
      get: {
        summary: "Extract MongoDB cluster-wide schema",
        responses: {
          "200": {
            description:
              "The extracted schemas mapped by database and collection",
            content: {
              "application/json": {
                schema: { type: "object" },
              },
            },
          },
        },
      },
    },
    "/vertex/connections/{connection_id}/mongodb/databases": {
      parameters: [
        {
          name: "connection_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
      ],
      get: {
        summary: "List MongoDB cluster databases",
        responses: {
          "200": {
            description: "List of databases in the cluster",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      sizeOnDisk: { type: "number" },
                      empty: { type: "boolean" },
                    },
                    required: ["name"],
                  },
                },
              },
            },
          },
        },
      },
    },
    "/vertex/services": {
      get: {
        summary: "List all services",
        parameters: [
          { name: "team_id", in: "query", schema: { type: "string" } },
          { name: "scope", in: "query", schema: { type: "string" } },
          { name: "name", in: "query", schema: { type: "string" } },
          { name: "cursor", in: "query", schema: { type: "string" } },
          { name: "limit", in: "query", schema: { type: "number" } },
          {
            name: "tags",
            in: "query",
            schema: { type: "array", items: { type: "string" } },
          },
        ],
        responses: {
          "200": {
            description: "A list of services",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/Service",
                }),
              },
            },
          },
        },
      },
      post: {
        summary: "Create a service",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  team_id: { type: "string" },
                  scope: { type: "string" },
                  name: { type: "string" },
                  display_name: { type: "string" },
                  description: { type: "string", nullable: true },
                  config: { type: "object", nullable: true },
                  tags: { type: "array", items: { type: "string" } },
                },
                required: ["team_id", "name", "display_name"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The created service",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Service" },
              },
            },
          },
        },
      },
    },
    "/vertex/services/{service_id}": {
      parameters: [
        {
          name: "service_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
      ],
      get: {
        summary: "Get a service",
        responses: {
          "200": {
            description: "The service",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Service" },
              },
            },
          },
        },
      },
      patch: {
        summary: "Update a service",
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
                  tags: { type: "array", items: { type: "string" } },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The updated service",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Service" },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete a service",
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
    "/vertex/services/{service_id}/image": {
      parameters: [
        {
          name: "service_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
      ],
      post: {
        summary: "Upload image for service",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  image: { type: "string", format: "binary" },
                },
                required: ["image"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The updated service with image_url",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Service" },
              },
            },
          },
        },
      },
    },
    "/vertex/services/{service_id}/channels": {
      parameters: [
        {
          name: "service_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
      ],
      get: {
        summary: "List all service channels",
        parameters: [
          { name: "cursor", in: "query", schema: { type: "string" } },
          { name: "limit", in: "query", schema: { type: "number" } },
        ],
        responses: {
          "200": {
            description: "A list of service channels",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/ServiceChannel",
                }),
              },
            },
          },
        },
      },
      post: {
        summary: "Create a service channel",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  team_id: { type: "string" },
                  name: { type: "string" },
                },
                required: ["team_id", "name"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The created service channel",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ServiceChannel" },
              },
            },
          },
        },
      },
    },
    "/vertex/service-channels/{service_channel_id}": {
      parameters: [
        {
          name: "service_channel_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
      ],
      get: {
        summary: "Get a service channel",
        responses: {
          "200": {
            description: "The service channel",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ServiceChannel" },
              },
            },
          },
        },
      },
      patch: {
        summary: "Update a service channel",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The updated service channel",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ServiceChannel" },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete a service channel",
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
    "/vertex/service-channels/{service_channel_id}/spec": {
      parameters: [
        {
          name: "service_channel_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
      ],
      get: {
        summary: "Get the spec for a service channel",
        responses: {
          "200": {
            description: "The service spec",
            content: {
              "application/json": {
                schema: { type: "object" },
              },
            },
          },
        },
      },
      post: {
        summary: "Upload the spec for a service channel",
        requestBody: {
          content: {
            "application/json": {
              schema: { type: "object" },
            },
          },
        },
        responses: {
          "200": {
            description: "Confirmation of upload",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { success: { type: "boolean" } },
                },
              },
            },
          },
        },
      },
    },
    "/vertex/oauth-clients": {
      get: {
        summary: "List all OAuth clients",
        parameters: [
          { name: "team_id", in: "query", schema: { type: "string" } },
          { name: "provider_id", in: "query", schema: { type: "string" } },
          { name: "cursor", in: "query", schema: { type: "string" } },
          { name: "limit", in: "query", schema: { type: "number" } },
        ],
        responses: {
          "200": {
            description: "A list of OAuth clients",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/OAuthClient",
                }),
              },
            },
          },
        },
      },
      post: {
        summary: "Create an OAuth client",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  team_id: { type: "string" },
                  provider_id: { type: "string" },
                  name: { type: "string" },
                  credentials: {
                    type: "object",
                    properties: {
                      clientId: { type: "string" },
                      clientSecret: { type: "string" },
                    },
                    required: ["clientId", "clientSecret"],
                  },
                },
                required: ["provider_id", "name", "credentials"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The created OAuth client",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/OAuthClient" },
              },
            },
          },
        },
      },
    },
    "/vertex/oauth-clients/{oauth_client_id}": {
      parameters: [
        {
          name: "oauth_client_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
      ],
      get: {
        summary: "Get an OAuth client",
        responses: {
          "200": {
            description: "The OAuth client",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/OAuthClient" },
              },
            },
          },
        },
      },
      patch: {
        summary: "Update an OAuth client",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  credentials: {
                    type: "object",
                    properties: {
                      clientId: { type: "string" },
                      clientSecret: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The updated OAuth client",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/OAuthClient" },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete an OAuth client",
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
    "/vertex/{team_id}": {
      parameters: [
        {
          name: "team_id",
          in: "path",
          schema: { type: "string" },
          required: true,
        },
      ],
      post: {
        summary: "Invoke an operation",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  service_channel_id: { type: "string" },
                  operation: { type: "string" },
                  args: { type: "object", nullable: true },
                },
                required: ["service_channel_id", "operation"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The result of the operation",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/VertexResult" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      HttpConnectionProvider: {
        ...prismaSchemas.definitions.HttpConnectionProvider,
        properties: {
          ...prismaSchemas.definitions.HttpConnectionProvider.properties,
          image_url: { type: "string", nullable: true },
        },
      },
      Connection: prismaSchemas.definitions.Connection,
      OAuthConnectionState: prismaSchemas.definitions.OAuthConnectionState,
      EncryptedData: prismaSchemas.definitions.EncryptedData,
      Service: {
        ...prismaSchemas.definitions.Service,
        properties: {
          ...prismaSchemas.definitions.Service.properties,
          image_url: { type: "string", nullable: true },
        },
      },
      ServiceChannel: prismaSchemas.definitions.ServiceChannel,
      OAuthClient: prismaSchemas.definitions.OAuthClient,
      VertexError: {
        type: "object",
        properties: {
          code: {
            type: "string",
            enum: [
              "INVALID_REQUEST_ERROR",
              "USAGE_LIMIT_EXCEEDED",
              "UPSTREAM_ERROR",
              "INVALID_CREDENTIALS",
            ],
          },
          message: { type: "string", nullable: true },
          details: { type: "object", nullable: true },
        },
        required: ["code"],
      },
      VertexResult: {
        type: "object",
        properties: {
          data: { type: "object", nullable: true },
          error: { $ref: "#/components/schemas/VertexError", nullable: true },
        },
      },
    },
  },
};
