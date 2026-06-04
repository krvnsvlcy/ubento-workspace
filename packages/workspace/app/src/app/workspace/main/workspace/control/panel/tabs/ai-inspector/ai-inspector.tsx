import { useCopilot } from "@/contexts/copilot";
import { Button, Spinner, useStoreState } from "@ubento/bento.arlo-core";
import {
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Info,
  Square,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { InstructionsTab } from "./instructions-tab";
import { LogsTab } from "./logs-tab";

export function AiInspectorTab() {
  const copilot = useCopilot();

  const activeThreadId = copilot.useState((c) => c.activeThreadId);
  const thread = activeThreadId
    ? copilot.environment.thread(activeThreadId)
    : undefined;
  const activeExecution = useStoreState(
    thread?.store,
    (state) => state.activeExecution,
  );
  const executionStatus = useStoreState(
    activeExecution?.store,
    (state) => state.status,
  );

  const [activeSubTab, setActiveSubTab] = useState<"logs" | "instructions">(
    "logs",
  );

  const getStatusBadge = () => {
    switch (executionStatus) {
      case "thinking":
        return (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-400 text-[10px] font-semibold tracking-wide uppercase">
            <Spinner />
            <span>Thinking</span>
          </div>
        );
      case "working":
        return (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-blue-500/25 bg-blue-500/10 text-blue-400 text-[10px] font-semibold tracking-wide uppercase">
            <Spinner />
            <span>Working</span>
          </div>
        );
      case "completed":
        return (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold tracking-wide uppercase">
            <CheckCircle2 size={10} />
            <span>Completed</span>
          </div>
        );
      case "errored":
        return (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-rose-500/25 bg-rose-500/10 text-rose-400 text-[10px] font-semibold tracking-wide uppercase">
            <XCircle size={10} />
            <span>Errored</span>
          </div>
        );
      case "stopped":
        return (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-yellow-500/25 bg-yellow-500/10 text-yellow-400 text-[10px] font-semibold tracking-wide uppercase">
            <AlertTriangle size={10} />
            <span>Stopped</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-border bg-surface text-content-subtle text-[10px] font-semibold tracking-wide uppercase">
            <Info size={10} />
            <span>Idle</span>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full flex-col bg-background/50 backdrop-blur-sm">
      {/* Active Execution State Panel */}
      <div className="p-3 border-b border-border bg-surface/20 flex flex-col gap-2.5 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-primary-500/10 text-primary-500 border border-primary-500/20">
              <Cpu size={14} />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-content uppercase tracking-wider font-mono">
                AI Behavior Execution
              </span>
              {activeThreadId ? (
                <div className="text-[9px] text-content-subtle font-mono truncate max-w-[200px]">
                  Thread: {activeThreadId}
                </div>
              ) : (
                <div className="text-[9px] text-content-subtle font-mono">
                  No active session
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge()}
            {(executionStatus === "thinking" ||
              executionStatus === "working") && (
              <Button
                variant="danger"
                size="sm"
                className="h-6 px-2 flex items-center gap-1 text-[10px] uppercase font-bold"
                onClick={() => activeExecution?.stop()}
              >
                <Square size={10} fill="currentColor" />
                <span>Stop</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-border bg-surface/10 px-3 flex-shrink-0">
        <button
          onClick={() => setActiveSubTab("logs")}
          className={`px-3 py-2 text-xs font-semibold border-b-2 transition-all -mb-px ${
            activeSubTab === "logs"
              ? "border-primary-500 text-primary-400 font-bold"
              : "border-transparent text-content-subtle hover:text-content"
          }`}
        >
          Logs
        </button>
        <button
          onClick={() => setActiveSubTab("instructions")}
          className={`px-3 py-2 text-xs font-semibold border-b-2 transition-all -mb-px ${
            activeSubTab === "instructions"
              ? "border-primary-500 text-primary-400 font-bold"
              : "border-transparent text-content-subtle hover:text-content"
          }`}
        >
          System Instructions
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeSubTab === "logs" ? <LogsTab /> : <InstructionsTab />}
      </div>
    </div>
  );
}
