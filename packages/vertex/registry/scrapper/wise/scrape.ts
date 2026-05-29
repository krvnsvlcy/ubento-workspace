import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WISE_REF_URL = "https://docs.wise.com/page-data/shared/oas-api-reference/index.yaml.json";
const OUTPUT_PATH = path.resolve(__dirname, "../../specs/wise.json");

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
};

async function main() {
  try {
    console.log("🚀 Starting Wise API Docs Scraper...");
    console.log(`📡 Fetching Gatsby page-data: ${WISE_REF_URL}`);
    
    const response = await axios.get(WISE_REF_URL, { headers: HEADERS });
    const data = response.data;

    if (!data || !data.definition) {
      throw new Error("Failed to find OpenAPI definition inside page-data response.");
    }

    const spec = data.definition;
    console.log(`✅ Spec loaded: "${spec.info?.title}" (version ${spec.info?.version}) with ${Object.keys(spec.paths || {}).length} paths.`);

    // Ensure output specs directory exists
    const specsDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(specsDir)) {
      console.log(`📁 Creating specs directory at ${specsDir}...`);
      fs.mkdirSync(specsDir, { recursive: true });
    }

    // Write spec to file
    console.log(`💾 Saving spec to ${OUTPUT_PATH}...`);
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(spec, null, 2), "utf8");

    console.log(`✨ Successfully generated Wise OpenAPI spec at ${OUTPUT_PATH}!`);
    console.log(`📈 Final stats: ${Object.keys(spec.paths || {}).length} paths, ${Object.keys(spec.components?.schemas || {}).length} schemas.`);
  } catch (error: any) {
    console.error("❌ Scraper script failed:", error.message || error);
    process.exit(1);
  }
}

main();
