import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/api-evangelist/notion/main/openapi/notion-openapi.yml" }),
    template: {
      name: "Notion",
      discover: true,
      tags: [tags.category.productivity],
      summary: "Read and write pages, databases, and blocks in Notion workspaces.",
      connection: {
        provider: "notion",
        baseUrl: "https://api.notion.com",
      },
    },
  });
}
