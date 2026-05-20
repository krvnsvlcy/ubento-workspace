import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/digitalocean/openapi/main/specification/DigitalOcean-public.v2.yaml" }),
    template: {
      name: "Digitalocean",
      discover: true,
      connection: {
        provider: "digitalocean",
        baseUrl: "https://api.digitalocean.com",
      },
    },
  });
}
