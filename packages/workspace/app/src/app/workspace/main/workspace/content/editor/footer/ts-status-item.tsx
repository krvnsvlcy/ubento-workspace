import { useWorkspaceEngine } from "@/contexts/workspace";
import { Tooltip } from "@ubento/bento.arlo-core";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Package,
} from "lucide-react";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

function TsStatusPanel() {
  const workspaceEngine = useWorkspaceEngine();
  const tsServiceStatus = workspaceEngine.useState((s) => s.tsServiceStatus);
  const packageStatuses = workspaceEngine.useState((s) => s.packageStatuses);
  const moduleStatuses = workspaceEngine.useState((s) => s.moduleStatuses) || [];

  const [activeTab, setActiveTab] = useState<"status" | "files" | "modules">("status");
  const [loadedFiles, setLoadedFiles] = useState<string[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const packages = Object.values(packageStatuses || {});
  const totalPackagesCount = packages.length;
  const loadedPackagesCount = packages.filter(
    (p) => p.state === "installed" || p.state === "failed",
  ).length;

  const isSyncing = packages.some(
    (p) => p.state === "installing" || p.state === "pending",
  );

  const progressPercent =
    totalPackagesCount > 0
      ? Math.round((loadedPackagesCount / totalPackagesCount) * 100)
      : 0;

  const status = tsServiceStatus?.status || "idle";
  const errorMessage = tsServiceStatus?.error;

  useEffect(() => {
    if (activeTab === "files") {
      setLoadingFiles(true);
      workspaceEngine
        .getTsService()
        .listFiles()
        .then((files) => {
          setLoadedFiles(files || []);
        })
        .catch((err) => {
          console.error("Failed to load TS files:", err);
        })
        .finally(() => {
          setLoadingFiles(false);
        });
    }
  }, [activeTab, workspaceEngine]);

  const filteredFiles = useMemo(() => {
    if (!searchQuery) return loadedFiles;
    const lowerQuery = searchQuery.toLowerCase();
    return loadedFiles.filter((f) => f.toLowerCase().includes(lowerQuery));
  }, [loadedFiles, searchQuery]);

  const getStatusTextColor = () => {
    switch (status) {
      case "ready":
        return isSyncing ? "text-blue-500" : "text-green-500";
      case "error":
        return "text-red-500";
      default:
        return "text-blue-500";
    }
  };

  return (
    <div className="w-72 p-4 select-none">
      {/* Header */}
      <div className="flex items-center gap-2 pb-2 mb-3 border-b border-border">
        <Activity className="w-4 h-4 text-content-muted" />
        <span className="text-xs font-semibold text-foreground">
          TypeScript Language Server
        </span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-3 -mx-4 px-4 gap-4">
        <button
          onClick={() => setActiveTab("status")}
          className={`pb-1.5 text-[11px] font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === "status"
              ? "border-blue-500 text-foreground"
              : "border-transparent text-content-muted hover:text-foreground"
          }`}
        >
          Status
        </button>
        <button
          onClick={() => setActiveTab("files")}
          className={`pb-1.5 text-[11px] font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === "files"
              ? "border-blue-500 text-foreground"
              : "border-transparent text-content-muted hover:text-foreground"
          }`}
        >
          <span>Files</span>
          {loadedFiles.length > 0 && (
            <span className="text-[9px] px-1 bg-surface border border-border rounded text-content-muted font-normal">
              {loadedFiles.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("modules")}
          className={`pb-1.5 text-[11px] font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === "modules"
              ? "border-blue-500 text-foreground"
              : "border-transparent text-content-muted hover:text-foreground"
          }`}
        >
          <span>Modules</span>
          {moduleStatuses.length > 0 && (
            <span className="text-[9px] px-1 bg-surface border border-border rounded text-content-muted font-normal">
              {moduleStatuses.length}
            </span>
          )}
        </button>
      </div>

      {activeTab === "status" && (
        <>
          {/* Main Status Row */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-content-muted">Server Status:</span>
              <span className={`font-semibold capitalize ${getStatusTextColor()}`}>
                {status === "ready" && isSyncing ? "Syncing Typings" : status}
              </span>
            </div>

            {errorMessage && (
              <div className="text-[10px] font-mono text-red-500 bg-red-500/5 p-2 rounded border border-red-500/20 max-h-[80px] overflow-y-auto break-all">
                {errorMessage}
              </div>
            )}

            {/* Sync Progress Bar */}
            {isSyncing && totalPackagesCount > 0 && (
              <div className="pt-1.5 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] text-content-muted">
                  <span>Resolving typings...</span>
                  <span className="font-mono">
                    {loadedPackagesCount} / {totalPackagesCount} ({progressPercent}
                    %)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${progressPercent}%` }}
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Packages list */}
          <div className="pt-3 border-t border-border mt-3">
            <div className="text-[11px] font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-content-muted" />
              <span>Type Definitions</span>
            </div>
            {packages.length > 0 ? (
              <div className="space-y-1 max-h-[160px] overflow-y-auto pr-1">
                {packages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className="flex items-center justify-between text-[10px] py-0.5"
                  >
                    <span
                      className="font-mono text-content truncate max-w-[160px]"
                      title={`${pkg.name}@${pkg.version}`}
                    >
                      {pkg.name}
                      <span className="text-[9px] text-content-muted ml-1">
                        v{pkg.version}
                      </span>
                    </span>
                    <div className="flex items-center gap-1">
                      {pkg.state === "installed" && (
                        <span className="text-green-500 font-medium">
                          Installed
                        </span>
                      )}
                      {pkg.state === "installing" && (
                        <span className="text-blue-500 font-medium animate-pulse">
                          Installing...
                        </span>
                      )}
                      {pkg.state === "pending" && (
                        <span className="text-content-muted">Pending</span>
                      )}
                      {pkg.state === "failed" && (
                        <Tooltip
                          delayDuration={200}
                          sideOffset={4}
                          content={pkg.error || "Unknown resolution failure"}
                        >
                          <span className="text-red-500 font-medium cursor-help">
                            Failed
                          </span>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[10px] text-content-muted italic py-1">
                No packages installed
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === "files" && (
        <>
          {loadingFiles ? (
            <div className="flex flex-col items-center justify-center py-8 text-content-muted gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
              <span className="text-xs">Loading loaded files...</span>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter files..."
                  className="w-full text-[11px] px-2 py-1 bg-surface border border-border rounded outline-none focus:border-blue-500/50 text-foreground"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1.5 text-content-muted hover:text-foreground text-[10px] cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* List */}
              {filteredFiles.length > 0 ? (
                <div className="space-y-0.5 max-h-[180px] overflow-y-auto pr-1 font-mono text-[9px] text-content-muted break-all">
                  {filteredFiles.map((file) => {
                    const parts = file.split("/");
                    const filename = parts.pop();
                    const dirPath = parts.join("/");
                    return (
                      <div
                        key={file}
                        className="py-1 px-1.5 hover:bg-neutral-500/5 dark:hover:bg-neutral-500/10 rounded transition-colors flex flex-col"
                        title={file}
                      >
                        <span className="text-foreground font-medium">{filename}</span>
                        {dirPath && (
                          <span className="text-[8px] text-content-muted truncate">
                            {dirPath}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-[10px] text-content-muted italic py-4 text-center">
                  {searchQuery ? "No files match search" : "No files loaded"}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {activeTab === "modules" && (
        <div className="space-y-2">
          {moduleStatuses.length > 0 ? (
            <div className="space-y-1 max-h-[180px] overflow-y-auto pr-1">
              {moduleStatuses.map((mod) => (
                <div
                  key={mod.moduleId}
                  className="flex items-center justify-between text-[10px] py-0.5 border-b border-border/20 last:border-b-0"
                >
                  <div className="flex flex-col truncate pr-2">
                    <span
                      className="font-mono text-foreground font-medium truncate"
                      title={mod.name}
                    >
                      {mod.name || "Unnamed"}
                    </span>
                    <span className="text-[8px] text-content-muted capitalize">
                      {mod.type} • {mod.moduleId.slice(0, 8)}...
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {mod.status === "loaded" && (
                      <span className="text-green-500 font-medium">Ready</span>
                    )}
                    {mod.status === "loading" && (
                      <span className="text-blue-500 font-medium animate-pulse">
                        Syncing...
                      </span>
                    )}
                    {mod.status === "unloading" && (
                      <span className="text-content-muted">Unloading...</span>
                    )}
                    {mod.status === "error" && (
                      <span className="text-red-500 font-medium">Error</span>
                    )}
                    {mod.status === "idle" && (
                      <span className="text-content-muted">Idle</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-[10px] text-content-muted italic py-4 text-center">
              No modules synchronized
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function TsStatusItem({
  showPanel,
}: {
  showPanel: (node: ReactNode, anchor: Element) => void;
}) {
  const workspaceEngine = useWorkspaceEngine();
  const tsServiceStatus = workspaceEngine.useState((s) => s.tsServiceStatus);
  const packageStatuses = workspaceEngine.useState((s) => s.packageStatuses);

  const ref = useRef<HTMLButtonElement>(null);

  const packages = Object.values(packageStatuses || {});
  const total = packages.length;
  const loaded = packages.filter(
    (p) => p.state === "installed" || p.state === "failed",
  ).length;
  const isSyncing = packages.some(
    (p) => p.state === "installing" || p.state === "pending",
  );
  const hasFailed = packages.some((p) => p.state === "failed");

  const status = tsServiceStatus?.status || "idle";

  const getStatusIcon = () => {
    if (status === "error") {
      return (
        <AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-pulse" />
      );
    }
    if (status === "initializing" || isSyncing) {
      return <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin" />;
    }
    if (hasFailed) {
      return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
    }
    return <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />;
  };

  const getStatusLabel = () => {
    if (status === "error") {
      return "TS Error";
    }
    if (status === "initializing") {
      return "Initializing...";
    }
    if (isSyncing) {
      return `Syncing (${loaded}/${total})`;
    }
    return "TS Ready";
  };

  return (
    <button
      ref={ref}
      onClick={() => {
        if (ref.current) {
          showPanel(<TsStatusPanel />, ref.current);
        }
      }}
      className="hover:bg-current/5 cursor-pointer w-24 px-2.5 flex items-center gap-1.5 text-xs h-6 border-r text-content-muted hover:text-content select-none"
    >
      {getStatusIcon()}
      <span className="truncate">{getStatusLabel()}</span>
    </button>
  );
}
