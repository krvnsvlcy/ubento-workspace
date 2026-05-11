import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "reddit",
  type: "http",
  connection: {
    provider: "reddit",
    baseUrl: "https://api.reddit.com",
  },
  schemas: {},
  entities: {},
  queries: {},
  actions: {}
};

export default spec;
