import { useCopilot } from "@/contexts/copilot";
import { Copy, Check, FileText } from "lucide-react";
import { useState } from "react";

export function InstructionsTab() {
  const copilot = useCopilot();
  const agents = copilot.environment.listAgents() || [];
  const [selectedAgentName, setSelectedAgentName] = useState<string>(
    agents[0]?.name || "copilot",
  );
  const [copied, setCopied] = useState(false);

  const selectedAgent = agents.find((a) => a.name === selectedAgentName);

  const handleCopy = () => {
    if (!selectedAgent?.instructions) return;
    navigator.clipboard.writeText(selectedAgent.instructions);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (agents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 text-content-subtle">
        <FileText size={24} className="opacity-30 mb-2" />
        <div className="text-xs font-semibold">No instructions available</div>
        <div className="text-[10px] mt-0.5">
          No agents were found registered in the copilot environment.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Horizontal pill navigation for agents */}
      <div className="p-3 border-b border-border bg-surface/10 flex flex-col gap-1.5 flex-shrink-0">
        <span className="text-[10px] text-content-subtle font-semibold uppercase tracking-wider font-mono">
          Select Agent Profile
        </span>
        <div className="flex flex-wrap gap-1.5">
          {agents.map((agent) => (
            <button
              key={agent.name}
              onClick={() => {
                setSelectedAgentName(agent.name);
                setCopied(false);
              }}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all ${
                selectedAgentName === agent.name
                  ? "bg-primary-500/10 border-primary-500 text-primary-400 font-semibold"
                  : "bg-surface/20 border-border text-content-subtle hover:text-content hover:bg-white/5"
              }`}
            >
              {agent.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Agent Details */}
      {selectedAgent && (
        <div className="flex-1 overflow-y-auto px-4 py-3.5 flex flex-col gap-3 scrollbar-hide">
          {/* Agent Description */}
          {selectedAgent.description && (
            <div className="text-xs text-content-muted leading-relaxed italic bg-surface/10 p-3 rounded-lg border border-border/40">
              <span className="font-semibold text-content not-italic block mb-0.5">
                Description
              </span>
              {selectedAgent.description}
            </div>
          )}

          {/* Instructions Header & Action */}
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs font-bold text-content font-mono uppercase tracking-wide">
              System Instructions ({selectedAgent.instructions ? "Active" : "None"})
            </span>
            {selectedAgent.instructions && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold text-content-subtle hover:text-content bg-surface/30 border border-border rounded-lg hover:bg-white/5 transition-all"
                title="Copy instructions to clipboard"
              >
                {copied ? (
                  <>
                    <Check size={11} className="text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={11} />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Instructions Content */}
          <div className="flex-1 min-h-[200px] border border-border/50 rounded-xl overflow-hidden bg-black/25 flex flex-col">
            {selectedAgent.instructions ? (
              <pre className="flex-1 overflow-auto p-4 text-[11px] font-mono leading-relaxed text-content-muted whitespace-pre-wrap select-text selection:bg-primary-500/30">
                {selectedAgent.instructions}
              </pre>
            ) : (
              <div className="flex-1 flex items-center justify-center text-xs text-content-subtle italic">
                No system instructions specified for this agent.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
