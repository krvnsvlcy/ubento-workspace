export type RegistryFile = {
  path: string;
  size: number;
  type: string;
  integrity: string;
};

export enum RegistryCachePolicy {
  NetworkOnly = "network-only",
  CacheFirst = "cache-first",
}

export type Registry = {
  listFiles(pkg: string, version: string): Promise<RegistryFile[]>;
  readFile(pkg: string, version: string, path: string): Promise<string>;
  cachePolicy: RegistryCachePolicy;
};

const DEFAULT_JSDELIVR_META_BASE_URL = "https://data.jsdelivr.net";

export function createJsdelivrRegistry({
  baseUrl = DEFAULT_JSDELIVR_META_BASE_URL,
}: { baseUrl?: string } = {}): Registry {
  const cleanBaseUrl = baseUrl.replace(/\/$/, "");

  const flattenFiles = (files: any[], currentPath = ""): RegistryFile[] => {
    const result: RegistryFile[] = [];
    for (const f of files) {
      const fullPath = currentPath ? `${currentPath}/${f.name}` : f.name;
      if (f.type === "file") {
        result.push({
          path: fullPath,
          size: f.size || 0,
          type: "file",
          integrity: f.hash || "",
        });
      } else if (f.type === "directory" && f.files) {
        result.push(...flattenFiles(f.files, fullPath));
      }
    }
    return result;
  };

  return {
    async listFiles(
      pkg: string,
      versionRange: string,
    ): Promise<RegistryFile[]> {
      // 1. Resolve the exact version first
      const encodedSpecifier = encodeURIComponent(versionRange);
      const resolveUrl = `https://data.jsdelivr.com/v1/packages/npm/${pkg}/resolved?specifier=${encodedSpecifier}`;

      const resolveRes = await fetch(resolveUrl);
      if (!resolveRes.ok) {
        throw new Error(
          `Failed to resolve version range ${versionRange} for ${pkg}: ${resolveRes.status} ${resolveRes.statusText}`,
        );
      }

      const resolvedData = await resolveRes.json();
      const exactVersion = resolvedData.version;

      // 2. Fetch the file list using the pinned exact version
      const metaUrl = `https://data.jsdelivr.com/v1/packages/npm/${pkg}@${exactVersion}`;
      const res = await fetch(metaUrl);

      if (!res.ok) {
        throw new Error(
          `Failed to fetch file list for ${pkg}@${exactVersion}: ${res.status} ${res.statusText}`,
        );
      }

      const data = await res.json();
      console.info(`Registry Files for ${pkg}@${exactVersion}`, data);

      return flattenFiles(data.files || []);
    },
    async readFile(
      pkg: string,
      version: string,
      path: string,
    ): Promise<string> {
      const url = `https://cdn.jsdelivr.net/npm/${pkg}@${version}/${path}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(
          `Failed to fetch ${url}: ${res.status} ${res.statusText}`,
        );
      }

      return res.text();
    },

    cachePolicy: RegistryCachePolicy.CacheFirst,
  };
}

// https://cdn.jsdelivr.net/npm/react-draggable@^4.6.0/package.json

// https://data.jsdelivr.com/v1/packages/npm/class-variance-authority@%5E0.7.1
