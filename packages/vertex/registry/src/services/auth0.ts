import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://auth0.com/docs/api/management/openapi.json" }),
    template: {
      name: "Auth0",
      discover: true,
    },
  });
}
