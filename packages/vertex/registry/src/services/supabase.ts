import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://api.supabase.com/api/v1/openapi.json" }),
    template: {
      name: "Supabase",
      discover: true,
      connection: {
        provider: "supabase",
        baseUrl: "https://${connectionConfig.projectUrl}",
      },
    },
  });
}
