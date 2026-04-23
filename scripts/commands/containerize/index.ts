import { execSync } from "node:child_process";
import path from "node:path";
import { loadParentEnvs } from "../../utils/env.js";
import { findWorkspaceRoot } from "../../utils/workspace.js";

interface ContainerizeOptions {
  service: string;
  dryRun?: boolean;
}

/**
 * Creates a portable, run-ready Docker image for a service.
 */
export async function containerize(options: ContainerizeOptions) {
  loadParentEnvs();

  const { dryRun = false } = options;

  console.log(`🐳 Starting containerization process...`);

  const root = await findWorkspaceRoot();
  const serviceName = options.service;
  const imageName = `ubento/${serviceName}`;
  const dockerfilePath = path.join(root, "services", serviceName, "Dockerfile");

  // Relative path from root to Dockerfile
  const relativeDockerfilePath = path.relative(root, dockerfilePath);

  console.log(`📦 Service: ${serviceName}`);
  console.log(`🐳 Image Tag: ${imageName}`);
  console.log(`📄 Dockerfile: ${relativeDockerfilePath}`);

  // Docker build command using the new pattern
  // Note: We use --secret to pass the GITHUB_TOKEN if available in host env
  const githubTokenEnv = process.env.GITHUB_TOKEN
    ? `--secret id=github_token,env=GITHUB_TOKEN`
    : "";
  const dockerBuildCmd = `docker build ${githubTokenEnv} -t ${imageName} -f ${relativeDockerfilePath} .`;

  if (dryRun) {
    console.log(`🧪 [DRY RUN] Would run: ${dockerBuildCmd} in ${root}`);
  } else {
    try {
      console.log(`\n🏗️ Building Docker image from workspace root...`);
      execSync(dockerBuildCmd, { stdio: "inherit", cwd: root });
      console.log(`\n✅ Successfully containerized ${serviceName}!`);
      console.log(`🚀 Image: ${imageName}`);
    } catch (error) {
      console.error(`❌ Docker build failed.`);
      process.exit(1);
    }
  }
}
