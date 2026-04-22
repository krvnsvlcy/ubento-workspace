import { standardizeJsonSchemaOutput } from "@ubento/service-toolkit";
import { OpenAPIV3 } from "openapi-types";
import rawPrismaSchemas from "./prisma/json-schema.json" with { type: "json" };

export function cleanUpJsonSchema(schema: any): any {
  // Base case: If it's a primitive or null, return it as is.
  if (schema === null || typeof schema !== "object") {
    return schema;
  }

  // If the current node is an array, map over it and clean each item.
  if (Array.isArray(schema)) {
    return schema.map((item) => cleanUpJsonSchema(item));
  }

  // If it's an object, we build a new object with the cleaned properties.
  const cleanedSchema: any = {};

  for (const key in schema) {
    if (Object.prototype.hasOwnProperty.call(schema, key)) {
      const value = schema[key];

      // Target the 'type' key specifically
      if (key === "type" && Array.isArray(value)) {
        // Filter out 'null' to see what types remain
        const nonNullTypes = value.filter((t) => t !== "null");

        if (nonNullTypes.length === 1) {
          // Handle cases like ["string", "null"] -> "string"
          cleanedSchema[key] = nonNullTypes[0];
        } else if (nonNullTypes.includes("object")) {
          // Handle generic multi-type arrays that include "object"
          cleanedSchema[key] = "object";
        } else {
          // If there are multiple valid types but no "object", leave it alone
          cleanedSchema[key] = value;
        }
      } else {
        // For all other keys, recurse down the tree
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
    title: "Identity Service API",
    version: "1.0.0",
  },
  paths: {
    "/organizations": {
      get: {
        summary: "List Organizations",
        parameters: [
          { $ref: "#/components/parameters/queryCursor" },
          { $ref: "#/components/parameters/queryLimit" },
          {
            name: "ids",
            in: "query",
            style: "form",
            explode: false,
            schema: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
          {
            name: "name",
            in: "query",
            schema: {
              type: "string",
            },
          },
          {
            name: "handle",
            in: "query",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "A list of organizations",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Organization",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create Organization",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    maxLength: 255,
                  },
                  handle: {
                    type: "string",
                    maxLength: 255,
                  },
                  owner: {
                    type: "string",
                    maxLength: 255,
                  },
                },
                required: ["name", "handle", "owner"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Organization created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Organization",
                },
              },
            },
          },
          "400": {
            description: "Invalid request or validation error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
    "/organizations/check-handle": {
      post: {
        summary: "Check Organization Handle",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  handle: {
                    type: "string",
                    maxLength: 255,
                  },
                },
                required: ["handle"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Organization handle checked",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    handle: {
                      type: "string",
                    },
                    available: {
                      type: "boolean",
                    },
                  },
                  required: ["handle", "available"],
                },
              },
            },
          },
          "400": {
            description: "Invalid request or validation error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
    "/organizations/{organization_id}": {
      get: {
        summary: "Get Organization",
        parameters: [
          {
            name: "organization_id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Organization details",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Organization",
                },
              },
            },
          },
          "400": {
            description: "Invalid organization id",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "404": {
            description: "Organization not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      patch: {
        summary: "Update Organization",
        parameters: [
          {
            name: "organization_id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    maxLength: 255,
                  },
                  handle: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Organization updated",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Organization",
                },
              },
            },
          },
          "400": {
            description: "Invalid organization id or validation error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          "404": {
            description: "Organization not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete Organization",
        parameters: [
          {
            name: "organization_id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Organization deleted",
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
    "/organizations/{organization_id}/invites": {
      get: {
        summary: "List organization invites",
        security: [{ bearerAuth: [] }],
        parameters: [
          { $ref: "#/components/parameters/pathOrganizationId" },
          { $ref: "#/components/parameters/queryLimit" },
          { $ref: "#/components/parameters/queryCursor" },
          {
            name: "statuses",
            in: "query",
            style: "form",
            explode: false,
            schema: {
              type: "array",
              items: { $ref: "#/components/schemas/InviteStatus" },
            },
            example: "PENDING,ACCEPTED",
          },
          {
            name: "email",
            in: "query",
            required: false,
            schema: { type: "string", format: "email" },
          },
        ],
        responses: {
          "200": {
            description: "Invites page",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    items: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/OrganizationInvite",
                      },
                    },
                    next_cursor: { type: "string", nullable: true },
                  },
                  required: ["items"],
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
        },
      },
      post: {
        summary: "Create an invite",
        description:
          "Creates a single-use invite and returns a plaintext token once. The token must be stored client-side for composing an accept URL.",
        security: [{ bearerAuth: [] }],
        parameters: [{ $ref: "#/components/parameters/pathOrganizationId" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", format: "email" },
                  role: { type: "string" },
                  expires_in_seconds: {
                    type: "integer",
                    minimum: 60,
                    default: 259200,
                  }, // 3d
                },
                required: ["email", "role"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Invite created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    invite: { $ref: "#/components/schemas/OrganizationInvite" },
                    token: {
                      type: "string",
                      description: "Plaintext token (returned once)",
                    },
                    accept_url: {
                      type: "string",
                      description:
                        "Optional convenience URL if your backend constructs it",
                    },
                  },
                  required: ["invite", "token"],
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "409": {
            description:
              "An active (PENDING) invite already exists for this email",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Message" },
              },
            },
          },
        },
      },
    },
    "/organization-invites/{invite_id}": {
      get: {
        summary: "Get invite (admin/issuer view)",
        security: [{ bearerAuth: [] }],
        parameters: [{ $ref: "#/components/parameters/pathInviteId" }],
        responses: {
          "200": {
            description: "Invite",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/OrganizationInvite" },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
    },
    "/organization-invites/{invite_id}/revoke": {
      post: {
        summary: "Revoke invite",
        security: [{ bearerAuth: [] }],
        parameters: [{ $ref: "#/components/parameters/pathInviteId" }],
        responses: {
          "200": {
            description: "Invite revoked",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/OrganizationInvite" },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "404": { $ref: "#/components/responses/NotFound" },
          "409": {
            description:
              "Invite not revocable (already accepted/expired/revoked)",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Message" },
              },
            },
          },
        },
      },
    },
    "/organization-invites/resolve": {
      post: {
        summary: "Resolve invite by token (public-safe view)",
        description:
          "Resolves an invite using a plaintext token, returning limited information so the client can display a confirmation screen before acceptance.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { token: { type: "string" } },
                required: ["token"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Resolved invite (public-safe)",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    invite: {
                      $ref: "#/components/schemas/ResolvedInvitePublic",
                    },
                  },
                  required: ["invite"],
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
          "404": { $ref: "#/components/responses/NotFound" },
          "409": {
            description:
              "Invite not acceptable (expired, revoked, already accepted)",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Message" },
              },
            },
          },
        },
      },
    },
    "/organization-invites/accept": {
      post: {
        summary: "Accept invite by token",
        description:
          "Accepts a PENDING invite using a plaintext token. If authenticated, `accepted_by` is set to the current user id; otherwise you may create/link a user first, then accept.",
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
            description: "Invite accepted and membership granted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    invite: { $ref: "#/components/schemas/OrganizationInvite" },
                    organization: { $ref: "#/components/schemas/Organization" },
                    membership: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        role: { type: "string" },
                      },
                      required: ["id", "role"],
                    },
                  },
                  required: ["invite", "organization", "membership"],
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "404": { $ref: "#/components/responses/NotFound" },
          "409": {
            description:
              "Invite not acceptable (expired, revoked, already accepted)",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Message" },
              },
            },
          },
        },
      },
    },
    "/users": {
      get: {
        summary: "List Users",
        parameters: [
          { $ref: "#/components/parameters/queryCursor" },
          { $ref: "#/components/parameters/queryLimit" },
          {
            name: "email",
            in: "query",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "A list of users",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/users/{user_id}": {
      get: {
        summary: "Get User",
        parameters: [
          {
            name: "user_id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "User details",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete User",
        parameters: [
          {
            name: "user_id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "User deleted",
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
    "/users/{user_id}/organizations": {
      get: {
        summary: "Get User Organizations",
        parameters: [
          {
            name: "user_id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "User organizations",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Organization" },
                },
              },
            },
          },
        },
      },
    },

    // Sessions
    "/sessions": {
      get: {
        summary: "List Sessions",
        parameters: [
          { $ref: "#/components/parameters/queryLimit" },
          { $ref: "#/components/parameters/queryCursor" },
          {
            name: "user_id",
            in: "query",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "A list of sessions",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    items: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Session" },
                    },
                    nextCursor: { type: "string", nullable: true },
                  },
                  required: ["items"],
                },
              },
            },
          },
        },
      },
    },
    "/sessions/{id}": {
      get: {
        summary: "Get Session",
        parameters: [{ $ref: "#/components/parameters/pathSessionId" }],
        responses: {
          "200": {
            description: "Session details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Session" },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
    },
    "/sessions/{id}/revoke": {
      post: {
        summary: "Revoke Session",
        parameters: [{ $ref: "#/components/parameters/pathSessionId" }],
        responses: {
          "200": {
            description: "Session revoked",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Session" },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
    },

    // Clients
    "/clients": {
      get: {
        summary: "List Clients",
        parameters: [
          { $ref: "#/components/parameters/queryLimit" },
          { $ref: "#/components/parameters/queryCursor" },
        ],
        responses: {
          "200": {
            description: "A list of clients",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Client" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create Client",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                },
                required: ["name"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Client created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Client" },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
        },
      },
    },
    "/clients/{id}": {
      get: {
        summary: "Get Client",
        parameters: [{ $ref: "#/components/parameters/pathClientId" }],
        responses: {
          "200": {
            description: "Client details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Client" },
              },
            },
          },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
      delete: {
        summary: "Delete Client",
        parameters: [{ $ref: "#/components/parameters/pathClientId" }],
        responses: {
          "200": {
            description: "Client deleted",
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

    // Client Credentials
    "/client-credentials": {
      get: {
        summary: "List Client Credentials",
        parameters: [
          { $ref: "#/components/parameters/queryCursor" },
          { $ref: "#/components/parameters/queryLimit" },
          {
            name: "client_id",
            in: "query",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "A list of credentials",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/ClientCredential" },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
        },
      },
      post: {
        summary: "Create Client Credential",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  client_id: { type: "string" },
                  label: { type: "string" },
                },
                required: ["client_id"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Credential created (secret returned once)",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ClientCredential" },
                    {
                      type: "object",
                      properties: {
                        secret: {
                          type: "string",
                          description: "Plaintext secret (returned once)",
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/ValidationError" },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
    },
    "/client-credentials/{id}": {
      delete: {
        summary: "Revoke Client Credential",
        parameters: [{ $ref: "#/components/parameters/pathCredentialId" }],
        responses: {
          "200": {
            description: "Credential revoked",
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
  },
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },

    parameters: {
      pathOrganizationId: {
        name: "organization_id",
        in: "path",
        required: true,
        schema: { type: "string" },
      },
      pathInviteId: {
        name: "invite_id",
        in: "path",
        required: true,
        schema: { type: "string" },
      },
      pathRoleId: {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "string" },
      },
      pathSessionId: {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "string" },
      },
      pathClientId: {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "string" },
      },
      pathCredentialId: {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "string" },
      },
      queryLimit: {
        name: "limit",
        in: "query",
        required: false,
        schema: { type: "integer", minimum: 1, maximum: 200 },
        example: 20,
      },
      queryCursor: {
        name: "cursor",
        in: "query",
        required: false,
        schema: { type: "string" },
      },
    },

    responses: {
      Unauthorized: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Message" },
          },
        },
      },
      ValidationError: {
        description: "Validation error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "object",
                  properties: {
                    code: { type: "string", example: "VALIDATION_ERROR" },
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
      },
      NotFound: {
        description: "Resource not found",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Message" },
          },
        },
      },
    },

    schemas: {
      // Prisma models:
      Organization: prismaSchemas.definitions.Organization as any,
      User: prismaSchemas.definitions.User as any,

      Session: prismaSchemas.definitions.Session as any,
      Client: prismaSchemas.definitions.Client as any,
      ClientCredential: prismaSchemas.definitions.ClientCredential as any,

      // ✅ Missing pieces used by your paths:
      InviteStatus: {
        type: "string",
        enum: ["PENDING", "ACCEPTED", "REVOKED", "EXPIRED"],
      },

      OrganizationInvite: {
        type: "object",
        description:
          "Single-use invite to join a organization. Minimal public/admin shape.",
        properties: {
          id: { type: "string" },
          organization_id: { type: "string" },
          email: { type: "string", format: "email" },
          role: { type: "string" },
          status: { $ref: "#/components/schemas/InviteStatus" },
          expires_at: { type: "string", format: "date-time" },
          created_at: { type: "string", format: "date-time" },
          updated_at: { type: "string", format: "date-time" },
          // admin/view extras
          issued_by: { type: "string", nullable: true },
          accepted_by: { type: "string", nullable: true },
          accepted_at: { type: "string", format: "date-time", nullable: true },
          revoked_by: { type: "string", nullable: true },
          revoked_at: { type: "string", format: "date-time", nullable: true },
        },
        required: [
          "id",
          "organization_id",
          "email",
          "role",
          "status",
          "expires_at",
          "created_at",
          "updated_at",
        ],
        additionalProperties: false,
      },

      ResolvedInvitePublic: {
        type: "object",
        properties: {
          id: { type: "string", description: "Invite id (safe to reveal)" },
          organization: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
            },
            required: ["id", "name"],
          },
          email: {
            type: "string",
            format: "email",
            description:
              "Target email; you may obfuscate on the server if preferred.",
          },
          role: { type: "string" },
          status: { $ref: "#/components/schemas/InviteStatus" },
          expires_at: { type: "string", format: "date-time" },
          invited_by_display: {
            type: "string",
            nullable: true,
            description: "Display name of inviter if available.",
          },
        },
        required: [
          "id",
          "organization",
          "email",
          "role",
          "status",
          "expires_at",
        ],
      },

      Message: {
        type: "object",
        properties: { message: { type: "string" } },
        required: ["message"],
      },

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
