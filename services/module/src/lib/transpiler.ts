import esbuild from "esbuild";

export async function transpileTsx(source: string): Promise<string> {
  const result = await esbuild.transform(source, {
    loader: "tsx",
    format: "esm",
    minify: true,
    target: "esnext",
    jsx: "automatic",
  });

  return result.code;
}
