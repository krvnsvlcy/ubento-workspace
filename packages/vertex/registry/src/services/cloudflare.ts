import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/cloudflare/api-schemas/main/openapi.json" }),
    template: {
      name: "Cloudflare",
      discover: true,
      tags: [tags.category.insfrastucture, tags.category.devops],
      summary: "Manage DNS, CDN, security, and edge network infrastructure.",
      connection: {
        provider: "cloudflare",
        baseUrl: "https://api.cloudflare.com/client",
      },
    },
  });
}
