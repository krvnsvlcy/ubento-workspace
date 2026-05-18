import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/mailchimp/mailchimp-client-lib-codegen/main/spec/transactional.openapi.json" }),
    template: {
      name: "Mailchimp",
      discover: true,
      connection: {
        provider: "mailchimp",
        baseUrl: "https://${connectionConfig.dc}.api.mailchimp.com",
      },
    },
  });
}
