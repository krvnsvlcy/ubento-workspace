import { moduleSchemas } from "@ubento/services.database/module";
import { makeCursorPageResponseSchema } from "@ubento/services.toolkit";
import { OpenAPIV3 } from "openapi-types";

export const spec: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Module Service API",
    version: "1.0.0",
  },
  paths: {
    "/modules": {
      get: {
        summary: "List Modules",
        parameters: [
          { name: "team_id", in: "query", schema: { type: "string" } },
          { name: "type", in: "query", schema: { type: "string" } },
          {
            name: "scope",
            in: "query",
            schema: { type: "string", enum: ["private", "public"] },
          },
          { name: "limit", in: "query", schema: { type: "integer" } },
          { name: "cursor", in: "query", schema: { type: "string" } },
        ],
        responses: {
          "200": {
            description: "A list of modules",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/Module",
                }),
              },
            },
          },
        },
      },
      post: {
        summary: "Create Module",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  team_id: { type: "string" },
                  source: { type: "string" },
                  scope: { type: "string", enum: ["private", "public"] },
                  type: { type: "string" },
                  summary: { type: "string" },
                },
                required: ["name", "team_id", "source", "scope", "type"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Module created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Module" },
              },
            },
          },
        },
      },
    },
    "/modules/search": {
      get: {
        summary: "Marketplace Search",
        description:
          "High-performance fuzzy search for modules via MongoDB Atlas.",
        parameters: [
          { name: "query", in: "query", schema: { type: "string" } },
          {
            name: "types",
            in: "query",
            schema: { type: "array", items: { type: "string" } },
          },
          {
            name: "scope",
            in: "query",
            schema: { type: "string", enum: ["private", "public"] },
          },
          { name: "page", in: "query", schema: { type: "integer" } },
          { name: "limit", in: "query", schema: { type: "integer" } },
        ],
        responses: {
          "200": {
            description: "Search results",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "object",
                      properties: {
                        data: {
                          type: "array",
                          items: { $ref: "#/components/schemas/Module" },
                        },
                        pagination: {
                          type: "object",
                          properties: {
                            currentPage: { type: "integer" },
                            hasNextPage: { type: "boolean" },
                            nextPage: { type: "integer", nullable: true },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/modules/{module_id}": {
      get: {
        summary: "Get Module",
        parameters: [
          {
            name: "module_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Module metadata",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Module" },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete Module",
        parameters: [
          {
            name: "module_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Module deleted",
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
    "/modules/{module_id}/versions": {
      get: {
        summary: "List Module Versions",
        parameters: [
          {
            name: "module_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
          { name: "limit", in: "query", schema: { type: "integer" } },
          { name: "cursor", in: "query", schema: { type: "string" } },
        ],
        responses: {
          "200": {
            description: "Version history",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/ModuleVersion",
                }),
              },
            },
          },
        },
      },
      post: {
        summary: "Save Draft Version",
        description: "Creates a new private version of the module source code.",
        parameters: [
          {
            name: "module_id",
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
                  content: {
                    type: "string",
                    description: "The module source code",
                  },
                },
                required: ["content"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Draft saved",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Module" },
              },
            },
          },
        },
      },
    },
    "/modules/{module_id}/publish": {
      post: {
        summary: "Publish Current Draft",
        description:
          "Promotes the current private draft to be the public version.",
        parameters: [
          {
            name: "module_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Module published",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Module" },
              },
            },
          },
        },
      },
    },
    "/modules/{module_id}/versions/{version_id}": {
      get: {
        summary: "Get Module Version",
        parameters: [
          {
            name: "module_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
          {
            name: "version_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Module version metadata",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ModuleVersion" },
              },
            },
          },
        },
      },
    },
    "/modules/{module_id}/versions/{version_id}/{filename}": {
      get: {
        summary: "Read Version File",
        description:
          "Fetches the raw content of a specific file within a module version.",
        parameters: [
          {
            name: "module_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
          {
            name: "version_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
          {
            name: "filename",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "File content",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    content: { type: "string" },
                  },
                  required: ["content"],
                },
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
    schemas: {
      Module: moduleSchemas.definitions.Module as any,
      ModuleVersion: moduleSchemas.definitions.ModuleVersion as any,
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
