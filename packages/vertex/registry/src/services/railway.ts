import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "railway",
  type: "http",
  connection: {
    provider: "railway",
    baseUrl: "https://api.railway.com",
  },
  schemas: {},
  queries: {},
  actions: {}
};

export default spec;
