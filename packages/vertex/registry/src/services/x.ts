import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://api.twitter.com/2/openapi.json" }),
    template: {
      name: "X",
      discover: true,
      tags: [tags.category.social],
      summary: "Post tweets, read timelines, and manage X (Twitter) accounts and audiences.",
      connection: {
        provider: "twitter-v2",
        baseUrl: "https://api.twitter.com",
      },
    },
  });
}
