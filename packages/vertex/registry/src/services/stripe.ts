import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "stripe",
  type: "http",
  connection: {
    provider: "stripe",
    baseUrl: "https://api.stripe.com",
  },
  schemas: {
    customer: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        email: {
          type: "string",
        },
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
        metadata: {
          type: "object",
        },
        currency: {
          type: "string",
        },
        created: {
          type: "number",
        },
      },
      required: ["id"],
    },
    subscription: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        customer: {
          type: "string",
        },
        status: {
          type: "string",
        },
        current_period_start: {
          type: "number",
        },
        current_period_end: {
          type: "number",
        },
        cancel_at_period_end: {
          type: "boolean",
        },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              price: {
                type: "string",
              },
            },
          },
        },
      },
      required: ["id", "customer", "status"],
    },
    invoice: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        customer: {
          type: "string",
        },
        subscription: {
          type: "string",
        },
        amount_due: {
          type: "number",
        },
        amount_paid: {
          type: "number",
        },
        currency: {
          type: "string",
        },
        status: {
          type: "string",
        },
        created: {
          type: "number",
        },
      },
      required: ["id", "customer", "status"],
    },
  },
  entities: {
    customer: {
      name: "Customer",
      primaryKey: "id",
      schema: {
        type: "ref",
        ref: "customer",
      },
    },
    subscription: {
      name: "Subscription",
      primaryKey: "id",
      schema: {
        type: "ref",
        ref: "subscription",
      },
    },
    invoice: {
      name: "Invoice",
      primaryKey: "id",
      schema: {
        type: "ref",
        ref: "invoice",
      },
    },
  },
  queries: {},
  actions: {
    createCustomer: {
      name: "Create Customer",
      schema: { type: "object" },
      args: {
        email: {
          schema: {
            type: "string",
          },
          required: true,
        },
        name: {
          schema: {
            type: "string",
          },
        },
        description: {
          schema: {
            type: "string",
          },
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/v1/customers",
        },
      },
    },
    createSubscription: {
      name: "Create Subscription",
      schema: { type: "object" },
      args: {
        customerId: {
          schema: {
            type: "string",
          },
          required: true,
        },
        priceId: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/v1/subscriptions",
        },
      },
    },
  },
};

export default spec;
