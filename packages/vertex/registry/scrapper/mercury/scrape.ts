import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAIN_REF_URL = "https://docs.mercury.com/reference/getaccounts";
const OAUTH_REF_URL = "https://docs.mercury.com/reference/obtainaccesstoken";
const OUTPUT_PATH = path.resolve(__dirname, "../../specs/mercury.json");

interface OpenApiSpec {
  openapi: string;
  info: any;
  servers?: any[];
  paths: Record<string, any>;
  components?: {
    schemas?: Record<string, any>;
    securitySchemes?: Record<string, any>;
    [key: string]: any;
  };
  tags?: any[];
  [key: string]: any;
}

// Custom User-Agent to mimic a browser request
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

async function fetchSchemaFromUrl(url: string): Promise<OpenApiSpec> {
  console.log(`📡 Fetching page: ${url}`);
  const response = await axios.get(url, { headers: HEADERS });
  const html = response.data;

  console.log(`🔍 Extracting ssr-props from HTML...`);
  const match = html.match(/<script id="ssr-props" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) {
    throw new Error(`Failed to find <script id="ssr-props"> tag in HTML from ${url}`);
  }

  const propsJson = JSON.parse(match[1]);
  if (!propsJson.document || !propsJson.document.api || !propsJson.document.api.schema) {
    throw new Error(`Failed to find OpenAPI schema inside ssr-props JSON for ${url}`);
  }

  return propsJson.document.api.schema as OpenApiSpec;
}

async function main() {
  try {
    console.log("🚀 Starting Mercury API Docs Scraper...");

    // 1. Fetch main banking spec
    const mainSpec = await fetchSchemaFromUrl(MAIN_REF_URL);
    console.log(`✅ Main spec loaded: "${mainSpec.info.title}" (version ${mainSpec.info.version}) with ${Object.keys(mainSpec.paths).length} paths.`);

    // 2. Fetch OAuth2 spec
    const oauthSpec = await fetchSchemaFromUrl(OAUTH_REF_URL);
    console.log(`✅ OAuth2 spec loaded: "${oauthSpec.info.title}" (version ${oauthSpec.info.version}) with ${Object.keys(oauthSpec.paths).length} paths.`);

    // 3. Initialize merged spec using the main spec as baseline
    console.log("🔄 Merging specifications...");
    const mergedSpec: OpenApiSpec = {
      openapi: mainSpec.openapi || "3.0.0",
      info: {
        title: "Mercury API",
        version: mainSpec.info.version || "1.0.0",
        description: mainSpec.info.description || "Streamline financial tasks with secure account management and transaction processing.",
      },
      servers: mainSpec.servers || [
        {
          description: "Mercury API URL",
          url: "https://api.mercury.com/api/v1",
        }
      ],
      paths: { ...mainSpec.paths },
      components: {
        schemas: { ...mainSpec.components?.schemas },
        securitySchemes: { ...mainSpec.components?.securitySchemes },
      },
      tags: [...(mainSpec.tags || [])],
    };

    // 4. Merge OAuth2 schemas into components.schemas
    if (oauthSpec.components?.schemas) {
      for (const [key, schema] of Object.entries(oauthSpec.components.schemas)) {
        if (mergedSpec.components!.schemas![key]) {
          console.warn(`⚠️ Warning: Duplicate component schema name "${key}" during merge. Overwriting.`);
        }
        mergedSpec.components!.schemas![key] = schema;
      }
    }

    // 5. Merge OAuth2 security schemes
    if (oauthSpec.components?.securitySchemes) {
      for (const [key, scheme] of Object.entries(oauthSpec.components.securitySchemes)) {
        if (mergedSpec.components!.securitySchemes![key]) {
          console.warn(`⚠️ Warning: Duplicate security scheme name "${key}" during merge. Overwriting.`);
        }
        mergedSpec.components!.securitySchemes![key] = scheme;
      }
    }

    // 6. Merge OAuth2 paths and inject server configurations
    const oauthServers = oauthSpec.servers || [
      {
        description: "Mercury OAuth2 Server",
        url: "https://oauth2.mercury.com",
      }
    ];

    for (const [pathKey, pathItem] of Object.entries(oauthSpec.paths)) {
      if (mergedSpec.paths[pathKey]) {
        console.warn(`⚠️ Warning: Duplicate path "${pathKey}" during merge. Overwriting.`);
      }
      
      // Inject servers array directly at the path level for OAuth2 endpoints
      mergedSpec.paths[pathKey] = {
        servers: oauthServers,
        ...pathItem,
      };
    }

    // 7. Merge OAuth2 tags
    if (oauthSpec.tags) {
      for (const tag of oauthSpec.tags) {
        if (!mergedSpec.tags!.some(t => t.name === tag.name)) {
          mergedSpec.tags!.push(tag);
        }
      }
    }

    // 8. Ensure output specs directory exists
    const specsDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(specsDir)) {
      console.log(`📁 Creating specs directory at ${specsDir}...`);
      fs.mkdirSync(specsDir, { recursive: true });
    }

    // 9. Write spec to file
    console.log(`💾 Saving merged spec to ${OUTPUT_PATH}...`);
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(mergedSpec, null, 2), "utf8");

    console.log(`✨ Successfully generated Mercury OpenAPI spec at ${OUTPUT_PATH}!`);
    console.log(`📈 Final stats: ${Object.keys(mergedSpec.paths).length} paths, ${Object.keys(mergedSpec.components!.schemas!).length} schemas.`);
  } catch (error: any) {
    console.error("❌ Scraper script failed:", error.message || error);
    process.exit(1);
  }
}

main();
