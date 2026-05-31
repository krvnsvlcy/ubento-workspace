import { createDuplexRpc, createWorkerPort, DuplexRpc } from "@ubento/rpc";
import { WorkspaceEngine } from "@/engine/workspace/engine";
import { MainToTsWorkerRpcDef, TsWorkerToMainRpcDef } from "./rpc";

export class TsService {
  readonly workspaceEngine: WorkspaceEngine;
  private worker: Worker | null = null;
  private rpc: DuplexRpc<TsWorkerToMainRpcDef, MainToTsWorkerRpcDef> | null = null;
  private initPromise: Promise<void> | null = null;

  constructor(workspaceEngine: WorkspaceEngine) {
    this.workspaceEngine = workspaceEngine;
  }

  private updateStatus(status: {
    status: "idle" | "initializing" | "loading-libs" | "loading-modules" | "loading-packages" | "ready" | "error";
    message?: string;
    loadedPackagesCount: number;
    totalPackagesCount: number;
    packageStatuses?: Record<string, "pending" | "success" | "error">;
  }) {
    const current = this.workspaceEngine.store.getState().tsServiceStatus;
    const mergedStatuses = status.packageStatuses || current?.packageStatuses || {};
    this.workspaceEngine.store.setState({ 
      tsServiceStatus: {
        ...status,
        packageStatuses: mergedStatuses,
      } 
    });
  }

  async reinitialize(): Promise<void> {
    this.dispose();
    this.updateStatus({
      status: "idle",
      loadedPackagesCount: 0,
      totalPackagesCount: 0,
      packageStatuses: {},
    });
    await this.initialize();
  }

  async initialize(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = (async () => {
      try {
        this.updateStatus({
          status: "initializing",
          message: "Starting TypeScript background worker...",
          loadedPackagesCount: 0,
          totalPackagesCount: 0,
        });

        // 1. Spin up the TS web worker
        this.worker = new Worker(
          new URL("./ts.worker.ts", import.meta.url),
          { type: "module" }
        );

        // 2. Setup RPC bridge
        this.rpc = createDuplexRpc<TsWorkerToMainRpcDef, MainToTsWorkerRpcDef>({
          port: createWorkerPort(this.worker),
          handlers: {
            invalidated: async ({ uris }) => {
              const monacoService = this.workspaceEngine.getMonacoService();
              for (const uri of uris) {
                await monacoService.updateFileDiagnostics(uri);
              }
            },
          },
        });
        this.rpc.run();

        // 3. Load core lib definitions
        this.updateStatus({
          status: "loading-libs",
          message: "Loading TS core library definitions...",
          loadedPackagesCount: 0,
          totalPackagesCount: 0,
        });
        await this.loadCoreLibs();

        // 4. Load workspace modules source files
        this.updateStatus({
          status: "loading-modules",
          message: "Loading workspace module virtual files...",
          loadedPackagesCount: 0,
          totalPackagesCount: 0,
        });
        await this.loadWorkspaceModules();

        // 5. Ingest package typings based on the workspace spec
        await this.loadPackageTypings();

        this.updateStatus({
          status: "ready",
          message: "TypeScript service ready",
          loadedPackagesCount: 0,
          totalPackagesCount: 0,
        });
      } catch (e: any) {
        this.updateStatus({
          status: "error",
          message: `Failed to initialize TypeScript service: ${e.message || e}`,
          loadedPackagesCount: 0,
          totalPackagesCount: 0,
        });
        throw e;
      }
    })();

    return this.initPromise;
  }

  getRpc() {
    if (!this.rpc) {
      throw new Error("TS Service is not initialized");
    }
    return this.rpc;
  }

  async writeFile(path: string, content: string): Promise<void> {
    await this.initialize();
    await this.getRpc().call("writeFiles", { files: { [path]: content } });
  }

  async removeFile(path: string): Promise<void> {
    await this.initialize();
    await this.getRpc().call("removeFiles", { uris: [path] });
  }

  private async loadCoreLibs() {
    const libs = [
      "lib.esnext.d.ts",
      "lib.dom.d.ts",
      "lib.es5.d.ts",
    ];
    const files: Record<string, string> = {};
    await Promise.all(
      libs.map(async (libName) => {
        try {
          const res = await fetch(
            `https://cdn.jsdelivr.net/npm/typescript@5.3.3/lib/${libName}`
          );
          if (res.ok) {
            files[`/lib/${libName}`] = await res.text();
          }
        } catch (e) {
          console.warn(`[TsService] Failed to load core lib ${libName}`, e);
        }
      })
    );
    if (Object.keys(files).length > 0) {
      await this.getRpc().call("writeFiles", { files });
    }
  }

  private async loadWorkspaceModules() {
    const spec = this.workspaceEngine.store.getState().workspace.spec.data as any;
    if (!spec) return;

    const components = (spec.components || {}) as Record<string, { id: string; versionId: string }>;
    const modules = (spec.modules || {}) as Record<string, { id: string; versionId: string }>;

    const modulesToLoad = [
      ...Object.entries(components).map(([name, ref]) => ({
        name,
        ref,
        type: "components" as const,
      })),
      ...Object.entries(modules).map(([name, ref]) => ({
        name,
        ref,
        type: "modules" as const,
      })),
    ];

    const files: Record<string, string> = {};
    const paths: Record<string, string[]> = {};

    await Promise.all(
      modulesToLoad.map(async (m) => {
        try {
          const ext = m.type === "components" ? "tsx" : "ts";
          const virtualPath = `/workspace/modules/${m.ref.id}/${m.ref.versionId}.${ext}`;
          
          // Set explicit alias mapping:
          // e.g. "@/components/button" -> ["/workspace/modules/mod_123/ver_123.tsx"]
          paths[`@/${m.type}/${m.name}`] = [virtualPath];

          const content = await this.workspaceEngine.appEngine.ubento.module.readModuleVersionFile(
            m.ref.id,
            m.ref.versionId,
            `index.${ext}`
          );
          files[virtualPath] = content;
        } catch (e) {
          console.warn(`[TsService] Failed to read file for module ${m.name}`, e);
        }
      })
    );

    // Apply explicit aliases in compiler options
    await this.getRpc().call("setCompilerOptions", {
      options: {
        paths,
        baseUrl: "/",
      },
    });

    if (Object.keys(files).length > 0) {
      await this.getRpc().call("writeFiles", { files });
    }
  }

  private async loadPackageTypings() {
    const spec = this.workspaceEngine.store.getState().workspace.spec.data as any;
    if (!spec || !spec.packages) return;

    const packages = spec.packages as Record<string, string>;
    const entries = Object.entries(packages);
    const total = entries.length;
    let loaded = 0;

    const packageStatuses: Record<string, "pending" | "success" | "error"> = {};
    for (const [name] of entries) {
      packageStatuses[name] = "pending";
    }

    this.updateStatus({
      status: "loading-packages",
      message: `Loading package type definitions...`,
      loadedPackagesCount: loaded,
      totalPackagesCount: total,
      packageStatuses,
    });

    await Promise.all(
      entries.map(async ([pkgName, version]) => {
        try {
          // Normalize version (remove caret/tilde for JSDelivr API)
          const cleanVersion = version.replace(/^[\^~]/, "");
          const fileListUrl = `https://data.jsdelivr.net/v1/packages/npm/${pkgName}@${cleanVersion}`;
          const res = await fetch(fileListUrl);
          if (!res.ok) {
            // Try `@types/` fallback
            const fallbackPkgName = `@types/${pkgName}`;
            const fallbackRes = await fetch(
              `https://data.jsdelivr.net/v1/packages/npm/${fallbackPkgName}@latest`
            );
            let fallbackOk = false;
            if (fallbackRes.ok) {
              const data = await fallbackRes.json();
              await this.fetchAndWriteDtsFiles(fallbackPkgName, "latest", data.files || []);
              fallbackOk = true;
            }
            loaded++;
            packageStatuses[pkgName] = fallbackOk ? "success" : "error";
            this.updateStatus({
              status: "loading-packages",
              message: fallbackOk ? `Loaded ${fallbackPkgName} typings` : `Failed loading ${pkgName} typings`,
              loadedPackagesCount: loaded,
              totalPackagesCount: total,
              packageStatuses,
            });
            return;
          }

          const data = await res.json();
          await this.fetchAndWriteDtsFiles(pkgName, cleanVersion, data.files || []);
          loaded++;
          packageStatuses[pkgName] = "success";
          this.updateStatus({
            status: "loading-packages",
            message: `Loaded ${pkgName} typings`,
            loadedPackagesCount: loaded,
            totalPackagesCount: total,
            packageStatuses,
          });
        } catch (e) {
          console.warn(`[TsService] Failed to load type definitions for package ${pkgName}`, e);
          loaded++;
          packageStatuses[pkgName] = "error";
          this.updateStatus({
            status: "loading-packages",
            message: `Failed loading ${pkgName} typings`,
            loadedPackagesCount: loaded,
            totalPackagesCount: total,
            packageStatuses,
          });
        }
      })
    );
  }

  private async fetchAndWriteDtsFiles(
    pkgName: string,
    version: string,
    filesList: any[]
  ) {
    interface JSDelivrFile {
      name: string;
      type: "file" | "directory";
      files?: JSDelivrFile[];
    }

    const getDtsPaths = (files: JSDelivrFile[], currentPath = ""): string[] => {
      const paths: string[] = [];
      for (const f of files) {
        const fullPath = currentPath ? `${currentPath}/${f.name}` : f.name;
        if (f.type === "file" && /\.d\.(ts|mts|cts)$/.test(f.name)) {
          paths.push(fullPath);
        } else if (f.type === "directory" && f.files) {
          paths.push(...getDtsPaths(f.files, fullPath));
        }
      }
      return paths;
    };

    const dtsPaths = getDtsPaths(filesList);
    const files: Record<string, string> = {};

    await Promise.all(
      dtsPaths.map(async (filePath) => {
        try {
          const fileUrl = `https://cdn.jsdelivr.net/npm/${pkgName}@${version}/${filePath}`;
          const fileRes = await fetch(fileUrl);
          if (fileRes.ok) {
            const virtualPath = `/node_modules/${pkgName}/${filePath}`;
            files[virtualPath] = await fileRes.text();
          }
        } catch (e) {
          console.warn(`[TsService] Failed to fetch type file ${filePath} for ${pkgName}`, e);
        }
      })
    );

    if (Object.keys(files).length > 0) {
      await this.getRpc().call("writeFiles", { files });
    }
  }

  dispose() {
    this.worker?.terminate();
    this.worker = null;
    this.rpc = null;
    this.initPromise = null;
  }
}
