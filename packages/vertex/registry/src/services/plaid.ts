import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://api.apis.guru/v2/specs/plaid.com/2020-09-14_1.334.0/openapi.json" }),
    template: {
      name: "Plaid",
      discover: true,
      tags: [tags.category.finance],
      summary: "Connect bank accounts and access financial data, transactions, and balances.",
      connection: {
        provider: "plaid",
        baseUrl: "https://production.plaid.com",
      },
    },
  });
}
