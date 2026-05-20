import fs from "fs/promises";
import inflection from "inflection";
import { parse as parseJSONC } from "jsonc-parser";
import openapiTS, { astToString, OpenAPI3 } from "openapi-typescript";
import path from "path";

export type ClientConfig = {
  service: string;
  output: string;
  host?: string;
  schema?: string;
  client?: "fetch" | "axios" | "none";
  index?: boolean;
  clean?: boolean;
  clientName?: string;
};

export type BatchClientConfig = {
  defaults?: Partial<Omit<ClientConfig, "service" | "output">>;
  clients: ClientConfig[];
  /** Generate only these services (applied before `skip`). */
  only?: string[];
  /** Skip these services (applied after `only`). */
  skip?: string[];
};

export type ClientCommandOptions =
  | (ClientConfig & { config?: never })
  | {
      config: string;
      service?: never;
      output?: never;
      host?: never;
      schema?: never;
      client?: never;
      index?: never;
      clean?: never;
      clientName?: never;
    };

function resolveSchemaUrl({
  service,
  host,
  schema,
}: Pick<ClientConfig, "service" | "host" | "schema">) {
  if (schema) return schema;
  const base = host?.replace(/\/$/, "") || "https://api.elll.dev";
  return `${base}/meta/${service}/openapi.json`;
}

export function generateClientFile({
  schema,
  clientName = "createWorkspaceServiceClient",
}: {
  schema: OpenAPI3;
  clientName?: string;
}) {
  const lines = [
    `import { createClientFactory } from "~/lib/client.js";`,
    `import { components, paths } from "./types.js";`,
    ``,
    `export const ${clientName} = createClientFactory<paths>();`,
  ];

  Object.keys(schema.components?.schemas || {}).forEach((key) => {
    lines.push(
      `export type ${inflection.camelize(
        key,
      )} = components["schemas"]["${key}"];`,
    );
  });

  return lines.join("\n");
}

export async function generateSingleClient(config: ClientConfig) {
  const { service, output, clean = false, clientName } = config;
  if (!service) throw new Error("service is required");
  if (!output) throw new Error("output is required");

  const schemaUrl = resolveSchemaUrl(config);
  const outputPath = path.resolve(process.cwd(), output);

  // Clean output directory if requested
  if (clean) {
    try {
      await fs.rm(outputPath, { recursive: true, force: true });
    } catch {
      // ignore
    }
  }

  // Ensure the output directory exists
  await fs.mkdir(outputPath, { recursive: true });

  console.log(`Generating client for ${service} from ${schemaUrl}...`);

  const schema = await fetch(schemaUrl).then((res) => res.json());
  const ts = await openapiTS(schema);
  await fs.writeFile(path.join(outputPath, "types.ts"), astToString(ts));
  await fs.writeFile(
    path.join(outputPath, "client.ts"),
    generateClientFile({ schema, clientName }),
  );

  // Generate index.ts if requested
  if (config.index) {
    const indexContent = [
      `export * from "./client.js";`,
      `export * from "./types.js";`,
    ].join("\n");
    await fs.writeFile(path.join(outputPath, "index.ts"), indexContent);
  }

  console.log(`✓ Generated client for ${service} in ${output}`);
}

export async function generateClients(configPath: string) {
  const raw = await fs.readFile(
    path.resolve(process.cwd(), configPath),
    "utf-8",
  );

  // Parse with jsonc-parser (supports //, /* */, trailing commas)
  const batchConfig = parseJSONC(raw) as BatchClientConfig;

  if (!batchConfig || !Array.isArray(batchConfig.clients)) {
    throw new Error(
      `Invalid config: "clients" array missing in ${configPath}.`,
    );
  }

  // Apply only/skip filters
  const onlySet = new Set(
    (batchConfig.only ?? []).map((s) => s.trim()).filter(Boolean),
  );
  const skipSet = new Set(
    (batchConfig.skip ?? []).map((s) => s.trim()).filter(Boolean),
  );

  let clients = [...batchConfig.clients];

  if (onlySet.size > 0) {
    clients = clients.filter((c) => c.service && onlySet.has(c.service));
  }
  if (skipSet.size > 0) {
    clients = clients.filter((c) => !(c.service && skipSet.has(c.service)));
  }

  console.log(
    `Generating ${clients.length} client(s) from config...` +
      (onlySet.size ? ` (only: ${[...onlySet].join(", ")})` : "") +
      (skipSet.size ? ` (skip: ${[...skipSet].join(", ")})` : ""),
  );

  const failures: string[] = [];

  for (const clientConfig of clients) {
    // Apply defaults
    const mergedConfig: ClientConfig = {
      ...batchConfig.defaults,
      ...clientConfig,
    };

    try {
      await generateSingleClient(mergedConfig);
    } catch (error) {
      console.error(
        `✗ Failed to generate client for ${mergedConfig.service}:`,
        error,
      );
      failures.push(mergedConfig.service);
    }
  }

  if (failures.length > 0) {
    console.log(`✗ Failed to generate clients for: ${failures.join(", ")}`);
  } else {
    console.log("✓ All clients generated successfully");
  }
}

// Default to clients.jsonc, or pass a path explicitly: node script.mjs path/to/config.jsonc
generateClients(process.argv[2] ?? "clients.jsonc");
