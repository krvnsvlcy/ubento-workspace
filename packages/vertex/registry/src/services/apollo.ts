import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "apollo",
  type: "http",
  connection: {
    provider: "apollo",
    baseUrl: "https://api.apollo.io",
  },
  schemas: {},
  queries: {},
  actions: {}
};

export default spec;
