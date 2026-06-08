import { useWorkspaceEngine } from "@/contexts/workspace";
import { Check, ChevronDown, ChevronUp, GitCommit, RotateCcw, X } from "lucide-react";
import { useState } from "react";

export function CopilotChangesView() {
  const workspaceEngine = useWorkspaceEngine();
  const copilotChanges = workspaceEngine.useState((s) => s.copilotChanges);
  const specWrap = workspaceEngine.useState((s) => s.workspace.spec);
  const [isExpanded, setIsExpanded] = useState(true);

  if (!copilotChanges || !copilotChanges.items || copilotChanges.items.length === 0) {
    return null;
  }

  const items = copilotChanges.items;
  const checkpoint = copilotChanges.checkpoint;
  const currentSpec = specWrap.isValid ? specWrap.data : null;

  return (
    <div className="mx-3 mt-3 overflow-hidden rounded-2xl border border-border bg-surface/20 backdrop-blur-md animate-in fade-in slide-in-from-top duration-300">
      {/* Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex cursor-pointer items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-surface border border-border p-1.5 text-content">
            <GitCommit size={16} />
          </div>
          <div>
            <div className="text-xs font-semibold text-content font-mono uppercase tracking-wider">Pending Changes</div>
            <div className="text-[10px] text-content-subtle mt-0.5">
              {items.length} proposed change{items.length > 1 ? "s" : ""} require approval
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isExpanded ? <ChevronUp size={16} className="text-content-subtle" /> : <ChevronDown size={16} className="text-content-subtle" />}
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-border bg-black/10 px-4 py-3 max-h-[220px] overflow-y-auto scrollbar-hide">
          <div className="flex flex-col gap-2.5">
            {items.map((item) => {
              const [category, id] = item.split(".");
              let name = id;
              let changeType: "created" | "deleted" | "modified" = "modified";

              if (category === "boards") {
                const checkpointVal = checkpoint.boards?.[id];
                const currentVal = currentSpec?.boards?.[id];
                if (currentVal && !checkpointVal) {
                  changeType = "created";
                  name = currentVal.title;
                } else if (!currentVal && checkpointVal) {
                  changeType = "deleted";
                  name = checkpointVal.title;
                } else if (currentVal && checkpointVal) {
                  changeType = "modified";
                  name = currentVal.title;
                }
              } else if (category === "services") {
                const checkpointVal = checkpoint.services?.[id];
                const currentVal = currentSpec?.services?.[id];
                if (currentVal && !checkpointVal) {
                  changeType = "created";
                } else if (!currentVal && checkpointVal) {
                  changeType = "deleted";
                } else {
                  changeType = "modified";
                }
              } else if (category === "modules") {
                const checkpointVal = checkpoint.modules?.[id];
                const currentVal = currentSpec?.modules?.[id];
                if (currentVal && !checkpointVal) {
                  changeType = "created";
                } else if (!currentVal && checkpointVal) {
                  changeType = "deleted";
                } else {
                  changeType = "modified";
                }
              }

              const typeLabel = category === "boards" ? "Board" : category === "services" ? "Service" : "Module";

              return (
                <div key={item} className="flex items-center justify-between gap-3 text-xs border border-border/50 bg-surface/10 rounded-xl p-2.5">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-content">{name}</span>
                      <span className={`rounded-full px-1.5 py-0.2 text-[8px] font-bold uppercase tracking-wider ${
                        changeType === "created"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : changeType === "deleted"
                          ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      }`}>
                        {changeType}
                      </span>
                    </div>
                    <span className="text-[10px] text-content-subtle">{typeLabel} change</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        workspaceEngine.approveCopilotChange(item);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 transition-all"
                      title="Approve change"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        workspaceEngine.denyCopilotChange(item);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 transition-all"
                      title="Deny / Revert change"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-end gap-2 border-t border-border/50 pt-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                workspaceEngine.denyAllCopilotChanges();
              }}
              className="flex items-center gap-1.5 rounded-xl border border-rose-500/25 bg-rose-500/5 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <RotateCcw size={12} />
              Revert All
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                workspaceEngine.approveAllCopilotChanges();
              }}
              className="flex items-center gap-1.5 rounded-xl border border-emerald-500/25 bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600 transition-colors"
            >
              <Check size={12} />
              Approve All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
