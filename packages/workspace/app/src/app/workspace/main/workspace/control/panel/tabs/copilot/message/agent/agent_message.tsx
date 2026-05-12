import { AgentActionData, AgentMessageData } from "@ubento/workspace.agent";
import { Check, Loader2, Terminal, X } from "lucide-react";
import { useState } from "react";

function ActionLine({ action }: { action: AgentActionData }) {
  const [isOpen, setIsOpen] = useState(action.status === "pending");
  const hasDetails = !!(action.input || action.output);

  return (
    <button
      onClick={() => hasDetails && setIsOpen(!isOpen)}
      className={`flex items-center gap-1 py-1 text-[12px] transition-colors`}
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
      <div className="flex flex-col items-start text-left">{action.tool}</div>
    </button>
  );
}
function ActionView({ action }: { action: AgentActionData }) {
  switch (action.tool) {
    case "message":
    case "response":
      return (
        <div
          className="whitespace-pre-wrap text-sm leading-relaxed"
          style={{ userSelect: "text" }}
        >
          {action.input?.content || ""}
        </div>
      );
    default:
      return <ActionLine action={action} />;
  }
}

export function AgentMessage({ data }: { data: AgentMessageData }) {
  if (!data.actions.length && data.status !== "errored") return null;

  return (
    <div className="group flex w-full flex-col gap-4 animate-in slide-in-from-left-4 duration-500">
      <div className="flex w-full flex-col gap-2">
        {/* Sequential Actions */}
        {data.actions?.length > 0 &&
          data.actions.map((action) => (
            <ActionView key={action.id} action={action} />
          ))}

        {/* Error state */}
        {data.status === "errored" && (
          <div className="flex items-center gap-2 py-1 text-content-muted text-xs">
            <X size={14} /> An error occurred while processing this message.
          </div>
        )}
      </div>
    </div>
  );
}
