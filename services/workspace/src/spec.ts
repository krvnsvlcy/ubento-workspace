import { workspaceSchemas } from "@ubento/services.database/workspace";
import { makeCursorPageResponseSchema } from "@ubento/services.toolkit";
import { OpenAPIV3 } from "openapi-types";

export const spec: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Workspace Service API",
    version: "1.0.0",
  },
  paths: {
    "/workspaces": {
      get: {
        summary: "List Workspaces",
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
            description: "A list of workspaces",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/Workspace",
                }),
              },
            },
          },
        },
      },
      post: {
        summary: "Create Workspace",
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
            description: "Workspace created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Workspace" },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
        },
      },
    },
    "/workspaces/slug/{slug}": {
      get: {
        summary: "Get Workspace by Slug",
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
            description: "Workspace details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Workspace" },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
    },
    "/workspaces/{workspace_id}": {
      get: {
        summary: "Get Workspace",
        parameters: [
          {
            name: "workspace_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Workspace details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Workspace" },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
      patch: {
        summary: "Update Workspace",
        parameters: [
          {
            name: "workspace_id",
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
            description: "Workspace updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Workspace" },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
      delete: {
        summary: "Delete Workspace",
        parameters: [
          {
            name: "workspace_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Workspace deleted",
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
    "/boards": {
      get: {
        summary: "List Boards",
        parameters: [
          { $ref: "#/components/parameters/queryCursor" },
          { $ref: "#/components/parameters/queryLimit" },
          {
            name: "workspace_id",
            in: "query",
            required: true,
            schema: { type: "string" },
          },
          {
            name: "parent_id",
            in: "query",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "A list of boards",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/Board",
                }),
              },
            },
          },
        },
      },
      post: {
        summary: "Create Board",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  workspace_id: { type: "string" },
                  parent_id: { type: "string" },
                  name: { type: "string" },
                  data: { type: "object" },
                  index: { type: "string" },
                },
                required: ["workspace_id", "name", "index"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Board created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Board" },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
        },
      },
    },
    "/boards/{board_id}": {
      get: {
        summary: "Get Board",
        parameters: [
          {
            name: "board_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Board details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Board" },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
      patch: {
        summary: "Update Board",
        parameters: [
          {
            name: "board_id",
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
                  parent_id: { type: "string", nullable: true },
                  data: { type: "object" },
                  index: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Board updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Board" },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
      delete: {
        summary: "Delete Board",
        parameters: [
          {
            name: "board_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Board deleted",
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
    "/workspace-memberships": {
      get: {
        summary: "List Workspace Memberships",
        parameters: [
          { $ref: "#/components/parameters/queryCursor" },
          { $ref: "#/components/parameters/queryLimit" },
          {
            name: "workspace_id",
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
            description: "A list of workspace memberships",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/WorkspaceMembership",
                }),
              },
            },
          },
        },
      },
      post: {
        summary: "Create Workspace Membership",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  workspace_id: { type: "string" },
                  user_id: { type: "string" },
                  role: { type: "string" },
                },
                required: ["workspace_id", "user_id", "role"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Workspace membership created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/WorkspaceMembership" },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
        },
      },
    },
    "/workspace-memberships/{membership_id}": {
      delete: {
        summary: "Delete Workspace Membership",
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
            description: "Workspace membership deleted",
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
    "/workspace-invites/{workspace_id}": {
      get: {
        summary: "List Workspace Invites",
        parameters: [
          {
            name: "workspace_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
          { $ref: "#/components/parameters/queryCursor" },
          { $ref: "#/components/parameters/queryLimit" },
        ],
        responses: {
          "200": {
            description: "A list of workspace invites",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/WorkspaceInvite",
                }),
              },
            },
          },
        },
      },
      post: {
        summary: "Create Workspace Invite",
        parameters: [
          {
            name: "workspace_id",
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
            description: "Workspace invite created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    invite: { $ref: "#/components/schemas/WorkspaceInvite" },
                    token: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/workspace-invites/{id}/accept": {
      post: {
        summary: "Accept Workspace Invite",
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
            description: "Workspace invite accepted",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/WorkspaceInvite" },
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
      Workspace: workspaceSchemas.definitions.Workspace as any,
      Board: workspaceSchemas.definitions.Board as any,
      WorkspaceMembership: workspaceSchemas.definitions
        .WorkspaceMembership as any,
      WorkspaceInvite: workspaceSchemas.definitions.WorkspaceInvite as any,
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
