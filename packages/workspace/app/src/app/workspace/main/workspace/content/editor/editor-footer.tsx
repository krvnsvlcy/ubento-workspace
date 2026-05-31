import { useWorkspaceEngine } from "@/contexts/workspace";
import { 
  CheckCircle2, 
  Loader2, 
  AlertTriangle, 
  Info,
  ChevronUp
} from "lucide-react";
import { useState } from "react";
interface EditorFooterProps {
  showControlPanel: boolean;
  setShowControlPanel: (show: boolean) => void;
}

export function EditorFooter({ showControlPanel, setShowControlPanel }: EditorFooterProps) {
  const workspaceEngine = useWorkspaceEngine();
  const tsServiceStatus = workspaceEngine.useState((s) => s.tsServiceStatus);

  if (!tsServiceStatus) return null;

  const { status, message, loadedPackagesCount, totalPackagesCount } = tsServiceStatus;

  // Don't show footer if idle
  if (status === "idle") return null;

  const getStatusIcon = () => {
    switch (status) {
      case "ready":
        return <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />;
      case "error":
        return <AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-pulse" />;
      default:
        return <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin" />;
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case "ready":
        return "TypeScript ready";
      case "error":
        return "TS initialization failed";
      case "initializing":
        return "Initializing TypeScript worker...";
      case "loading-libs":
        return "Loading core library definitions...";
      case "loading-modules":
        return "Indexing workspace modules...";
      case "loading-packages":
        return `Synchronizing packages typings...`;
      default:
        return "Connecting...";
    }
  };

  const hasProgress = status === "loading-packages" && totalPackagesCount > 0;
  const progressPercent = hasProgress 
    ? Math.round((loadedPackagesCount / totalPackagesCount) * 100)
    : 0;

  return (
    <div className="flex flex-col border-t border-border bg-neutral-500/5 select-none shrink-0 relative">

      {/* Main Footer Bar */}
      <div className="h-8 flex items-center justify-between px-3 text-[11px] text-content-muted">
        <button
          onClick={() => setShowControlPanel(!showControlPanel)}
          className="flex items-center gap-2 hover:bg-neutral-500/10 px-2 py-0.5 rounded transition-colors text-left -ml-2"
        >
          {getStatusIcon()}
          <span className="font-medium text-foreground">{getStatusLabel()}</span>
          {message && status !== "ready" && status !== "error" && (
            <>
              <span className="text-neutral-500">|</span>
              <span className="truncate max-w-[200px] font-mono text-[10px] text-content-muted">
                {message}
              </span>
            </>
          )}
        </button>

        <div className="flex items-center gap-3">
          {hasProgress && (
            <div className="flex items-center gap-2">
              <span className="font-mono text-neutral-400">
                {loadedPackagesCount}/{totalPackagesCount}
              </span>
              <div className="w-16 h-1 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="font-mono text-blue-400 font-semibold">{progressPercent}%</span>
            </div>
          )}

          <button
            onClick={() => setShowControlPanel(!showControlPanel)}
            className="flex items-center gap-1 hover:bg-neutral-500/10 hover:text-foreground px-1.5 py-0.5 rounded transition-colors text-[10px]"
          >
            <Info className="w-3 h-3" />
            <span>Monitor</span>
            <ChevronUp className={`w-3 h-3 transition-transform duration-200 ${showControlPanel ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
