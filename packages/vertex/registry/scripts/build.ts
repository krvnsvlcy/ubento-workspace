import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { Extractor, ExtractorConfig } from "@microsoft/api-extractor";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

/**
 * Build script for finance services.
 * Usage: tsx scripts/build.ts build <service_name | --all>
 *
 * It bundles src/[service_name]/service.ts to build/[service_name]/service.js
 * and generates build/[service_name]/manifest.json from src/[service_name]/manifest.ts.
 * It also bundles type definitions into a single service.d.ts using api-extractor.
 */

async function buildService(serviceName: string) {
  const srcDir = path.join(root, "src", serviceName);
  const outDir = path.join(root, "build", serviceName);

  if (!fs.existsSync(srcDir)) {
    console.error(`Error: Service directory not found at ${srcDir}`);
    return;
  }

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const pkgPath = path.join(root, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

  // Identify packages to bundle (code and types)
  const bundledPackages = Object.entries({
    ...(pkg.dependencies || {}),
    ...(pkg.devDependencies || {}),
  } as Record<string, string>)
    .filter(
      ([name, version]) =>
        version.startsWith("workspace:") ||
        !name.startsWith("@types/"),
    )
    .map(([name]) => name);

  const external = Object.keys(pkg.dependencies || {}).filter(
    (name) => !bundledPackages.includes(name),
  );

  console.log(`🚀 Building service: ${serviceName}`);

  // 1. Bundle service.ts
  const serviceEntry = path.join(srcDir, "service.ts");
  if (fs.existsSync(serviceEntry)) {
    await esbuild.build({
      entryPoints: [serviceEntry],
      bundle: true,
      outfile: path.join(outDir, "service.js"),
      format: "esm",
      platform: "node",
      sourcemap: false,
      minify: false,
      external,
    });
    console.log(`✅ Bundled service.ts to build/${serviceName}/service.js`);
  } else {
    console.warn(`⚠️ Warning: service.ts not found in ${srcDir}`);
  }

  // 2. Generate manifest.json
  const manifestEntry = path.join(srcDir, "manifest.ts");
  if (fs.existsSync(manifestEntry)) {
    const manifestModule = await import(manifestEntry);
    const manifest = manifestModule.default || Object.values(manifestModule)[0];

    if (!manifest) {
      throw new Error(`Could not find manifest export in ${manifestEntry}`);
    }

    fs.writeFileSync(
      path.join(outDir, "manifest.json"),
      JSON.stringify(manifest, null, 2),
    );
    console.log(
      `✅ Generated manifest.json in build/${serviceName}/manifest.json`,
    );
  } else {
    console.warn(`⚠️ Warning: manifest.ts not found in ${srcDir}`);
  }

  // 3. Generate initial service.d.ts and bundle with api-extractor
  console.log(`- Generating type definitions...`);
  try {
    // 3a. Emit initial declarations with tsc
    try {
      execSync(
        "npx tsc --emitDeclarationOnly --declarationMap false --noEmitOnError false",
        {
          cwd: root,
          stdio: "inherit",
        },
      );
    } catch (e) {
      console.warn(
        "⚠️ Warning: tsc encountered errors, but attempting to proceed with api-extractor...",
      );
    }

    // 3b. Bundle declarations with api-extractor
    console.log(`- Bundling type definitions with api-extractor...`);
    const mainEntryPointFilePath = path.join(outDir, "service.d.ts");
    const dtsRollupPath = path.join(outDir, "service.bundle.d.ts");

    const extractorConfig = ExtractorConfig.prepare({
      packageJsonFullPath: pkgPath,
      configObject: {
        projectFolder: root,
        mainEntryPointFilePath,
        compiler: {
          tsconfigFilePath: path.join(root, "tsconfig.json"),
        },
        dtsRollup: {
          enabled: true,
          untrimmedFilePath: dtsRollupPath,
        },
        tsdocMetadata: { enabled: false },
        apiReport: { enabled: false },
        docModel: { enabled: false },
        bundledPackages,
        messages: {
          compilerMessageReporting: {
            default: { logLevel: "warning" as any },
          },
          extractorMessageReporting: {
            default: { logLevel: "warning" as any },
          },
        },
      },
      configObjectFullPath: "",
    });

    const extractorResult = Extractor.invoke(extractorConfig, {
      localBuild: true,
      showVerboseMessages: false,
    });

    if (extractorResult.succeeded) {
      if (fs.existsSync(dtsRollupPath)) {
        fs.renameSync(dtsRollupPath, mainEntryPointFilePath);
      }
      console.log(`✅ Bundled .d.ts to build/${serviceName}/service.d.ts`);

      // Clean up other .d.ts files in the service build dir
      const files = fs.readdirSync(outDir);
      for (const file of files) {
        if (file.endsWith(".d.ts") && file !== "service.d.ts") {
          fs.unlinkSync(path.join(outDir, file));
        }
      }
    } else {
      console.warn(`⚠️ Warning: api-extractor encountered issues.`);
    }
  } catch (err) {
    console.warn(`⚠️ Warning: Type generation failed.`);
    console.error(err);
  }

  console.log(`✨ Build completed for ${serviceName}`);
}

async function run() {
  const [command, serviceName] = process.argv.slice(2);

  if (command !== "build" || !serviceName) {
    console.error("Usage: tsx scripts/build.ts build <service_name | --all>");
    process.exit(1);
  }

  if (serviceName === "--all") {
    const srcDir = path.join(root, "src");
    const services = fs.readdirSync(srcDir).filter((f) => {
      return fs.statSync(path.join(srcDir, f)).isDirectory();
    });

    for (const service of services) {
      await buildService(service);
    }
  } else {
    await buildService(serviceName);
  }
}

run().catch((err) => {
  console.error(`❌ Build failed:`, err);
  process.exit(1);
});
