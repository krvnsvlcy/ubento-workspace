import { Storage } from "@google-cloud/storage";
import { parseEntityId } from "@ubento/services.primitives";
import { env } from "../env.js";

const storage = new Storage();
export const serviceBucket = storage.bucket(env.GCP_SERVICE_BUCKET_NAME);

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
