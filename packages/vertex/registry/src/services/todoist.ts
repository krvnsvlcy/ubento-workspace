import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/aaddrick/GPT-Actions/main/Todoist/REST/V2/todoist_rest_v2_openapi-3.1.0.yml" }),
    template: {
      name: "Todoist",
      discover: true,
      connection: {
        provider: "todoist",
        baseUrl: "https://api.todoist.com",
      },
    },
  });
}
