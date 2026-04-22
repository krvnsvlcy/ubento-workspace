import { execa } from "execa";
import fs from "fs/promises";
import path from "path";
import { fixImports } from "./fix-imports.js";

/**
 * Ensures that package.json has "type": "module"
 * @param rootDir Project root directory
 */
async function ensureTypeModule(rootDir: string) {
  const pkgPath = path.join(rootDir, "package.json");
  const pkgRaw = await fs.readFile(pkgPath, "utf8");
  const pkg = JSON.parse(pkgRaw);

  if (pkg.type !== "module") {
    pkg.type = "module";
    await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
    console.log(`Set "type": "module" in ${pkgPath}`);
  } else {
    console.log(`"type": "module" already set in ${pkgPath}`);
  }
}

/**
 * Runs ESLint on the repo, optionally with --fix.
 * @param rootDir
 * @param fix Whether to auto-fix
 */
async function runEslint(rootDir: string, fix = false) {
  const args = [".", "--ext", ".js,.ts,.tsx"];
  if (fix) args.push("--fix");

  try {
    await execa("eslint", args, {
      cwd: rootDir,
      stdio: "inherit",
    });
  } catch {
    console.error("ESLint failed.");
    process.exit(1);
  }
}

export async function lint() {
  console.log("Ensuring type: module in package.json...");
  await ensureTypeModule(".");

  console.log("Fixing imports...");
  await fixImports();

  console.log("Running ESLint...");
  await runEslint("src", true);

  console.log("Linting complete!");
  process.exit(0);
}
