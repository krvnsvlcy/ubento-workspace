import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://app.posthog.com/api/schema/" }),
    template: {
      name: "Posthog",
      discover: true,
      connection: {
        provider: "posthog",
        baseUrl: "https://${connectionConfig.subdomain}.posthog.com",
      },
    },
  });
}
