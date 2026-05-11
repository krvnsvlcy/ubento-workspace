import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "hubspot",
  type: "http",
  connection: {
    provider: "hubspot",
    baseUrl: "https://api.hubapi.com",
  },
  schemas: {},
  entities: {},
  queries: {},
  actions: {}
};

export default spec;
