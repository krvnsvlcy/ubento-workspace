import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "deel",
  type: "http",
  connection: {
    provider: "deel",
    baseUrl: "https://api.letsdeel.com",
  },
  schemas: {},
  queries: {},
  actions: {}
};

export default spec;
