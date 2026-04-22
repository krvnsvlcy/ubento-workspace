#!/usr/bin/env -S npx tsx
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, posix, relative, resolve, sep } from "node:path";
import ts from "typescript";
import { replaceRanges, TextRangeEdit } from "./utils";

// ---------- helpers ----------
const toPosix = (p: string) => p.split(sep).join(posix.sep);
const addDotSlash = (p: string) => (p.startsWith(".") ? p : `./${p}`);
const changeExt = (file: string, nextExt: ".js" | ".d.ts" | ".mjs" | ".cjs") =>
  file.replace(/\.(cts|mts|ts|tsx|jsx|js|mjs|cjs|d\.ts)$/i, nextExt);

// Compute the emitted file path in outDir that corresponds to a given *source* file path.
function mapSrcToOut(
  srcAbs: string,
  opts: ts.CompilerOptions,
  projectDir: string = ".",
) {
  const outDir = resolve(opts.outDir || projectDir);
  const rootDir = resolve(opts.rootDir || projectDir);

  const relFromRoot = relative(rootDir, srcAbs);
  return join(outDir, relFromRoot);
}

type Rewriter = (emittedFile: string, code: string) => Promise<string>;

function getModuleSpecifiers(
  code: string,
): Array<{ text: string; pos: number; length: number }> {
  const specifiers: Array<{ text: string; pos: number; length: number }> = [];

  // Regex to match import/export statements with module specifiers
  // Matches: import ... from "module" | import("module") | export ... from "module"
  const patterns = [
    // Static imports: import ... from "module"
    /(?:import\s+(?:[^"'`]+\s+from\s+)?|export\s+(?:[^"'`]+\s+from\s+)?)(["'`])([^"'`]+)\1/g,
    // Dynamic imports: import("module")
    /import\s*\(\s*(["'`])([^"'`]+)\1\s*\)/g,
    // Re-exports: export ... from "module"
    /export\s+[^"'`]*from\s+(["'`])([^"'`]+)\1/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(code)) !== null) {
      const fullMatch = match[0];
      const quote = match[1];
      const specifier = match[2];

      // Find the position of the quoted specifier within the full match
      const quoteIndex = fullMatch.lastIndexOf(quote + specifier + quote);
      const specifierStart = match.index + quoteIndex;

      specifiers.push({
        text: quote + specifier + quote,
        pos: specifierStart,
        length: specifier.length + 2, // +2 for quotes
      });
    }
  }

  // Sort by position to ensure consistent ordering
  return specifiers.sort((a, b) => a.pos - b.pos);
}

function rewriteSpecifier({
  sourcePath,
  specifier,
  options,
}: {
  sourcePath: string;
  specifier: string;
  options: ts.CompilerOptions;
}): string {
  // Skip relative imports and absolute paths
  if (
    specifier.startsWith(".") ||
    specifier.startsWith("/") ||
    specifier.includes("://")
  ) {
    return specifier;
  }

  // Skip built-in Node.js modules
  if (specifier.startsWith("node:") || isBuiltinModule(specifier)) {
    return specifier;
  }

  // Handle path mapping from tsconfig paths
  if (options.paths && options.baseUrl) {
    const baseUrl = resolve(options.baseUrl);
    const sourceDir = dirname(sourcePath);

    for (const [pattern, mappings] of Object.entries(options.paths)) {
      if (matchesPattern(specifier, pattern)) {
        for (const mapping of mappings) {
          // Replace * in pattern with the matched part
          const replacement = pattern.includes("*")
            ? mapping.replace(
                "*",
                specifier.replace(pattern.replace("*", ""), ""),
              )
            : mapping;

          // Resolve the mapped path relative to baseUrl
          const resolvedLogicalPath = resolve(baseUrl, replacement);

          // Convert to relative path from output directory
          const emittedSourcePath = mapSrcToOut(resolvedLogicalPath, options);

          // Convert to relative path from source file
          let relativePath = toPosix(relative(sourceDir, emittedSourcePath));

          // Ensure relative path starts with ./ or ../
          relativePath = addDotSlash(relativePath);

          // Change extension to .js for output
          relativePath = changeExt(relativePath, ".js");
          return relativePath;
        }
      }
    }
  }

  // If no path mapping found, return original specifier
  return specifier;
}

// Helper function to check if specifier matches a path pattern
function matchesPattern(specifier: string, pattern: string): boolean {
  if (pattern === specifier) return true;
  if (!pattern.includes("*")) return false;

  const prefix = pattern.substring(0, pattern.indexOf("*"));
  const suffix = pattern.substring(pattern.indexOf("*") + 1);

  return specifier.startsWith(prefix) && specifier.endsWith(suffix);
}

// Helper function to check if a module is a built-in Node.js module
function isBuiltinModule(specifier: string): boolean {
  const builtins = [
    "assert",
    "buffer",
    "child_process",
    "cluster",
    "crypto",
    "dgram",
    "dns",
    "domain",
    "events",
    "fs",
    "http",
    "https",
    "net",
    "os",
    "path",
    "punycode",
    "querystring",
    "readline",
    "repl",
    "stream",
    "string_decoder",
    "timers",
    "tls",
    "tty",
    "url",
    "util",
    "v8",
    "vm",
    "zlib",
    "process",
    "console",
    "module",
    "inspector",
  ];
  return builtins.includes(specifier);
}

// Build a robust alias rewriter using tsconfig-paths
async function buildRewriter(options: ts.CompilerOptions): Promise<Rewriter> {
  return async (sourcePath: string, code: string) => {
    const changes: [string, string][] = [];
    const moduleSpecRanges = getModuleSpecifiers(code);
    const edits: TextRangeEdit[] = moduleSpecRanges.map((range) => {
      const quote = range.text[0];
      const specifier = range.text.slice(1, -1); // Remove quotes
      const resolvedSpecifier = rewriteSpecifier({
        sourcePath,
        specifier,
        options: options,
      });
      if (specifier !== resolvedSpecifier) {
        changes.push([specifier, resolvedSpecifier]);
      }
      return {
        start: range.pos,
        length: range.length,
        replacement: `${quote}${resolvedSpecifier}${quote}`,
      };
    });
    const output = replaceRanges(code, edits);

    if (changes.length > 0) {
      console.log(
        `Rewrote imports in ${relative(process.cwd(), sourcePath)}:\n` +
          changes
            .map(([orig, replaced]) => `  "${orig}"  -->  "${replaced}"`)
            .join("\n"),
      );
    } else {
      console.log(
        `No import rewrites needed in ${relative(process.cwd(), sourcePath)}`,
      );
    }

    return output;
  };
}

// Pretty diagnostic printing
const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: (f) => f,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
};
const print = {
  info: (msg: string) => console.log(`\x1b[36m[TS]\x1b[0m ${msg}`),
  err: (d: ts.Diagnostic) => console.error(ts.formatDiagnostic(d, formatHost)),
  all: (d: ts.Diagnostic) => console.log(ts.formatDiagnostic(d, formatHost)),
};

// ---------- main ----------
async function watchProject(tsconfigPath = "tsconfig.build.json") {
  const config = ts.getParsedCommandLineOfConfigFile(
    tsconfigPath,
    {},
    {
      ...ts.sys,
      onUnRecoverableConfigFileDiagnostic: (d) =>
        console.error(ts.flattenDiagnosticMessageText(d.messageText, "\n")),
    },
  );
  if (!config) process.exit(1);

  const rewrite = await buildRewriter({
    ...config.options,
    baseUrl: config.options.baseUrl || dirname(tsconfigPath),
  });

  // Create a custom system with intercepted writeFile
  const customSys: ts.System = {
    ...ts.sys,
    writeFile: async (
      fileName: string,
      text: string,
      writeByteOrderMark?: boolean,
    ) => {
      try {
        const fixed = await rewrite(resolve(fileName), text);
        mkdirSync(dirname(fileName), { recursive: true });
        writeFileSync(fileName, fixed, {
          encoding: writeByteOrderMark ? "utf8" : "utf8",
        });
      } catch (e: any) {
        throw new Error(String(e?.message ?? e));
      }
    },
  };

  const host = ts.createWatchCompilerHost(
    tsconfigPath,
    {},
    customSys,
    ts.createEmitAndSemanticDiagnosticsBuilderProgram,
    (d) => print.err(d),
    (d) => print.all(d),
  );

  // Optional: friendlier status messages
  const origCreateProgram = host.createProgram;
  host.createProgram = (rootNames, options, host_, oldProgram) => {
    print.info("Compiling…");
    return origCreateProgram(rootNames, options, host_, oldProgram);
  };

  const origAfterProgramCreate = host.afterProgramCreate;
  host.afterProgramCreate = (builder) => {
    origAfterProgramCreate?.(builder);
    print.info("Watching for changes…");
  };

  ts.createWatchProgram(host);
}

// Export for CLI usage
export async function watch(tsconfigPath?: string) {
  try {
    await watchProject(tsconfigPath);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
