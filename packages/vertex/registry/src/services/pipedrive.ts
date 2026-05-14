import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://developers.pipedrive.com/docs/api/v1/openapi.yaml" }),
    template: {
      name: "Pipedrive",
      discover: true,
    },
  });
}
