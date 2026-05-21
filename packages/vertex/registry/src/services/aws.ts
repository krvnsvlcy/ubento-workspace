import type { ServiceSpecV1 } from "@ubento/vertex.core";
import { tags } from "../tags.js";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "aws",
  description: "Access AWS services including compute, storage, databases, and AI.",
  tags: [tags.category.insfrastucture, tags.category.devops],
  type: "http",
  connection: {
    provider: "aws",
    baseUrl: "https://aws.amazon.com",
  },
  schemas: {},
  queries: {},
  actions: {},
};

export default spec;
