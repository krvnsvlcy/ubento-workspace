type SerializeOptions = {
  bigintMode?: "number" | "string" | "error"; // default "number"
  dateMode?: "iso" | "epoch_ms"; // default "iso"
  bufferMode?: "base64" | "array"; // default "base64"
  mapMode?: "entries" | "object"; // default "entries" (array of [k,v])
  maxDepth?: number; // default 100 (safety)
};

const DEFAULT_OPTS: Required<SerializeOptions> = {
  bigintMode: "number",
  dateMode: "iso",
  bufferMode: "base64",
  mapMode: "entries",
  maxDepth: 100,
};

function isPlainObject(x: any): x is Record<string, unknown> {
  if (!x || typeof x !== "object") return false;
  const proto = Object.getPrototypeOf(x);
  return proto === Object.prototype || proto === null;
}

function toBase64(u8: Uint8Array): string {
  // Node.js Buffer is fine here; in browsers you’d use btoa
  return Buffer.from(u8).toString("base64");
}

function looksLikeObjectId(v: any): v is { toHexString(): string } {
  return v && typeof v === "object" && typeof v.toHexString === "function";
}
function looksLikeDecimal128(v: any): v is { toString(): string } {
  return (
    v &&
    typeof v === "object" &&
    typeof v.toString === "function" &&
    v._bsontype === "Decimal128"
  );
}
function looksLikeLong(v: any): v is { toString(): string } {
  return (
    v &&
    typeof v === "object" &&
    typeof v.toString === "function" &&
    v._bsontype === "Long"
  );
}

export function toSerializable<T>(
  input: T,
  options?: SerializeOptions,
  _depth = 0,
  _seen = new WeakSet()
): any {
  const opts = { ...DEFAULT_OPTS, ...(options ?? {}) };
  if (_depth > opts.maxDepth) return null; // safety cutoff

  // primitives
  const t = typeof input;
  if (input == null || t === "string" || t === "number" || t === "boolean")
    return input;

  if (t === "bigint") {
    if (opts.bigintMode === "string") return (input as bigint).toString();
    if (opts.bigintMode === "error") {
      throw new Error(
        `BigInt value ${input.toString()} cannot be serialized in current mode`
      );
    }
    // "number" mode with safety
    const big = input as bigint;
    if (
      big > BigInt(Number.MAX_SAFE_INTEGER) ||
      big < BigInt(Number.MIN_SAFE_INTEGER)
    ) {
      throw new Error(
        `BigInt value ${big.toString()} exceeds Number safe integer range`
      );
    }
    return Number(big);
  }

  // Dates
  if (input instanceof Date) {
    return opts.dateMode === "epoch_ms"
      ? (input as Date).getTime()
      : (input as Date).toISOString();
  }

  // Buffers / binary
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(input)) {
    return opts.bufferMode === "array"
      ? Array.from(input.values())
      : toBase64(input as Buffer);
  }
  if (input instanceof Uint8Array) {
    return opts.bufferMode === "array"
      ? Array.from(input.values())
      : toBase64(input as Uint8Array);
  }
  if (input instanceof ArrayBuffer) {
    const u8 = new Uint8Array(input as ArrayBuffer);
    return opts.bufferMode === "array" ? Array.from(u8.values()) : toBase64(u8);
  }

  // BSON-ish
  if (looksLikeObjectId(input)) return input.toHexString();
  if (looksLikeDecimal128(input)) return input.toString();
  if (looksLikeLong(input)) return (input as any).toString();

  // Arrays
  if (Array.isArray(input)) {
    return (input as any[]).map((v) =>
      toSerializable(v, opts, _depth + 1, _seen)
    );
  }

  // Objects (handle circular)
  if (typeof input === "object") {
    if (_seen.has(input as any)) return null; // break cycles
    _seen.add(input as any);

    if (isPlainObject(input)) {
      const out: Record<string, any> = {};
      for (const [k, v] of Object.entries(input as any)) {
        out[k] = toSerializable(v, opts, _depth + 1, _seen);
      }
      return out;
    }

    // Fallback for class instances → shallow copy of enumerable props
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(input as any)) {
      out[k] = toSerializable(v, opts, _depth + 1, _seen);
    }
    // include constructor name for visibility
    if ((input as any).constructor?.name)
      out["__type"] = (input as any).constructor.name;
    return out;
  }

  // final fallback
  return input;
}

export function dataResponse<T>(data: T, options?: SerializeOptions) {
  return toSerializable(data, options);
}

export function errorResponse(
  message: string,
  {
    code = "INTERNAL_ERROR",
    details,
  }: { code?: string; details?: Record<string, any> } = {}
) {
  return { error: { code, message, details } };
}
