import { AgentActionData, AgentMessageData } from "@ubento/workspace.agent";
import { Check, ChevronDown, Copy, Loader2, Terminal, X } from "lucide-react";
import { useState } from "react";

function ActionCard({ action }: { action: AgentActionData }) {
  const [isOpen, setIsOpen] = useState(action.status === "pending");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const content = JSON.stringify(action, null, 2);
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasDetails = !!(action.input || action.output);

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-sm transition-all duration-300">
      <button
        onClick={() => hasDetails && setIsOpen(!isOpen)}
        className={`flex items-center gap-2.5 px-3 py-2 text-[12px] transition-colors ${
          hasDetails ? "hover:bg-white/5" : "cursor-default"
        }`}
      >
        <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-primary-500/10 text-primary-400">
          {action.status === "completed" ? (
            <Check size={12} className="text-green-400" />
          ) : action.status === "pending" ? (
            <Loader2 size={12} className="animate-spin" />
          ) : action.status === "failed" ? (
            <X size={12} className="text-red-400" />
          ) : (
            <Terminal size={12} />
          )}
        </div>
        <div className="flex flex-1 flex-col items-start text-left">
          <span className="font-medium text-foreground-100">{action.tool}</span>
          <span className="text-[10px] text-foreground-400">
            {action.status === "completed"
              ? "Success"
              : action.status === "pending"
                ? "Waiting..."
                : action.status === "failed"
                  ? "Failed"
                  : "Executing..."}
          </span>
        </div>
        {hasDetails && (
          <ChevronDown
            size={14}
            className={`text-foreground-400 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {isOpen && hasDetails && (
        <div className="relative border-t border-white/5 bg-black/20 p-3">
          <button
            onClick={handleCopy}
            className="absolute right-2 top-2 rounded-md p-1.5 text-foreground-400 opacity-0 transition-opacity hover:bg-white/5 hover:text-foreground group-hover:opacity-100"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
          </button>
          <pre className="max-h-[200px] overflow-auto text-[11px] leading-relaxed text-foreground-300 scrollbar-hide">
            {JSON.stringify(action.output || action.input, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export function AgentMessage({ data }: { data: AgentMessageData }) {
  const isRunning = data.status === "in-progress";

  return (
    <div className="group flex w-full flex-col gap-4 animate-in slide-in-from-left-4 duration-500">
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div className="flex w-full flex-col gap-4">
        {/* Sequential Actions */}
        {data.actions?.length > 0 && (
          <div className="flex flex-col gap-2">
            {data.actions.map((action) => (
              <ActionCard key={action.id} action={action} />
            ))}
          </div>
        )}

        {/* Final Response Content */}
        {data.actions
          ?.filter((a) => a.tool === "message" || a.tool === "response")
          .map((action) => (
            <div key={action.id} className="relative group/content">
              <div className="max-w-full px-1 text-[14px] leading-[1.7] text-foreground-100 animate-in fade-in slide-in-from-top-1 duration-500 whitespace-pre-wrap">
                {action.input?.content || action.input?.text}
              </div>
            </div>
          ))}

        {/* Thinking state placeholder */}
        {isRunning && data.actions?.length === 0 && (
          <div className="flex items-center gap-2.5 px-1 py-1">
            <Loader2 size={14} className="animate-spin text-primary-500" />
            <span className="text-[12px] font-medium text-foreground-400">
              Thinking...
            </span>
          </div>
        )}

        {/* Error state */}
        {data.status === "errored" && (
          <div className="flex items-center gap-2.5 px-1 py-1 text-red-400">
            <X size={14} />
            <span className="text-[12px] font-medium">
              <pre>{JSON.stringify({ error: data.error }, null, 2)}</pre>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
