import { Extractor, ExtractorConfig } from "@microsoft/api-extractor";
import type { ApiDeclaredItem, ApiItem } from "@microsoft/api-extractor-model";
import { ApiModel } from "@microsoft/api-extractor-model";
import fs from "fs";
import * as child from "node:child_process";
import path from "path";

export async function extractApi({
  entry,
  out,
  packageJsonFullPath,
  nameSuffix,
}: {
  entry: string;
  out: string;
  packageJsonFullPath: string;
  nameSuffix?: string;
}) {
  const projectFolder = path.dirname(packageJsonFullPath);
  const mainEntryPointFilePath = path.resolve(projectFolder, entry);
  const dtsRollupPath = path.resolve(projectFolder, out);
  const docModelPath = path.resolve(
    projectFolder,
    out.replace(/\.d\.ts$/, ".api.json")
  );
  let tsconfigFilePath = path.resolve(projectFolder, "tsconfig.json");
  if (!fs.existsSync(tsconfigFilePath)) {
    tsconfigFilePath = path.resolve(projectFolder, "tsconfig.json");
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonFullPath, "utf-8"));

  // extract workspace dependencies
  const workspaceDeps = Object.entries({
    ...(packageJson.dependencies as Record<string, string>),
    ...(packageJson.devDependencies as Record<string, string>),
  })
    .filter(([_, version]) => version.startsWith("workspace:"))
    .map(([name]) => name);

  const extractorConfig: ExtractorConfig = ExtractorConfig.prepare({
    packageJsonFullPath,
    configObject: {
      projectFolder,
      mainEntryPointFilePath,
      dtsRollup: {
        enabled: true,
        untrimmedFilePath: dtsRollupPath,
      },
      docModel: {
        enabled: true,
        apiJsonFilePath: docModelPath,
      },
      tsdocMetadata: {
        enabled: false,
      },
      apiReport: {
        enabled: false,
      },
      compiler: {
        tsconfigFilePath,
      },
      bundledPackages: [...workspaceDeps],
    },
    configObjectFullPath: "",
  });
  const extractorResult = Extractor.invoke(extractorConfig, {
    localBuild: true,
    showVerboseMessages: true,
  });

  if (extractorResult.succeeded) {
    if (nameSuffix) {
      applyNameSuffixToApiModel(docModelPath, nameSuffix);
    }

    return { dtsRollupPath, docModelPath };
  } else {
    throw new Error(
      `API extraction failed with ${extractorResult.errorCount} errors and ${extractorResult.warningCount} warnings.`
    );
  }
}

function applyNameSuffixToApiModel(docModelPath: string, nameSuffix: string) {
  const data = JSON.parse(fs.readFileSync(docModelPath, "utf-8"));
  data.name += nameSuffix;
  fs.writeFileSync(docModelPath, JSON.stringify(data, null, 2));

  console.log(`Applied name suffix "${nameSuffix}" to API model.`);
}

export type ApiChange = "none" | "additive" | "breaking";

export function diffApiModels(prev: ApiModel, next: ApiModel): ApiChange {
  const changes = compareApiItems(prev, next);
  if (changes.breaking.length > 0) return "breaking";
  if (changes.added.length > 0) return "additive";
  return "none";
}

function compareApiItems(prev: ApiItem, curr: ApiItem) {
  const added: string[] = [];
  const breaking: string[] = [];

  const prevMap = new Map(prev.members.map((m) => [m.displayName, m]));
  const currMap = new Map(curr.members.map((m) => [m.displayName, m]));

  // --- Detect removed / changed ---
  for (const [name, oldItem] of prevMap) {
    const newItem = currMap.get(name);
    if (!newItem) {
      breaking.push(`removed: ${name}`);
      continue;
    }

    // Kind changed
    if (oldItem.kind !== newItem.kind) {
      breaking.push(`kind changed: ${name}`);
      continue;
    }

    // Compare signatures if both are declared items
    const oldDecl = oldItem as ApiDeclaredItem;
    const newDecl = newItem as ApiDeclaredItem;
    if ((oldDecl as any).excerptTokens && (newDecl as any).excerptTokens) {
      const oldSig = oldDecl.excerptTokens.map((t) => t.text).join("");
      const newSig = newDecl.excerptTokens.map((t) => t.text).join("");
      if (oldSig !== newSig) {
        breaking.push(`signature changed: ${name}`);
      }
    }

    // Recurse into nested containers (classes, interfaces, namespaces, etc.)
    if (oldItem.members.length > 0 || newItem.members.length > 0) {
      const nested = compareApiItems(oldItem, newItem);
      added.push(...nested.added);
      breaking.push(...nested.breaking);
    }
  }

  // --- Detect added items ---
  for (const [name, newItem] of currMap) {
    if (!prevMap.has(name)) {
      added.push(`added: ${name}`);
    }
  }

  return { added, breaking };
}

/**
 * Creates a deterministic, hierarchical text signature of a full ApiModel.
 * Returns a stable multiline string that can be hashed or diffed.
 */
export function compileApiModelSignature(model: ApiModel): string {
  const parts: string[] = [];
  for (const pkg of model.packages) {
    parts.push(walk(pkg, 0));
  }
  return parts.join("\n");
}

/**
 * Recursively serializes an ApiItem subtree with stable ordering and indentation.
 */
function walk(item: ApiItem, depth: number): string {
  const indent = "  ".repeat(depth);
  let result = `${indent}${item.kind}: ${item.displayName}`;

  // Add signature if declared
  if (isDeclared(item)) {
    const sig = item.excerptTokens
      .map((t) => t.text)
      .join("")
      .trim();
    if (sig) result += `\n${indent}  sig: ${sig}`;
  }

  // Add release tag if relevant
  const tag = (item as any).releaseTag;
  if (tag && tag !== "None") {
    result += `\n${indent}  tag: ${tag}`;
  }

  // Recurse into children
  if (item.members?.length) {
    const sorted = [...item.members].sort((a, b) =>
      a.displayName.localeCompare(b.displayName)
    );
    for (const child of sorted) {
      result += `\n${walk(child, depth + 1)}`;
    }
  }

  return result;
}

/**
 * Type guard for ApiDeclaredItem.
 */
function isDeclared(item: ApiItem): item is ApiDeclaredItem {
  return (item as ApiDeclaredItem).excerptTokens !== undefined;
}

export function loadApiModelFromPackageJson(
  packageJson: any,
  packageDir: string
): ApiModel {
  const types = new Set<string>();

  if (typeof packageJson?.types === "string") types.add(packageJson.types);
  if (packageJson?.exports) {
    const stack = [packageJson.exports];
    while (stack.length) {
      const node = stack.pop();
      if (!node) continue;
      if (typeof node === "object") {
        if (typeof node.types === "string") types.add(node.types);
        for (const k of Object.keys(node))
          if (k !== "types") stack.push(node[k]);
      }
    }
  }

  const docModelPaths = [...types]
    .map((p) => p.replace(/\.d\.(?:ts|mts|cts)$/i, ".api.json"))
    .filter((p, _, a) => p && a.indexOf(p) === _)
    .map((rel) => path.resolve(packageDir, rel))
    .filter((abs) => fs.existsSync(abs))
    .sort((a, b) => a.localeCompare(b));

  const model = new ApiModel();
  for (const abs of docModelPaths) model.loadPackage(abs);

  return model;
}

function osTmp() {
  return process.env.TMPDIR || process.env.TEMP || process.env.TMP || "/tmp";
}

export async function loadApiModelFromPackageDir(
  dir: string
): Promise<ApiModel> {
  let packageData = {};
  const pjPath = path.join(dir, "package.json");
  if (fs.existsSync(pjPath)) {
    packageData = JSON.parse(fs.readFileSync(pjPath, "utf8"));
  }
  return loadApiModelFromPackageJson(packageData, path.dirname(pjPath));
}
export async function loadApiModelFromRegistry(
  name: string,
  version: string
): Promise<ApiModel> {
  const tmpDir = path.join(osTmp(), `npm-${name}-${version}-${Date.now()}`);
  fs.mkdirSync(tmpDir, { recursive: true });

  const packName = child
    .execSync(`npm pack ${name}@${version}`, { cwd: tmpDir })
    .toString()
    .trim();
  const tarPath = path.join(tmpDir, packName);
  child.execSync(`tar -xzf ${tarPath}`, { cwd: tmpDir });
  return loadApiModelFromPackageDir(path.resolve(tmpDir, "package"));
}
