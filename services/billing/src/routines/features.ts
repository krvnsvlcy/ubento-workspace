import { ubentoFeatures, Feature } from "@ubento/primitives";

/* ========================================================================
   1. Feature Catalog Extraction (Module Singleton)
   ======================================================================== */

function extractUbentoFeatures(record: Record<string, unknown>): Feature[] {
  const features: Feature[] = [];

  function isFeature(record: Record<string, unknown>): record is Feature {
    return [
      "type" in record && typeof record.type === "string",
      "code" in record && typeof record.code === "string",
      "name" in record && typeof record.name === "string",
      "description" in record && typeof record.description === "string",
    ].every(Boolean);
  }

  if (isFeature(record)) {
    features.push(record);
  } else {
    for (const subRecord of Object.values(record)) {
      const subFeatures = extractUbentoFeatures(
        subRecord as Record<string, unknown>,
      );
      features.push(...subFeatures);
    }
  }

  return features;
}

// Optimization: Run this once at module load time (Singleton)
// This prevents expensive recursion on every user request.
const GLOBAL_FEATURE_MAP = (() => {
  const list = extractUbentoFeatures(ubentoFeatures as any);
  return Object.fromEntries(list.map((f) => [f.code, f]));
})();

export function getUbentoFeatureMap() {
  return GLOBAL_FEATURE_MAP;
}

export function getFeature(code: string) {
  return GLOBAL_FEATURE_MAP[code] as Feature | undefined;
}
