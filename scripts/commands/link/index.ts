/**
 * linker.ts — generic symlink manager for a monorepo
 *
 * Features:
 *  - Commands: link, add, remove, list
 *  - Config file (default: .linker-mappings.json or .linker-mappings.txt)
 *    * JSON: [{ "source": "path", "target": "path" }, ...]
 *    * TXT:  lines of "source|target" (comments and blank lines ignored)
 *  - Flags: --config <file>, --dry-run (for link), --copy-fallback
 *  - Cross-platform:
 *      - On Windows, directory links use type: 'junction'
 *      - Optional copy fallback if symlink fails (e.g., no admin rights)
 */

import * as fs from "fs";
import * as fsp from "fs/promises";
import * as path from "path";
import { spawnSync } from "child_process";

type Mapping = { source: string; target: string };
type ConfigFormat = "json" | "txt";

// --- repo root detection (prefer git) ---
function repoRoot(): string {
  try {
    const r = spawnSync("git", ["rev-parse", "--show-toplevel"], {
      stdio: ["ignore", "pipe", "ignore"],
    });
    if (r.status === 0) {
      return r.stdout.toString("utf8").trim();
    }
  } catch {}
  // fallback: current working directory
  return process.cwd();
}

const ROOT = repoRoot();

// --- config I/O ---
function configFormat(file: string): ConfigFormat {
  return file.endsWith(".json") ? "json" : "txt";
}

async function loadMappings(file: string): Promise<Mapping[]> {
  if (!fs.existsSync(file)) return [];
  const fmt = configFormat(file);
  const raw = await fsp.readFile(file, "utf8");
  if (fmt === "json") {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr))
      throw new Error("JSON config must be an array of {source,target}");
    return arr.map((x) => ({
      source: String(x.source),
      target: String(x.target),
    }));
  } else {
    return raw
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"))
      .map((l) => {
        const [source, target] = l.split("|");
        if (!source || !target)
          throw new Error(`Invalid line in ${file}: ${l}`);
        return { source: source.trim(), target: target.trim() };
      });
  }
}

async function saveMappings(file: string, items: Mapping[]): Promise<void> {
  const fmt = configFormat(file);
  await fsp.mkdir(path.dirname(file), { recursive: true });
  if (fmt === "json") {
    await fsp.writeFile(file, JSON.stringify(items, null, 2) + "\n", "utf8");
  } else {
    const lines = items.map((m) => `${m.source}|${m.target}`).join("\n") + "\n";
    await fsp.writeFile(file, lines, "utf8");
  }
}

// --- helpers ---
function abspath(p: string): string {
  if (path.isAbsolute(p)) return path.normalize(p);
  return path.join(ROOT, p);
}

async function pathExists(p: string): Promise<boolean> {
  try {
    await fsp.lstat(p);
    return true;
  } catch {
    return false;
  }
}

async function removeIfExists(p: string, dryRun: boolean) {
  if (!(await pathExists(p))) return;
  if (dryRun) {
    console.log(`[dry-run] rm -rf ${p}`);
    return;
  }
  await fsp.rm(p, { recursive: true, force: true });
}

async function ensureParent(p: string, dryRun: boolean) {
  const dir = path.dirname(p);
  if (dryRun) {
    console.log(`[dry-run] mkdir -p ${dir}`);
    return;
  }
  await fsp.mkdir(dir, { recursive: true });
}

async function copyRecursive(src: string, dst: string) {
  const stat = await fsp.lstat(src);
  if (stat.isDirectory()) {
    await fsp.mkdir(dst, { recursive: true });
    const entries = await fsp.readdir(src);
    for (const name of entries) {
      await copyRecursive(path.join(src, name), path.join(dst, name));
    }
  } else if (stat.isSymbolicLink()) {
    const link = await fsp.readlink(src);
    await fsp.symlink(
      link,
      dst,
      process.platform === "win32" ? "junction" : "file"
    );
  } else {
    await fsp.copyFile(src, dst);
  }
}

async function createSymlink(
  src: string,
  dst: string,
  dryRun: boolean,
  copyFallback: boolean
) {
  const isDir = (await fsp.lstat(src)).isDirectory();
  const type: fs.symlink.Type =
    process.platform === "win32" ? (isDir ? "junction" : "file") : "file";
  if (dryRun) {
    console.log(`[dry-run] ln -s (${type}) ${src} -> ${dst}`);
    return;
  }
  try {
    await fsp.symlink(src, dst, type);
  } catch (err: any) {
    if (copyFallback) {
      console.warn(
        `Symlink failed (${
          err?.code || err
        }). Falling back to copy: ${src} -> ${dst}`
      );
      await copyRecursive(src, dst);
    } else {
      throw err;
    }
  }
}

function relative(p: string) {
  return path.relative(ROOT, p) || ".";
}

function getConfigPath(configFile?: string): string {
  if (configFile) return configFile;

  const jsonConfig = path.join(ROOT, ".links.json");
  const txtConfig = path.join(ROOT, ".links.txt");

  return fs.existsSync(jsonConfig) ? jsonConfig : txtConfig;
}

// --- exported functions ---
export async function linkerList(options: { config?: string } = {}) {
  const configPath = getConfigPath(options.config);
  const mappings = await loadMappings(configPath);
  if (mappings.length === 0) {
    console.log(`No mappings in ${relative(configPath)} (repo root: ${ROOT})`);
    return;
  }
  console.log(`Repo root: ${ROOT}`);
  console.log(`Mappings (${relative(configPath)}):`);
  for (const m of mappings) {
    console.log(`  ${m.source}  ->  ${m.target}`);
  }
}

export async function linkerAdd(
  source: string,
  target: string,
  options: { config?: string } = {}
) {
  const configPath = getConfigPath(options.config);
  const mappings = await loadMappings(configPath);
  const exists = mappings.find(
    (m) => m.source === source && m.target === target
  );
  if (exists) {
    console.log(`Mapping already exists: ${source}|${target}`);
    return;
  }
  mappings.push({ source, target });
  await saveMappings(configPath, mappings);
  console.log(`Added: ${source}|${target}  →  ${relative(configPath)}`);
}

export async function linkerRemove(
  key: string,
  options: { config?: string } = {}
) {
  const configPath = getConfigPath(options.config);
  const mappings = await loadMappings(configPath);
  const filtered = mappings.filter((m) => {
    if (key.includes("|")) return `${m.source}|${m.target}` !== key;
    return m.source !== key && m.target !== key;
  });
  const removed = mappings.length - filtered.length;
  await saveMappings(configPath, filtered);
  console.log(`Removed ${removed} mapping(s) matching: ${key}`);
}

export async function linkerLink(
  options: {
    config?: string;
    dryRun?: boolean;
    copyFallback?: boolean;
  } = {}
) {
  const configPath = getConfigPath(options.config);
  const mappings = await loadMappings(configPath);
  if (mappings.length === 0) {
    console.log("No mappings to link.");
    return;
  }
  console.log(`Repo root: ${ROOT}`);
  if (options.dryRun) console.log("(dry-run mode; no changes will be made)");
  if (options.copyFallback)
    console.log("(copy-fallback enabled; will copy if symlink fails)");

  for (const m of mappings) {
    const src = abspath(m.source);
    const dst = abspath(m.target);

    if (!fs.existsSync(src)) {
      console.error(`Source not found, skipping: ${src}`);
      continue;
    }

    console.log(`\n→ Linking`);
    console.log(`   SRC: ${src}`);
    console.log(`   DST: ${dst}`);

    await ensureParent(dst, options.dryRun || false);
    await removeIfExists(dst, options.dryRun || false);
    await createSymlink(
      src,
      dst,
      options.dryRun || false,
      options.copyFallback || false
    );

    if (!options.dryRun) {
      const ok = await pathExists(dst);
      if (ok) console.log(`   ✔ Ready`);
      else {
        console.error(`   ✖ Failed to create at ${dst}`);
        process.exit(1);
      }
    } else {
      console.log(`   (would create link)`);
    }
  }
  console.log("\nAll done.");
}
