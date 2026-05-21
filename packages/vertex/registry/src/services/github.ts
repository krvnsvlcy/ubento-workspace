import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/api.github.com/api.github.com.json" }),
    template: {
      name: "GitHub",
      discover: true,
      tags: [tags.category.devops],
      summary: "Manage repositories, pull requests, issues, and CI/CD workflows.",
      connection: {
        provider: "github",
        baseUrl: "https://api.github.com",
      },
    },
  });
}
