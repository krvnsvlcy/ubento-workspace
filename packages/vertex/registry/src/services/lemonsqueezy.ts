import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getSpec() {
  const openapiPath = path.resolve(__dirname, "../../specs/lemonsqueezy.json");
  const openapi = JSON.parse(fs.readFileSync(openapiPath, "utf8"));

  return generateServiceSpecFromOpenApi({
    openapi,
    template: {
      name: "Lemon Squeezy",
      discover: true,
      tags: [tags.category.finance],
      summary: "Sell digital products, manage subscriptions, and handle licensing.",
      connection: {
        provider: "lemonsqueezy",
        baseUrl: "https://api.lemonsqueezy.com",
      },
    },
  });
}
