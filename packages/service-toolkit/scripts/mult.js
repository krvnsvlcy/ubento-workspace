#!/usr/bin/env node
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

/* ------------------ Args & Config ------------------ */
const DEFAULT_CONFIG = "directories.json";
const args = process.argv.slice(2);

function takeOpt(names) {
  const idx = args.findIndex((a) => names.includes(a));
  return idx >= 0 ? { idx, val: args[idx + 1] } : null;
}

const cfgPathArg = takeOpt(["--config", "-c"]);
const filterArg = takeOpt(["--filter", "-f"]);
const configPath = cfgPathArg ? cfgPathArg.val : DEFAULT_CONFIG;
const initialFilter = filterArg?.val ?? null;

/* ------------------ Config Loading ------------------ */
function loadConfig(p) {
  const abs = path.resolve(process.cwd(), p);
  if (!fs.existsSync(abs)) {
    console.error(`Config not found: ${abs}`);
    process.exit(1);
  }
  try {
    const json = JSON.parse(fs.readFileSync(abs, "utf8"));
    let dirs = json.dirs ?? json.directories ?? json.paths;
    if (!Array.isArray(dirs) || dirs.length === 0)
      throw new Error("No 'dirs' array.");
    dirs = dirs.map((d) => {
      if (typeof d === "string")
        return { dir: d, name: path.basename(path.resolve(d)) };
      const name = d.name || path.basename(path.resolve(d.dir));
      return { dir: d.dir, name };
    });
    return dirs;
  } catch (e) {
    console.error(`Failed to parse ${p}:`, e.message);
    process.exit(1);
  }
}

/* ------------------ Filtering ------------------ */
function parsePattern(pat) {
  if (!pat) return null;
  // If /.../flags form, parse as regex literal
  if (pat.startsWith("/") && pat.lastIndexOf("/") > 0) {
    const last = pat.lastIndexOf("/");
    const body = pat.slice(1, last);
    const flags = pat.slice(last + 1);
    try {
      return new RegExp(body, flags);
    } catch {
      // fall through to substring if regex fails
    }
  }
  // Fallback: case-insensitive substring matcher
  const needle = pat.toLowerCase();
  return {
    test: (s) => s.toLowerCase().includes(needle),
  };
}

function applyFilter(dirs, patternStr) {
  if (!patternStr) return { filtered: dirs, active: null };
  const matcher = parsePattern(patternStr);
  const filtered = dirs.filter(
    (d) => matcher.test(d.name) || matcher.test(path.resolve(d.dir))
  );
  return { filtered, active: patternStr };
}

/* ------------------ Colored Prefix Pipes ------------------ */
function prefixPipe(stream, prefix, color) {
  let buf = "";
  const cStart = color ?? "";
  const cReset = color ? "\x1b[0m" : "";
  stream.on("data", (chunk) => {
    buf += chunk.toString();
    let idx;
    while ((idx = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, idx);
      buf = buf.slice(idx + 1);
      if (line.length) console.log(`${cStart}[${prefix}]${cReset} ${line}`);
      else console.log(`${cStart}[${prefix}]${cReset}`);
    }
  });
  stream.on("end", () => {
    if (buf.length) console.log(`${cStart}[${prefix}]${cReset} ${buf}`);
  });
}

function colorFor(i) {
  const colors = [
    "\x1b[36m", // cyan
    "\x1b[33m", // yellow
    "\x1b[35m", // magenta
    "\x1b[32m", // green
    "\x1b[34m", // blue
    "\x1b[31m", // red
  ];
  return colors[i % colors.length];
}

/* ------------------ Runner + Stats ------------------ */
async function runCmdSequential(dirs, cmd, env = process.env) {
  console.log(`\nRunning: "${cmd}"\n`);

  const results = [];
  const t0 = Date.now();

  for (let i = 0; i < dirs.length; i++) {
    const { dir, name } = dirs[i];
    const abs = path.resolve(dir);
    const color = colorFor(i);
    console.log(`${color}[${name}] \x1b[0m→ cwd: ${abs}`);

    const startedAt = Date.now();

    await new Promise((resolve) => {
      const child = spawn(cmd, {
        cwd: abs,
        shell: true, // let user type normal shell commands
        env,
        stdio: ["ignore", "pipe", "pipe"],
      });
      prefixPipe(child.stdout, name, color);
      prefixPipe(child.stderr, name, color);
      child.on("close", (code, signal) => {
        const endedAt = Date.now();
        const durationMs = endedAt - startedAt;
        const status =
          code === 0
            ? "ok"
            : code != null
            ? `exit ${code}`
            : `signal ${signal}`;
        console.log(`${color}[${name}] \x1b[0m— done (${status})\n`);
        results.push({
          name,
          path: abs,
          code,
          signal,
          status,
          durationMs,
        });
        resolve();
      });
    });
  }

  const t1 = Date.now();
  printStats(results, t1 - t0);
  return results;
}

function printStats(results, elapsedMs) {
  const ok = results.filter((r) => r.code === 0).length;
  const failed = results.filter((r) => r.code !== 0).length;

  // Per-dir table
  const table = results.map((r) => ({
    "name": r.name,
    "status": r.status,
    "exitCode": r.code ?? "",
    "signal": r.signal ?? "",
    "duration(ms)": r.durationMs,
  }));

  // Console table (guards for environments without console.table)
  if (typeof console.table === "function") {
    console.table(table);
  } else {
    for (const row of table) {
      console.log(
        `${row.name.padEnd(20)} | ${String(row.status).padEnd(10)} | ${String(
          row.exitCode
        ).padEnd(7)} | ${String(row.signal).padEnd(6)} | ${row["duration(ms)"]}`
      );
    }
  }

  // Slowest 3
  const slowest = [...results]
    .sort((a, b) => b.durationMs - a.durationMs)
    .slice(0, 3);

  console.log(
    [
      "",
      "──────── Run Stats ────────",
      `Selected: ${results.length}`,
      `OK: ${ok}  Failed: ${failed}`,
      `Elapsed: ${elapsedMs} ms`,
      slowest.length
        ? `Slowest: ${slowest
            .map((s) => `${s.name} (${s.durationMs} ms)`)
            .join(", ")}`
        : "Slowest: n/a",
      "───────────────────────────",
      "",
    ].join("\n")
  );
}

/* ------------------ REPL ------------------ */
function startRepl(allDirs, { initialFilter }) {
  let activeFilter = initialFilter ?? null;

  function currentDirs() {
    const { filtered } = applyFilter(allDirs, activeFilter);
    return filtered;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    historySize: 1000,
    prompt: "cmd> ",
  });

  let last = "";

  const help = `
Multi-run REPL
Type a command to run it in each (filtered) directory sequentially.
Commands:
  :q                 Quit
  :r                 Rerun last command
  :ls                List selected dirs
  :filter <pattern>  Set filter (substring or /regex/flags). Example: :filter api  |  :filter '/^svc-/i'
  :filter            Clear filter
`;

  console.log(help.trim() + "\n");
  rl.setPrompt(buildPrompt());
  rl.prompt();

  function buildPrompt() {
    const n = currentDirs().length;
    const flabel = activeFilter ? ` filter="${activeFilter}"` : "";
    return `cmd{${n}${flabel}}> `;
  }

  rl.on("line", async (line) => {
    const input = line.trim();
    if (!input) return rl.prompt();

    if (input === ":q" || input === ":quit" || input === ":exit") {
      rl.close();
      return;
    }

    if (input === ":ls") {
      const dirs = currentDirs();
      if (activeFilter) console.log(`Active filter: ${activeFilter}`);
      dirs.forEach((d, i) =>
        console.log(`${i + 1}. ${d.name}\t${path.resolve(d.dir)}`)
      );
      rl.setPrompt(buildPrompt());
      rl.prompt();
      return;
    }

    if (input === ":r") {
      if (!last) {
        console.log("No last command.");
        rl.prompt();
        return;
      }
      await runCmdSequential(currentDirs(), last);
      rl.setPrompt(buildPrompt());
      rl.prompt();
      return;
    }

    if (input.startsWith(":filter")) {
      const rest = input.slice(":filter".length).trim();
      if (!rest) {
        activeFilter = null;
        console.log("Filter cleared.");
      } else {
        activeFilter = rest;
        const { filtered } = applyFilter(allDirs, activeFilter);
        console.log(
          `Filter set. Selected ${filtered.length} of ${allDirs.length}.`
        );
      }
      rl.setPrompt(buildPrompt());
      rl.prompt();
      return;
    }

    // Normal command
    last = input;
    const dirs = currentDirs();
    if (dirs.length === 0) {
      console.log("No directories match the current filter.");
      rl.prompt();
      return;
    }
    await runCmdSequential(dirs, input);
    rl.setPrompt(buildPrompt());
    rl.prompt();
  });

  rl.on("SIGINT", () => {
    console.log("\n(^C) Use :q to quit.");
    rl.prompt();
  });

  rl.on("close", () => {
    console.log("Bye!");
    process.exit(0);
  });
}

/* ------------------ Boot ------------------ */
const allDirs = loadConfig(configPath);
startRepl(allDirs, { initialFilter });
