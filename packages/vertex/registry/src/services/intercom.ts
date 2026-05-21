import type { ServiceSpecV1 } from "@ubento/vertex.core";
import { tags } from "../tags.js";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "intercom",
  description: "Engage customers with live chat, bots, product tours, and support inbox.",
  tags: [tags.category.crm, tags.category.communication],
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
