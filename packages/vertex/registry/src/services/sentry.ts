import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/getsentry/sentry-api-schema/main/openapi-derefed.json" }),
    template: {
      name: "Sentry",
      discover: true,
      tags: [tags.category.devops],
      summary: "Track, triage, and resolve application errors and performance issues.",
      connection: {
        provider: "sentry",
        baseUrl: "https://${connectionConfig.hostname}/api",
      },
    },
  });
}
