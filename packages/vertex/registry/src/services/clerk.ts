import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/clerk/openapi-specs/refs/heads/main/bapi/2025-11-10.yml" }),
    template: {
      name: "Clerk",
      discover: true,
      tags: [tags.category.iam],
      summary: "Add authentication, user management, and session handling to your app.",
      connection: {
        provider: "clerk",
        baseUrl: "https://api.clerk.com",
      },
    },
  });
}
