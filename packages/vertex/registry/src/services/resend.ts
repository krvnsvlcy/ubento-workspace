import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/resend/resend-openapi/main/resend.yaml" }),
    template: {
      name: "Resend",
      discover: true,
    },
  });
}
