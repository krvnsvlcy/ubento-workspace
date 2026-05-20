import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/zendesk/sunshine-conversations-api-spec/refs/heads/master/openapi.yaml" }),
    template: {
      name: "Zendesk",
      discover: true,
      connection: {
        provider: "zendesk",
        baseUrl: "https://${connectionConfig.subdomain}.zendesk.com",
      },
    },
  });
}
