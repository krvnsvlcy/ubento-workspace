import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/api-evangelist/notion/main/openapi/notion-openapi.yml" }),
    template: {
      name: "Notion",
      discover: true,
    },
  });
}
