import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "coinbase",
  type: "http",
  connection: {
    provider: "coinbase",
    baseUrl: "https://api.coinbase.com",
  },
  schemas: {},
  entities: {},
  queries: {},
  actions: {}
};

export default spec;
