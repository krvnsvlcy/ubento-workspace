#!/usr/bin/env -S npx tsx

import { cac } from "cac";
import { build } from "./build/index.js";
import { clean } from "./commands/clean/index.js";
import { containerize } from "./commands/containerize/index.js";
import { deploy } from "./commands/deploy/index.js";
import { linkerLink } from "./commands/link/index.js";
import { lint } from "./commands/lint/index.js";
import { packup } from "./commands/packup/index.js";
import { publish } from "./commands/publish/index.js";
import { serve } from "./commands/serve/index.js";
import { watch } from "./commands/watch/index.js";

const cli = cac("scripts");

cli.command("clean", "Remove build outputs (dist, build, etc)").action(clean);
cli.command("build", "Build the project").action(build);
cli
  .command("watch [tsconfig]", "Watch TypeScript files and fix import paths")
  .option("--config <path>", "Path to tsconfig file", {
    default: "tsconfig.json",
  })
  .action(async (tsconfig: string | undefined, options: any) => {
    await watch(tsconfig || options.config);
  });
cli.command("lint", "Run lint, ensure type:module, fix imports").action(lint);
cli
  .command("packup", "Pack up the project for distribution")
  .action(() => packup());
cli
  .command(
    "publish [target]",
    "Recursively publish packages based on API changes",
  )
  .option("--registry <url>", "NPM registry URL", {
    default: "https://registry.npmjs.org/",
  })
  .option(
    "--dry-run",
    "Show what would be published without actually publishing",
    { default: false },
  )
  .option("--use-changesets", "Generate changesets for the releases", {
    default: false,
  })
  .action(async (target: string | undefined, options: any) => {
    try {
      await publish({
        target,
        registry: options.registry,
        dryRun: options.dryRun,
        useChangesets: options.useChangesets,
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });
cli
  .command("link", "Create symlinks from mappings config")
  .option("--config <file>", "Path to linker mappings config file")
  .option("--dry-run", "Show what would be linked without making changes", {
    default: false,
  })
  .option(
    "--copy-fallback",
    "Copy files if symlink fails (useful on Windows)",
    { default: false },
  )
  .action(async (options: any) => {
    await linkerLink({
      config: options.config,
      dryRun: options.dryRun,
      copyFallback: options.copyFallback,
    });
  });

cli
  .command("deploy [service]", "Deploy a service to GCP")
  .option("--project <id>", "GCP Project ID")
  .option("--region <name>", "GCP Region", { default: "us-central1" })
  .option("--dry-run", "Show what would be deployed without making changes", {
    default: false,
  })
  .action(async (service: string | undefined, options: any) => {
    if (!service) {
      console.error("❌ Error: service name is required.");
      process.exit(1);
    }
    await deploy({
      service,
      region: options.region,
      dryRun: options.dryRun,
    });
  });

cli
  .command(
    "containerize [service]",
    "Create a portable Docker image for a service",
  )
  .option("--project <id>", "GCP Project ID")
  .option("--tag <name>", "Custom image tag")
  .option("--dry-run", "Show what would be done without making changes", {
    default: false,
  })
  .action(async (service: string | undefined, options: any) => {
    if (!service) {
      console.error("❌ Error: service name is required.");
      process.exit(1);
    }
    await containerize({
      service,
      dryRun: options.dryRun,
    });
  });

cli
  .command("serve [service]", "Run the containerized service locally")
  .option("--port <number>", "Port to expose", { default: "3000" })
  .option("--dry-run", "Show what would be done without actually running", {
    default: false,
  })
  .action(async (service: string | undefined, options: any) => {
    if (!service) {
      console.error("❌ Error: service name is required.");
      process.exit(1);
    }
    await serve({
      service,
      port: options.port,
      dryRun: options.dryRun,
    });
  });

cli.help();
cli.parse();
