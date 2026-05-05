import { Storage } from "@google-cloud/storage";
import mime from "mime-types";
import { env } from "../env.js";
import { ModuleArtifact } from "./builder/builder.js";

const storage = new Storage();
const moduleBucket = storage.bucket(env.GCS_MODULE_BUCKET);

/**
 * Stores a file in the global CAS bucket.
 */
export async function storeInCAS({
  hash,
  content,
  filePath,
  contentType,
}: {
  hash: string;
  content?: string | Buffer;
  filePath?: string;
  contentType: string;
}) {
  // 1. Global CAS Path - uncoupled from moduleId for deduplication
  const path = `cas/${hash}`;
  const file = moduleBucket.file(path);

  // 2. Check if it already exists to save bandwidth and GCS write costs
  const [exists] = await file.exists();
  if (exists) return;

  const metadata = {
    // 3. The CAS Superpower: Cache forever, it is mathematically immutable
    cacheControl: "public, max-age=31536000, immutable",
  };

  if (filePath) {
    await moduleBucket.upload(filePath, {
      destination: path,
      resumable: false,
      contentType,
      metadata,
    });
  } else if (content !== undefined) {
    await file.save(content, {
      contentType,
      resumable: false,
      metadata,
    });
  } else {
    throw new Error(
      "Either content or filePath must be provided to storeInCAS",
    );
  }
}

/**
 * Reads a file from the global CAS bucket.
 */
export async function readFromCAS({ hash }: { hash: string }) {
  const path = `cas/${hash}`;
  const file = moduleBucket.file(path);

  const [content] = await file.download();
  return content.toString();
}

export async function persistModuleArtifact(artifact: ModuleArtifact) {
  // Use a Set to prevent race conditions if multiple files share the exact same hash
  const uploadedHashes = new Set<string>();

  await Promise.all(
    Object.entries(artifact.files).map(async ([filename, hash]) => {
      if (uploadedHashes.has(hash)) return;
      uploadedHashes.add(hash);

      const content = artifact.contents[hash];
      if (content === undefined) {
        throw new Error(`Content not found for hash: ${hash}`);
      }

      const contentType = mime.lookup(filename) || "application/octet-stream";

      await storeInCAS({
        hash,
        content,
        contentType,
      });
    }),
  );
}
