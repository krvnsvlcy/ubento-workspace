import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "linear",
  type: "http",
  connection: {
    provider: "linear",
    baseUrl: "https://api.linear.app",
  },
  schemas: {
    issue: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        title: {
          type: "string",
        },
        description: {
          type: "string",
        },
        identifier: {
          type: "string",
        },
        priority: {
          type: "number",
        },
        status: {
          type: "object",
        },
      },
      required: ["id", "title", "identifier"],
    },
    project: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
        state: {
          type: "string",
        },
      },
      required: ["id", "name"],
    },
    team: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        key: {
          type: "string",
        },
      },
      required: ["id", "name", "key"],
    },
  },

  queries: {},
  actions: {},
};

export default spec;
