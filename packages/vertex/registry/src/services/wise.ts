import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getSpec() {
  const openapiPath = path.resolve(__dirname, "../../specs/wise.json");
  const openapi = JSON.parse(fs.readFileSync(openapiPath, "utf8"));

  return generateServiceSpecFromOpenApi({
    openapi,
    template: {
      name: "Wise",
      discover: true,
      tags: [tags.category.finance],
      summary: "Consolidated Banking and Money Transfer API for Wise.",
      connection: {
        provider: "wise",
        baseUrl: "https://api.wise.com",
      },
    },
  });
}
