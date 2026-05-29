import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { tags } from "../tags.js";
import { parse as parseYaml } from "yaml";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getSpec() {
  const openapiPath = path.resolve(__dirname, "../../specs/rippling.yaml");
  const yamlContent = fs.readFileSync(openapiPath, "utf8");
  const openapi = parseYaml(yamlContent);

  return generateServiceSpecFromOpenApi({
    openapi,
    template: {
      name: "Rippling",
      discover: true,
      tags: [tags.category.productivity, tags.category.finance],
      summary: "Documentation for the Rippling Platform API.",
      connection: {
        provider: "rippling",
        baseUrl: "https://rest.ripplingapis.com",
      },
    },
  });
}
