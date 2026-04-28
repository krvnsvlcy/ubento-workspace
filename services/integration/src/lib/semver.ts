import { parse, Range, SemVer } from "semver";

export interface Bound {
  version: string;
  inclusive: boolean;
}
export interface RangeBounds {
  min?: Bound; // lowest allowed version in this set
  max?: Bound; // highest allowed version in this set
}

/**
 * Split a semver range into envelopes (one per OR-ed comparator set).
 * Each envelope reports tight lower/upper bounds with inclusivity.
 *
 * Examples:
 *  "^1.2.3 || ~2.0.0 || >=3.0.0 <4.0.0" =>
 *    [
 *      { min: {1.2.3, inclusive:true}, max: {2.0.0, inclusive:false} },
 *      { min: {2.0.0, inclusive:true}, max: {2.1.0, inclusive:false} },
 *      { min: {3.0.0, inclusive:true}, max: {4.0.0, inclusive:false} }
 *    ]
 *
 * Notes:
 *  - `Range.set` already expands ^ / ~ into >= / < comparators.
 *  - Exact comparator (operator === "") yields min=max=that version (inclusive).
 *  - If a set is open-ended on one side, that side will be undefined.
 */
export function getRangeEnvelopes(range: string): RangeBounds[] {
  const out: RangeBounds[] = [];
  const normalized = range.trim();
  if (!normalized || normalized === "*") return out;

  let parsed: Range;
  try {
    parsed = new Range(normalized);
  } catch {
    return out; // invalid range -> empty list, let caller handle
  }

  for (const set of parsed.set) {
    if (!set || set.length === 0) continue;

    // Exact-only short-circuit
    if (set.length === 1 && set[0].operator === "") {
      const v = set[0].semver.version;
      out.push({
        min: { version: v, inclusive: true },
        max: { version: v, inclusive: true },
      });
      continue;
    }

    let minBound: Bound | undefined;
    let maxBound: Bound | undefined;

    for (const c of set) {
      const op = c.operator;
      const v = c.semver?.version;
      if (!v) continue;

      // Exact inside a larger set: treat as both min and max at v (inclusive)
      if (op === "") {
        const b: Bound = { version: v, inclusive: true };
        // Tighten min (prefer higher version)
        if (!minBound || new SemVer(v).compare(minBound.version) > 0)
          minBound = b;
        // Tighten max (prefer lower version)
        if (!maxBound || new SemVer(v).compare(maxBound.version) < 0)
          maxBound = b;
        continue;
      }

      if (op === ">" || op === ">=") {
        const candidate: Bound = { version: v, inclusive: op === ">=" };
        if (!minBound) {
          minBound = candidate;
        } else {
          const cmp = new SemVer(candidate.version).compare(minBound.version);
          if (cmp > 0) {
            minBound = candidate;
          } else if (cmp === 0) {
            // same version: exclusive is tighter for a MIN
            if (!candidate.inclusive && minBound.inclusive)
              minBound = candidate;
          }
        }
      }

      if (op === "<" || op === "<=") {
        const candidate: Bound = { version: v, inclusive: op === "<=" };
        if (!maxBound) {
          maxBound = candidate;
        } else {
          const cmp = new SemVer(candidate.version).compare(maxBound.version);
          if (cmp < 0) {
            maxBound = candidate;
          } else if (cmp === 0) {
            // same version: exclusive is tighter for a MAX
            if (!candidate.inclusive && maxBound.inclusive)
              maxBound = candidate;
          }
        }
      }
    }

    if (minBound || maxBound) out.push({ min: minBound, max: maxBound });
  }

  return out;
}

// Bounds for slots
const MAX_MAJOR = 999;
const MAX_MINOR = 999;
const MAX_PATCH = 999_999; // six digits
const MAX_PRERANK = 999; // three digits
const ALLOWED_TAG_PATTERN = /^[a-z][a-z0-9-]{0,15}$/i; // up to 16 chars, ASCII letters, digits, dash

function computePreRank(tag: string): number {
  // Enforce pattern (simple, predictable ordering)
  if (!ALLOWED_TAG_PATTERN.test(tag)) {
    throw new Error(
      `Invalid prerelease tag "${tag}". Allowed pattern: ${ALLOWED_TAG_PATTERN}`
    );
  }

  // Convert first char to lowercase ASCII rank (a..z => 97..122)
  const first = tag.toLowerCase().charCodeAt(0);
  if (first < 0 || first > MAX_PRERANK) {
    // This should never happen due to the regex above
    throw new Error(
      `First prerelease char "${tag[0]}" not in 0..${MAX_PRERANK} range`
    );
  }

  return first;
}

export function getVersionRank(version: string): number {
  const v = parse(version, { loose: false });
  if (!v) throw new Error(`Invalid semver: ${version}`);

  const major = v.major;
  const minor = v.minor;
  const patch = v.patch;

  let preRank = MAX_PRERANK; // stable

  if (v.prerelease.length > 0) {
    const tag = String(v.prerelease[0]);
    preRank = computePreRank(tag);
  }

  const key =
    major * 1_000_000_000_000 + minor * 1_000_000_000 + patch * 1_000 + preRank;

  if (!Number.isSafeInteger(key)) {
    throw new Error(`Version key exceeds safe integer range`);
  }

  return key;
}

export type VersionInfo = {
  major: number;
  minor: number;
  patch: number;
  channel: string; // e.g. "alpha" | "beta" | "rc" | "stable" | custom
};

/**
 * Parse a semver string and extract its major, minor, patch, and channel.
 * Channel is the first prerelease segment (e.g. "alpha", "beta", "rc"), or "stable" if none.
 */
export function resolveVersionInfo(version: string): VersionInfo {
  const v: SemVer | null = parse(version, { loose: false });
  if (!v) throw new Error(`Invalid semver: ${version}`);

  let channel = "stable";

  if (v.prerelease.length > 0) {
    const first = v.prerelease[0];
    if (typeof first === "string" && first.length > 0) {
      // Normalize prerelease tag (lowercase, safe chars only)
      channel = first.toLowerCase().replace(/[^a-z0-9-]/g, "");
    } else {
      channel = "unstable";
    }
  }

  return {
    major: v.major,
    minor: v.minor,
    patch: v.patch,
    channel,
  };
}
