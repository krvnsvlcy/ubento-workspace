import { useWorkspaceEngine } from "@/contexts/workspace";
import { 
  X, 
  RefreshCw, 
  FileCode, 
  Package, 
  Terminal, 
  Loader2, 
  CheckCircle2, 
  AlertTriangle 
} from "lucide-react";
import { useState } from "react";

interface TsControlPanelProps {
  onClose: () => void;
}

type TabType = "overview" | "files" | "deps";

export function TsControlPanel({ onClose }: TsControlPanelProps) {
  const workspaceEngine = useWorkspaceEngine();
  const tsServiceStatus = workspaceEngine.useState((s) => s.tsServiceStatus);
  const spec = workspaceEngine.useState((s) => s.workspace.spec.data) as any;
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isReinitializing, setIsReinitializing] = useState(false);

  if (!tsServiceStatus) return null;

  const { status, message, loadedPackagesCount, totalPackagesCount, packageStatuses = {} } = tsServiceStatus;

  const handleReinitialize = async () => {
    setIsReinitializing(true);
    try {
      await workspaceEngine.getTsService().reinitialize();
    } catch (e) {
      console.error(e);
    } finally {
      setIsReinitializing(false);
    }
  };

  // Compile list of virtual VFS files
  const components = (spec?.components || {}) as Record<string, { id: string; versionId: string }>;
  const modules = (spec?.modules || {}) as Record<string, { id: string; versionId: string }>;
  const vfsFiles = [
    ...Object.entries(components).map(([name, ref]) => ({
      name,
      type: "component",
      virtualPath: `/workspace/modules/${ref.id}/${ref.versionId}.tsx`,
    })),
    ...Object.entries(modules).map(([name, ref]) => ({
      name,
      type: "module",
      virtualPath: `/workspace/modules/${ref.id}/${ref.versionId}.ts`,
    })),
  ];

  // Ingested packages from spec
  const packagesList = Object.entries((spec?.packages || {}) as Record<string, string>);

  return (
    <div className="absolute bottom-9 left-3 w-[450px] h-[380px] bg-background/95 backdrop-blur border border-border shadow-2xl rounded-xl flex flex-col overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-neutral-500/5 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-500" />
          <div>
            <h3 className="text-xs font-semibold text-foreground">TypeScript Workspace Service</h3>
            <p className="text-[10px] text-content-muted">Virtual Compiler and Typings VFS</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-content-muted hover:text-foreground p-1 hover:bg-neutral-500/10 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border text-[11px] bg-neutral-500/5 shrink-0">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex-1 py-2 text-center font-medium border-b-2 transition-all ${
            activeTab === "overview"
              ? "border-blue-500 text-foreground bg-background/40"
              : "border-transparent text-content-muted hover:text-foreground hover:bg-background/20"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("files")}
          className={`flex-1 py-2 text-center font-medium border-b-2 transition-all ${
            activeTab === "files"
              ? "border-blue-500 text-foreground bg-background/40"
              : "border-transparent text-content-muted hover:text-foreground hover:bg-background/20"
          }`}
        >
          VFS Files ({vfsFiles.length})
        </button>
        <button
          onClick={() => setActiveTab("deps")}
          className={`flex-1 py-2 text-center font-medium border-b-2 transition-all ${
            activeTab === "deps"
              ? "border-blue-500 text-foreground bg-background/40"
              : "border-transparent text-content-muted hover:text-foreground hover:bg-background/20"
          }`}
        >
          Typings Sync ({loadedPackagesCount}/{totalPackagesCount})
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 text-xs">
        {activeTab === "overview" && (
          <div className="flex flex-col gap-4 h-full justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-neutral-500/5">
                <span className="text-content-muted font-medium">Service State</span>
                <div className="flex items-center gap-1.5 font-semibold">
                  {status === "ready" && (
                    <span className="text-green-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                    </span>
                  )}
                  {status === "error" && (
                    <span className="text-red-500 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 animate-pulse" /> Error
                    </span>
                  )}
                  {status !== "ready" && status !== "error" && (
                    <span className="text-blue-500 flex items-center gap-1">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> In Progress
                    </span>
                  )}
                </div>
              </div>

              {message && (
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-content-muted uppercase font-semibold">Last Log Message</span>
                  <div className="p-2 bg-neutral-500/10 rounded font-mono text-[10px] text-content-muted break-all border border-border/50">
                    {message}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-border shrink-0">
              <button
                disabled={isReinitializing || status === "initializing"}
                onClick={handleReinitialize}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-medium rounded-lg transition-colors text-[11px]"
              >
                {isReinitializing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5" />
                )}
                <span>Reinitialize TypeScript Worker</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === "files" && (
          <div className="flex flex-col gap-2">
            <div className="text-[10px] text-content-muted uppercase font-semibold pb-1 border-b border-border/50">
              Virtual Workspace VFS Mapping
            </div>
            {vfsFiles.length === 0 ? (
              <div className="text-center py-6 text-content-muted">No files indexed in VFS.</div>
            ) : (
              <div className="flex flex-col gap-1.5 max-h-[220px]">
                {vfsFiles.map((file) => (
                  <div 
                    key={file.virtualPath}
                    className="flex flex-col gap-0.5 p-2 rounded border border-border bg-neutral-500/5 hover:bg-neutral-500/10 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-medium text-foreground">
                        <FileCode className="w-3 h-3 text-blue-400" />
                        <span>{file.name}</span>
                      </div>
                      <span className="text-[9px] uppercase font-semibold px-1 py-0.2 bg-neutral-500/20 text-content-muted rounded">
                        {file.type}
                      </span>
                    </div>
                    <div className="text-[9px] font-mono text-content-muted/80 truncate font-semibold">
                      {file.virtualPath}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "deps" && (
          <div className="flex flex-col gap-2">
            <div className="text-[10px] text-content-muted uppercase font-semibold pb-1 border-b border-border/50">
              Synchronized Package Typings (.d.ts)
            </div>
            {packagesList.length === 0 ? (
              <div className="text-center py-6 text-content-muted">No packages registered in spec.</div>
            ) : (
              <div className="flex flex-col gap-1.5 max-h-[220px]">
                {packagesList.map(([pkgName, version]) => {
                  const pkgStatus = packageStatuses[pkgName] || "pending";
                  return (
                    <div 
                      key={pkgName}
                      className="flex items-center justify-between p-2 rounded border border-border bg-neutral-500/5 hover:bg-neutral-500/10 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Package className="w-3.5 h-3.5 text-neutral-400" />
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground text-[11px]">{pkgName}</span>
                          <span className="text-[9px] text-content-muted">version: {version}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {pkgStatus === "success" && (
                          <span className="text-[10px] text-green-500 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Synced
                          </span>
                        )}
                        {pkgStatus === "error" && (
                          <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Failed
                          </span>
                        )}
                        {pkgStatus === "pending" && (
                          <span className="text-[10px] text-blue-500 font-semibold flex items-center gap-1 animate-pulse">
                            <Loader2 className="w-3 h-3 animate-spin" /> Fetching
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
