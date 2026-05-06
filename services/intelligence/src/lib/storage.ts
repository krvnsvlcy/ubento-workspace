import { Storage } from "@google-cloud/storage";
import { env } from "../env.js";

export const storage = new Storage();

export const intelligenceBucket = storage.bucket(
  env.GCP_INTELLIGENCE_BUCKET_NAME,
);

export const storagePaths = {
  file: ({
    team_id,
    workspace_id,
    file_id,
  }: {
    team_id: string;
    workspace_id?: string;
    file_id: string;
  }) => ["files", team_id, workspace_id, file_id].filter(Boolean).join("/"),
};
