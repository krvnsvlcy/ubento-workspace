import crypto from "crypto";

/**
 * Deterministically map a service name to a stable TCP port.
 * - No probing, no fallback.
 * - Same input -> same output, forever.
 * - Range: [1024, 49151] (registered ports)
 */
export function getServiceDefaultPort(
  serviceName: string,
  opts?: { min?: number; max?: number; salt?: string }
): number {
  const min = opts?.min ?? 1024;
  const max = opts?.max ?? 49151;
  if (min < 0 || max > 65535 || min > max) {
    throw new Error(`Invalid port range: [${min}, ${max}]`);
  }
  const span = max - min + 1;

  const key = (opts?.salt ? `${opts.salt}:` : "") + serviceName;
  const hash = crypto.createHash("sha256").update(key).digest();
  const u32 = hash.readUInt32BE(0); // take first 32 bits for spread
  return min + (u32 % span);
}
