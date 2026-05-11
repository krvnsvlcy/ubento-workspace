import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "oura",
  type: "http",
  connection: {
    provider: "oura",
    baseUrl: "https://api.ouraring.com",
  },
  schemas: {},
  entities: {},
  queries: {},
  actions: {}
};

export default spec;
