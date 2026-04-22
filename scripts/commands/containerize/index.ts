import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { loadParentEnvs } from "../../utils/env.js";
import { findWorkspaceRoot } from "../../utils/workspace.js";

interface ContainerizeOptions {
  service?: string;
  project?: string;
  tag?: string;
  dryRun?: boolean;
}

/**
 * Creates a portable, run-ready Docker image for a service.
 */
export async function containerize(options: ContainerizeOptions) {
  loadParentEnvs();

  const {
    dryRun = false,
    project = process.env.GCP_PROJECT_ID,
    tag: customTag,
  } = options;

  console.log(`🐳 Starting containerization process...`);

  const currentDir = process.cwd();
  const root = await findWorkspaceRoot();
  const pjPath = path.join(currentDir, "package.json");

  if (!fs.existsSync(pjPath)) {
    console.error("❌ No package.json found in the current directory.");
    process.exit(1);
  }

  const pj = JSON.parse(fs.readFileSync(pjPath, "utf8"));
  const fullPackageName = pj.name;
  const serviceName = options.service || pj.name.split("/").pop(); // De-scoped name
  const imageTag = customTag || `gcr.io/${project}/${serviceName}:latest`;

  console.log(`📦 Service: ${fullPackageName} (${serviceName})`);
  console.log(`🆔 Project: ${project || "(unspecified)"}`);
  console.log(`🏷️  Image Tag: ${imageTag}`);

  if (!project && !dryRun) {
    console.warn(
      "⚠️  GCP project ID not specified. Image tag might be incomplete.",
    );
  }

  // 1. Build the service
  console.log(`\n🛠️ Building service...`);
  if (dryRun) {
    console.log(`🧪 [DRY RUN] Would run: pnpm build`);
  } else {
    try {
      execSync("pnpm build", { stdio: "inherit", cwd: currentDir });
      console.log(`✅ Build successful.`);
    } catch (error) {
      console.error(`❌ Build failed.`);
      process.exit(1);
    }
  }

  // 2. pnpm deploy --legacy to create a standalone directory
  const outDir = path.join(currentDir, "out");
  console.log(`\n📦 Preparing standalone deployment in ${outDir}...`);
  const deployPrepCmd = `pnpm deploy --legacy --filter ${fullPackageName} ${outDir}`;

  if (dryRun) {
    console.log(`🧪 [DRY RUN] Would run: ${deployPrepCmd}`);
  } else {
    try {
      if (fs.existsSync(outDir)) {
        fs.rmSync(outDir, { recursive: true, force: true });
      }
      execSync(deployPrepCmd, { stdio: "inherit", cwd: root });
      console.log(`✅ pnpm deploy successful.`);
    } catch (error) {
      console.error(`❌ pnpm deploy failed.`);
      process.exit(1);
    }
  }

  // 3. Create Dockerfile in the out directory
  const dockerfilePath = path.join(outDir, "Dockerfile");
  console.log(`\n📄 Generating Dockerfile...`);

  const dockerfileContent = `FROM node:20-slim
RUN apt-get update -y && apt-get install -y openssl ca-certificates
WORKDIR /app
COPY . .
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "start"]
`;

  if (dryRun) {
    console.log(
      `🧪 [DRY RUN] Would create Dockerfile with content:\n${dockerfileContent}`,
    );
  } else {
    fs.writeFileSync(dockerfilePath, dockerfileContent);
    console.log(`✅ Dockerfile created.`);
  }

  // 4. Docker build
  console.log(`\n🏗️ Building Docker image...`);
  const dockerBuildCmd = `docker build -t ${imageTag} .`;

  if (dryRun) {
    console.log(`🧪 [DRY RUN] Would run: ${dockerBuildCmd} in ${outDir}`);
  } else {
    try {
      execSync(dockerBuildCmd, { stdio: "inherit", cwd: outDir });
      console.log(`\n✅ Successfully containerized ${serviceName}!`);
      console.log(`🚀 Image: ${imageTag}`);
    } catch (error) {
      console.error(`❌ Docker build failed.`);
      process.exit(1);
    }
  }
}
