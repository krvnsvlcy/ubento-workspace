import { createDuplexRpc, createWorkerPort, DuplexRpc } from "@ubento/rpc";
import { Logger } from "@ubento/telemetry";
import { Subscription } from "rxjs";
import { MonacoService } from "../monaco/monaco-service";
import { UbentoService } from "../ubento/ubento";
import { ModuleStatus, ModuleSyncer } from "./module-syncer";
import {
  PackageData,
  PackageInstallStatus,
  TsPackageManager,
} from "./package_manager/package_manager";
import { createJsdelivrRegistry } from "./package_manager/registry";
import { TypeDefStore } from "./package_manager/typedef_store";
import { ubentoDeclaration } from "./package_manager/ubento-declaration";
import { generateServiceDeclarations } from "./package_manager/service-declaration-generator.js";
import { MainToTsWorkerRpcDef, TsWorkerToMainRpcDef } from "./rpc";

export type TsServiceStatus = {
  status: "idle" | "initializing" | "ready" | "error";
  error?: string;
};

export class TsService {
  private workspaceId: string;
  private monacoService: MonacoService;
  private logger: Logger;

  private worker: Worker | null = null;
  private rpc: DuplexRpc<TsWorkerToMainRpcDef, MainToTsWorkerRpcDef> | null =
    null;
  onOpenEditor?: (moduleId: string, versionId: string) => void;
  private initPromise: Promise<void> | null = null;

  private onStatusChange?: (status: TsServiceStatus) => void;
  private typeDefStore: TypeDefStore;
  private packageManager: TsPackageManager;
  private packageStatusesSubscription: Subscription | null = null;
  readonly moduleSyncer: ModuleSyncer;

  constructor({
    workspaceId,
    logger,
    monacoService,
    ubentoService,
    onStatusChange,
    onPackageStatusesChange,
    onModuleStatusesChange,
    onOpenEditor,
  }: {
    workspaceId: string;
    logger: Logger;
    monacoService: MonacoService;
    ubentoService: UbentoService;
    onStatusChange?: (status: TsServiceStatus) => void;
    onPackageStatusesChange?: (
      statuses: Record<string, PackageInstallStatus>,
    ) => void;
    onModuleStatusesChange?: (statuses: ModuleStatus[]) => void;
    onOpenEditor?: (moduleId: string, versionId: string) => void;
  }) {
    this.workspaceId = workspaceId;
    this.logger = logger;
    this.monacoService = monacoService;
    this.onStatusChange = onStatusChange;
    this.onOpenEditor = onOpenEditor;
    this.typeDefStore = new TypeDefStore({
      registries: {
        [TypeDefStore.defaultRegistryName]: createJsdelivrRegistry(),
      },
      logger: this.logger.child({
        module: "type-def-store",
      }),
    });
    this.packageManager = new TsPackageManager({
      typeDefStore: this.typeDefStore,
      writer: {
        writeFiles: async (files) => {
          await this.getRpc().call("writeFiles", { files });
        },
      },
      logger: this.logger.child({
        module: "package-manager",
      }),
      onStatusesChange: onPackageStatusesChange,
    });
    this.moduleSyncer = new ModuleSyncer({
      workspaceId: this.workspaceId,
      tsService: this,
      monaco: this.monacoService,
      ubentoService,
      onStatusChange: (statuses) => {
        onModuleStatusesChange?.(statuses);
      },
    });
  }

  async reinitialize(): Promise<void> {
    this.dispose();
    await this.initialize();
  }

  async initialize(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = (async () => {
      try {
        this.onStatusChange?.({ status: "initializing" });

        // 1. Spin up the TS web worker
        const url = new URL("./ts.worker.ts", import.meta.url);
        console.log("Ts Worker URL:", url.toString());
        this.worker = new Worker(url, {
          type: "module",
        });

        // 2. Setup RPC bridge
        this.rpc = createDuplexRpc<TsWorkerToMainRpcDef, MainToTsWorkerRpcDef>({
          port: createWorkerPort(this.worker),
          handlers: {
            invalidated: async ({ uris }) => {
              for (const uri of uris) {
                await this.monacoService.updateFileDiagnostics(uri);
              }
            },
          },
        });

        this.rpc.watch((event) => {
          this.logger.info("TS RPC event", {
            event: "ts.worker.event",
            ...event,
          });
        });
        this.rpc.run();

        // Configure compiler for a modern React WorkOS environment
        await this.rpc.egress.setCompilerOptions({
          target: "ES2022",
          module: "ESNext",
          jsx: "react-jsx", // Supports modern React 17+ (no need to import React)
          strict: true,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          skipLibCheck: true, // Massive performance boost in the web worker
          isolatedModules: true, // Ensures compatibility with fast transpilers like esbuild
          allowImportingTsExtensions: true,
          allowArbitraryExtensions: true,
          baseUrl: "/",
          paths: {
            "@/modules/*": [`modules/*`],
          },
        });

        // 3. Load core lib definitions
        const defaultLibs = await this.typeDefStore.getDefaultLibs("5.3.3");
        const files: Record<string, string> = {};
        for (const [path, content] of Object.entries(defaultLibs)) {
          files[`/lib/${path}`] = content;
        }
        files["/lib/ubento.d.ts"] = ubentoDeclaration;

        if (Object.keys(files).length > 0) {
          await this.getRpc().call("writeFiles", { files });
        }

        this.monacoService.registerWorkspace(this.workspaceId, this);
        this.onStatusChange?.({ status: "ready" });
      } catch (e: unknown) {
        this.logger.error("TS Service initialization failed", {
          event: "ts.service.init.failure",
          error: String(e),
        });
        this.onStatusChange?.({ status: "error", error: String(e) });
        this.monacoService.unregisterWorkspace(this.workspaceId);
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

  async readFile(path: string): Promise<string> {
    await this.initialize();
    const res = await this.getRpc().egress.readFile(path);
    return res?.text || "";
  }
  async writeFile(path: string, content: string): Promise<void> {
    await this.initialize();
    await this.getRpc().egress.writeFiles({
      files: {
        [path]: content,
      },
    });
  }
  async removeFile(path: string): Promise<void> {
    await this.initialize();
    await this.getRpc().egress.removeFiles({
      uris: [path],
    });
  }
  async updateServiceSpecs(specs: Record<string, any>): Promise<void> {
    const declaration = generateServiceDeclarations(specs);
    await this.writeFile("/lib/services.d.ts", declaration);
  }
  async listFiles(): Promise<string[]> {
    await this.initialize();
    return this.getRpc().egress.listFiles(undefined);
  }

  dispose() {
    this.monacoService.unregisterWorkspace(this.workspaceId);
    this.packageStatusesSubscription?.unsubscribe();
    this.packageStatusesSubscription = null;
    this.worker?.terminate();
    this.worker = null;
    this.rpc = null;
    this.initPromise = null;
  }

  updatePackages(packages: PackageData[]) {
    this.packageManager.updatePackages(packages);
  }
}
