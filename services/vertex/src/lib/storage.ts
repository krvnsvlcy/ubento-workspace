import { Storage } from "@google-cloud/storage";
import { env } from "../env.js";

const storage = new Storage();
export const serviceBucket = storage.bucket(env.GCP_SERVICE_BUCKET_NAME);

export const storagePaths = {
  serviceSpecFile: ({
    team_id,
    service_name,
    version_name,
  }: {
    team_id: string;
    service_name: string;
    version_name: string;
  }) => `${team_id}/${service_name}/${version_name}/spec.json`,
};
