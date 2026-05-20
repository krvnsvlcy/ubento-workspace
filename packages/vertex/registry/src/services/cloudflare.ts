import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/cloudflare/api-schemas/main/openapi.json" }),
    template: {
      name: "Cloudflare",
      discover: true,
      connection: {
        provider: "cloudflare",
        baseUrl: "https://api.cloudflare.com/client",
      },
    },
  });
}
