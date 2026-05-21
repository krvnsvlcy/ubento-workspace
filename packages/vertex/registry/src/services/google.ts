import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://api.apis.guru/v2/specs/google.com/v3/openapi.json" }),
    template: {
      name: "Google",
      discover: true,
      tags: [tags.category.productivity],
      summary: "Integrate with Google Workspace, Gmail, Drive, Calendar, and more.",
      connection: {
        provider: "google",
        baseUrl: "https://www.googleapis.com",
      },
    },
  });
}
