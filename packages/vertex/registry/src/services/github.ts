import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/api.github.com/api.github.com.json" }),
    template: {
      name: "Github",
      discover: true,
      connection: {
        provider: "github",
        baseUrl: "https://api.github.com",
      },
    },
  });
}
