import { Storage } from "@google-cloud/storage";
import { parseEntityId } from "@ubento/services.primitives";
import crypto from "crypto";
import { env } from "../env.js";

const storage = new Storage();
export const serviceBucket = storage.bucket(env.GCP_SERVICE_BUCKET_NAME);
export const userContentBucket = storage.bucket(
  env.GCP_USER_CONTENT_BUCKET_NAME,
);

export const storagePaths = {
  serviceSpecFile: ({
    serviceId,
    channelId,
  }: {
    serviceId: string;
    channelId: string;
  }) => {
    const serviceBareId = parseEntityId(serviceId).bareId;
    const channelBareId = parseEntityId(channelId).bareId;
    return `${serviceBareId}/${channelBareId}/spec.json`;
  },
};

/** SHA-256 hash a buffer and return the hex digest. */
export function hashBuffer(buffer: Buffer): string {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

/**
 * Upload an image buffer to the user-content bucket at /images/{hash}.
 * Returns the hash so callers can persist it.
 */
export async function uploadImage(
  buffer: Buffer,
  contentType: string,
): Promise<string> {
  const hash = hashBuffer(buffer);
  const file = userContentBucket.file(`images/${hash}`);
  await file.save(buffer, {
    contentType,
    metadata: { cacheControl: "public, max-age=31536000, immutable" },
  });
  try {
    await file.makePublic();
  } catch (err) {
    // If uniform bucket-level access is enabled, makePublic() will fail.
    // The bucket-level permissions should already make objects readable if intended.
    console.warn(`[storage] Could not make file public:`, err);
  }
  return hash;
}

/** Resolve a stored hash to a full public URL. */
export function resolveImageUrl(hash: string): string {
  return `${env.USER_CONTENT_BASE_URL}/images/${hash}`;
}

