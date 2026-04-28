import { Storage } from "@google-cloud/storage";
import { parseEntityId } from "@ubento/primitives";
import { env } from "../env.js";

const storage = new Storage();
const moduleBucket = storage.bucket(env.GCS_MODULE_BUCKET);
const userContentBucket = storage.bucket(env.GCS_USER_CONTENT_BUCKET);

/**
 * Stores a file in the CAS bucket.
 */
export async function storeInCAS({
  moduleId,
  hash,
  content,
  contentType,
}: {
  moduleId: string;
  hash: string;
  content: string | Buffer;
  contentType: string;
}) {
  const { bareId: bareModuleId } = parseEntityId(moduleId);
  const path = `modules/${bareModuleId}/${hash}`;
  const file = moduleBucket.file(path);
  
  await file.save(content, {
    contentType,
    resumable: false,
  });
}

/**
 * Reads a file from the CAS bucket.
 */
export async function readFromCAS({
  moduleId,
  hash,
}: {
  moduleId: string;
  hash: string;
}) {
  const { bareId: bareModuleId } = parseEntityId(moduleId);
  const path = `modules/${bareModuleId}/${hash}`;
  const file = moduleBucket.file(path);
  
  const [content] = await file.download();
  return content.toString();
}

/**
 * Publishes a set of CAS files to the public user content bucket under the version path.
 */
export async function publishFilesToUserContent({
  moduleId,
  versionId,
  files,
}: {
  moduleId: string;
  versionId: string;
  files: Record<string, string>; // filename -> hash
}) {
  const { bareId: bareModuleId } = parseEntityId(moduleId);
  const { bareId: bareVersionId } = parseEntityId(versionId);

  await Promise.all(
    Object.entries(files).map(async ([filename, hash]) => {
      const sourcePath = `modules/${bareModuleId}/${hash}`;
      const destPath = `module/${bareModuleId}/${bareVersionId}/${filename}`;

      const sourceFile = moduleBucket.file(sourcePath);
      const destFile = userContentBucket.file(destPath);
      
      const contentType = getContentType(filename);

      await sourceFile.copy(destFile);
      
      // Update cache control for public bucket
      await destFile.setMetadata({
        contentType,
        cacheControl: "public, max-age=31536000",
      });
    })
  );
}

function getContentType(filename: string): string {
  if (filename.endsWith('.js')) return 'application/javascript';
  if (filename.endsWith('.map')) return 'application/json';
  if (filename.endsWith('.d.ts')) return 'application/typescript';
  if (filename.endsWith('.ts')) return 'application/typescript';
  if (filename.endsWith('.tsx')) return 'application/typescript';
  if (filename.endsWith('.json')) return 'application/json';
  if (filename.endsWith('.css')) return 'text/css';
  return 'text/plain';
}
