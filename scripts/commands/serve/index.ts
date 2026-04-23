import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { loadParentEnvs } from "../../utils/env.js";
import { findWorkspaceRoot } from "../../utils/workspace.js";

interface ServeOptions {
  service: string;
  port?: string;
  dryRun?: boolean;
}

/**
 * Runs the containerized service locally.
 */
export async function serve(options: ServeOptions) {
  const { port = "3000", service: serviceName } = options;
  const rootDir = await findWorkspaceRoot();
  const servicePath = path.join(rootDir, "services", serviceName);

  loadParentEnvs(servicePath);

  if (!fs.existsSync(servicePath)) {
    console.error(`❌ Service directory not found: ${servicePath}`);
    process.exit(1);
  }

  console.log(`🚀 Starting local service execution...`);

  const imageName = `ubento/${serviceName}`;

  console.log(`📦 Service: ${serviceName}`);
  console.log(`🔌 Port: ${port}`);
  console.log(`🐳 Image: ${imageName}`);

  const envFilePath = path.join(servicePath, ".env");
  const envFileArg = fs.existsSync(envFilePath)
    ? `--env-file ${envFilePath}`
    : "";

  const serveCmd = `docker run --rm -p ${port}:${port} ${envFileArg} ${imageName}`;

  try {
    console.log(`\n🐳 Running container...`);
    execSync(serveCmd, { stdio: "inherit", cwd: rootDir });
  } catch (error) {
    console.error(`❌ Docker run failed.`);
    process.exit(1);
  }
}
