import type { ServiceSpecV1 } from "@ubento/vertex.core";
import { tags } from "../tags.js";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "hubspot",
  description: "Manage contacts, deals, marketing campaigns, and CRM pipelines.",
  tags: [tags.category.crm],
  type: "http",
  connection: {
    provider: "hubspot",
    baseUrl: "https://api.hubapi.com",
  },
  schemas: {},
  queries: {},
  actions: {},
};

export default spec;
