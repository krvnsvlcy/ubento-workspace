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

async function deploySpec(serviceHandle: string, sdk: UbentoSDK) {
  const specFilePath = path.join(
    root,
    "src",
    "services",
    `${serviceHandle}.ts`,
  );
  if (!fs.existsSync(specFilePath)) {
    console.error(`Error: Spec file not found at ${specFilePath}`);
    return;
  }

  console.log(`🚀 Deploying spec: ${serviceHandle}`);

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
    console.error(`❌ Failed to import spec ${serviceHandle}:`, err);
    return;
  }

  // 2. Find or create Service
  let serviceId: string;
  try {
    const servicesResponse = await sdk.vertex.listServices({
      team_id: teamId,
      handle: serviceHandle,
    });

    const existingService = servicesResponse.data?.find(
      (s: any) => s.handle === serviceHandle,
    );

    if (existingService) {
      serviceId = existingService.id;
      console.log(`✅ Found existing service: ${serviceHandle} (${serviceId})`);

      // Sync name, description, tags if out of date
      const desiredName = spec.name || serviceHandle;
      const desiredDescription = spec.summary ?? spec.description ?? null;
      const desiredTags: string[] = spec.tags || [];

      const tagsMatch =
        [...(existingService.tags || [])].sort().join(",") ===
        [...desiredTags].sort().join(",");
      const needsUpdate =
        existingService.name !== desiredName ||
        (existingService.description ?? null) !== desiredDescription ||
        !tagsMatch;

      if (needsUpdate) {
        console.log(`- Updating service metadata: ${serviceHandle}...`);
        await sdk.vertex.updateService(serviceId, {
          name: desiredName,
          description: desiredDescription,
          tags: desiredTags,
        });
        console.log(`✅ Updated service metadata: ${serviceHandle}`);
      }
    } else {
      console.log(`- Creating new service: ${serviceHandle}...`);
      const newService = await sdk.vertex.createService({
        team_id: teamId,
        handle: serviceHandle,
        name: spec.name || serviceHandle,
        description: spec.summary ?? spec.description,
        tags: spec.tags || [],
        scope: "public",
      });
      serviceId = newService.id;
      console.log(`✅ Created service: ${serviceHandle} (${serviceId})`);
    }
  } catch (err) {
    console.error(`❌ Failed to find or create service ${serviceHandle}:`, err);
    return;
  }

  // Auto upload service image from logos folder
  const providerName = spec.connection?.provider;
  if (providerName) {
    const logoPath = path.join(root, "logos", `${providerName}.webp`);
    if (fs.existsSync(logoPath)) {
      console.log(`- Uploading logo for service: ${serviceHandle}...`);
      try {
        const logoBuffer = fs.readFileSync(logoPath);
        const logoBlob = new Blob([logoBuffer], { type: "image/webp" });
        await sdk.vertex.uploadServiceImage(serviceId, logoBlob);
        console.log(
          `✅ Logo uploaded successfully for service: ${serviceHandle}`,
        );

        try {
          const provider = await sdk.vertex.getProviderByHandle(providerName);
          if (provider) {
            console.log(`- Uploading logo for provider: ${providerName}...`);
            await sdk.vertex.uploadConnectionProviderImage(
              provider.id,
              logoBlob,
            );
            console.log(
              `✅ Logo uploaded successfully for provider: ${providerName}`,
            );
          }
        } catch (err) {
          console.error(
            `❌ Failed to upload logo for provider ${providerName}:`,
            err,
          );
        }
      } catch (err) {
        console.error(
          `❌ Failed to upload logo for service ${serviceHandle}:`,
          err,
        );
      }
    }
  }

  // 3. Find or create Service Channel (default to "openapi")
  let channelId: string;
  const channelName = "openapi";
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
      `❌ Failed to find or create channel ${channelName} for service ${serviceHandle}:`,
      err,
    );
    return;
  }

  // 4. Upload Spec
  console.log(`- Uploading spec to channel ${channelName}...`);
  try {
    await sdk.vertex.uploadServiceChannelSpec(channelId, spec);
    console.log(`✅ Spec uploaded successfully for ${serviceHandle}`);
  } catch (err) {
    console.error(`❌ Failed to upload spec for ${serviceHandle}:`, err);
    return;
  }

  console.log(`✨ Deployment completed for ${serviceHandle}`);
}

async function deployProvider(providerHandle: string, sdk: UbentoSDK) {
  const providersPath = path.join(root, "providers.json");
  if (!fs.existsSync(providersPath)) {
    console.error(`Error: providers.json not found at ${providersPath}`);
    return;
  }

  const providers = JSON.parse(fs.readFileSync(providersPath, "utf-8"));
  const config = providers[providerHandle];

  if (!config) {
    console.error(
      `Error: Provider ${providerHandle} not found in providers.json`,
    );
    return;
  }

  const handle = config.handle || config.code || providerHandle;

  console.log(`🚀 Deploying provider: ${handle}`);

  try {
    let existingProvider: any = null;
    try {
      existingProvider = await sdk.vertex.getProviderByHandle(handle);
    } catch (err) {
      console.log(`Provider ${handle} not found`);
    }

    let providerId: string;
    if (existingProvider) {
      console.log(
        `✅ Found existing provider: ${handle} (${existingProvider.id})`,
      );
      console.log(`- Updating provider config: ${handle}...`);
      await sdk.vertex.updateConnectionProvider(existingProvider.id, {
        handle: handle,
        type: config.type || "http",
        name: config.name,
        description: config.description,
        config: config as any,
      });
      providerId = existingProvider.id;
      console.log(`✅ Updated provider config: ${handle}`);
    } else {
      console.log(`- Creating new provider: ${handle}...`);
      const newProvider = await sdk.vertex.createConnectionProvider({
        handle,
        type: config.type || "http",
        name: config.name,
        description: config.description,
        config: config as any,
      });
      providerId = newProvider.id;
      console.log(`✅ Created provider: ${handle} (${newProvider.id})`);
    }

    // Auto upload provider image from logos folder
    const logoPath = path.join(root, "logos", `${handle}.webp`);
    if (fs.existsSync(logoPath)) {
      console.log(`- Uploading logo for provider: ${handle}...`);
      try {
        const logoBuffer = fs.readFileSync(logoPath);
        const logoBlob = new Blob([logoBuffer], { type: "image/webp" });
        await sdk.vertex.uploadConnectionProviderImage(providerId, logoBlob);
        console.log(`✅ Logo uploaded successfully for provider: ${handle}`);
      } catch (err) {
        console.error(`❌ Failed to upload logo for provider ${handle}:`, err);
      }
    }
  } catch (err) {
    console.error(`❌ Failed to find or create provider ${handle}:`, err);
    return;
  }

  console.log(`✨ Deployment completed for provider ${handle}`);
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
