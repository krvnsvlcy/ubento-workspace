import { CodeEditor } from "@/components/code-editor.js";
import { useWorkspaceEngine } from "@/contexts/workspace.js";
import { useUbentoEngine } from "@/hooks/app-engine";
import { Button, PendingView } from "@ubento/bento.arlo-core";
import { Check, Copy, Save, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Editor({
  activeBoardId,
  onClose,
}: {
  activeBoardId: string;
  onClose: () => void;
}) {
  const appEngine = useUbentoEngine();
  const workspaceEngine = useWorkspaceEngine();
  const spec = workspaceEngine.useState((state) => state.workspace.spec);

  const [copied, setCopied] = useState(false);
  const [sourceCode, setSourceCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Retrieve active board metadata from the workspace spec
  const boardMeta =
    spec?.isValid && activeBoardId
      ? spec.data?.boards?.[activeBoardId]
      : undefined;
  const moduleId = boardMeta?.module.id;
  const versionId = boardMeta?.module.versionId;

  // Sync board module source code
  useEffect(() => {
    if (moduleId) {
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
  }, [moduleId, versionId, appEngine]);

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
    } catch (err: any) {
      setError(err.message || "Failed to save board source code");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-background flex flex-col z-50">
      {/* Premium Glassmorphic Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-surface/30 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-base animate-pulse" />
          <span className="text-sm font-semibold text-content">
            {boardMeta?.title ? `Editing: ${boardMeta.title}` : "Edit Board"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="h-8 text-xs"
            disabled={loading}
          >
            {copied ? (
              <Check size={14} className="text-base mr-1.5" />
            ) : (
              <Copy size={14} className="mr-1.5" />
            )}
            {copied ? "Copied" : "Copy Code"}
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={handleSaveCode}
            className="h-8 text-xs"
            disabled={loading || saving}
          >
            <Save size={14} className="mr-1.5" />
            {saving ? "Saving..." : "Save Code"}
          </Button>
          <div className="w-[1px] h-4 bg-border mx-1" />
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="h-8 w-8 p-0 rounded-lg text-content-muted hover:text-content hover:bg-surface/50"
          >
            <X size={16} />
          </Button>
        </div>
      </div>

      {/* Main split view container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Code Editor */}
        <div className="w-1/2 h-full flex flex-col p-4 border-r border-border gap-3 bg-surface/10">
          {error && (
            <div className="text-xs text-content bg-surface p-3 rounded-xl border border-border flex gap-2 items-center shrink-0">
              <span>{error}</span>
            </div>
          )}
          <div className="flex-1 relative border border-border rounded-xl overflow-hidden focus-within:border-border/40 transition-colors bg-background">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-surface/10">
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

        {/* Right Side: Preview Iframe */}
        <div className="w-1/2 h-full relative bg-surface/5">
          <iframe
            src={appEngine.workspaceRuntimeUrl}
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
        </div>
      </div>
    </div>
  );
}
