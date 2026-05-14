import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "aws",
  type: "http",
  connection: {
    provider: "aws",
    baseUrl: "https://aws.amazon.com",
  },
  schemas: {},
  queries: {},
  actions: {}
};

export default spec;
