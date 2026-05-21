import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({
      url: "https://raw.githubusercontent.com/Asana/openapi/master/defs/asana_oas.yaml",
    }),
    template: {
      name: "Asana",
      discover: true,
      tags: [tags.category.productivity],
      summary: "Organize tasks, track projects, and manage team workflows.",
      connection: {
        provider: "asana",
        baseUrl: "https://app.asana.com",
      },
    },
  });
}
