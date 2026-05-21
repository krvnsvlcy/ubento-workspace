import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/mailchimp/mailchimp-client-lib-codegen/main/spec/transactional.openapi.json" }),
    template: {
      name: "Mailchimp",
      discover: true,
      tags: [tags.category.crm],
      summary: "Send transactional and marketing emails, and manage subscriber lists.",
      connection: {
        provider: "mailchimp",
        baseUrl: "https://${connectionConfig.dc}.api.mailchimp.com",
      },
    },
  });
}
