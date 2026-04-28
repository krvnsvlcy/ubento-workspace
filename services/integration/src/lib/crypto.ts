import crypto from "crypto";
import { env } from "../env.js";

const ALGORITHM = "aes-256-gcm";

async function getMasterKey() {
  const key = Buffer.from(env.AUTH_ENCRYPTION_KEY, "hex");

  if (key.length !== 32) {
    throw new Error("Elll Crypto: Master key must be exactly 32 bytes.");
  }
  return key;
}

export type EncryptedData = {
  iv: string;
  authTag: string;
  cipherText: string;
};

export const cryptoUtils = {
  encrypt: async (data: string): Promise<EncryptedData> => {
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

  decrypt: async (data: EncryptedData): Promise<string> => {
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
