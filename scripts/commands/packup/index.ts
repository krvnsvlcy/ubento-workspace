// packup.ts
import { getPackages } from "@manypkg/get-packages";
import * as child from "child_process";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import semver from "semver";
import {
  ApiChange,
  diffApiModels,
  extractApi,
  loadApiModelFromPackageJson,
  loadApiModelFromRegistry,
} from "./api-extractor";

const log = (...args: unknown[]) => console.log("packup:", ...args);

// Calculate fingerprint hash of all files in a directory and package.json content
function calculateFingerprint(
  packageDir: string,
  packageJsonContent: string,
): string {
  const hash = crypto.createHash("sha256");

  // Hash package.json content
  hash.update(packageJsonContent);

  // Recursively hash all files in the package directory
  function hashDirectory(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    // Sort entries for consistent hashing
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      // Skip node_modules, .git, build, dist directories
      if (entry.isDirectory()) {
        if (!["node_modules", ".git", "build", "dist"].includes(entry.name)) {
          hash.update(entry.name + "/");
          hashDirectory(fullPath);
        }
      } else {
        // Hash file name and content
        hash.update(entry.name);
        try {
          const content = fs.readFileSync(fullPath);
          hash.update(content);
        } catch (error) {
          // Skip files that can't be read
          log(`Warning: Could not read file ${fullPath}`);
        }
      }
    }
  }

  hashDirectory(packageDir);
  return hash.digest("hex");
}

// ✅ Allowed output file extensions copied from build → dist
const ALLOWED_EXTENSIONS = [".js"];

const BUILD_DIR = "./build";
const DIST_DIR = "./dist";

export async function packup(packageDir?: string): Promise<ReleaseData> {
  const workingDir = packageDir || process.cwd();
  log("packing up...", workingDir);

  // --- Discover workspace versions to freeze "workspace:" and "*" ranges
  const { packages } = await getPackages(workingDir);
  const packageVersionMap = new Map<string, string>();
  for (const pkg of packages) {
    packageVersionMap.set(pkg.packageJson.name, pkg.packageJson.version);
  }

  const BUILD_DIR_FULL = path.resolve(workingDir, BUILD_DIR);
  const DIST_DIR_FULL = path.resolve(workingDir, DIST_DIR);

  // --- Copy build → dist (filtered)
  function copyDirWithFilter(src: string, dest: string) {
    if (!fs.existsSync(src)) return;
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    for (const entry of fs.readdirSync(src)) {
      const srcPath = path.join(src, entry);
      const destPath = path.join(dest, entry);
      const stats = fs.statSync(srcPath);

      if (stats.isDirectory()) {
        copyDirWithFilter(srcPath, destPath);
      } else if (ALLOWED_EXTENSIONS.includes(path.extname(entry))) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  if (fs.existsSync(BUILD_DIR_FULL)) {
    copyDirWithFilter(BUILD_DIR_FULL, DIST_DIR_FULL);
    log(`copied build → dist (${ALLOWED_EXTENSIONS.join(", ")} only)`);
  } else {
    log(`No build directory found at ${BUILD_DIR_FULL}, skipping copy`);
    if (!fs.existsSync(DIST_DIR_FULL))
      fs.mkdirSync(DIST_DIR_FULL, { recursive: true });
  }

  // --- Load & sanitize package.json (dist copy will be rewritten)
  const packageJsonPath = path.resolve(workingDir, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  delete packageJson.scripts;
  delete packageJson.devDependencies;

  // --- Helpers
  // Normalize "build/" and "./build/" → "./"
  function remapBuildPath(p: string) {
    return p.replace(/^\.?\/?build\//, "./");
  }

  // Freeze workspace and wildcard versions
  function freezeVersions(deps?: Record<string, string>) {
    if (!deps) return;
    for (const [name, version] of Object.entries(deps)) {
      if (version === "*" || version.startsWith("workspace:")) {
        const actual = packageVersionMap.get(name);
        if (actual) {
          deps[name] = actual;
          log(`froze ${name} to ${actual}`);
        } else {
          throw new Error(
            `Could not find version for package: ${name}. Ensure it exists in workspace.`,
          );
        }
      }
    }
  }

  // Recursively remap export fields and run API extraction for "types"
  async function remapExportValue(key: string, val: any): Promise<any> {
    if (typeof val === "string") return remapBuildPath(val);

    if (val && typeof val === "object") {
      // First pass: if this level has a "types" string, extract api and remap it
      if (typeof val.types === "string") {
        const originalTypesPath = val.types;
        await extractApi({
          packageJsonFullPath: packageJsonPath,
          entry: originalTypesPath,
          out: path.join(DIST_DIR, remapBuildPath(originalTypesPath)),
          nameSuffix: "/" + key.split(/\W/).filter(Boolean).join("-"),
        });
        val.types = remapBuildPath(originalTypesPath);
      }

      // Recurse all keys (import/require/default/conditionals)
      for (const k of Object.keys(val)) {
        // types was handled above; still remap nested objects/strings deterministically
        if (k !== "types") {
          val[k] = await remapExportValue(k, val[k]);
        }
      }
    }

    return val;
  }

  // --- Remap common fields
  if (packageJson.main) {
    packageJson.main = remapBuildPath(packageJson.main);
  }

  if (packageJson.types) {
    await extractApi({
      packageJsonFullPath: packageJsonPath,
      entry: packageJson.types,
      out: path.join(DIST_DIR, remapBuildPath(packageJson.types)),
    });
    packageJson.types = remapBuildPath(packageJson.types);
  }

  if (packageJson.exports) {
    for (const key of Object.keys(packageJson.exports)) {
      packageJson.exports[key] = await remapExportValue(
        key,
        packageJson.exports[key],
      );
    }
  }

  // --- Freeze versions
  freezeVersions(packageJson.dependencies);
  freezeVersions(packageJson.peerDependencies);
  freezeVersions(packageJson.optionalDependencies);

  // --- Calculate fingerprint before resolving release data
  const fingerprint = calculateFingerprint(
    workingDir,
    JSON.stringify(packageJson, null, 2),
  );
  packageJson.fingerprint = fingerprint;
  log(`calculated fingerprint: ${fingerprint}`);

  // Resolve version
  const releaseData = await resolveReleaseData(packageJson, DIST_DIR_FULL);
  packageJson.version = releaseData.version;

  // --- Write final dist/package.json
  fs.writeFileSync(
    path.resolve(DIST_DIR_FULL, "package.json"),
    JSON.stringify(packageJson, null, 2),
    "utf8",
  );

  log("updated package.json");
  log("packup done.");

  return releaseData;
}

async function getLatestPublishedVersion(pkgName: string) {
  try {
    return child
      .execSync(`npm view ${pkgName} version`, {
        encoding: "utf8",
        stdio: "pipe",
      })
      .trim();
  } catch {
    return undefined;
  }
}

async function getLatestPublishedFingerprint(pkgName: string) {
  try {
    const result = child
      .execSync(`npm view ${pkgName} fingerprint`, {
        encoding: "utf8",
        stdio: "pipe",
      })
      .trim();
    return result === "undefined" ? undefined : result;
  } catch {
    return undefined;
  }
}

export function apiChangeToRelease(a: ApiChange): semver.ReleaseType {
  if (a === "breaking") return "major";
  if (a === "additive") return "minor";
  return "patch";
}

export type ReleaseData = {
  version: string;
  release: semver.ReleaseType;
  changed: boolean;
  apiChange: ApiChange;
};
export async function resolveReleaseData(
  packageData: any,
  packageDir: string,
): Promise<ReleaseData> {
  const latestVersion = await getLatestPublishedVersion(packageData.name);
  if (!latestVersion) {
    return {
      version: "0.1.0",
      release: "minor",
      apiChange: "additive",
      changed: true,
    };
  }

  // Check if package has changed by comparing fingerprints
  const latestFingerprint = await getLatestPublishedFingerprint(
    packageData.name,
  );
  const currentFingerprint = packageData.fingerprint;

  if (latestFingerprint === currentFingerprint) {
    // Package hasn't changed, return current version with no changes
    return {
      version: latestVersion,
      release: "patch",
      apiChange: "none",
      changed: false,
    };
  }

  // Package has changed, perform API analysis
  const currentModel = loadApiModelFromPackageJson(packageData, packageDir);
  const prevModel = await loadApiModelFromRegistry(
    packageData.name,
    latestVersion,
  );

  const change = diffApiModels(prevModel, currentModel);
  const release = apiChangeToRelease(change);
  return {
    version: semver.inc(latestVersion, release)!,
    release,
    apiChange: change,
    changed: true,
  };
}
