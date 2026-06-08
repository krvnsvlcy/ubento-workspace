import ts from "typescript";

async function runCheck(configPath: string) {
  const { error, config } = ts.readConfigFile(configPath, ts.sys.readFile);
  if (error) {
    throw new Error(ts.flattenDiagnosticMessageText(error.messageText, "\n"));
  }

  const parsed = ts.parseJsonConfigFileContent(config, ts.sys, process.cwd());

  const program = ts.createProgram({
    rootNames: parsed.fileNames,
    options: {
      ...parsed.options,
      noEmit: true,
    },
  });

  const allDiagnostics = ts.getPreEmitDiagnostics(program);

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
    throw new Error("TypeScript type checking failed.");
  }
}

export async function check() {
  const configPath = "tsconfig.json";
  try {
    await runCheck(configPath);
    console.log("TypeScript check passed!");
  } catch (err) {
    console.error("TypeScript check failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}
