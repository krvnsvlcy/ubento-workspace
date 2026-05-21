import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({
      url: "https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json",
    }),
    template: {
      name: "Stripe",
      discover: true,
      tags: [tags.category.finance],
      summary: "Accept payments, manage subscriptions, and handle billing operations.",
      connection: {
        provider: "stripe",
        baseUrl: "https://api.stripe.com",
      },
    },
  });
}
