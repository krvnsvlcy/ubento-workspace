import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/klaviyo/openapi/main/openapi/stable.json" }),
    template: {
      name: "Klaviyo",
      discover: true,
    },
  });
}
