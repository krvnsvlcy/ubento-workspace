import { moduleSchemas } from "@ubento/database/module";
import { OpenAPIV3 } from "openapi-types";

export const spec: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Module Service API",
    version: "1.0.0",
  },
  paths: {
    "/modules/slug/{slug}": {
      get: {
        summary: "Get Module by Slug",
        parameters: [
          {
            name: "slug",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Module details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Module" },
              },
            },
          },
        },
      },
    },
    "/modules": {
      get: {
        summary: "List Modules",
        parameters: [
          {
            name: "team_id",
            in: "query",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "A list of modules",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Module" },
                    },
                  },
                  required: ["data"],
                },
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
                  slug: { type: "string" },
                  team_id: { type: "string" },
                  source: { type: "string" },
                  scope: { type: "string", enum: ["team", "public"] },
                },
                required: ["name", "team_id", "source", "scope"],
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
            description: "Module details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Module" },
              },
            },
          },
        },
      },
      patch: {
        summary: "Update Module",
        parameters: [
          {
            name: "module_id",
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
                  slug: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Module updated",
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
        ],
        responses: {
          "200": {
            description: "A list of module versions",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/ModuleVersion" },
                    },
                  },
                  required: ["data"],
                },
              },
            },
          },
        },
      },
    "/modules/{module_id}/files/{filename}": {
      put: {
        summary: "Update Module File",
        parameters: [
          {
            name: "module_id",
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
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  content: { type: "string" },
                  autoTranspile: { type: "boolean" },
                },
                required: ["content"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "File updated",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  additionalProperties: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    "/modules/{module_id}/files/{filename}/restore": {
      post: {
        summary: "Restore Module File",
        parameters: [
          {
            name: "module_id",
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
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  hash: { type: "string" },
                },
                required: ["hash"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "File restored",
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
    "/modules/{module_id}/publish": {
      post: {
        summary: "Publish Module Version",
        parameters: [
          {
            name: "module_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "201": {
            description: "Version published",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ModuleVersion" },
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
            description: "Module version details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ModuleVersion" },
              },
            },
          },
        },
      },
    },
    "/modules/{module_id}/versions/{version_id}/source": {
      get: {
        summary: "Get Module Version Source",
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
            description: "Module version source code (TSX)",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "object",
                      properties: {
                        source: { type: "string" },
                      },
                      required: ["source"],
                    },
                  },
                  required: ["data"],
                },
              },
            },
          },
        },
      },
    },
    "/modules/{module_id}/versions/{version_id}/artifact": {
      get: {
        summary: "Get Module Version Artifact",
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
            description: "Module version transpiled artifact (JS)",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "object",
                      properties: {
                        artifact: { type: "string" },
                      },
                      required: ["artifact"],
                    },
                  },
                  required: ["data"],
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
