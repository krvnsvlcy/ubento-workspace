import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://openapi.vercel.sh" }),
    template: {
      name: "Vercel",
      connection: {
        provider: "vercel",
        baseUrl: "https://api.vercel.com",
      },
      discover: true,
    },
  });
}
