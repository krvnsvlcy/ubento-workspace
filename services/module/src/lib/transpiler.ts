import esbuild from "esbuild";
import ts from "typescript";

export async function transpileTsx(
  source: string,
  filename: string = "module.tsx",
): Promise<{ js: string; map: string; dts?: string }> {
  const result = await esbuild.transform(source, {
    loader: "tsx",
    format: "esm",
    minify: true,
    target: "esnext",
    jsx: "automatic",
    sourcemap: "external",
    sourcefile: filename,
  });

  let dts: string | undefined;

  try {
    const options: ts.CompilerOptions = {
      declaration: true,
      emitDeclarationOnly: true,
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ESNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      skipLibCheck: true,
    };

    const host = ts.createCompilerHost(options);
    const originalGetSourceFile = host.getSourceFile;
    host.getSourceFile = (
      fileName,
      languageVersion,
      onError,
      shouldCreateNewSourceFile,
    ) => {
      if (fileName === filename) {
        return ts.createSourceFile(fileName, source, languageVersion);
      }
      return originalGetSourceFile(
        fileName,
        languageVersion,
        onError,
        shouldCreateNewSourceFile,
      );
    };

    host.writeFile = (fileName, contents) => {
      if (fileName.endsWith(".d.ts")) {
        dts = contents;
      }
    };

    const program = ts.createProgram([filename], options, host);
    program.emit();
  } catch (err) {
    console.error("Failed to generate type declarations", err);
  }

  return { js: result.code, map: result.map, dts };
}
