import { CodeEditor } from "@/components/code-editor.js";
import { ErrorView } from "@/components/error.js";
import { useWorkspaceEngine } from "@/contexts/workspace.js";
import { useUbentoEngine } from "@/hooks/app-engine";
import { Button, PendingView, TabSwitch } from "@ubento/bento.arlo-core";
import { Check, Copy, Save } from "lucide-react";
import React, { useState } from "react";
import { If } from "react-if";
import { WorkspaceEngine } from "../../../../engine/workspace/engine.js";

function WorkspaceOverlay({ engine }: { engine: WorkspaceEngine }) {
  const workspaceName = engine.useState((state) => state.workspace.title);
  const workspaceSlug = engine.useState((state) => state.workspace.slug);
  const runtimeStatus = engine.useState((state) => state.status);

  if (runtimeStatus === "ready") {
    return <></>;
  }

  let content = <></>;

  if (runtimeStatus === "error") {
    content = <ErrorView message="Failed to load workspace" />;
  } else {
    content = (
      <PendingView message={workspaceName || workspaceSlug || "Workspace"} />
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1000,
      }}
      className="bg-background"
    >
      {content}
    </div>
  );
}

function InvalidSpecOverlay({ engine }: { engine: WorkspaceEngine }) {
  const specIssues = engine.useState((state) => {
    const spec = state.workspace.spec;
    if (!spec.isValid) {
      return spec.issues;
    }
    return undefined;
  });

  if (!specIssues?.length) {
    return null;
  }

  const handleReset = () => {
    engine.updateWorkspaceSpec({
      spec: {},
      overwrite: true,
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1001,
      }}
      className="bg-background"
    >
      <ErrorView
        message="Workspace specification is invalid"
        details={
          specIssues && specIssues.length > 0 ? (
            <pre className="max-w-[600px] max-h-[200px] overflow-auto text-[12px] whitespace-pre-wrap text-left">
              {specIssues
                ?.map(
                  (issue) => `${issue.location.join(".")}: ${issue.message}`,
                )
                .join("\n")}
            </pre>
          ) : undefined
        }
        action={{
          label: "Reset Workspace Spec",
          handler: handleReset,
        }}
      />
    </div>
  );
}

export function WorkspaceContent() {
  const appEngine = useUbentoEngine();
  const activeBoardId = appEngine.useState((state) => state.location.board);
  const workspaceEngine = useWorkspaceEngine();
  const mode = workspaceEngine.useState((state) => state.mode);
  const spec = workspaceEngine.useState((state) => state.workspace.spec);

  const [editMode, setEditMode] = useState<"code" | "preview">("preview");
  const [copied, setCopied] = useState(false);
  const [sourceCode, setSourceCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadCounter, setReloadCounter] = useState(0);

  // Retrieve active board metadata from the workspace spec
  const boardMeta =
    spec?.isValid && activeBoardId
      ? spec.data?.boards?.[activeBoardId]
      : undefined;
  const moduleId = boardMeta?.module.id;
  const versionId = boardMeta?.module.versionId;

  // Auto-reset editMode to preview when active board changes or is deselected
  React.useEffect(() => {
    if (!activeBoardId) {
      setEditMode("preview");
    }
  }, [activeBoardId]);

  // Sync board module source code when switching to code mode
  React.useEffect(() => {
    if (editMode === "code" && moduleId) {
      setLoading(true);
      setError(null);
      appEngine.ubento.sdk.module
        .getModule(moduleId)
        .then(async (mod) => {
          const vId = versionId || mod.latest_version_id || "";
          const fileContent =
            await appEngine.ubento.sdk.module.readModuleVersionFile(
              moduleId,
              vId,
              "index.tsx",
            );
          setSourceCode(fileContent);
        })
        .catch((err) => {
          setError(err.message || "Failed to load board source code");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [editMode, moduleId, versionId, appEngine]);

  const handleCopy = () => {
    navigator.clipboard.writeText(sourceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveCode = async () => {
    if (!moduleId || !activeBoardId) return;
    setSaving(true);
    setError(null);
    try {
      const newModule = await appEngine.ubento.sdk.module.saveModuleVersion(
        moduleId,
        {
          content: sourceCode,
        },
      );

      const wsSpec = spec?.isValid ? spec.data : undefined;
      const boards = { ...(wsSpec?.boards || {}) };
      if (boards[activeBoardId]) {
        boards[activeBoardId] = {
          ...boards[activeBoardId],
          module: { id: moduleId, versionId: newModule.latest_version_id },
        };
        workspaceEngine.updateWorkspaceSpec({
          spec: {
            ...wsSpec,
            boards,
          } as any,
        });
      }

      setReloadCounter((prev) => prev + 1);
      setEditMode("preview");
    } catch (err: any) {
      setError(err.message || "Failed to save board source code");
    } finally {
      setSaving(false);
    }
  };

  const canEdit = mode === "edit" && !!activeBoardId;

  return (
    <div className="h-full w-full relative overflow-hidden flex flex-col">
      <If condition={canEdit}>
        <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-border bg-neutral-surface/30 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold text-neutral-content">
              {boardMeta?.title
                ? `Editing: ${boardMeta.title}`
                : "Board Canvas"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {editMode === "code" && (
              <div className="flex items-center gap-2 mr-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopy}
                  className="h-7 text-[11px]"
                  disabled={loading}
                >
                  {copied ? (
                    <Check size={12} className="text-success mr-1" />
                  ) : (
                    <Copy size={12} className="mr-1" />
                  )}
                  {copied ? "Copied" : "Copy Code"}
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleSaveCode}
                  className="h-7 text-[11px]"
                  disabled={loading || saving}
                >
                  <Save size={12} className="mr-1" />
                  {saving ? "Saving..." : "Save Code"}
                </Button>
              </div>
            )}
            <TabSwitch
              options={[
                { key: "preview", label: "Preview" },
                { key: "code", label: "Code" },
              ]}
              value={editMode}
              onChange={(val: any) => {
                setEditMode(val);
                setError(null);
              }}
            />
          </div>
        </div>
      </If>
      <div className="flex-1 relative">
        <iframe
          src={appEngine.workspaceRuntimeUrl}
          key={`${workspaceEngine.id}-${reloadCounter}`}
          onLoad={(e) => {
            if (e.currentTarget.contentWindow) {
              workspaceEngine.init(e.currentTarget.contentWindow);
            }
          }}
          style={{
            height: "100%",
            width: "100%",
            border: "none",
            outline: "none",
          }}
        />

        <If condition={canEdit && editMode === "code"}>
          <div className="absolute inset-0 bg-background flex flex-col p-4 gap-3 z-50">
            {error && (
              <div className="text-xs text-destructive-content bg-destructive-surface p-2.5 rounded-lg border border-destructive-border flex gap-2 items-center shrink-0">
                <span>{error}</span>
              </div>
            )}
            <div className="flex-1 relative border border-neutral-border rounded-xl overflow-hidden focus-within:border-accent/40 transition-colors bg-background">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-surface/10">
                  <PendingView message="Loading code..." />
                </div>
              ) : (
                <CodeEditor
                  value={sourceCode}
                  onChange={setSourceCode}
                  language="tsx"
                  lineNumbers={true}
                  className="w-full h-full"
                />
              )}
            </div>
          </div>
        </If>
      </div>

      <WorkspaceOverlay engine={workspaceEngine} />
      <InvalidSpecOverlay engine={workspaceEngine} />
    </div>
  );
}
