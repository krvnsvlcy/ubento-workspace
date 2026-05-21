import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/klaviyo/openapi/main/openapi/stable.json" }),
    template: {
      name: "Klaviyo",
      discover: true,
      tags: [tags.category.crm],
      summary: "Build and automate email, SMS, and push notification marketing campaigns.",
      connection: {
        provider: "klaviyo",
        baseUrl: "https://a.klaviyo.com",
      },
    },
  });
}
