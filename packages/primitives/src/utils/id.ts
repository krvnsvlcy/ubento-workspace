import { sha3_512 as sha3 } from "@noble/hashes/sha3";

const defaultLength = 24;
const bigLength = 32;

function createEntropy(length = 4, random = Math.random): string {
  let entropy = "";
  while (entropy.length < length) {
    entropy += Math.floor(random() * 36).toString(36);
  }
  return entropy;
}

function bufToBigInt(buf: Uint8Array): bigint {
  let value = 0n;
  for (const byte of buf) {
    value = (value << 8n) + BigInt(byte);
  }
  return value;
}

function hash(input = ""): string {
  return bufToBigInt(sha3(input)).toString(36);
}

function createFingerprint({
  globalObj = typeof globalThis !== "undefined" ? globalThis : {},
  random = Math.random,
} = {}): string {
  const globals = Object.keys(globalObj).toString();
  const source = globals.length
    ? globals + createEntropy(bigLength, random)
    : createEntropy(bigLength, random);
  return hash(source).substring(0, bigLength);
}

function createCounter(seed: number) {
  let count = seed;
  return () => count++;
}

const initialCountMax = 476_782_367;

export function createIdGenerator({
  length = defaultLength,
  random = Math.random,
  fingerprint = createFingerprint({ random }),
  counter = createCounter(Math.floor(random() * initialCountMax)),
}: {
  length?: number;
  random?: () => number;
  fingerprint?: string;
  counter?: () => number;
} = {}) {
  return function generateBareId(): string {
    const time = Date.now().toString(36);
    const salt = createEntropy(length, random);
    const count = counter().toString(36);
    const hashInput = time + salt + count + fingerprint;
    return hash(hashInput).substring(0, length);
  };
}

export const generateBareId = createIdGenerator({ length: 24 });
