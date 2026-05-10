import {
  createClientCredentialsTokenManager,
  UbentoSDK,
} from "@ubento/services.sdk";
import fs from "fs";
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

async function deploySpec(specName: string, sdk: UbentoSDK) {
  const specFilePath = path.join(root, "src", "specs", `${specName}.ts`);
  if (!fs.existsSync(specFilePath)) {
    console.error(`Error: Spec file not found at ${specFilePath}`);
    return;
  }

  console.log(`🚀 Deploying spec: ${specName}`);

  // 1. Import the spec
  let spec: any;
  try {
    const module = await import(specFilePath);
    spec = module.default || module.spec;
    if (!spec) {
      throw new Error(`No spec found in ${specFilePath}`);
    }
  } catch (err) {
    console.error(`❌ Failed to import spec ${specName}:`, err);
    return;
  }

  const serviceName = spec.name || specName;

  // 2. Find or create Service
  let serviceId: string;
  try {
    const servicesResponse = await sdk.vertex.listServices({
      team_id: teamId,
      name: serviceName,
    });
    
    const existingService = servicesResponse.data?.find((s: any) => s.name === serviceName);

    if (existingService) {
      serviceId = existingService.id;
      console.log(`✅ Found existing service: ${serviceName} (${serviceId})`);
    } else {
      console.log(`- Creating new service: ${serviceName}...`);
      const newService = await sdk.vertex.createService({
        team_id: teamId,
        name: serviceName,
        display_name: serviceName,
        scope: "private",
      });
      serviceId = newService.id;
      console.log(`✅ Created service: ${serviceName} (${serviceId})`);
    }
  } catch (err) {
    console.error(`❌ Failed to find or create service ${serviceName}:`, err);
    return;
  }

  // 3. Find or create Service Channel (default to "default")
  let channelId: string;
  const channelName = "default";
  try {
    const channelsResponse = await sdk.vertex.listServiceChannels(serviceId);
    const existingChannel = channelsResponse.data?.find((c: any) => c.name === channelName);

    if (existingChannel) {
      channelId = existingChannel.id;
      console.log(`✅ Found existing channel: ${channelName} (${channelId})`);
    } else {
      console.log(`- Creating new channel: ${channelName}...`);
      const newChannel = await sdk.vertex.createServiceChannel(serviceId, {
        team_id: teamId,
        name: channelName,
      });
      channelId = newChannel.id;
      console.log(`✅ Created channel: ${channelName} (${channelId})`);
    }
  } catch (err) {
    console.error(`❌ Failed to find or create channel ${channelName} for service ${serviceName}:`, err);
    return;
  }

  // 4. Upload Spec
  console.log(`- Uploading spec to channel ${channelName}...`);
  try {
    await sdk.vertex.uploadServiceChannelSpec(channelId, spec);
    console.log(`✅ Spec uploaded successfully for ${serviceName}`);
  } catch (err) {
    console.error(`❌ Failed to upload spec for ${serviceName}:`, err);
    return;
  }

  console.log(`✨ Deployment completed for ${serviceName}`);
}

async function run() {
  const [command, specName] = process.argv.slice(2);

  if (command !== "deploy" || !specName) {
    console.error("Usage: tsx scripts/deploy.ts deploy <spec_name | --all>");
    process.exit(1);
  }

  // Initialize SDK
  const sdk = new UbentoSDK({
    tokenManager,
    serviceBaseUrls: {
      vertex: "http://localhost:28642",
    },
  });

  const specsDir = path.join(root, "src", "specs");

  if (specName === "--all") {
    if (!fs.existsSync(specsDir)) {
      console.error(`Error: Specs directory not found at ${specsDir}`);
      return;
    }
    const files = fs.readdirSync(specsDir).filter((f) => f.endsWith(".ts"));
    for (const file of files) {
      const name = path.basename(file, ".ts");
      await deploySpec(name, sdk);
    }
  } else {
    await deploySpec(specName, sdk);
  }
}

run().catch((err) => {
  console.error(`❌ Deployment script failed:`, err);
  process.exit(1);
});
