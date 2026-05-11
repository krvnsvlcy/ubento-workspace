import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "digitalocean",
  type: "http",
  connection: {
    provider: "digitalocean",
    baseUrl: "https://api.digitalocean.com",
  },
  schemas: {},
  entities: {},
  queries: {},
  actions: {}
};

export default spec;
