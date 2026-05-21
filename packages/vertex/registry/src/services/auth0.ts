import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://auth0.com/docs/api/management/openapi.json" }),
    template: {
      name: "Auth0",
      discover: true,
      tags: [tags.category.iam],
      summary: "Manage users, roles, and authentication policies for your applications.",
      connection: {
        provider: "auth0",
        baseUrl: "https://${connectionConfig.subdomain}.auth0.com",
      },
    },
  });
}
