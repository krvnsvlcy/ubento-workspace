import { Storage } from "@google-cloud/storage";
import { env } from "../env.js";

const storage = new Storage();
export const extensionBucket = storage.bucket(env.GCP_EXTENSION_BUCKET_NAME);

export const storagePaths = {
  extensionVersionFile: ({
    organization_id,
    extension_name,
    semver,
    fileName,
  }: {
    organization_id: string;
    extension_name: string;
    semver: string;
    fileName: string;
  }) => `extensions/${organization_id}/${extension_name}/${semver}/${fileName}`,
};
