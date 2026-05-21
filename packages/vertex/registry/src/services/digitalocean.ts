import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/digitalocean/openapi/main/specification/DigitalOcean-public.v2.yaml" }),
    template: {
      name: "DigitalOcean",
      discover: true,
      tags: [tags.category.insfrastucture, tags.category.devops],
      summary: "Provision and manage cloud servers, databases, and Kubernetes clusters.",
      connection: {
        provider: "digitalocean",
        baseUrl: "https://api.digitalocean.com",
      },
    },
  });
}
