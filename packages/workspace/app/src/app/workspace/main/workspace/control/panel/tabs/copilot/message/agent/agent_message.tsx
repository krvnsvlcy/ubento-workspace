import { useUbentoEngine } from "@/engine/app/engine";
import { AgentActionData, AgentMessageData } from "@ubento/workspace.agent";
import { Check, Copy, Loader2, Sparkles, Terminal, X } from "lucide-react";
import { MouseEvent, useState } from "react";
import { CopilotMessage } from "../message";

function ActionLine({ action }: { action: AgentActionData }) {
  const [isOpen, setIsOpen] = useState(action.status === "pending");
  const [copied, setCopied] = useState(false);
  const hasDetails = !!(action.input || action.output);

  const handleCopy = (e: MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(JSON.stringify(action, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-1 text-[12px]">
      <button
        onClick={() => hasDetails && setIsOpen(!isOpen)}
        className="flex items-center gap-1 py-1 transition-colors"
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

      <button
        onClick={handleCopy}
        className="ml-1 flex items-center justify-center rounded p-1 hover:bg-surface-active transition-colors text-content-muted hover:text-content"
        title="Copy action data"
      >
        {copied ? (
          <Check size={12} className="text-green-400" />
        ) : (
          <Copy size={12} />
        )}
      </button>
    </div>
  );
}
function TaskActionView({ action }: { action: AgentActionData }) {
  const appEngine = useUbentoEngine();
  const threadId = action.structuredOutput?.threadId as string | undefined;
  const [copied, setCopied] = useState(false);

  const { data: messages } = appEngine.ubento.intelligence.useMessages(
    { thread_id: threadId ?? "" },
    { enabled: !!threadId },
  );

  const handleCopy = (e: MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(JSON.stringify(action, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!threadId) {
    return <ActionLine action={action} />;
  }

  return (
    <div className="flex flex-col gap-2 border-l-2 border-primary-500/20 pl-4 ml-2 my-2">
      <div className="text-xs text-content-muted flex items-center gap-2">
        <Sparkles size={12} className="text-primary-400" />
        <span className="font-medium">
          Task: {action.input?.title || "Specialized Agent"} ({action.input?.agent})
        </span>
        <span className="text-neutral-500">({action.status})</span>
        <button
          onClick={handleCopy}
          className="ml-1 flex items-center justify-center rounded p-1 hover:bg-surface-active transition-colors text-content-muted hover:text-content"
          title="Copy action data"
        >
          {copied ? (
            <Check size={12} className="text-green-400" />
          ) : (
            <Copy size={12} />
          )}
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {messages?.map((msg) => (
          <CopilotMessage key={msg.id} message={msg} />
        ))}
      </div>
    </div>
  );
}

function ActionView({ action }: { action: AgentActionData }) {
  switch (action.tool) {
    case "message":
      return (
        <div
          className="whitespace-pre-wrap text-sm leading-relaxed"
          style={{ userSelect: "text" }}
        >
          {action.input?.content || ""}
        </div>
      );
    case "task":
      return <TaskActionView action={action} />;
    default:
      return <ActionLine action={action} />;
  }
}

export function AgentMessage({ data }: { data: AgentMessageData }) {
  const [copied, setCopied] = useState(false);
  if (!data.actions.length && data.status !== "errored") return null;

  const handleCopy = () => {
    if (data.error) {
      navigator.clipboard.writeText(JSON.stringify(data.error, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
            {data.error && (
              <button
                onClick={handleCopy}
                className="ml-1 flex items-center justify-center rounded p-1 hover:bg-surface-active transition-colors"
                title="Copy error data"
              >
                {copied ? (
                  <Check size={12} className="text-green-400" />
                ) : (
                  <Copy size={12} />
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
