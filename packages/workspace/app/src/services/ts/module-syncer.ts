import { withRetry } from "@/utils/retry";
import { makeTsPath, tsPathToMonacoUri } from "@/utils/uri";
import { MonacoService } from "../monaco/monaco-service";
import { UbentoService } from "../ubento/ubento";
import { TsService } from "./ts-service";

export type ModuleData = {
  type: "module" | "board";
  name: string;
  moduleId: string;
  versionId: string;
};

export type ModuleStatus = ModuleData & {
  status: "idle" | "loading" | "loaded" | "unloading" | "error";
  error?: string;
};

export class ModuleSyncer {
  readonly workspaceId: string;

  private monaco: MonacoService;
  private tsService: TsService;
  private ubentoService: UbentoService;
  private onStatusChange: (status: ModuleStatus[]) => void;
  private modules: Map<string, ModuleStatus> = new Map();

  constructor({
    monaco,
    workspaceId,
    tsService,
    ubentoService,
    onStatusChange,
  }: {
    monaco: MonacoService;
    workspaceId: string;
    tsService: TsService;
    ubentoService: UbentoService;
    onStatusChange: (status: ModuleStatus[]) => void;
  }) {
    this.monaco = monaco;
    this.workspaceId = workspaceId;
    this.tsService = tsService;
    this.ubentoService = ubentoService;
    this.onStatusChange = onStatusChange;
  }

  private async fetchModuleVersionContent(
    moduleId: string,
    versionId: string,
  ): Promise<string> {
    return withRetry(() =>
      this.ubentoService.module.readModuleVersionFile(
        moduleId,
        versionId,
        "index.tsx",
      ),
    );
  }

  private async writeTsFile(path: string, content: string) {
    await this.tsService.writeFile(path, content);
  }

  private async removeTsFile(path: string) {
    await this.tsService.removeFile(path);
  }

  private getModuleVersionPath(moduleData: ModuleData) {
    return makeTsPath(
      this.workspaceId,
      moduleData.moduleId,
      moduleData.versionId,
    );
  }

  private getModuleSyntheticPath(moduleData: ModuleData) {
    switch (moduleData.type) {
      case "module":
        return `/modules/${moduleData.name}.tsx`;
      case "board":
        return `/boards/${moduleData.name}.tsx`;
    }
  }

  /**
   * Translates a synthetic proxy path (e.g., @/modules/badge.tsx)
   * to its underlying concrete version path.
   * If the path is not a recognized synthetic path, it returns the original.
   */
  public getConcretePath(path: string): string {
    for (const module of this.modules.values()) {
      const syntheticPath = this.getModuleSyntheticPath(module);
      if (
        path === syntheticPath ||
        path === syntheticPath.replace(/\.tsx?$/, "")
      ) {
        return this.getModuleVersionPath(module);
      }
    }

    return path;
  }

  private notify() {
    this.onStatusChange(Array.from(this.modules.values()));
  }

  public async updateModules(moduleDatas: ModuleData[]) {
    const nextMap = new Map(moduleDatas.map((m) => [m.moduleId, m]));
    const syncTasks: Promise<void>[] = [];
    let stateChanged = false;

    // 1. Process Removals
    for (const [id, existing] of this.modules) {
      if (!nextMap.has(id)) {
        this.modules.set(id, { ...existing, status: "unloading" });
        stateChanged = true;

        const removeTask = async () => {
          try {
            await this.removeTsFile(this.getModuleSyntheticPath(existing));
            await this.removeTsFile(this.getModuleVersionPath(existing));
            this.modules.delete(id);
            this.notify();
          } catch (e) {
            console.error(`Failed to unload module ${id}:`, e);
            this.modules.set(id, {
              ...existing,
              status: "error",
              error: e instanceof Error ? e.message : String(e),
            });
            this.notify();
          }
        };
        syncTasks.push(removeTask());
      }
    }

    // 2. Process Additions & Updates
    for (const next of moduleDatas) {
      const existing = this.modules.get(next.moduleId);

      const isNew = !existing;
      const isVersionUpdate = existing?.versionId !== next.versionId;
      const isPathUpdate =
        existing?.name !== next.name || existing?.type !== next.type;

      if (isNew || isVersionUpdate || isPathUpdate) {
        this.modules.set(next.moduleId, { ...next, status: "loading" });
        stateChanged = true;

        const updateTask = async () => {
          try {
            if (existing && isPathUpdate) {
              await this.removeTsFile(this.getModuleSyntheticPath(existing));
            }

            const content = await this.fetchModuleVersionContent(
              next.moduleId,
              next.versionId,
            );
            const versionPath = this.getModuleVersionPath(next);
            await this.writeTsFile(versionPath, content);

            const importPath = versionPath.replace(/\.tsx?$/, "");
            const proxyContent = `export * from "${importPath}";\nexport { default } from "${importPath}";`;
            await this.writeTsFile(
              this.getModuleSyntheticPath(next),
              proxyContent,
            );

            this.modules.set(next.moduleId, { ...next, status: "loaded" });
            this.notify();
          } catch (e) {
            console.error(`Failed to sync module ${next.moduleId}:`, e);
            this.modules.set(next.moduleId, {
              ...next,
              status: "error",
              error: e instanceof Error ? e.message : String(e),
            });
            this.notify();
          }
        };
        syncTasks.push(updateTask());
      }
    }

    if (stateChanged) {
      this.notify();
    }

    await Promise.all(syncTasks);
  }

  async getOrCreateMonacoModel(path: string) {
    const monaco = await this.monaco.getMonaco();
    const concretPath = this.getConcretePath(path);
    const uri = monaco.Uri.parse(tsPathToMonacoUri(concretPath));
    let model = monaco.editor.getModel(uri);
    if (model) {
      return model;
    }

    const content = await this.tsService.readFile(concretPath);
    model = monaco.editor.createModel(content, "ubento-tsx", uri);
    return model;
  }
}
