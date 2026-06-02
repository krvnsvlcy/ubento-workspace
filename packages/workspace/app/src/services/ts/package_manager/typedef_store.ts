import { Registry, RegistryCachePolicy } from "./registry.js";

export interface Logger {
  info(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  error(message: string, meta?: any): void;
  debug(message: string, meta?: any): void;
}

export type TypeDefinition = {
  typeDefs: Record<string, string>; // Map of relative file path to file content
  dependencies: Record<string, string>; // Package dependencies
  packageJsonText: string; // The raw text of the package.json file
  packageJson: Record<string, any>; // The parsed package.json object
};

export class TypeDefStore {
  static defaultRegistryName = "__default__";

  private readonly dbName: string;
  private readonly dbVersion: number;
  private readonly storeName: string;
  private readonly registries: Record<string, Registry>;
  private readonly dbPromise: Promise<IDBDatabase>;
  private readonly logger?: Logger;

  constructor(options: {
    dbName?: string;
    dbVersion?: number;
    storeName?: string;
    logger?: Logger;
    registries: Record<string, Registry>;
  }) {
    this.dbName = options.dbName ?? "type-definitions";
    this.dbVersion = options.dbVersion ?? 1;
    this.storeName = options.storeName ?? "definitions";
    this.registries = options.registries;
    this.dbPromise = this.openDB();
    this.logger = options.logger;
  }

  registry(name: string): Registry {
    const registry = this.registries[name];
    if (!registry) {
      throw new Error(`Registry ${name} not found`);
    }
    return registry;
  }

  defaultRegistry(): Registry {
    return this.registry(TypeDefStore.defaultRegistryName);
  }

  public async get(
    pkg: string,
    version: string,
    options?: {
      registry?: string;
      bypassCache?: boolean;
      aliases?: Array<{ name: string; version: string }>;
    },
  ): Promise<TypeDefinition> {
    const registryName = options?.registry ?? TypeDefStore.defaultRegistryName;
    const registry = this.registry(registryName);

    if (
      !options?.bypassCache &&
      registry.cachePolicy === RegistryCachePolicy.CacheFirst
    ) {
      const cached = await this.getFromDB(pkg, version);
      if (cached?.typeDefs && Object.keys(cached.typeDefs).length > 0) {
        return cached;
      }
    }

    try {
      // 1. Fetch package.json
      const packageJsonText = await registry.readFile(
        pkg,
        version,
        "package.json",
      );
      const packageJson = JSON.parse(packageJsonText);
      const pkgVersion = version ?? packageJson.version;

      // 2. Fetch Metadata (Flat Array)
      const files = await registry.listFiles(pkg, pkgVersion);

      // 3. Filter for all type definition files in the flat list
      const typePaths = files
        .filter((f) =>
          // Keep .d.ts files
          /\.d\.(ts|mts|cts)$/.test(f.path),
        )
        .map((f) => f.path);

      // 4. Fallback to @types if no types found in source
      if (
        typePaths.length === 0 &&
        !pkg.startsWith("@types/") &&
        // If we found package.json but no types, we still want to try @types
        (files.length > 0 || !files.some((f) => f.path === "package.json"))
      ) {
        this.logger?.info(`No types found in ${pkg}, trying @types/${pkg}`, {
          event: "typedef.info",
          operation: "get",
          pkg,
          version: pkgVersion,
          fileCount: typePaths.length,
        });
        return this.get(`@types/${pkg}`, version, {
          ...options,
          aliases: [
            ...(options?.aliases ?? []),
            { name: pkg, version: pkgVersion },
          ],
        });
      }

      // 5. Fetch all files (with simple concurrency control)
      const typeDefs: Record<string, string> = {};
      const CONCURRENCY_LIMIT = 10;

      const allPaths = [...typePaths, "package.json"];

      for (let i = 0; i < allPaths.length; i += CONCURRENCY_LIMIT) {
        const chunk = allPaths.slice(i, i + CONCURRENCY_LIMIT);
        await Promise.all(
          chunk.map(async (path) => {
            try {
              const content = await registry.readFile(pkg, pkgVersion, path);
              typeDefs[path] = content;
            } catch (e) {
              this.logger?.warn(`Failed to fetch ${path}`, {
                event: "typedef.info",
                operation: "get",
                pkg,
                version: pkgVersion,
                error: e instanceof Error ? e.message : String(e),
              });
            }
          }),
        );
      }

      const { dependencies = {}, peerDependencies = {} } = packageJson;
      const def = {
        typeDefs,
        dependencies: { ...dependencies, ...peerDependencies },
        packageJsonText,
        packageJson,
      };

      await this.setToDB(pkg, version, def);
      if (options?.aliases) {
        for (const alias of options.aliases) {
          await this.setToDB(alias.name, alias.version, def);
        }
      }
      return def;
    } catch (err) {
      if (!pkg.startsWith("@types/")) {
        return this.get(`@types/${pkg}`, version, {
          ...options,
          aliases: [
            ...(options?.aliases ?? []),
            { name: pkg, version: version },
          ],
        });
      }
      this.logger?.error(`Terminal failure for ${pkg}`, {
        event: "typedef.error",
        operation: "get",
        pkg,
        error: err instanceof Error ? err.message : String(err),
      });
      throw new Error(
        `Failed to resolve type definitions for ${pkg}: ${
          err instanceof Error ? err.message : String(err)
        }`,
      );
    }
  }

  public async getDefaultLibs(
    tsVersion: string,
  ): Promise<Record<string, string>> {
    const defaultLibsKey = "__default_libs__";
    const registry = this.defaultRegistry();

    // 1) Try cache first
    const cached = await this.getFromDB(defaultLibsKey, tsVersion);
    if (cached?.typeDefs && Object.keys(cached.typeDefs).length > 0) {
      return cached.typeDefs;
    }

    try {
      // 2) Enumerate lib files via registry
      const files = await registry.listFiles("typescript", tsVersion);

      // 3) Walk the meta tree to collect lib/*.d.ts
      const libEntries: string[] = files
        .filter((f) => /^\/?lib\/lib\..*\.d\.ts$/.test(f.path))
        .map((f) => f.path.replace(/^\/+/, ""));

      this.logger?.debug(`(ts libs) found ${libEntries.length} lib files`, {
        event: "fetch.completed",
        pkg: "typescript",
        version: tsVersion,
        success: true,
        durationMs: 0,
        libEntries,
      });

      // 4) Fetch all lib files’ contents
      const typeDefs: Record<string, string> = {};
      for (const entryPath of libEntries) {
        const baseName = entryPath.split("/").pop()!;
        try {
          const text = await registry.readFile(
            "typescript",
            tsVersion,
            entryPath,
          );
          typeDefs[baseName] = text;
        } catch (e) {
          this.logger?.error(`(ts libs) failed to fetch ${entryPath}`, {
            event: "fetch.completed",
            pkg: "typescript",
            version: tsVersion,
            success: false,
            durationMs: 0,
            error: e instanceof Error ? e.message : String(e),
          } as any);
        }
      }

      // 5) Cache and return
      const definition: TypeDefinition = {
        typeDefs,
        dependencies: {},
        packageJsonText: "",
        packageJson: {},
      };
      await this.setToDB(defaultLibsKey, tsVersion, definition);
      return typeDefs;
    } catch (err) {
      this.logger?.error(
        `Failed to fetch TypeScript package metadata from registry`,
        {
          event: "fetch.completed",
          pkg: "typescript",
          version: tsVersion,
          success: false,
          durationMs: 0,
          error: err instanceof Error ? err.message : String(err),
        } as any,
      );

      // Fallback: fetch a conservative, commonly used subset so you’re not blocked.
      const fallback = [
        "lib.es5.d.ts",
        "lib.es2015.d.ts",
        "lib.es2016.d.ts",
        "lib.es2017.d.ts",
        "lib.es2018.d.ts",
        "lib.es2019.d.ts",
        "lib.es2020.d.ts",
        "lib.es2021.d.ts",
        "lib.es2022.d.ts",
        "lib.es2023.d.ts",
        "lib.esnext.d.ts",
        "lib.dom.d.ts",
        "lib.dom.iterable.d.ts",
        "lib.webworker.d.ts",
        "lib.scripthost.d.ts",
        "lib.esnext.asynciterable.d.ts",
      ];
      const typeDefs: Record<string, string> = {};
      for (const fname of fallback) {
        try {
          const text = await registry.readFile(
            "typescript",
            tsVersion,
            `lib/${fname}`,
          );
          typeDefs[fname] = text;
        } catch (e) {
          this.logger?.warn(`(fallback) failed to fetch ${fname}`, {
            event: "fetch.completed",
            pkg: "typescript",
            version: tsVersion,
            success: false,
            durationMs: 0,
            error: e instanceof Error ? e.message : String(e),
          } as any);
        }
      }
      return typeDefs;
    }
  }

  public async clearCache(): Promise<void> {
    try {
      const db = await this.dbPromise;
      const tx = db.transaction([this.storeName], "readwrite");
      const store = tx.objectStore(this.storeName);
      await new Promise<void>((resolve, reject) => {
        const req = store.clear();
        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve();
      });
    } catch (err) {
      this.logger?.error("Failed to clear type definitions cache", {
        event: "cache.error",
        operation: "clearCache",
        error: err instanceof Error ? err.message : String(err),
      });
      throw err;
    }
  }

  private openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, {
            keyPath: "key",
          });
          store.createIndex("pkg", "pkg", { unique: false });
          store.createIndex("version", "version", { unique: false });
        }
      };
    });
  }

  private async getFromDB(
    pkg: string,
    version: string,
  ): Promise<TypeDefinition | undefined> {
    try {
      const db = await this.dbPromise;
      const tx = db.transaction([this.storeName], "readonly");
      const store = tx.objectStore(this.storeName);
      const key = `type-definition-${pkg}-${version}`;
      return await new Promise((resolve, reject) => {
        const req = store.get(key);
        req.onerror = () => reject(req.error);
        req.onsuccess = () => {
          const result = req.result;
          resolve(result ? result.definition : undefined);
        };
      });
    } catch (err) {
      this.logger?.error("Failed to get type definition from IndexedDB", {
        event: "cache.error",
        operation: "getFromDB",
        error: err instanceof Error ? err.message : String(err),
      });
      return undefined;
    }
  }

  private async setToDB(
    pkg: string,
    version: string,
    definition: TypeDefinition,
  ): Promise<void> {
    try {
      const db = await this.dbPromise;
      const tx = db.transaction([this.storeName], "readwrite");
      const store = tx.objectStore(this.storeName);
      const key = `type-definition-${pkg}-${version}`;
      await new Promise<void>((resolve, reject) => {
        const req = store.put({
          key,
          pkg,
          version,
          definition,
          timestamp: Date.now(),
        });
        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve();
      });
      tx.commit();
    } catch (err) {
      this.logger?.error("Failed to set type definition to IndexedDB", {
        event: "cache.error",
        operation: "setToDB",
        error: err instanceof Error ? err.message : String(err),
      });
      throw err;
    }
  }
}
