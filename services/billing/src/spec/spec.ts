import { billingSchemas } from "@ubento/services.database/billing";
import { makeCursorPageResponseSchema } from "@ubento/services.toolkit";
import { OpenAPIV3 } from "openapi-types";

export const spec: OpenAPIV3.Document = {
  openapi: "3.1.0",
  info: {
    title: "Ubento Billing Service API",
    version: "1.0.0",
    description:
      "Provider-agnostic Billing API. Fully descriptive path params, cursor-based pagination.",
  },
  servers: [{ url: "https://api.ubento.dev" }],
  tags: [
    { name: "Catalog" },
    { name: "Subscriptions" },
    { name: "Invoices" },
    { name: "Usage" },
    { name: "Orders" },
    { name: "Entitlements" },
    { name: "Checkout" },
    { name: "Admin" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
    headers: {
      "X-Request-Id": {
        description: "Echoed request id.",
        schema: { type: "string" },
      },
      "Idempotency-Key": {
        description:
          "Prevents duplicate processing of side-effecting requests.",
        schema: { type: "string" },
      },
    },
    parameters: {
      organization_id: {
        in: "query",
        name: "organization_id",
        required: true,
        schema: { type: "string" },
      },
      cursor: {
        in: "query",
        name: "cursor",
        schema: { type: "string" },
      },
      limit: {
        in: "query",
        name: "limit",
        schema: { type: "integer", minimum: 1, maximum: 200, default: 50 },
      },
    },
    responses: {
      Problem: {
        description: "RFC 7807 Problem Details",
        content: {
          "application/problem+json": {
            schema: {
              type: "object",
              properties: {
                type: { type: "string", format: "uri" },
                title: { type: "string" },
                status: { type: "integer" },
                detail: { type: "string" },
                instance: { type: "string" },
              },
              additionalProperties: true,
            },
          },
        },
      },
    },
    schemas: {
      ...(billingSchemas.definitions as any),
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    /* ----------------------------- Catalog ----------------------------- */
    "/billing/products": {
      get: {
        tags: ["Catalog"],
        summary: "List products",
        parameters: [
          { $ref: "#/components/parameters/cursor" },
          { $ref: "#/components/parameters/limit" },
        ],
        responses: {
          "200": {
            description: "Array of Product",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/Product",
                }),
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/products/{id}": {
      get: {
        tags: ["Catalog"],
        summary: "Get product by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Product",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          "404": {
            description: "Product not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/products/by-code/{code}": {
      get: {
        tags: ["Catalog"],
        summary: "Get product by code",
        parameters: [
          {
            in: "path",
            name: "code",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Product",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          "404": {
            description: "Product not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/offers": {
      get: {
        tags: ["Catalog"],
        summary: "List offers",
        parameters: [
          { $ref: "#/components/parameters/cursor" },
          { $ref: "#/components/parameters/limit" },
          { in: "query", name: "active", schema: { type: "boolean" } },
          { in: "query", name: "code", schema: { type: "string" } },
        ],
        responses: {
          "200": {
            description: "Array of Offer",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/Offer",
                }),
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
      post: {
        tags: ["Catalog"],
        summary: "Create offer",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  code: { type: "string" },
                  name: { type: "string" },
                  description: { type: "string" },
                  entitlements: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        feature_code: { type: "string" },
                        value: {},
                      },
                      required: ["feature_code"],
                    },
                  },
                  metadata: {},
                  active: { type: "boolean" },
                  product_code: { type: "string" },
                },
                required: ["code", "name", "product_code"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Offer created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Offer" },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/offers/by-code/{code}": {
      get: {
        tags: ["Catalog"],
        summary: "Get offer by code",
        parameters: [
          {
            in: "path",
            name: "code",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Offer",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Offer" },
              },
            },
          },
          "404": {
            description: "Offer not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/offers/{id}": {
      get: {
        tags: ["Catalog"],
        summary: "Get offer by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Offer",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Offer" },
              },
            },
          },
          "404": {
            description: "Offer not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
      patch: {
        tags: ["Catalog"],
        summary: "Update offer",
        parameters: [
          {
            in: "path",
            name: "id",
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
                  name: { type: "string" },
                  description: { type: "string" },
                  entitlements: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        feature_code: { type: "string" },
                        value: {},
                      },
                      required: ["feature_code"],
                    },
                  },
                  metadata: {},
                  active: { type: "boolean" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Offer updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Offer" },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/offers/{id}/activate": {
      post: {
        tags: ["Catalog"],
        summary: "Activate offer",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Offer activated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Offer" },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/offers/{id}/deactivate": {
      post: {
        tags: ["Catalog"],
        summary: "Deactivate offer",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Offer deactivated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Offer" },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },

    /* -------------------------- Subscriptions -------------------------- */
    "/billing/subscriptions": {
      get: {
        tags: ["Subscriptions"],
        summary: "List subscriptions for an organization",
        parameters: [
          { in: "query", name: "organization_id", schema: { type: "string" } },
          { in: "query", name: "product_code", schema: { type: "string" } },
          { in: "query", name: "offer_code", schema: { type: "string" } },
          {
            in: "query",
            name: "status",
            schema: {
              type: "string",
              enum: ["ACTIVE", "CANCELLED", "EXPIRED", "PAUSED", "PENDING"],
            },
          },
          { $ref: "#/components/parameters/cursor" },
          { $ref: "#/components/parameters/limit" },
        ],
        responses: {
          "200": {
            description: "Array of Subscription",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/Subscription",
                }),
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/subscriptions/{id}": {
      get: {
        tags: ["Subscriptions"],
        summary: "Get a subscription by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Subscription",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Subscription" },
              },
            },
          },
          "404": {
            description: "Subscription not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
      patch: {
        tags: ["Subscriptions"],
        summary: "Update a subscription",
        parameters: [
          {
            in: "path",
            name: "id",
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
                  quantity: { type: "number" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Subscription updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Subscription" },
              },
            },
          },
          "404": {
            description: "Subscription not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/subscriptions/{id}/cancel": {
      post: {
        tags: ["Subscriptions"],
        summary: "Cancel a subscription",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Subscription cancelled",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Subscription" },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/subscriptions/{id}/resume": {
      post: {
        tags: ["Subscriptions"],
        summary: "Resume a paused subscription",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Subscription resumed",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Subscription" },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },

    /* ----------------------------- Invoices ---------------------------- */
    "/billing/subscriptions/invoices": {
      get: {
        tags: ["Invoices"],
        summary: "List invoices",
        parameters: [
          { in: "query", name: "organization_id", schema: { type: "string" } },
          {
            in: "query",
            name: "status",
            schema: {
              type: "string",
              enum: ["PAID", "PENDING", "REFUNDED", "VOID"],
            },
          },
          {
            in: "query",
            name: "created_after",
            schema: { type: "string", format: "date-time" },
          },
          {
            in: "query",
            name: "created_before",
            schema: { type: "string", format: "date-time" },
          },
          { $ref: "#/components/parameters/cursor" },
          { $ref: "#/components/parameters/limit" },
        ],
        responses: {
          "200": {
            description: "Array of Invoice",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/SubscriptionInvoice",
                }),
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/subscriptions/invoices/{id}": {
      get: {
        tags: ["Invoices"],
        summary: "Get invoice by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Invoice",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/SubscriptionInvoice" },
              },
            },
          },
          "404": {
            description: "Invoice not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },

    /* ------------------------------ Orders ----------------------------- */
    "/billing/orders": {
      get: {
        tags: ["Orders"],
        summary: "List orders for an organization",
        parameters: [
          { in: "query", name: "organization_id", schema: { type: "string" } },
          {
            in: "query",
            name: "status",
            schema: {
              type: "string",
              enum: ["PENDING", "PAID", "REFUNDED", "FAILED"],
            },
          },
          {
            in: "query",
            name: "created_after",
            schema: { type: "string", format: "date-time" },
          },
          {
            in: "query",
            name: "created_before",
            schema: { type: "string", format: "date-time" },
          },
          { $ref: "#/components/parameters/cursor" },
          { $ref: "#/components/parameters/limit" },
        ],
        responses: {
          "200": {
            description: "Array of Order",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/Order",
                }),
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/orders/{id}": {
      get: {
        tags: ["Orders"],
        summary: "Get order by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Order",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Order" },
              },
            },
          },
          "404": {
            description: "Order not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },

    /* ------------------------------ Usage ------------------------------ */
    "/billing/usage/counters": {
      get: {
        tags: ["Usage"],
        summary: "List usage counters for an organization",
        parameters: [
          { $ref: "#/components/parameters/organization_id" },
          { in: "query", name: "code", schema: { type: "string" } },
          { in: "query", name: "group", schema: { type: "string" } },
          { $ref: "#/components/parameters/cursor" },
          { $ref: "#/components/parameters/limit" },
        ],
        responses: {
          "200": {
            description: "Array of UsageCounter",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/UsageCounter",
                }),
              },
            },
          },
          "400": {
            description: "organization_id is required",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/usage/counters/by-code": {
      get: {
        tags: ["Usage"],
        summary: "Get usage counter by code",
        parameters: [
          { $ref: "#/components/parameters/organization_id" },
          { in: "query", name: "code", schema: { type: "string" } },
          { in: "query", name: "group", schema: { type: "string" } },
        ],
        responses: {
          "200": {
            description: "UsageCounter",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UsageCounter" },
              },
            },
          },
          "404": {
            description: "Usage counter not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/usage/counters/{id}": {
      get: {
        tags: ["Usage"],
        summary: "Get usage counter by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "UsageCounter",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UsageCounter" },
              },
            },
          },
          "404": {
            description: "Usage counter not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/usage/increment": {
      post: {
        tags: ["Usage"],
        summary: "Atomically increment usage for a feature",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  organization_id: { type: "string" },
                  code: { type: "string" },
                  amount: { type: "integer", minimum: 1 },
                  group: { type: "string" },
                },
                required: ["organization_id", "code", "amount"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Updated usage counter",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UsageCounter" },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/usage/events": {
      get: {
        tags: ["Usage"],
        summary: "List usage events",
        parameters: [
          { in: "query", name: "organization_id", schema: { type: "string" } },
          { in: "query", name: "counter_code", schema: { type: "string" } },
          { in: "query", name: "counter_group", schema: { type: "string" } },
          { in: "query", name: "ref", schema: { type: "string" } },
          {
            in: "query",
            name: "created_after",
            schema: { type: "string", format: "date-time" },
          },
          {
            in: "query",
            name: "created_before",
            schema: { type: "string", format: "date-time" },
          },
          { $ref: "#/components/parameters/cursor" },
          { $ref: "#/components/parameters/limit" },
        ],
        responses: {
          "200": {
            description: "Array of UsageEvent",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/UsageEvent",
                }),
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/usage/holds": {
      post: {
        tags: ["Usage"],
        summary: "Reserve usage (create hold)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  organization_id: { type: "string" },
                  code: { type: "string" },
                  group: { type: "string" },
                  amount: { type: "integer", minimum: 1 },
                  note: { type: "string" },
                  duration: { type: "integer", minimum: 60000 },
                  ref: { type: "string" },
                  data: { type: "object" },
                },
                required: [
                  "organization_id",
                  "code",
                  "amount",
                  "note",
                  "duration",
                  "ref",
                ],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Usage hold created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UsageHold" },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/usage/holds/{id}": {
      get: {
        tags: ["Usage"],
        summary: "Get usage hold by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "UsageHold",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UsageHold" },
              },
            },
          },
          "404": {
            description: "Usage hold not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/usage/holds/commit": {
      post: {
        tags: ["Usage"],
        summary: "Commit usage hold by ref",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  ref: { type: "string" },
                  organization_id: { type: "string" },
                },
                required: ["ref", "organization_id"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Hold committed",
            content: {
              "application/json": {
                schema: { type: "object" },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/usage/holds/release": {
      post: {
        tags: ["Usage"],
        summary: "Release usage hold by ref",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  ref: { type: "string" },
                  organization_id: { type: "string" },
                },
                required: ["ref", "organization_id"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Hold released",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UsageHold" },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },

    /* --------------------------- Entitlements -------------------------- */
    "/billing/entitlements": {
      get: {
        tags: ["Entitlements"],
        summary: "Get entitlement grants for an organization",
        parameters: [{ $ref: "#/components/parameters/organization_id" }],
        responses: {
          "200": {
            description: "Entitlement grant table",
            content: { "application/json": { schema: { type: "object" } } },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/entitlements/access": {
      get: {
        tags: ["Entitlements"],
        summary: "Check feature access for an organization",
        parameters: [
          { $ref: "#/components/parameters/organization_id" },
          {
            in: "query",
            name: "features",
            required: true,
            schema: { type: "string" },
            description: "Comma-separated list of feature codes",
          },
        ],
        responses: {
          "200": {
            description: "Feature access evaluation",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  additionalProperties: { type: "boolean" },
                },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/entitlements/quota": {
      get: {
        tags: ["Entitlements"],
        summary: "Get usage quota for features",
        parameters: [
          { $ref: "#/components/parameters/organization_id" },
          {
            in: "query",
            name: "features",
            required: true,
            schema: { type: "string" },
            description: "Comma-separated list of feature codes",
          },
        ],
        responses: {
          "200": {
            description: "Feature quotas",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  additionalProperties: { type: "integer" },
                },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },

    /* ----------------------------- Checkout ---------------------------- */
    "/billing/checkout": {
      get: {
        tags: ["Checkout"],
        summary: "List checkouts",
        parameters: [
          { in: "query", name: "organization_id", schema: { type: "string" } },
          { in: "query", name: "product_code", schema: { type: "string" } },
          { in: "query", name: "offer_code", schema: { type: "string" } },
          { $ref: "#/components/parameters/cursor" },
          { $ref: "#/components/parameters/limit" },
        ],
        responses: {
          "200": {
            description: "Array of Checkout",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/Checkout",
                }),
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
      post: {
        tags: ["Checkout"],
        summary: "Create a new checkout session",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  organization_id: { type: "string" },
                  product_code: { type: "string" },
                  offer_code: { type: "string" },
                  quantity: { type: "integer", minimum: 1 },
                  redirect_url: { type: "string", format: "uri" },
                  duration: { type: "integer" },
                  data: { type: "object" },
                },
                required: [
                  "organization_id",
                  "product_code",
                  "offer_code",
                  "quantity",
                  "redirect_url",
                ],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Checkout created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Checkout" },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/checkout/{id}": {
      get: {
        tags: ["Checkout"],
        summary: "Get checkout by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Checkout",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Checkout" },
              },
            },
          },
          "404": {
            description: "Checkout not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },

    /* ------------------------------- Admin ----------------------------- */
    "/billing/admin/webhooks": {
      get: {
        tags: ["Admin"],
        summary: "List stored webhook events",
        parameters: [
          {
            in: "query",
            name: "provider",
            schema: { type: "string", enum: ["LEMON_SQUEEZY"] },
          },
          { in: "query", name: "processed", schema: { type: "boolean" } },
          {
            in: "query",
            name: "created_after",
            schema: { type: "string", format: "date-time" },
          },
          {
            in: "query",
            name: "created_before",
            schema: { type: "string", format: "date-time" },
          },
          { $ref: "#/components/parameters/cursor" },
          { $ref: "#/components/parameters/limit" },
        ],
        responses: {
          "200": {
            description: "Array of WebhookEvent",
            content: {
              "application/json": {
                schema: makeCursorPageResponseSchema({
                  $ref: "#/components/schemas/WebhookEvent",
                }),
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
    "/billing/admin/webhooks/{id}": {
      get: {
        tags: ["Admin"],
        summary: "Get webhook event by ID",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "WebhookEvent",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/WebhookEvent" },
              },
            },
          },
          "404": {
            description: "Webhook event not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
          default: { $ref: "#/components/responses/Problem" },
        },
      },
    },
  },
};
