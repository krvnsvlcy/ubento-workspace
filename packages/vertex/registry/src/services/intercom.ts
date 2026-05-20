import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "intercom",
  type: "http",
  connection: {
    provider: "intercom",
    baseUrl: "https://api.intercom.io",
  },
  schemas: {},
  queries: {},
  actions: {},
};

export default spec;
