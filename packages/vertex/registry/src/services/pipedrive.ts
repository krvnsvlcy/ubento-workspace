import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://developers.pipedrive.com/docs/api/v1/openapi.yaml" }),
    template: {
      name: "Pipedrive",
      discover: true,
      tags: [tags.category.crm],
      summary: "Manage leads, deals, contacts, and sales pipelines.",
      connection: {
        provider: "pipedrive",
        baseUrl: "${connectionConfig.api_domain}/api",
      },
    },
  });
}
