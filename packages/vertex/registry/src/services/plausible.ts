import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "plausible",
  type: "http",
  connection: {
    provider: "plausible",
    baseUrl: "https://plausible.io",
  },
  schemas: {},
  entities: {},
  queries: {},
  actions: {}
};

export default spec;
