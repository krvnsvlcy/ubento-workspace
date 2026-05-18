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

async function deploySpec(serviceName: string, sdk: UbentoSDK) {
  const specFilePath = path.join(root, "src", "services", `${serviceName}.ts`);
  if (!fs.existsSync(specFilePath)) {
    console.error(`Error: Spec file not found at ${specFilePath}`);
    return;
  }

  console.log(`🚀 Deploying spec: ${serviceName}`);

  // 1. Import the spec
  let spec: any;
  try {
    const module = await import(specFilePath);
    if (typeof module.getSpec === "function") {
      spec = await module.getSpec();
    } else {
      spec = module.default || module.spec;
    }
    if (!spec) {
      throw new Error(`No spec found in ${specFilePath}`);
    }
  } catch (err) {
    console.error(`❌ Failed to import spec ${serviceName}:`, err);
    return;
  }

  // 2. Find or create Service
  let serviceId: string;
  try {
    const servicesResponse = await sdk.vertex.listServices({
      team_id: teamId,
      name: serviceName,
    });

    const existingService = servicesResponse.data?.find(
      (s: any) => s.name === serviceName,
    );

    if (existingService) {
      serviceId = existingService.id;
      console.log(`✅ Found existing service: ${serviceName} (${serviceId})`);
    } else {
      console.log(`- Creating new service: ${serviceName}...`);
      const newService = await sdk.vertex.createService({
        team_id: teamId,
        name: serviceName,
        display_name: spec.name || serviceName,
        scope: "private",
      });
      serviceId = newService.id;
      console.log(`✅ Created service: ${serviceName} (${serviceId})`);
    }
  } catch (err) {
    console.error(`❌ Failed to find or create service ${serviceName}:`, err);
    return;
  }

  // 3. Find or create Service Channel (default to "v0")
  let channelId: string;
  const channelName = "v0";
  try {
    const channelsResponse = await sdk.vertex.listServiceChannels(serviceId);
    const existingChannel = channelsResponse.data?.find(
      (c: any) => c.name === channelName,
    );

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
    console.error(
      `❌ Failed to find or create channel ${channelName} for service ${serviceName}:`,
      err,
    );
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

async function deployProvider(providerName: string, sdk: UbentoSDK) {
  const providersPath = path.join(root, "providers.json");
  if (!fs.existsSync(providersPath)) {
    console.error(`Error: providers.json not found at ${providersPath}`);
    return;
  }

  const providers = JSON.parse(fs.readFileSync(providersPath, "utf-8"));
  const config = providers[providerName];

  if (!config) {
    console.error(
      `Error: Provider ${providerName} not found in providers.json`,
    );
    return;
  }

  const code = config.code || providerName;

  console.log(`🚀 Deploying provider: ${code}`);

  try {
    const providersResponse = await sdk.vertex.getProviderByCode(code);
    const existingProvider = providersResponse;

    if (existingProvider) {
      console.log(
        `✅ Found existing provider: ${code} (${existingProvider.id})`,
      );
      console.log(`- Updating provider config: ${code}...`);
      await sdk.vertex.updateConnectionProvider(existingProvider.id, {
        type: config.type || "http",
        name: config.name,
        description: config.description,
        config: config as any,
      });
      console.log(`✅ Updated provider config: ${code}`);
    } else {
      console.log(`- Creating new provider: ${code}...`);
      const newProvider = await sdk.vertex.createConnectionProvider({
        code,
        type: config.type || "http",
        name: config.name,
        description: config.description,
        config: config as any,
      });
      console.log(`✅ Created provider: ${code} (${newProvider.id})`);
    }
  } catch (err) {
    console.error(`❌ Failed to find or create provider ${code}:`, err);
    return;
  }

  console.log(`✨ Deployment completed for provider ${code}`);
}

async function run() {
  const [command, specName] = process.argv.slice(2);

  if (!["deploy", "deploy-provider"].includes(command) || !specName) {
    console.error(
      "Usage: tsx scripts/deploy.ts <deploy | deploy-provider> <name | --all>",
    );
    process.exit(1);
  }

  // Initialize SDK
  const sdk = new UbentoSDK({
    tokenManager,
    serviceBaseUrls: {
      vertex: "http://localhost:28642",
    },
  });

  if (command === "deploy") {
    const specsDir = path.join(root, "src", "services");
    if (specName === "--all") {
      if (!fs.existsSync(specsDir)) {
        console.error(`Error: Services directory not found at ${specsDir}`);
        return;
      }
      const files = fs.readdirSync(specsDir).filter((f) => f.endsWith(".ts"));
      for (const file of files) {
        const name = path.basename(file, ".ts");
        await deploySpec(name, sdk);
      }
    } else {
      await deploySpec(specName, sdk);
      console.log("done here ------------------------------");
    }
  } else if (command === "deploy-provider") {
    const providersPath = path.join(root, "providers.json");
    if (specName === "--all") {
      if (!fs.existsSync(providersPath)) {
        console.error(`Error: providers.json not found at ${providersPath}`);
        return;
      }
      const providers = JSON.parse(fs.readFileSync(providersPath, "utf-8"));
      for (const name of Object.keys(providers)) {
        await deployProvider(name, sdk);
      }
    } else {
      await deployProvider(specName, sdk);
    }
  }
}

run().catch((err) => {
  console.error(`❌ Deployment script failed:`, err);
  process.exit(1);
});
