/**
 * Recursive publisher for a pnpm monorepo using packup for version management.
 *
 * For a target package:
 * 1) DFS into internal runtime deps.
 * 2) For each package, run packup which handles API comparison and version calculation.
 * 3) If packup detects changes → publish with the calculated version.
 * 4) Bubble back up in topological order.
 */

import fg from "fast-glob";
import * as child from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { packup, type ReleaseData } from "../packup/index.js";
const DIST_DIR = "dist";

interface PublishOptions {
  target?: string;
  registry?: string;
  dryRun?: boolean;
  useChangesets?: boolean;
}

export async function publish(options: PublishOptions) {
  console.log(`🚀 Starting publish process...`);
  console.log(`📋 Options:`, {
    target: options.target || "(auto-detect)",
    dryRun: options.dryRun || false,
    useChangesets: options.useChangesets || false,
    registry: options.registry || "(default)",
  });

  const root = await findWorkspaceRoot();
  console.log(`📁 Workspace root: ${root}`);

  const dryRun = options.dryRun || false;
  const targetPackageName = options.target || (await findCurrentPackageName());
  console.log(`🎯 Target package: ${targetPackageName}`);

  console.log(`🔍 Loading workspace packages...`);
  const allPkgs = await loadWorkspacePackages(root);
  console.log(`📦 Found ${allPkgs.length} packages in workspace:`);
  allPkgs.forEach((pkg) => {
    console.log(
      `  - ${pkg.name} (${pkg.private ? "private" : "public"}) @ ${pkg.version}`,
    );
  });

  const pkgsByName = new Map(allPkgs.map((p) => [p.name, p]));
  const target = pkgsByName.get(targetPackageName);

  if (!target) {
    throw new Error(
      `Package not found: ${targetPackageName}. Found: ${Array.from(pkgsByName.keys()).join(", ")}`,
    );
  }

  const visiting = new Set<string>();
  const published = new Set<string>();
  const packageChanges = new Map<
    string,
    {
      oldVersion: string;
      newVersion: string;
      apiChangeType: string;
      releaseType: string;
      skipped: boolean;
      reason?: string;
    }
  >();

  console.log(`\n🔄 Starting dependency resolution and publishing...`);
  const publishStartTime = Date.now();
  await ensurePublished(target.name, {
    pkgsByName,
    visiting,
    published,
    packageChanges,
    dryRun,
    root,
  });
  const publishEndTime = Date.now();

  console.log(`\n🎊 Publish process completed!`);
  console.log(`📊 Summary:`);
  console.log(`  - Target package: ${targetPackageName}`);
  console.log(`  - Packages processed: ${packageChanges.size}`);
  console.log(`  - Total time: ${publishEndTime - publishStartTime}ms`);
  console.log(`  - Mode: ${dryRun ? "DRY RUN" : "LIVE"}`);

  // Group packages by status
  const publishedPackages = Array.from(packageChanges.entries()).filter(
    ([_, change]) => !change.skipped,
  );
  const skippedPackages = Array.from(packageChanges.entries()).filter(
    ([_, change]) => change.skipped,
  );

  // Count by change types
  const changeCounts = publishedPackages.reduce(
    (acc, [_, change]) => {
      acc[change.releaseType] = (acc[change.releaseType] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  if (publishedPackages.length > 0) {
    const changeTypeSummary = Object.entries(changeCounts)
      .map(([type, count]) => `${count} ${type}`)
      .join(", ");
    console.log(
      `\n📦 ${dryRun ? "Would publish" : "Published"} packages (${publishedPackages.length}): ${changeTypeSummary}`,
    );
    publishedPackages.forEach(([name, change]) => {
      console.log(
        `  ✅ ${name}: ${change.oldVersion} → ${change.newVersion} (${change.releaseType}, ${change.apiChangeType} api changes)`,
      );
    });
  }

  if (skippedPackages.length > 0) {
    console.log(`\n⏭️  Skipped packages (${skippedPackages.length}):`);
    skippedPackages.forEach(([name, change]) => {
      console.log(`  ⏸️  ${name}: ${change.oldVersion} (${change.reason})`);
    });
  }

  if (packageChanges.size === 0) {
    console.log(`\n📦 No packages were processed.`);
  }

  console.log(`\n✅ All done!`);
}

type Pkg = {
  name: string;
  dir: string;
  private: boolean;
  version: string;
  deps: Record<string, string>;
  peers: Record<string, string>;
  typesEntry?: string;
  entryGlobs: string[];
};

async function findWorkspaceRoot(): Promise<string> {
  let current = process.cwd();
  while (current !== path.dirname(current)) {
    const pj = path.join(current, "package.json");
    if (fs.existsSync(pj)) {
      const json = JSON.parse(fs.readFileSync(pj, "utf8"));
      if (json.workspaces) return current;
    }
    current = path.dirname(current);
  }
  throw new Error("Could not find workspace root");
}

async function findCurrentPackageName(): Promise<string> {
  let current = process.cwd();
  while (current !== path.dirname(current)) {
    const pj = path.join(current, "package.json");
    if (fs.existsSync(pj)) {
      const json = JSON.parse(fs.readFileSync(pj, "utf8"));
      if (json.name && !json.workspaces) return json.name;
    }
    current = path.dirname(current);
  }
  throw new Error("Could not find current package name");
}

async function loadWorkspacePackages(root: string): Promise<Pkg[]> {
  const rootPkgPath = path.join(root, "package.json");
  const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, "utf8"));

  const ws: string[] = Array.isArray(rootPkg.workspaces)
    ? rootPkg.workspaces
    : rootPkg.workspaces?.packages || [];

  // Convert workspace globs -> package.json globs
  const packageJsonGlobs = ws.map((p: string) =>
    p.endsWith("/") ? `${p}package.json` : `${p}/package.json`,
  );

  // Strictly search only those globs, with hard ignores
  const candidates = await fg(packageJsonGlobs, {
    cwd: root,
    absolute: true,
    onlyFiles: true,
    followSymbolicLinks: false,
    dot: false,
    ignore: [
      "**/node_modules/**",
      "**/.pnpm/**",
      "**/.git/**",
      "**/dist/**",
      "**/.turbo/**",
      "**/.next/**",
      "**/.cache/**",
    ],
  });

  const pkgs: Pkg[] = [];
  for (const pj of candidates) {
    const dir = path.dirname(pj);

    // Defensive: skip anything that slipped through ignores
    const segs = dir.split(path.sep);
    if (segs.includes("node_modules") || segs.includes(".pnpm")) continue;

    // Skip the workspace root itself
    if (path.resolve(dir) === path.resolve(root)) continue;

    const data = JSON.parse(fs.readFileSync(pj, "utf8"));
    if (!data?.name) continue;

    pkgs.push({
      name: data.name,
      dir,
      private: !!data.private,
      version: data.version,
      deps: data.dependencies ?? {},
      peers: data.peerDependencies ?? {},
      typesEntry:
        data.types ||
        data.typings ||
        data.exports?.["."]?.types ||
        data.exports?.["."]?.typings,
      entryGlobs: ["src/index.ts", "src/**/*.ts"],
    });
  }

  return pkgs;
}

function isInternal(
  depName: string,
  range: string,
  pkgsByName: Map<string, Pkg>,
) {
  return range.startsWith("workspace:") && pkgsByName.has(depName);
}

async function ensurePublished(
  pkgName: string,
  ctx: {
    pkgsByName: Map<string, Pkg>;
    visiting: Set<string>;
    published: Set<string>;
    packageChanges: Map<
      string,
      {
        oldVersion: string;
        newVersion: string;
        apiChangeType: string;
        releaseType: string;
        skipped: boolean;
        reason?: string;
      }
    >;
    dryRun: boolean;
    root: string;
  },
) {
  const { pkgsByName, visiting, published, packageChanges, dryRun, root } = ctx;
  const pkg = pkgsByName.get(pkgName);
  if (!pkg) throw new Error(`Unknown pkg ${pkgName}`);

  if (published.has(pkgName)) {
    console.log(`✅ ${pkgName}: already published, skipping`);
    return;
  }
  if (visiting.has(pkgName)) throw new Error(`Cycle detected at ${pkgName}`);

  console.log(`🔍 Processing ${pkgName}...`);
  visiting.add(pkgName);

  // Check for internal dependencies
  const internalDeps = Object.entries(pkg.deps)
    .filter(([dep, range]) => isInternal(dep, range, pkgsByName))
    .map(([dep]) => dep);

  if (internalDeps.length > 0) {
    console.log(
      `📋 ${pkgName}: found ${internalDeps.length} internal dependencies: ${internalDeps.join(", ")}`,
    );
    // Recurse internal deps
    for (const [dep, range] of Object.entries(pkg.deps)) {
      if (isInternal(dep, range, pkgsByName)) {
        console.log(`  ↳ Ensuring ${dep} is published first...`);
        await ensurePublished(dep, ctx);
      }
    }
    console.log(`✅ ${pkgName}: all dependencies processed`);
  } else {
    console.log(`📋 ${pkgName}: no internal dependencies found`);
  }

  await maybePublish(pkg, { packageChanges, dryRun, root });
  visiting.delete(pkgName);
  published.add(pkgName);
  console.log(`✅ ${pkgName}: processing complete`);
}

async function maybePublish(
  pkg: Pkg,
  {
    packageChanges,
    dryRun,
    root,
  }: {
    packageChanges: Map<
      string,
      {
        oldVersion: string;
        newVersion: string;
        apiChangeType: string;
        releaseType: string;
        skipped: boolean;
        reason?: string;
      }
    >;
    dryRun: boolean;
    root: string;
  },
) {
  console.log(`\n📦 Evaluating ${pkg.name} for publishing...`);

  if (pkg.private) {
    console.log(`🔒 ${pkg.name} is marked private, skipping publication`);
    packageChanges.set(pkg.name, {
      oldVersion: pkg.version,
      newVersion: pkg.version,
      apiChangeType: "none",
      releaseType: "none",
      skipped: true,
      reason: "private package",
    });
    return;
  }

  console.log(`⚙️  Running packup for ${pkg.name}...`);
  const startTime = Date.now();
  const releaseData = await packup(pkg.dir);
  const packupTime = Date.now() - startTime;
  console.log(`✅ Packup completed for ${pkg.name} in ${packupTime}ms`);

  console.log(`🔍 Release analysis for ${pkg.name}:`, {
    version: releaseData.version,
    changed: releaseData.changed,
    apiChange: releaseData.apiChange,
    release: releaseData.release,
  });

  // Check if there are any changes that require publishing
  if (!releaseData.changed) {
    console.log(`⏭️  ${pkg.name}: no changes detected, skipping publication`);
    packageChanges.set(pkg.name, {
      oldVersion: pkg.version,
      newVersion: releaseData.version,
      apiChangeType: releaseData.apiChange,
      releaseType: releaseData.release,
      skipped: true,
      reason: "no changes detected",
    });
    return;
  }

  // Track the successful change
  packageChanges.set(pkg.name, {
    oldVersion: pkg.version,
    newVersion: releaseData.version,
    apiChangeType: releaseData.apiChange,
    releaseType: releaseData.release,
    skipped: false,
  });

  console.log(
    `🚀 ${pkg.name}: proceeding with publication - ${releaseData.apiChange} API change → ${releaseData.release} (${releaseData.version})`,
  );

  await versionAndPublish({
    pkg,
    releaseData,
    dryRun,
    root,
  });
}

async function versionAndPublish({
  pkg,
  releaseData,
  dryRun,
  root,
}: {
  pkg: Pkg;
  releaseData: ReleaseData;
  dryRun: boolean;
  root: string;
}) {
  console.log(
    `\n🔄 Starting version update and publish process for ${pkg.name}...`,
  );

  const pjPath = path.join(pkg.dir, "package.json");
  console.log(`📝 Reading package.json from: ${pjPath}`);
  const data = JSON.parse(fs.readFileSync(pjPath, "utf8"));

  const oldVersion = data.version;
  console.log(
    `📊 Version update: ${oldVersion} → ${releaseData.version} (${releaseData.release})`,
  );

  // Use the version from releaseData which has already been calculated
  data.version = releaseData.version;

  // Store release data in elll metadata
  data.elll = {
    ...(data.elll ?? {}),
    bumpStrategy: "api-extractor",
    lastRelease: {
      version: releaseData.version,
      change: releaseData.apiChange,
      release: releaseData.release,
      timestamp: new Date().toISOString(),
    },
  };

  if (dryRun) {
    console.log(
      `🧪 [DRY RUN] Would update ${pkg.name} from ${oldVersion} to ${releaseData.version}`,
    );
    console.log(
      `🧪 [DRY RUN] Would publish ${pkg.name}@${releaseData.version}`,
    );
    return;
  }

  console.log(`💾 Writing updated package.json for ${pkg.name}...`);
  fs.writeFileSync(pjPath, JSON.stringify(data, null, 2));

  const distPJ = path.join(pkg.dir, DIST_DIR, "package.json");
  if (fs.existsSync(distPJ)) {
    console.log(`💾 Updating dist package.json for ${pkg.name}...`);
    const distData = JSON.parse(fs.readFileSync(distPJ, "utf8"));
    distData.version = releaseData.version;
    distData.elll = data.elll;
    fs.writeFileSync(distPJ, JSON.stringify(distData, null, 2));
  } else {
    console.log(
      `ℹ️  No dist package.json found for ${pkg.name}, skipping dist update`,
    );
  }

  console.log(`🔄 Updating workspace lockfile...`);
  execLogged(`pnpm -w install --no-frozen-lockfile`, root);

  console.log(`📤 Publishing ${pkg.name}@${releaseData.version} to npm...`);
  execLogged(`pnpm publish --no-git-checks`, path.join(pkg.dir, DIST_DIR));

  console.log(`🎉 Successfully published ${pkg.name}@${releaseData.version}!`);
}

function execLogged(cmd: string, cwd?: string) {
  const workingDir = cwd || process.cwd();
  console.log(`🔧 Executing: ${cmd}`);
  console.log(`📁 Working directory: ${workingDir}`);
  const startTime = Date.now();

  try {
    child.execSync(cmd, { stdio: "inherit", cwd: workingDir });
    const duration = Date.now() - startTime;
    console.log(`✅ Command completed in ${duration}ms`);
  } catch (error) {
    const duration = Date.now() - startTime;
    console.log(`❌ Command failed after ${duration}ms`);
    throw error;
  }
}
