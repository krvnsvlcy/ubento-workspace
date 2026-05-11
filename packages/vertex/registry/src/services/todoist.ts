import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "todoist",
  type: "http",
  connection: {
    provider: "todoist",
    baseUrl: "https://api.todoist.com",
  },
  schemas: {},
  entities: {},
  queries: {},
  actions: {}
};

export default spec;
