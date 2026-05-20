// Convert a string to an ArrayBuffer
export function stringToArrayBuffer(str: string): ArrayBuffer {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(str).buffer;
  const arrayBuffer = new ArrayBuffer(buffer.byteLength);
  const bytes = new Uint8Array(arrayBuffer);
  bytes.set(new Uint8Array(buffer));
  return arrayBuffer;
}

// Convert an ArrayBuffer to a string
export function arrayBufferToString(buf: ArrayBuffer): string {
  const decoder = new TextDecoder();
  return decoder.decode(buf);
}

// Convert an ArrayBuffer to a Base64-encoded string
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return Buffer.from(binary, "binary").toString("base64");
}

// Convert a Base64-encoded string to an ArrayBuffer
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = Buffer.from(base64, "base64").toString("binary");
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return buffer;
}

// Encrypt a text string using AES-GCM
export async function encrypt(
  text: string,
  secret: string,
  iv: Uint8Array,
): Promise<{
  encryptedData: string;
  salt: string;
}> {
  try {
    const data = stringToArrayBuffer(text);
    const secretBuffer = stringToArrayBuffer(secret);
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      secretBuffer,
      { name: "PBKDF2" },
      false,
      ["deriveKey"],
    );

    const salt = crypto.getRandomValues(new Uint8Array(16));
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"],
    );

    const encrypted = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv as any,
      },
      key,
      data,
    );

    return {
      encryptedData: arrayBufferToBase64(encrypted),
      salt: arrayBufferToBase64(salt.buffer),
    };
  } catch (err) {
    console.error("Failed to encrypt data:", err);
    throw new Error("Encryption failed");
  }
}

// Decrypt an encrypted text string using AES-GCM
export async function decrypt(
  encryptedText: string,
  secret: string,
  iv: Uint8Array,
  salt: string,
): Promise<string> {
  try {
    const data = base64ToArrayBuffer(encryptedText);
    const secretBuffer = stringToArrayBuffer(secret);
    const saltBuffer = base64ToArrayBuffer(salt);
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      secretBuffer,
      { name: "PBKDF2" },
      false,
      ["deriveKey"],
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: new Uint8Array(saltBuffer),
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"],
    );

    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv as any,
      },
      key,
      data,
    );

    return arrayBufferToString(decrypted);
  } catch (err) {
    console.error("Failed to decrypt data:", err);
    throw new Error("Decryption failed");
  }
}
