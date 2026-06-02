import { makeTsPath } from "@/utils/uri";
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
};

export class ModuleSyncer {
  readonly workspaceId: string;
  private tsService: TsService;
  private ubentoService: UbentoService;
  private onStatusChange: (status: ModuleStatus[]) => void;
  private modules: Map<string, ModuleStatus> = new Map();

  constructor({
    workspaceId,
    tsService,
    ubentoService,
    onStatusChange,
  }: {
    workspaceId: string;
    tsService: TsService;
    ubentoService: UbentoService;
    onStatusChange: (status: ModuleStatus[]) => void;
  }) {
    this.workspaceId = workspaceId;
    this.tsService = tsService;
    this.ubentoService = ubentoService;
    this.onStatusChange = onStatusChange;
  }

  private async fetchModuleVersionContent(
    moduleId: string,
    versionId: string,
  ): Promise<string> {
    return this.ubentoService.module.readModuleVersionFile(
      moduleId,
      versionId,
      "index.tsx",
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

  private notify() {
    this.onStatusChange(Array.from(this.modules.values()));
  }

  public async updateModules(moduleDatas: ModuleData[]) {
    const nextMap = new Map(moduleDatas.map((m) => [m.moduleId, m]));
    const syncTasks: Promise<void>[] = [];
    let stateChanged = false;

    // 1. Process Removals: Find modules that exist in state but not in the new array
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
            this.modules.set(id, { ...existing, status: "error" });
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
            // If the user renamed the module or changed its type, clean up the old proxy path
            if (existing && isPathUpdate) {
              await this.removeTsFile(this.getModuleSyntheticPath(existing));
            }

            // Fetch real code
            const content = await this.fetchModuleVersionContent(
              next.moduleId,
              next.versionId,
            );
            const versionPath = this.getModuleVersionPath(next);
            await this.writeTsFile(versionPath, content);

            // Construct the synthetic proxy file to keep imports clean and TS Server fast.
            // Note: Stripping the .tsx extension for standard TypeScript import resolution.
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
            this.modules.set(next.moduleId, { ...next, status: "error" });
            this.notify();
          }
        };
        syncTasks.push(updateTask());
      }
    }

    // Emit initial loading/unloading states immediately before awaiting tasks
    if (stateChanged) {
      this.notify();
    }

    // Run all file I/O and TS server updates concurrently for maximum speed
    await Promise.all(syncTasks);
  }
}
