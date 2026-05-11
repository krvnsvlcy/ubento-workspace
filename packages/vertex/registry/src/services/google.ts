import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "google",
  type: "http",
  connection: {
    provider: "google",
    baseUrl: "https://www.googleapis.com",
  },
  schemas: {},
  entities: {},
  queries: {},
  actions: {}
};

export default spec;
