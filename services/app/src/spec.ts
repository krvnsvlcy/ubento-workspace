import { appSchemas } from "@ubento/database/app";
import { OpenAPIV3 } from "openapi-types";

export const spec: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "App Service API",
    version: "1.0.0",
  },
  paths: {
    "/apps": {
      get: {
        summary: "List Apps",
        parameters: [
          { $ref: "#/components/parameters/queryCursor" },
          { $ref: "#/components/parameters/queryLimit" },
          {
            name: "team_id",
            in: "query",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "A list of apps",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    items: {
                      type: "array",
                      items: { $ref: "#/components/schemas/App" },
                    },
                    next_cursor: { type: "string", nullable: true },
                  },
                  required: ["items"],
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create App",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  slug: {
                    type: "string",
                    minLength: 3,
                    pattern: "^[a-z0-9-]+$",
                  },
                  team_id: { type: "string" },
                  description: { type: "string" },
                },
                required: ["name", "team_id"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "App created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/App" },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
        },
      },
    },
    "/apps/slug/{slug}": {
      get: {
        summary: "Get App by Slug",
        parameters: [
          {
            name: "slug",
            in: "path",
            required: true,
            schema: {
              type: "string",
              minLength: 3,
              pattern: "^[a-z0-9-]+$",
            },
          },
        ],
        responses: {
          "200": {
            description: "App details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/App" },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
    },
    "/apps/{app_id}": {
      get: {
        summary: "Get App",
        parameters: [
          {
            name: "app_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "App details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/App" },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
      patch: {
        summary: "Update App",
        parameters: [
          {
            name: "app_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  slug: {
                    type: "string",
                    minLength: 3,
                    pattern: "^[a-z0-9-]+$",
                  },
                  description: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "App updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/App" },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
      delete: {
        summary: "Delete App",
        parameters: [
          {
            name: "app_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "App deleted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { success: { type: "boolean" } },
                },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
    },
    "/pages": {
      get: {
        summary: "List Pages",
        parameters: [
          { $ref: "#/components/parameters/queryCursor" },
          { $ref: "#/components/parameters/queryLimit" },
          {
            name: "app_id",
            in: "query",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "A list of pages",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    items: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Page" },
                    },
                    next_cursor: { type: "string", nullable: true },
                  },
                  required: ["items"],
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create Page",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  app_id: { type: "string" },
                  name: { type: "string" },
                  path: { type: "string" },
                },
                required: ["app_id", "name", "path"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Page created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Page" },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
        },
      },
    },
    "/pages/{page_id}": {
      get: {
        summary: "Get Page",
        parameters: [
          {
            name: "page_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Page details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Page" },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
      patch: {
        summary: "Update Page",
        parameters: [
          {
            name: "page_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  path: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Page updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Page" },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
      delete: {
        summary: "Delete Page",
        parameters: [
          {
            name: "page_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Page deleted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { success: { type: "boolean" } },
                },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
    },
    "/app-memberships": {
      get: {
        summary: "List App Memberships",
        parameters: [
          { $ref: "#/components/parameters/queryCursor" },
          { $ref: "#/components/parameters/queryLimit" },
          {
            name: "app_id",
            in: "query",
            schema: { type: "string" },
          },
          {
            name: "user_id",
            in: "query",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "A list of app memberships",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    items: {
                      type: "array",
                      items: { $ref: "#/components/schemas/AppMembership" },
                    },
                    next_cursor: { type: "string", nullable: true },
                  },
                  required: ["items"],
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create App Membership",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  app_id: { type: "string" },
                  user_id: { type: "string" },
                  role: { type: "string" },
                },
                required: ["app_id", "user_id", "role"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "App membership created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AppMembership" },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
        },
      },
    },
    "/app-memberships/{membership_id}": {
      delete: {
        summary: "Delete App Membership",
        parameters: [
          {
            name: "membership_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "App membership deleted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { success: { type: "boolean" } },
                },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
    },
    "/app-invites/{app_id}": {
      get: {
        summary: "List App Invites",
        parameters: [
          {
            name: "app_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
          { $ref: "#/components/parameters/queryCursor" },
          { $ref: "#/components/parameters/queryLimit" },
        ],
        responses: {
          "200": {
            description: "A list of app invites",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    items: {
                      type: "array",
                      items: { $ref: "#/components/schemas/AppInvite" },
                    },
                    next_cursor: { type: "string", nullable: true },
                  },
                  required: ["items"],
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create App Invite",
        parameters: [
          {
            name: "app_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", format: "email" },
                  role: { type: "string" },
                },
                required: ["email", "role"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "App invite created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    invite: { $ref: "#/components/schemas/AppInvite" },
                    token: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/app-invites/{id}/accept": {
      post: {
        summary: "Accept App Invite",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  token: { type: "string" },
                },
                required: ["token"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "App invite accepted",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AppInvite" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
    parameters: {
      queryLimit: {
        name: "limit",
        in: "query",
        schema: { type: "integer", minimum: 1, maximum: 100, default: 20 },
      },
      queryCursor: {
        name: "cursor",
        in: "query",
        schema: { type: "string" },
      },
    },
    responses: {
      NotFound: {
        description: "Resource not found",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
          },
        },
      },
      ValidationError: {
        description: "Validation error",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
          },
        },
      },
    },
    schemas: {
      App: appSchemas.definitions.App as any,
      Page: appSchemas.definitions.Page as any,
      AppMembership: appSchemas.definitions.AppMembership as any,
      AppInvite: appSchemas.definitions.AppInvite as any,
      Error: {
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: {
              code: { type: "string" },
              message: { type: "string" },
              details: { type: "object" },
            },
            required: ["code", "message"],
          },
        },
        required: ["error"],
      },
    },
  },
};
