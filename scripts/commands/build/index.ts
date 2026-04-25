#!/usr/bin/env -S npx tsx

import { replaceTscAliasPaths } from "tsc-alias";
import ts from "typescript";

async function runTSC(configPath: string) {
  const { error, config } = ts.readConfigFile(configPath, ts.sys.readFile);
  if (error) {
    throw new Error(ts.flattenDiagnosticMessageText(error.messageText, "\n"));
  }

  const parsed = ts.parseJsonConfigFileContent(config, ts.sys, process.cwd());

  const program = ts.createProgram({
    rootNames: parsed.fileNames,
    options: parsed.options,
  });

  const emitResult = program.emit();
  const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  if (allDiagnostics.length > 0) {
    allDiagnostics.forEach((diagnostic) => {
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n",
      );
      if (diagnostic.file) {
        const { line, character } =
          diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
        const fileName = diagnostic.file.fileName;
        console.error(`${fileName} (${line + 1},${character + 1}): ${message}`);
      } else {
        console.error(message);
      }
    });
    throw new Error("TypeScript compilation failed.");
  }
}

async function runTscAlias(configPath: string) {
  await replaceTscAliasPaths({
    configFile: configPath,
    verbose: true,
    // Add any extra options here, e.g.
    // resolveFullPaths: true,
    // resolveFullExtension: '.js'
  });
}

export async function build() {
  const configPath = "tsconfig.json";
  try {
    try {
      await runTSC(configPath);
      await runTscAlias(configPath);
    } catch (err) {
      await runTscAlias(configPath);
      throw err;
    }
    console.log("Build succeeded!");
  } catch (err) {
    console.error("Build failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}
