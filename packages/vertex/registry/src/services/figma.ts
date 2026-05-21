import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/figma/rest-api-spec/main/openapi/openapi.yaml" }),
    template: {
      name: "Figma",
      discover: true,
      tags: [tags.category.productivity],
      summary: "Access and manage design files, components, and collaborative workspaces.",
      connection: {
        provider: "figma",
        baseUrl: "https://api.figma.com",
      },
    },
  });
}
