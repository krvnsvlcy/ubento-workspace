import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "lemonsqueezy",
  connections: {
    default: {
      type: "http",
      provider: "lemonsqueezy",
      baseUrl: "https://api.lemonsqueezy.com",
    },
  },
  schemas: {
    order: {
      type: "object",
      properties: {
        id: { type: "string" },
        type: { type: "string" },
        attributes: {
          type: "object",
          properties: {
            order_number: { type: "number" },
            total_price: { type: "number" },
            currency: { type: "string" },
            status: { type: "string" },
            created_at: { type: "string" },
            updated_at: { type: "string" },
          },
          required: [
            "order_number",
            "total_price",
            "currency",
            "status",
            "created_at",
            "updated_at",
          ],
        },
      },
      required: ["id", "type", "attributes"],
    },
    store: {
      type: "object",
      properties: {
        id: { type: "string" },
        type: { type: "string" },
        attributes: {
          type: "object",
          properties: {
            name: { type: "string" },
            slug: { type: "string" },
            domain: { type: "string" },
            url: { type: "string" },
            avatar_url: { type: "string" },
            plan: { type: "string" },
            country: { type: "string" },
            currency: { type: "string" },
            total_sales: { type: "number" },
            total_revenue: { type: "number" },
            created_at: { type: "string" },
            updated_at: { type: "string" },
          },
          required: [
            "name",
            "slug",
            "domain",
            "url",
            "avatar_url",
            "plan",
            "country",
            "currency",
            "total_sales",
            "total_revenue",
            "created_at",
            "updated_at",
          ],
        },
      },
      required: ["id", "type", "attributes"],
    },
    customer: {
      type: "object",
      properties: {
        id: { type: "string" },
        type: { type: "string" },
        attributes: {
          type: "object",
          properties: {
            store_id: { type: "number" },
            name: { type: "string" },
            email: { type: "string" },
            status: { type: "string" },
            city: { type: "string" },
            region: { type: "string" },
            country: { type: "string" },
            total_revenue_currency: { type: "number" },
            mrr: { type: "number" },
            created_at: { type: "string" },
            updated_at: { type: "string" },
            test_mode: { type: "boolean" },
          },
          required: [
            "store_id",
            "name",
            "email",
            "status",
            "total_revenue_currency",
            "mrr",
            "created_at",
            "updated_at",
            "test_mode",
          ],
        },
      },
      required: ["id", "type", "attributes"],
    },
  },
  entities: {
    order: {
      name: "Order",
      primaryKey: "id",
      schema: {
        type: "ref",
        ref: "order",
      },
    },
    store: {
      name: "Store",
      primaryKey: "id",
      schema: {
        type: "ref",
        ref: "store",
      },
    },
    customer: {
      name: "Customer",
      primaryKey: "id",
      schema: {
        type: "ref",
        ref: "customer",
      },
    },
  },
  queries: {
    useAuthenticatedUser: {
      name: "Get Authenticated User",
      schema: {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              id: { type: "string" },
              type: { type: "string" },
              attributes: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  avatar_url: { type: "string" },
                },
              },
            },
          },
        },
      },
      args: {},
      handler: {
        type: "http",
        request: {
          method: "GET",
          baseUrl: "https://api.lemonsqueezy.com",
          path: "/v1/users/me",
        },
      },
    },
  },
  actions: {
    createCustomer: {
      name: "Create Customer",
      schema: {
        type: "object",
        properties: {
          data: {
            type: "ref",
            ref: "customer",
          },
        },
      },
      args: {
        storeId: {
          schema: { type: "string" },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              email: { type: "string" },
              city: { type: "string" },
              region: { type: "string" },
              country: { type: "string" },
            },
            required: ["name", "email"],
          },
          required: true,
        },
      },
      handler: {
        type: "http",
        request: {
          method: "POST",
          baseUrl: "https://api.lemonsqueezy.com",
          path: "/v1/customers",
          body: {
            type: "json",
            data: {
              data: {
                type: "customers",
                attributes: { $resolve: "args.data" },
                relationships: {
                  store: {
                    data: {
                      type: "stores",
                      id: { $resolve: "args.storeId" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    updateCustomer: {
      name: "Update Customer",
      schema: {
        type: "object",
        properties: {
          data: {
            type: "ref",
            ref: "customer",
          },
        },
      },
      args: {
        customerId: {
          schema: { type: "string" },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              email: { type: "string" },
              city: { type: "string" },
              region: { type: "string" },
              country: { type: "string" },
              status: { type: "string" },
            },
          },
          required: true,
        },
      },
      handler: {
        type: "http",
        request: {
          method: "PATCH",
          baseUrl: "https://api.lemonsqueezy.com",
          path: "/v1/customers/{customerId}",
          params: {
            customerId: { $resolve: "args.customerId" },
          },
          body: {
            type: "json",
            data: {
              data: {
                type: "customers",
                id: { $resolve: "args.customerId" },
                attributes: { $resolve: "args.data" },
              },
            },
          },
        },
      },
    },
  },
};

export default spec;
