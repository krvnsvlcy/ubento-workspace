import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { downloadLogosOnly } from "./providers/scripts/logos.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

async function run() {
  const providersPath = path.join(root, "providers.json");
  if (!fs.existsSync(providersPath)) {
    console.error(`Error: providers.json not found at ${providersPath}`);
    process.exit(1);
  }

  const providers = JSON.parse(fs.readFileSync(providersPath, "utf-8"));

  const outputDir = path.join(root, "logos");

  await downloadLogosOnly(providers, outputDir, "1idCI4rKGwmX0MDMxOb", 1000);
}

run().catch((err) => {
  console.error("❌ Failed to generate logos:", err);
  process.exit(1);
});
