import { readFileSync, writeFileSync } from "fs";
import yaml from "yaml";
import { groupNangoProviders } from "./providers/scripts/extract.js";
import { buildUbentoProviders } from "./providers/scripts/generate.js";

const nangoProviders = yaml.parse(
  readFileSync("./nango-providers.yaml", "utf-8"),
);
const grouped = groupNangoProviders(nangoProviders);
writeFileSync("./grouped.json", JSON.stringify(grouped, null, 2));
const providers = buildUbentoProviders(grouped, nangoProviders);
console.log(`Generated ${Object.keys(providers).length} providers`);
writeFileSync("./providers.json", JSON.stringify(providers, null, 2));
