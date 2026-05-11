import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "spotify",
  type: "http",
  connection: {
    provider: "spotify",
    baseUrl: "https://api.spotify.com",
  },
  schemas: {},
  entities: {},
  queries: {},
  actions: {}
};

export default spec;
