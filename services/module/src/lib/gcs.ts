import { Storage } from "@google-cloud/storage";
import { parseEntityId } from "@ubento/primitives";
import { env } from "../env.js";

const storage = new Storage();
const moduleBucket = storage.bucket(env.GCS_MODULE_BUCKET);
const userContentBucket = storage.bucket(env.GCS_USER_CONTENT_BUCKET);

export async function persistModule({
  moduleId,
  versionId,
  js: jsCode,
  tsx: tsxCode,
}: {
  moduleId: string;
  versionId: string;
  js: string;
  tsx: string;
}) {
  const { bareId: bareVersionId } = parseEntityId(versionId);

  const internalTsxPath = `modules/${moduleId}/${bareVersionId}.tsx`;
  const internalJsPath = `modules/${moduleId}/${bareVersionId}.js`;

  const tsxFile = moduleBucket.file(internalTsxPath);
  const jsFile = userContentBucket.file(internalJsPath);

  await Promise.all([
    tsxFile.save(tsxCode, {
      contentType: "application/typescript",
      resumable: false,
    }),
    jsFile.save(jsCode, {
      contentType: "application/javascript",
      resumable: false,
      metadata: { cacheControl: "public, max-age=31536000" },
    }),
  ]);
}
