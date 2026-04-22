import fs from "node:fs";
import path from "node:path";

/**
 * Finds the workspace root by looking for pnpm-workspace.yaml
 */
export async function findWorkspaceRoot(): Promise<string> {
  let current = process.cwd();
  while (current !== path.dirname(current)) {
    if (fs.existsSync(path.join(current, "pnpm-workspace.yaml"))) {
      return current;
    }
    current = path.dirname(current);
  }
  // Fallback to checking for package.json with workspaces
  current = process.cwd();
  while (current !== path.dirname(current)) {
    const pj = path.join(current, "package.json");
    if (fs.existsSync(pj)) {
      const json = JSON.parse(fs.readFileSync(pj, "utf8"));
      if (json.workspaces) return current;
    }
    current = path.dirname(current);
  }
  throw new Error("Could not find workspace root");
}
