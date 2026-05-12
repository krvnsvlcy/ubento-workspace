import { useCopilot } from "@/contexts/copilot";
import { UserMessageAttachment } from "@ubento/workspace.agent";
import { Button, useStoreState } from "@ubento/workspace.primitives";
import { ArrowRight, ChevronDown, Plus, Square, X } from "lucide-react";

function AttachmentChip({
  attachment,
  onRemove,
}: {
  attachment: UserMessageAttachment;
  onRemove?: () => void;
}) {
  const copilot = useCopilot();
  const typeConfig = copilot.attachmentTypes[attachment.type as any];

  const label = typeConfig?.label(attachment.data as any) ?? attachment.type;
  const icon = typeConfig?.icon(attachment.data as any);

  return (
    <div className="flex items-center gap-1.5 rounded-full bg-neutral-surface border border-neutral-border px-2.5 py-1 text-xs text-neutral-content">
      {icon && (
        <span className="flex-shrink-0 text-neutral-content-subtle w-3.5 h-3.5 flex items-center justify-center">
          {icon}
        </span>
      )}
      <span className="truncate max-w-[120px]">{label}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 text-neutral-content-subtle hover:text-neutral-content transition-colors"
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
}

export function CopilotInput() {
  const copilot = useCopilot();
  const input = copilot.useState((c) => c.input);
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

  const handleSend = () => {
    copilot.sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const allContextAttachments = Object.values(input.contextAttachments).flat();

  return (
    <div className="p-2">
      <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-border transition-all focus-within:border-neutral-border-active">
        {/* Attachments Section */}
        {(input.userAttachments.length > 0 ||
          allContextAttachments.length > 0) && (
          <div className="flex flex-wrap gap-2 p-2">
            {allContextAttachments.map((attachment, i) => (
              <AttachmentChip key={`context-${i}`} attachment={attachment} />
            ))}
            {input.userAttachments.map((attachment, i) => (
              <AttachmentChip
                key={`user-${i}`}
                attachment={attachment}
                onRemove={() => {
                  const newAttachments = [...input.userAttachments];
                  newAttachments.splice(i, 1);
                  copilot.setUserAttachments(newAttachments);
                }}
              />
            ))}
          </div>
        )}

        <textarea
          value={input.text}
          onChange={(e) => copilot.setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message AI Copilot..."
          rows={1}
          className="max-h-[200px] w-full resize-none bg-transparent p-4 text-[14px] leading-relaxed text-neutral-content outline-none scrollbar-hide placeholder:text-neutral-content-subtle"
          style={{ height: "auto" }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`;
          }}
        />

        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-1">
            <Button size="icon" shape="circle">
              <Plus size={16} />
            </Button>
            <Button shape="circle">
              <span>Auto</span>
              <ChevronDown size={14} />
            </Button>
          </div>

          {executionStatus === "thinking" || executionStatus === "working" ? (
            <Button
              size="icon"
              shape="circle"
              variant="primary"
              onClick={() => activeExecution?.stop()}
            >
              <Square size={12} fill="currentColor" />
            </Button>
          ) : (
            <Button
              size="icon"
              shape="circle"
              variant="primary"
              onClick={handleSend}
              disabled={!input.text.trim()}
            >
              <ArrowRight size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
