import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "x",
  type: "http",
  connection: {
    provider: "x",
    baseUrl: "https://api.twitter.com",
  },
  schemas: {},
  entities: {},
  queries: {},
  actions: {}
};

export default spec;
