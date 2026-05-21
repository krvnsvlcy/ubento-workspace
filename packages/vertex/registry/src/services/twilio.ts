import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/twilio/twilio-oai/refs/heads/main/spec/json/twilio_accounts_v1.json" }),
    template: {
      name: "Twilio",
      discover: true,
      tags: [tags.category.communication],
      summary: "Send SMS, voice calls, and WhatsApp messages programmatically.",
      connection: {
        provider: "twilio",
        baseUrl: "https://api.twilio.com",
      },
    },
  });
}
