import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/getsentry/sentry-api-schema/main/openapi-derefed.json" }),
    template: {
      name: "Sentry",
      discover: true,
      connection: {
        provider: "sentry",
        baseUrl: "https://${connectionConfig.hostname}/api",
      },
    },
  });
}
