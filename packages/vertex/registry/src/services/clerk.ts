import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/clerk/openapi-specs/refs/heads/main/bapi/2025-11-10.yml" }),
    template: {
      name: "Clerk",
      discover: true,
      connection: {
        provider: "clerk",
        baseUrl: "https://api.clerk.com",
      },
    },
  });
}
