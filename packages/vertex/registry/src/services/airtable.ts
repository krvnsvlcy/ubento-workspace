import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "airtable",
  type: "http",
  connection: {
    provider: "airtable",
    baseUrl: "https://api.airtable.com",
  },
  schemas: {},
  queries: {},
  actions: {}
};

export default spec;
