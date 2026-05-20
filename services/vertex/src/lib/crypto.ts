import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import crypto from "crypto";
import { env } from "../env";

const client = new SecretManagerServiceClient();
const ALGORITHM = "aes-256-gcm";
let cachedMasterKey: Buffer | null = null;

async function getMasterKey() {
  if (cachedMasterKey) return cachedMasterKey;

  // Fetch the raw hex string from GSM instead of the local environment
  const [version] = await client.accessSecretVersion({
    name: `projects/${env.GCP_PROJECT_ID}/secrets/vertex-master-key/versions/latest`,
  });

  const payload = version.payload?.data?.toString();
  if (!payload)
    throw new Error("Failed to load master key from Secret Manager");

  cachedMasterKey = Buffer.from(payload, "hex");

  if (cachedMasterKey.length !== 32) {
    throw new Error("Elll Crypto: Master key must be exactly 32 bytes.");
  }
  return cachedMasterKey;
}

export type EncryptedData = {
  iv: string;
  authTag: string;
  cipherText: string;
};

export const cryptoUtils = {
  encrypt: async (data: string): RunHttpHandlerErrorCode<EncryptedData> => {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALGORITHM, await getMasterKey(), iv);

    let ciphertext = cipher.update(data, "utf8", "hex");
    ciphertext += cipher.final("hex");
    const authTag = cipher.getAuthTag().toString("hex");

    return {
      iv: iv.toString("hex"),
      authTag,
      cipherText: ciphertext,
    };
  },

  decrypt: async (data: EncryptedData): RunHttpHandlerErrorCode<string> => {
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      await getMasterKey(),
      Buffer.from(data.iv, "hex"),
    );

    // The auth tag mathematically proves the ciphertext wasn't tampered with
    decipher.setAuthTag(Buffer.from(data.authTag, "hex"));

    let plainText = decipher.update(data.cipherText, "hex", "utf8");
    plainText += decipher.final("utf8");

    return plainText;
  },
};
