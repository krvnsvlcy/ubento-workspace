import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "sentry",
  type: "http",
  connection: {
    provider: "sentry",
    baseUrl: "https://api.sentry.com",
  },
  schemas: {},
  entities: {},
  queries: {},
  actions: {}
};

export default spec;
