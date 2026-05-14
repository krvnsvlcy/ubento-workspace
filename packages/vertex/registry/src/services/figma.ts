import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/figma/rest-api-spec/main/openapi/openapi.yaml" }),
    template: {
      name: "Figma",
      discover: true,
    },
  });
}
