import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "plaid",
  type: "http",
  connection: {
    provider: "plaid",
    baseUrl: "https://api.plaid.com",
  },
  schemas: {},
  entities: {},
  queries: {},
  actions: {}
};

export default spec;
