import { standardizeJsonSchemaOutput } from "@ubento/service-toolkit";
import { OpenAPIV3 } from "openapi-types";
import rawPrismaSchemas from "./prisma/json-schema.json" with { type: "json" };

export function cleanUpJsonSchema(schema: any): any {
  if (schema === null || typeof schema !== "object") {
    return schema;
  }
  if (Array.isArray(schema)) {
    return schema.map((item) => cleanUpJsonSchema(item));
  }
  const cleanedSchema: any = {};
  for (const key in schema) {
    if (Object.prototype.hasOwnProperty.call(schema, key)) {
      const value = schema[key];
      if (key === "type" && Array.isArray(value)) {
        const nonNullTypes = value.filter((t) => t !== "null");
        if (nonNullTypes.length === 1) {
          cleanedSchema[key] = nonNullTypes[0];
        } else if (nonNullTypes.includes("object")) {
          cleanedSchema[key] = "object";
        } else {
          cleanedSchema[key] = value;
        }
      } else {
        cleanedSchema[key] = cleanUpJsonSchema(value);
      }
    }
  }
  return cleanedSchema;
}

const prismaSchemas = cleanUpJsonSchema(
  standardizeJsonSchemaOutput(rawPrismaSchemas),
);

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
    "/components": {
      get: {
        summary: "List Components",
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
            description: "A list of components",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    items: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Component" },
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
        summary: "Create Component",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  app_id: { type: "string" },
                  name: { type: "string" },
                  type: { type: "string" },
                  props: { type: "object" },
                },
                required: ["app_id", "name", "type"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Component created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Component" },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
        },
      },
    },
    "/components/{component_id}": {
      get: {
        summary: "Get Component",
        parameters: [
          {
            name: "component_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Component details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Component" },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
      patch: {
        summary: "Update Component",
        parameters: [
          {
            name: "component_id",
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
                  type: { type: "string" },
                  props: { type: "object" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Component updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Component" },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
      delete: {
        summary: "Delete Component",
        parameters: [
          {
            name: "component_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Component deleted",
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
      App: prismaSchemas.definitions.App as any,
      Page: prismaSchemas.definitions.Page as any,
      Component: prismaSchemas.definitions.Component as any,
      AppMembership: prismaSchemas.definitions.AppMembership as any,
      AppInvite: prismaSchemas.definitions.AppInvite as any,
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
