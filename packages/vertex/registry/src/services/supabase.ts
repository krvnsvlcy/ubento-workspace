import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "supabase",
  type: "http",
  connection: {
    provider: "supabase",
    baseUrl: "https://api.supabase.com",
  },
  schemas: {},
  entities: {},
  queries: {},
  actions: {}
};

export default spec;
