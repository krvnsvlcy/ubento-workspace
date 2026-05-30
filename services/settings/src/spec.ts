import { settingsSchemas } from "@ubento/services.database/settings";
import { makeCursorPageResponseSchema } from "@ubento/services.toolkit";
import { OpenAPIV3 } from "openapi-types";

export const spec: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Settings Service API",
    version: "1.0.0",
  },
  paths: {
    "/settings": {
      get: {
        summary: "List Settings",
        parameters: [
          { $ref: "#/components/parameters/queryCursor" },
          { $ref: "#/components/parameters/queryLimit" },
          {
            name: "scopes",
            in: "query",
            schema: {
              type: "array",
              items: { type: "string" },
            },
          },
        ],
        responses: {
          "200": {
            description: "A list of settings",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/Setting",
                }),
              },
            },
          },
        },
      },
      post: {
        summary: "Upsert Setting",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  key: { type: "string" },
                  scopes: {
                    type: "array",
                    items: { type: "string" },
                  },
                  data: { type: "object" },
                },
                required: ["key", "scopes", "data"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Setting upserted",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Setting" },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
        },
      },
    },
    "/settings/key/{key}": {
      get: {
        summary: "Get Setting by Key",
        parameters: [
          {
            name: "key",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Setting details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Setting" },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
    },
    "/settings/{id}": {
      get: {
        summary: "Get Setting",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Setting details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Setting" },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
      patch: {
        summary: "Update Setting",
        parameters: [
          {
            name: "id",
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
                  scopes: {
                    type: "array",
                    items: { type: "string" },
                  },
                  data: { type: "object" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Setting updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Setting" },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
      delete: {
        summary: "Delete Setting",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Setting deleted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { success: { type: "boolean" } },
                  required: ["success"],
                },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
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
      Setting: settingsSchemas.definitions.Setting as any,
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
