import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/aaddrick/GPT-Actions/main/Todoist/REST/V2/todoist_rest_v2_openapi-3.1.0.yml" }),
    template: {
      name: "Todoist",
      discover: true,
      tags: [tags.category.productivity],
      summary: "Create and manage tasks, projects, and deadlines across your team.",
      connection: {
        provider: "todoist",
        baseUrl: "https://api.todoist.com",
      },
    },
  });
}
