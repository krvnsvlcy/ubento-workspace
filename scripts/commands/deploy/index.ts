import Mustache from "mustache";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { loadParentEnvs } from "../../utils/env.js";
import { load1PasswordEnvs } from "../../utils/op.js";
import { findWorkspaceRoot } from "../../utils/workspace.js";

interface DeployOptions {
  service: string;
  region?: string;
  dryRun?: boolean;
}

/**
 * Deploys a service to Google Cloud Platform (Cloud Run).
 */
export async function deploy(options: DeployOptions) {
  const rootDir = await findWorkspaceRoot();
  const { service: serviceBarName } = options;
  const servicePath = path.join(rootDir, "services", serviceBarName);
  const serviceName = `${serviceBarName}-service`;

  loadParentEnvs(servicePath);

  console.log(`\n🔑 Loading variables from 1Password...`);
  const opVars = await load1PasswordEnvs();
  console.log(
    `✅ Loaded ${Object.keys(opVars).length} variables from 1Password: ${Object.keys(opVars).join(", ")}`,
  );

  const { dryRun = false, region = "us-central1" } = options;

  if (!fs.existsSync(servicePath)) {
    console.error(`❌ Service directory not found: ${servicePath}`);
    process.exit(1);
  }

  const pjPath = path.join(servicePath, "package.json");

  if (!fs.existsSync(pjPath)) {
    console.error(`❌ No package.json found for service: ${serviceBarName}`);
    process.exit(1);
  }

  const localImage = `ubento/${serviceName}`;

  // Artifact Registry path configuration
  const project = opVars.GCP_PROJECT_ID;
  if (!project && !dryRun) {
    console.error(
      "❌ Error: GCP project ID is required for deployment. Use --project or set GCP_PROJECT_ID env var.",
    );
    process.exit(1);
  }

  // Generate a human-readable identifier (e.g., "2026-04-23-14-17-36")
  const deployTag = new Date()
    .toISOString()
    .replace(/[:T]/g, "-")
    .split(".")[0];

  const registryHost = `${region}-docker.pkg.dev`;
  const registryPath = `${project}/ubento-services`;

  const remoteImage = `${registryHost}/${registryPath}/${serviceName}:${deployTag}`;

  console.log(`📦 Service: ${serviceName}`);
  console.log(`🌍 Region: ${region}`);
  console.log(`🆔 Project: ${project || "(unspecified)"}`);
  console.log(`🐳 Remote Image: ${remoteImage}`);

  // 1. Tag the image
  console.log(`\n🏷️  Tagging image...`);
  const tagCmd = `docker tag ${localImage} ${remoteImage}`;

  if (dryRun) {
    console.log(`🧪 [DRY RUN] Would run: ${tagCmd}`);
  } else {
    try {
      execSync(tagCmd, { stdio: "inherit" });
      console.log(`✅ Tagged successfully.`);
    } catch (error) {
      console.error(`❌ Tagging failed.`);
      process.exit(1);
    }
  }

  // 2. Push to Artifact Registry
  console.log(`\n🚀 Pushing to Artifact Registry...`);
  const pushCmd = `docker push ${remoteImage}`;

  if (dryRun) {
    console.log(`🧪 [DRY RUN] Would run: ${pushCmd}`);
  } else {
    try {
      execSync(pushCmd, { stdio: "inherit" });
      console.log(`✅ Pushed successfully.`);
    } catch (error) {
      console.error(
        `❌ Push failed. Make sure you've run 'gcloud auth configure-docker'.`,
      );
      process.exit(1);
    }
  }

  const vars = {
    ...opVars,
    GCP_IMAGE_TAG: remoteImage,
    GCP_SERVICE_NAME: serviceName,
  };

  // 4. Process cloudrun.yaml if it exists
  const yamlPath = path.join(servicePath, "cloudrun.yaml");
  let deployCmd = `gcloud run deploy ${serviceName} --image ${remoteImage} --project ${project} --region ${region} --allow-unauthenticated`;
  let processedYamlPath: string | null = null;

  if (fs.existsSync(yamlPath)) {
    console.log(`\n📄 Found cloudrun.yaml, processing placeholders...`);
    const template = fs.readFileSync(yamlPath, "utf-8");
    // Disable HTML escaping since we're generating YAML/Shell content
    Mustache.escape = (text) => text;
    const processed = Mustache.render(template, { vars });

    processedYamlPath = path.join(servicePath, "cloudrun.processed.yaml");
    fs.writeFileSync(processedYamlPath, processed);
    console.log(`✅ Generated cloudrun.processed.yaml`);

    deployCmd = `gcloud run services replace ${processedYamlPath} --project ${project} --region ${region}`;
  }

  // 5. Deploy to Cloud Run
  console.log(`\n🚀 Deploying to Cloud Run...`);
  if (dryRun) {
    console.log(`🧪 [DRY RUN] Would run: ${deployCmd}`);
    if (processedYamlPath) {
      console.log(
        `🧪 [DRY RUN] Would also run: gcloud run services add-iam-policy-binding ${serviceName} --member="allUsers" --role="roles/run.invoker" --project ${project} --region ${region}`,
      );
    }
  } else {
    try {
      // deploy
      execSync(deployCmd, { stdio: "inherit" });
      // set iam policy
      console.log(`\n🔓 Setting IAM policy for unauthenticated access...`);
      const iamCmd = `gcloud run services add-iam-policy-binding ${serviceName} --member="allUsers" --role="roles/run.invoker" --project ${project} --region ${region} --quiet`;
      execSync(iamCmd, { stdio: "inherit" });

      console.log(
        `\n✅ Successfully deployed ${serviceName} to GCP Cloud Run!`,
      );
    } catch (error) {
      console.error(`❌ Deployment to Cloud Run failed.`);
      process.exit(1);
    } finally {
      if (processedYamlPath && fs.existsSync(processedYamlPath)) {
        fs.unlinkSync(processedYamlPath);
      }
    }
  }
}
