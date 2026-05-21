import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { getOpenApiSpec } from "../utils/openapi.js";

export async function getSpec() {
  return generateServiceSpecFromOpenApi({
    openapi: await getOpenApiSpec({ url: "https://raw.githubusercontent.com/discord/discord-api-spec/refs/heads/main/specs/openapi.json" }),
    template: {
      name: "Discord",
      discover: true,
      tags: [tags.category.communication],
      summary: "Send messages, manage servers, and interact with Discord communities.",
      connection: {
        provider: "discord",
        baseUrl: "https://discord.com",
      },
    },
  });
}
