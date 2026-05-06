import {
  makeCursorPageResponseSchema,
  standardizeJsonSchemaOutput,
} from "@ubento/services.toolkit";
import { OpenAPIV3 } from "openapi-types";
import rawPrismaSchemas from "./prisma/json-schema.json" with { type: "json" };
const prismaSchemas = standardizeJsonSchemaOutput(rawPrismaSchemas);

export const spec: OpenAPIV3.Document = {
  openapi: "3.0.3",
  info: {
    title: "Intelligence Service API",
    description: "API for AI chat, model management, and thread operations",
    version: "1.0.0",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Message: prismaSchemas.definitions.Message as any,
      Thread: prismaSchemas.definitions.Thread as any,
      File: prismaSchemas.definitions.File as any,
      MessageStatus: {
        type: "string",
        enum: ["in_progress", "completed", "errored", "aborted"],
        description: "The current status of a message",
      },
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "A human-readable error message.",
          },
          code: {
            type: "string",
            description: "An internal error code.",
          },
        },
        required: ["message"],
      },
    },
  },
  paths: {
    "/intelligence/models/{model_id}": {
      post: {
        summary: "Proxy request to AI model provider",
        description:
          "Proxy requests to AI model providers (OpenAI, Anthropic, Google). The request body must match the format expected by the target provider.",
        tags: ["Models"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "model_id",
            required: true,
            schema: { type: "string" },
            description: "The model identifier",
          },
        ],
        requestBody: {
          required: true,
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
            description: "Model response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  description:
                    "Response from the model provider. Structure varies by provider.",
                },
              },
            },
          },
          "404": {
            description: "Model not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/intelligence/threads": {
      get: {
        summary: "List threads",
        description: "Retrieve a paginated list of threads for a workspace or team",
        tags: ["Threads"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "query",
            name: "workspace_id",
            schema: { type: "string" },
            description: "The workspace ID to filter threads",
          },
          {
            in: "query",
            name: "team_id",
            schema: { type: "string" },
            description: "The team ID to filter threads",
          },
          {
            in: "query",
            name: "members",
            schema: { type: "string" },
            description:
              "Comma-separated list of member IDs to filter threads (e.g., `?members=id1,id2,id3`).",
          },
          {
            in: "query",
            name: "cursor",
            schema: { type: "string" },
            description: "Pagination cursor for retrieving next page",
          },
          {
            in: "query",
            name: "limit",
            schema: { type: "integer", default: 10 },
            description: "Maximum number of threads to return",
          },
          {
            in: "query",
            name: "sort",
            schema: {
              type: "string",
              enum: ["recent", "newest", "id"],
              default: "recent",
            },
            description: "Sort order for threads",
          },
        ],
        responses: {
          "200": {
            description: "List of threads",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/Thread",
                }),
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new thread",
        description: "Create a new conversation thread",
        tags: ["Threads"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    description: "Optional thread title",
                  },
                  team_id: {
                    type: "string",
                    description: "The team ID where the thread belongs",
                  },
                  workspace_id: {
                    type: "string",
                    description: "The workspace ID where the thread belongs",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Thread created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Thread" },
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/intelligence/threads/{thread_id}": {
      get: {
        summary: "Get a specific thread",
        description: "Retrieve details of a specific thread by ID",
        tags: ["Threads"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "thread_id",
            required: true,
            schema: { type: "string" },
            description: "The thread ID",
          },
        ],
        responses: {
          "200": {
            description: "Thread details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Thread" },
              },
            },
          },
          "404": {
            description: "Thread not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      patch: {
        summary: "Update a thread",
        description: "Update thread title and metadata",
        tags: ["Threads"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "thread_id",
            required: true,
            schema: { type: "string" },
            description: "The thread ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    description: "New thread title",
                  },
                  metadata: {
                    type: "object",
                    description: "Optional thread metadata",
                    additionalProperties: true,
                  },
                  context: {
                    type: "object",
                    description: "Optional thread context",
                    additionalProperties: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Thread updated successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Thread" },
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "404": {
            description: "Thread not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete a thread",
        description: "Permanently delete a thread by ID",
        tags: ["Threads"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "thread_id",
            required: true,
            schema: { type: "string" },
            description: "The thread ID",
          },
        ],
        responses: {
          "204": { description: "Thread deleted successfully" },
          "404": {
            description: "Thread not found",
            // FIX: Added consistent error response body
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "400": {
            description: "Bad request",
            // FIX: Added consistent error response body
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/intelligence/threads/{thread_id}/generate-title": {
      post: {
        summary: "Generate a title for a thread",
        description: "Generate a title for a thread based on its messages",
        tags: ["Threads"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "thread_id",
            required: true,
            schema: { type: "string" },
            description: "The thread ID",
          },
        ],
        responses: {
          "200": {
            description: "Thread title generated successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Thread" },
              },
            },
          },
          "404": {
            description: "Thread not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/intelligence/threads/{thread_id}/messages": {
      get: {
        summary: "Get thread messages",
        description: "Retrieve messages for a specific thread with pagination",
        // FIX: Changed tag for logical grouping
        tags: ["Messages"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "thread_id",
            required: true,
            schema: { type: "string" },
            description: "The thread ID",
          },
          {
            in: "query",
            name: "cursor",
            schema: { type: "string" },
            description: "Pagination cursor for retrieving next page",
          },
          {
            in: "query",
            name: "limit",
            schema: { type: "integer", default: 20 },
            description: "Maximum number of messages to return",
          },
          {
            in: "query",
            name: "sort",
            schema: {
              type: "string",
              enum: ["newest", "oldest"],
              default: "newest",
            },
            description: "Sort order for messages",
          },
        ],
        responses: {
          "200": {
            description: "List of thread messages",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/Message",
                }),
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "404": {
            description: "Thread not found",
            // FIX: Added consistent error response body
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a message in the thread",
        description:
          "Create a new message in the thread (user or agent message)",
        // FIX: Changed tag for logical grouping
        tags: ["Messages"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "thread_id",
            required: true,
            schema: { type: "string" },
            description: "The thread ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["message"],
                properties: {
                  message: {
                    type: "object",
                    required: ["role", "data"],
                    properties: {
                      role: {
                        type: "string",
                        enum: ["user", "agent"],
                        description: "The role of the message sender",
                      },
                      author: {
                        type: "string",
                        description: "Optional author identifier",
                      },
                      data: {
                        type: "object",
                        description: "Message content data",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Message created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Message" },
              },
            },
          },
          "400": {
            description: "Bad request - validation errors",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "404": {
            description: "Thread not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/intelligence/messages/{message_id}": {
      get: {
        summary: "Get a specific message",
        description: "Retrieve details of a specific message by ID",
        tags: ["Messages"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "message_id",
            required: true,
            schema: { type: "string" },
            description: "The message ID",
          },
        ],
        responses: {
          "200": {
            description: "Message details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Message" },
              },
            },
          },
          "404": {
            description: "Message not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      patch: {
        summary: "Update a message",
        description:
          "Update an existing message (used for agent message updates)",
        tags: ["Messages"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "message_id",
            required: true,
            schema: { type: "string" },
            description: "The message ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object",
                    description: "Updated message data",
                    additionalProperties: true,
                  },
                  error: {
                    type: "string",
                    description: "Error message if any",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Message updated successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Message" },
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "404": {
            description: "Message not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete a specific message",
        description: "Permanently delete a message by ID",
        tags: ["Messages"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "message_id",
            required: true,
            schema: { type: "string" },
            description: "The message ID",
          },
        ],
        responses: {
          "204": { description: "Message deleted successfully" },
          "404": {
            description: "Message not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/intelligence/messages": {
      delete: {
        summary: "Delete multiple messages",
        description:
          "Delete multiple messages at once by providing an array of message IDs",
        tags: ["Messages"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["message_ids"],
                properties: {
                  message_ids: {
                    type: "array",
                    items: { type: "string" },
                    description: "Array of message IDs to delete",
                    minItems: 1,
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Messages deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    deleted_count: {
                      type: "integer",
                      description: "Number of messages that were deleted",
                    },
                  },
                  required: ["deleted_count"],
                },
              },
            },
          },
          "400": {
            description: "Bad request - validation errors",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/intelligence/files": {
      get: {
        summary: "List files",
        description: "Retrieve a paginated list of files for a workspace",
        tags: ["Files"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "query",
            name: "team_id",
            schema: { type: "string" },
            description: "The team ID to filter files",
          },
          {
            in: "query",
            name: "workspace_id",
            schema: { type: "string" },
            description: "The workspace ID to filter files",
          },
          {
            in: "query",
            name: "cursor",
            schema: { type: "string" },
            description: "Pagination cursor for retrieving next page",
          },
          {
            in: "query",
            name: "limit",
            schema: { type: "integer", default: 20 },
            description: "Maximum number of files to return",
          },
        ],
        responses: {
          "200": {
            description: "List of files",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/File",
                }),
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      post: {
        summary: "Upload a file",
        description: "Upload a new file attachment",
        tags: ["Files"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  file: {
                    type: "string",
                    format: "binary",
                    description: "The file to upload",
                  },
                  team_id: {
                    type: "string",
                    description: "The team ID",
                  },
                  workspace_id: {
                    type: "string",
                    description: "The workspace ID",
                  },
                },
                required: ["file", "team_id"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "File uploaded successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/File" },
              },
            },
          },
          "400": {
            description: "Bad request - no file or validation errors",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/intelligence/files/{file_id}": {
      get: {
        summary: "Get a specific file",
        description: "Retrieve metadata for a specific file",
        tags: ["Files"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "file_id",
            required: true,
            schema: { type: "string" },
            description: "The file ID",
          },
        ],
        responses: {
          "200": {
            description: "File metadata",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/File",
                },
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/intelligence/files/{file_id}/url": {
      get: {
        summary: "Get a signed URL for a file",
        description: "Retrieve a signed, short-lived download URL for a file",
        tags: ["Files"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "file_id",
            required: true,
            schema: { type: "string" },
            description: "The file ID",
          },
        ],
        responses: {
          "200": {
            description: "Signed download URL",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    url: {
                      type: "string",
                      description: "The signed URL",
                    },
                  },
                },
              },
            },
          },
          "404": {
            description: "File not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/intelligence/tools/read-webpage": {
      post: {
        summary: "Read a webpage",
        description: "Fetch and extract content from a web URL",
        tags: ["Tools"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["url"],
                properties: {
                  url: {
                    type: "string",
                    format: "uri",
                    description: "The web URL to read",
                  },
                  format: {
                    type: "string",
                    enum: ["markdown", "raw", "json"],
                    default: "markdown",
                    description: "Requested output format",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Webpage content",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    content: {
                      type: "string",
                      description: "The extracted content",
                    },
                  },
                  required: ["content"],
                },
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
  },
};
