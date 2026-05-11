import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "cloudflare",
  type: "http",
  connection: {
    provider: "cloudflare",
    baseUrl: "https://api.cloudflare.com",
  },
  schemas: {},
  entities: {},
  queries: {},
  actions: {}
};

export default spec;
