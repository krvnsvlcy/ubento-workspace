import { useWorkspaceEngine } from "@/contexts/workspace";
import { useUbento, useUbentoEngine } from "@/hooks/app-engine";
import { useEditingModule } from "@/hooks/workspace";
import { UpgradeModuleModal } from "@/modals/upgrade_module/upgrade_module";
import { Button } from "@ubento/bento.arlo-core";
import { useEffect, useState } from "react";
import { SplitView } from "../../components/split-view";
import { CodePanel } from "./code-panel";
import { EditorFooter } from "./footer/editor-footer";
import { Header, ViewMode } from "./header";
import { PreviewPanel } from "./preview-panel";
import { useModuleSource } from "./use-module-source";

export function Editor() {
  const workspaceEngine = useWorkspaceEngine();
  const appEngine = useUbentoEngine();
  const ubento = useUbento();
  const [mode, setMode] = useState<ViewMode>("split");

  const editingModule = useEditingModule();
  const moduleId = editingModule?.id || "";
  const versionId = editingModule?.versionId || "";

  // Get module data to determine if this is the latest version
  const { data: moduleData } = ubento.module.useModule(moduleId, {
    enabled: !!moduleId,
  });
  const latestVersionId = moduleData?.latest_version_id;
  const isLatestVersion = !latestVersionId || latestVersionId === versionId;

  // Lazily initialize Monaco and TS Services on editor mount
  useEffect(() => {
    workspaceEngine.getTsService().initialize();
    appEngine.getMonacoService().getMonaco();
  }, [workspaceEngine, appEngine]);

  const spec = workspaceEngine.store.getState().workspace.spec.data as any;
  let moduleName = "";
  let moduleType: "components" | "modules" = "components";

  if (spec) {
    const components = (spec.components || {}) as Record<
      string,
      { id: string; versionId: string }
    >;
    const modules = (spec.modules || {}) as Record<
      string,
      { id: string; versionId: string }
    >;
    const compEntry = Object.entries(components).find(
      ([_, ref]) => ref.id === moduleId,
    );
    if (compEntry) {
      moduleName = compEntry[0];
      moduleType = "components";
    } else {
      const modEntry = Object.entries(modules).find(
        ([_, ref]) => ref.id === moduleId,
      );
      if (modEntry) {
        moduleName = modEntry[0];
        moduleType = "modules";
      }
    }
  }

  const {
    content,
    setContent,
    status,
    save: saveModule,
    isDirty,
    error,
  } = useModuleSource({
    moduleId,
    versionId,
  });

  const handleCloseEditor = () => {
    workspaceEngine.userSetting.update({
      mode: "live",
      editingModule: undefined,
    });
  };

  const runUpgrade = async ({
    withConfirmation = true,
    moduleId,
    versionId,
    latestVersionId,
  }: {
    withConfirmation?: boolean;
    moduleId: string;
    versionId: string;
    latestVersionId: string;
  }) => {
    // 1. Get references that will be updated
    const refs = workspaceEngine.getModuleReferences({
      id: moduleId,
      versionId: versionId,
    });

    if (withConfirmation) {
      // 2. Open the UpgradeModuleModal
      const confirmed = await workspaceEngine.appEngine.openModal(
        UpgradeModuleModal,
        {
          moduleId,
          versionId,
          latestVersionId,
          refs,
        },
      );
      if (!confirmed) return;
    }

    // 3. If confirmed, update reference in spec and update editingModule settings
    await workspaceEngine.updateModuleReferences({
      refs,
      module: {
        id: moduleId,
        versionId: latestVersionId,
      },
    });

    workspaceEngine.userSetting.update({
      editingModule: {
        id: moduleId,
        versionId: latestVersionId,
      },
    });
  };
  const handleUpgrade = async () => {
    return runUpgrade({
      withConfirmation: true,
      moduleId,
      versionId,
      latestVersionId,
    });
  };

  const handleSave = async () => {
    if (!isLatestVersion || !isDirty) return;
    const mod = await saveModule();
    await runUpgrade({
      withConfirmation: false,
      moduleId: mod.id,
      versionId,
      latestVersionId: mod.latest_version_id,
    });
  };

  // Keyboard shortcut listener for Ctrl+S / Cmd+S when outside the editor
  useEffect(() => {
    if (!isLatestVersion) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [content, saveModule, isLatestVersion]);

  return (
    <div className="absolute inset-0 bg-background flex flex-col z-50">
      <Header
        onClose={handleCloseEditor}
        mode={mode}
        isDirty={isDirty}
        onModeChange={setMode}
        moduleStatus={status}
        error={error}
      />

      {!isLatestVersion && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 shrink-0">
          <div className="flex items-center gap-2">
            <span>
              You are viewing an older version of this module. Edit is disabled.
            </span>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-amber-500/30 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 h-7"
            onClick={handleUpgrade}
          >
            Upgrade to Latest Version
          </Button>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {mode === "code" && (
          <CodePanel
            value={content}
            onChange={setContent}
            status={status}
            readOnly={!isLatestVersion}
            onSave={handleSave}
            className="border-none"
            workspaceId={workspaceEngine.workspaceId}
            moduleId={moduleId}
            versionId={versionId}
          />
        )}
        {mode === "preview" && (
          <PreviewPanel value={content} className="border-none" />
        )}
        {mode === "split" && (
          <SplitView
            left={
              <CodePanel
                value={content}
                onChange={setContent}
                status={status}
                readOnly={!isLatestVersion}
                onSave={handleSave}
                workspaceId={workspaceEngine.workspaceId}
                moduleId={moduleId}
                versionId={versionId}
                className="border-r border-border"
              />
            }
            right={<PreviewPanel value={content} />}
            initialPosition={40}
          />
        )}
      </div>
      <EditorFooter />
    </div>
  );
}
