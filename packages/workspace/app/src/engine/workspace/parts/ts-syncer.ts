import { ModuleData } from "@/services/ts/module-syncer";
import { TsService } from "@/services/ts/ts-service";
import { WorkspaceSpec } from "@ubento/bento.runtime";
import { dequal } from "dequal/lite";
import type { WorkspaceEngine } from "../engine";

export class TsSyncer {
  private unsubscribers: (() => void)[] = [];

  constructor(
    private engine: WorkspaceEngine,
    private extra: {
      getServiceSpec: (channelId: string) => Promise<any>;
    },
  ) {}

  getTsService(): TsService {
    if (this.engine.tsService) {
      return this.engine.tsService;
    }

    const { workspace, logger, appEngine, store, userSetting } = this.engine;

    const tsService = new TsService({
      workspaceId: workspace.id,
      logger: logger,
      monacoService: appEngine.getMonacoService(),
      ubentoService: appEngine.ubento,
      onStatusChange: (status) => {
        store.setState({ tsServiceStatus: status });
      },
      onPackageStatusesChange: (statuses) => {
        store.setState({ packageStatuses: statuses });
      },
      onModuleStatusesChange: (statuses) => {
        store.setState({ moduleStatuses: statuses });
      },
      onOpenEditor: (moduleId, versionId) => {
        userSetting.update({
          editingModule: { id: moduleId, versionId: versionId },
          mode: "edit",
        });
      },
    });

    this.engine.tsService = tsService;

    const workspaceSpec = store.getState().workspace.spec;

    // service spec syncer
    const syncServiceSpecs = async (services: Record<string, any>) => {
      const specs: Record<string, any> = {};
      await Promise.all(
        Object.entries(services).map(async ([name, serviceData]) => {
          try {
            const spec = await this.extra.getServiceSpec(
              (serviceData as any).channelId,
            );
            if (spec.isValid) {
              specs[name] = spec.data;
            }
          } catch (err) {
            logger.error(`Failed to fetch service spec for ${name}`, {
              event: "ts.service.spec.fetch.failure",
              error: String(err),
            });
          }
        }),
      );
      if (this.engine.tsService) {
        await this.engine.tsService.updateServiceSpecs(specs);
      }
    };

    if (workspaceSpec.isValid) {
      syncServiceSpecs(workspaceSpec.data.services || {});
    }

    const unsubSpecs = store.subscribe((state, prev) => {
      if (state.workspace.spec.isValid) {
        const services = state.workspace.spec.data.services || {};
        const prevServices = (prev.workspace.spec.data as any)?.services || {};
        if (dequal(services, prevServices)) return;
        syncServiceSpecs(services);
      }
    });

    // package syncer
    if (workspaceSpec.isValid) {
      tsService.updatePackages(
        Object.entries({
          ...workspaceSpec.data.packages,
          react: "19",
          "react-dom": "19",
          "@tanstack/react-query": "5",
        }).map(([name, version]) => ({ name, version })),
      );
    }

    const unsubPackages = store.subscribe((state, prev) => {
      if (state.workspace.spec.isValid) {
        const workspaceSpec = state.workspace.spec.data;

        const packages = workspaceSpec.packages || {};
        const prevPackages = (prev.workspace.spec.data as any).packages || {};
        if (dequal(packages, prevPackages)) return;

        this.engine.tsService?.updatePackages(
          Object.entries({
            ...(workspaceSpec.packages || {}),
            react: "19",
            "react-dom": "19",
            "@tanstack/react-query": "5",
          }).map(([name, version]) => ({ name, version })),
        );
      }
    });

    // module syncer
    const getModuleData = (ws: WorkspaceSpec): ModuleData[] => {
      return [
        ...Object.entries(ws.modules || {}).map(([name, m]) => ({
          type: "module",
          name,
          moduleId: m.id,
          versionId: m.versionId,
        })),
        ...Object.values(ws.boards || {}).map((b) => ({
          type: "board",
          name: b.title,
          moduleId: b.module.id,
          versionId: b.module.versionId,
        })),
      ] as ModuleData[];
    };

    if (workspaceSpec.isValid) {
      tsService.moduleSyncer.updateModules(getModuleData(workspaceSpec.data));
    }

    const unsubModules = store.subscribe((state, prev) => {
      const workspaceSpec = state.workspace.spec;
      const prevWorkspaceSpec = prev.workspace.spec;
      const data = workspaceSpec.isValid
        ? getModuleData(workspaceSpec.data)
        : [];
      const prevData = prevWorkspaceSpec.isValid
        ? getModuleData(prevWorkspaceSpec.data)
        : [];
      if (dequal(data, prevData)) return;
      this.engine.tsService?.moduleSyncer.updateModules(data);
    });

    this.unsubscribers.push(unsubSpecs, unsubPackages, unsubModules);

    return tsService;
  }

  public destroy() {
    for (const unsub of this.unsubscribers) {
      unsub();
    }
    this.engine.tsService?.dispose();
    this.engine.tsService = null;
  }
}
