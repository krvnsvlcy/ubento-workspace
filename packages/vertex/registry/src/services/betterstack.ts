import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "betterstack",
  type: "http",
  connection: {
    provider: "betterstack",
    baseUrl: "https://api.betterstack.com",
  },
  schemas: {},
  queries: {},
  actions: {}
};

export default spec;
