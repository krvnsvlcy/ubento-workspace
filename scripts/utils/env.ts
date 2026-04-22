import { config } from "dotenv";
import fs from "node:fs";
import path from "node:path";

/**
 * Loads .env files from the current directory up to the root directory.
 * Inner .env files (closer to CWD) override outer .env files.
 */
export function loadParentEnvs() {
  let current = process.cwd();
  const envFiles: string[] = [];

  while (true) {
    const envPath = path.join(current, ".env");
    if (fs.existsSync(envPath)) {
      envFiles.push(envPath);
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }

  // Load from root down to CWD so that inner files override outer files
  for (const envFile of envFiles.reverse()) {
    console.log(`💡 Loading env from: ${envFile}`);
    config({ path: envFile, override: true });
  }
}
