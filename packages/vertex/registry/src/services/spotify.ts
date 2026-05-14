import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://api.apis.guru/v2/specs/spotify.com/1.0.0/openapi.json" }),
    template: {
      name: "Spotify",
      discover: true,
    },
  });
}
