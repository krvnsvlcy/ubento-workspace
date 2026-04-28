import { Storage } from "@google-cloud/storage";
import { env } from "../env.js";

export const storage = new Storage();

export const intelligenceBucket = storage.bucket(
  env.GCP_INTELLIGENCE_BUCKET_NAME
);

export const storagePaths = {
  file: ({
    workspace_id,
    file_id,
  }: {
    workspace_id: string;
    file_id: string;
  }) => `files/${workspace_id}/${file_id}`,
};
