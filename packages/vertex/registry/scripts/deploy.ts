import {
  createClientCredentialsTokenManager,
  UbentoSDK,
} from "@ubento/services.sdk";
import fs from "fs";
import mime from "mime-types";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const teamId = "tem_oha89a9gywglkv64t3c3wgjw";

const tokenManager = createClientCredentialsTokenManager({
  clientId: "clt_14ojylllmz7umeoqx82ea9ux",
  clientSecret:
    "sk_472736fb5e276241b394331de04c36f5408dcfddc8240338746c414a22e5105a",
  audience: "https://api.ubento.pro",
  issuerUrl: "https://auth.ubento.pro",
});

async function deployService(serviceName: string, sdk: UbentoSDK) {
  const outDir = path.join(root, "build", serviceName);
  if (!fs.existsSync(outDir)) {
    console.error(
      `Error: Build directory not found at ${outDir}. Run build first.`,
    );
    return;
  }

  // Load or create moduleId
  const modulesJsonPath = path.join(root, "modules.json");
  let modules: Record<string, string> = {};
  if (fs.existsSync(modulesJsonPath)) {
    modules = JSON.parse(fs.readFileSync(modulesJsonPath, "utf-8"));
  }

  let moduleId = modules[serviceName];

  if (!moduleId) {
    console.log(`- Creating new module for ${serviceName}...`);

    try {
      const module = await sdk.module.createModule({
        name: serviceName,
        team_id: teamId,
        type: "service",
        scope: "private",
        source: "manual-upload",
      });
      moduleId = module.id;
      modules[serviceName] = moduleId;
      fs.writeFileSync(modulesJsonPath, JSON.stringify(modules, null, 2));
      console.log(`✅ Created module ${moduleId}`);
    } catch (err) {
      console.error(`❌ Failed to create module:`, err);
      return;
    }
  }

  console.log(
    `🚀 Deploying version for ${serviceName} (Module: ${moduleId})...`,
  );

  // 1. Upload all files from build folder to CAS
  const files = fs.readdirSync(outDir);
  const fileMap: Record<string, string> = {};

  for (const filename of files) {
    const filePath = path.join(outDir, filename);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) continue;

    console.log(`- Uploading ${filename}...`);
    const content = fs.readFileSync(filePath);
    const contentType = mime.lookup(filename) || "application/octet-stream";

    try {
      const { hash } = await sdk.module.uploadFile(content, contentType);
      fileMap[filename] = hash;
      console.log(`✅ Uploaded ${filename} -> ${hash}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${filename}:`, err);
      return;
    }
  }

  // 2. Create a new module version with the uploaded files
  console.log(`- Creating new module version...`);
  try {
    await sdk.module.saveModuleVersion(moduleId, {
      files: fileMap,
    });
    console.log(`✅ New version created for module ${moduleId}`);
  } catch (err) {
    console.error(`❌ Failed to create module version:`, err);
    return;
  }

  console.log(`✨ Deployment completed for ${serviceName}`);
}

/**
 * Deployment script for finance services.
 * Usage: tsx scripts/deploy.ts deploy <service_name | --all>
 */
async function run() {
  const [command, serviceName] = process.argv.slice(2);

  if (command !== "deploy" || !serviceName) {
    console.error("Usage: tsx scripts/deploy.ts deploy <service_name | --all>");
    process.exit(1);
  }

  // Initialize SDK
  const sdk = new UbentoSDK({
    tokenManager,
    serviceBaseUrls: {
      module: "http://localhost:28888",
    },
  });

  if (serviceName === "--all") {
    const srcDir = path.join(root, "src");
    const services = fs.readdirSync(srcDir).filter((f) => {
      return fs.statSync(path.join(srcDir, f)).isDirectory();
    });

    for (const service of services) {
      await deployService(service, sdk);
    }
  } else {
    await deployService(serviceName, sdk);
  }
}

run().catch((err) => {
  console.error(`❌ Deployment script failed:`, err);
  process.exit(1);
});
