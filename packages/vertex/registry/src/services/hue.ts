import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "hue",
  type: "http",
  connection: {
    provider: "hue",
    baseUrl: "https://api.meethue.com",
  },
  schemas: {},
  queries: {},
  actions: {}
};

export default spec;
