import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { loadParentEnvs } from "../../utils/env.js";
import { findWorkspaceRoot } from "../../utils/workspace.js";

interface DeployOptions {
  service?: string;
  project?: string;
  region?: string;
  dryRun?: boolean;
}

/**
 * Deploys a service to Google Cloud Platform (Cloud Run).
 */
export async function deploy(options: DeployOptions) {
  loadParentEnvs();

  const {
    dryRun = false,
    project = process.env.GCP_PROJECT_ID,
    region = "us-central1",
  } = options;

  console.log(`🚀 Starting GCP deployment process...`);

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

  console.log(`📦 Service: ${fullPackageName} (${serviceName})`);
  console.log(`🌍 Region: ${region}`);
  console.log(`🆔 Project: ${project || "(unspecified)"}`);
  console.log(`🏠 Root: ${root}`);

  if (!project && !dryRun) {
    console.error(
      "❌ Error: GCP project ID is required for deployment. Use --project or set GCP_PROJECT_ID env var.",
    );
    process.exit(1);
  }

  // 1. Build the service first to ensure dist/ is populated
  console.log(`\n🛠️ Building service...`);
  if (dryRun) {
    console.log(`🧪 [DRY RUN] Would run: pnpm build`);
  } else {
    try {
      execSync("pnpm build", { stdio: "inherit", cwd: currentDir });
      console.log(`✅ Build successful.`);
    } catch (error) {
      console.error(`❌ Build failed. Aborting deployment.`);
      process.exit(1);
    }
  }

  // 2. Prepare standalone deployment directory using pnpm deploy
  // This resolves "workspace:*" dependencies into real files
  const outDir = path.join(currentDir, "out");
  console.log(
    `\n📦 Preparing standalone deployment in ${outDir} using pnpm deploy...`,
  );

  const deployPrepCmd = `pnpm deploy --legacy --filter ${fullPackageName} ${outDir}`;

  if (dryRun) {
    console.log(`🧪 [DRY RUN] Would run: ${deployPrepCmd}`);
  } else {
    try {
      // Remove old out dir if exists
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

  // 3. Deploy to Cloud Run from the 'out' directory
  console.log(`\n🚀 Deploying to Cloud Run from ${outDir}...`);
  const deployCmd = `gcloud run deploy ${serviceName} --source . --project ${project} --region ${region} --allow-unauthenticated`;

  if (dryRun) {
    console.log(`🧪 [DRY RUN] Would run: ${deployCmd} in ${outDir}`);
  } else {
    try {
      execSync(deployCmd, { stdio: "inherit", cwd: outDir });
      console.log(
        `\n✅ Successfully deployed ${serviceName} to GCP Cloud Run!`,
      );
    } catch (error) {
      console.error(`❌ Deployment to Cloud Run failed.`);
      process.exit(1);
    }
  }
}
