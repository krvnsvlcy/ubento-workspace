import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

/**
 * Build script for finance services.
 * Usage: tsx scripts/build.ts build <service_name>
 *
 * It bundles src/[service_name]/service.ts to build/[service_name]/service.js
 * and generates build/[service_name]/manifest.json from src/[service_name]/manifest.ts
 */
async function run() {
  const [command, serviceName] = process.argv.slice(2);

  if (command !== "build" || !serviceName) {
    console.error("Usage: tsx scripts/build.ts build <service_name>");
    process.exit(1);
  }

  const srcDir = path.join(root, "src", serviceName);
  const outDir = path.join(root, "build", serviceName);

  if (!fs.existsSync(srcDir)) {
    console.error(`Error: Service directory not found at ${srcDir}`);
    process.exit(1);
  }

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(root, "package.json"), "utf-8"),
  );
  const external = Object.keys(pkg.dependencies || {});

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
    // Dynamic import to get the manifest object
    // Since we're running with tsx, this works seamlessly
    const manifestModule = await import(manifestEntry);
    const manifest = manifestModule.default || Object.values(manifestModule)[0];

    if (!manifest) {
      throw new Error(`Could not find manifest export in ${manifestEntry}`);
    }

    fs.writeFileSync(
      path.join(outDir, "manifest.json"),
      JSON.stringify(manifest, null, 2)
    );
    console.log(
      `✅ Generated manifest.json in build/${serviceName}/manifest.json`,
    );
  } else {
    console.warn(`⚠️ Warning: manifest.ts not found in ${srcDir}`);
  }

  // 3. Generate service.d.ts
  console.log(`- Generating type definitions...`);
  try {
    execSync("npx tsc --emitDeclarationOnly --declarationMap false", {
      cwd: root,
      stdio: "inherit",
    });
    console.log(`✅ Generated .d.ts files in build/`);
  } catch (err) {
    console.warn(`⚠️ Warning: Type generation encountered issues.`);
  }

  console.log(`✨ Build completed for ${serviceName}`);
}

run().catch((err) => {
  console.error(`❌ Build failed:`, err);
  process.exit(1);
});
