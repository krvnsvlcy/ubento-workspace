import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://app.posthog.com/api/schema/" }),
    template: {
      name: "PostHog",
      discover: true,
      tags: [tags.category.devops],
      summary: "Capture product analytics, feature flags, session recordings, and A/B tests.",
      connection: {
        provider: "posthog",
        baseUrl: "https://${connectionConfig.subdomain}.posthog.com",
      },
    },
  });
}
