import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://openapi.vercel.sh" }),
    template: {
      name: "Vercel",
      discover: true,
      tags: [tags.category.devops],
      summary: "Deploy and manage web projects, domains, and serverless functions.",
      connection: {
        provider: "vercel",
        baseUrl: "https://api.vercel.com",
      },
    },
  });
}
