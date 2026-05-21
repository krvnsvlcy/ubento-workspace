import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://api.supabase.com/api/v1/openapi.json" }),
    template: {
      name: "Supabase",
      discover: true,
      tags: [tags.category.insfrastucture],
      summary: "Manage Postgres databases, auth, storage, and edge functions.",
      connection: {
        provider: "supabase",
        baseUrl: "https://${connectionConfig.projectUrl}",
      },
    },
  });
}
