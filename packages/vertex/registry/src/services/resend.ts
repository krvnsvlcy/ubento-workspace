import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/resend/resend-openapi/main/resend.yaml" }),
    template: {
      name: "Resend",
      discover: true,
      tags: [tags.category.communication],
      summary: "Send transactional and bulk emails with a developer-first email API.",
      connection: {
        provider: "resend",
        baseUrl: "https://api.resend.com",
      },
    },
  });
}
