import { Storage } from "@google-cloud/storage";
import { env } from "../env.js";

const storage = new Storage();
export const serviceBucket = storage.bucket(env.GCP_SERVICE_BUCKET_NAME);

export const storagePaths = {
  serviceSpecFile: ({
    scope,
    service,
    channel,
  }: {
    scope?: string;
    service: string;
    channel: string;
  }) => {
    if (scope) {
      return `${scope}/${service}/${channel}/spec.json`;
    }
    return `__public__/${service}/${channel}/spec.json`;
  },
};
