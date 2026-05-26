import crypto from "crypto";
import { transpileTsx } from "./transpiler";

export type ModuleArtifact = {
  files: Record<string, string>; // filename -> hash (Goes to MongoDB)
  contents: Record<string, string>; // hash -> content (Goes to S3/R2)
};

function sha256(content: string) {
  const shasum = crypto.createHash("sha256").update(content).digest("hex");
  return `sha256:${shasum}`;
}

// Removed `async` since this is purely synchronous memory mapping
function buildArtifact(files: Record<string, string>) {
  const artifact: Omit<ModuleArtifact, "parsedDocs"> = {
    files: {},
    contents: {},
  };

  for (const [filepath, content] of Object.entries(files)) {
    const hash = sha256(content);
    artifact.files[filepath] = hash;
    artifact.contents[hash] = content;
  }

  return artifact;
}

async function buildComponentModule({
  source,
}: {
  source: string;
}): Promise<ModuleArtifact> {
  const { js, map, dts } = await transpileTsx(source);

  const artifact = buildArtifact({
    "index.tsx": source,
    "index.js": js,
    "index.js.map": map,
    "index.d.ts": dts!,
  });

  return {
    ...artifact,
  };
}

async function buildServiceModule({
  source,
}: {
  source: string;
}): Promise<ModuleArtifact> {
  const { js, map, dts } = await transpileTsx(source);
  const artifact = buildArtifact({
    "index.ts": source,
    "index.js": js,
    "index.js.map": map,
    "index.d.ts": dts!,
  });

  return artifact;
}

export function buildModule({
  source,
  type,
}: {
  source: string;
  type: string;
}): Promise<ModuleArtifact> {
  if (type === "component") {
    return buildComponentModule({ source });
  }
  if (type === "board") {
    return buildComponentModule({ source });
  }
  if (type === "service") {
    return buildServiceModule({ source });
  }
  throw new Error(`Unknown module type: ${type}`);
}
