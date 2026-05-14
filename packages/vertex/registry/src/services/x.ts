import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://api.twitter.com/2/openapi.json" }),
    template: {
      name: "X",
      discover: true,
    },
  });
}
