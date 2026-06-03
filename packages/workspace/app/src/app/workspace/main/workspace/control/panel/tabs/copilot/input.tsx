import { useCopilot } from "@/contexts/copilot";
import { Button, Spinner, useStoreState } from "@ubento/bento.arlo-core";
import { UserMessageAttachment } from "@ubento/workspace.agent";
import { ArrowRight, ChevronDown, Plus, Square, X } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

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
    <div className="flex items-center gap-1.5 rounded-full bg-surface border border-border px-2.5 py-1 text-xs text-content">
      {icon && (
        <span className="flex-shrink-0 text-content-subtle w-3.5 h-3.5 flex items-center justify-center">
          {icon}
        </span>
      )}
      <span className="truncate max-w-[120px]">{label}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 text-content-subtle hover:text-content transition-colors"
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
  const status = copilot.useState((c) => c.status);
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

  const isActive = status === "active";

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
    <div className="p-3">
      <div className="relative group">
        {/* The Animated Gradient Border Layer */}
        {/* {isActive && (
          <div
            className="absolute p-3"
            style={{
              inset: 0,
            }}
          >
            <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(to_right,#3b82f6,#8b5cf6,#ec4899,#3b82f6)] bg-[length:200%_auto] animate-border-beam opacity-70 blur-[3px]" />
          </div>
        )} */}

        <div
          className={`relative flex flex-col overflow-hidden rounded-2xl border transition-all bg-background border-border focus-within:border-border-active`}
        >
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
          <TextareaAutosize
            value={input.text}
            onChange={(e) => copilot.setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message AI Copilot..."
            maxRows={5}
            style={{ scrollbarWidth: "none" }}
            className="w-full resize-none bg-transparent p-2 text-[14px] leading-relaxed text-content outline-none placeholder:text-content-subtle"
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
                {isActive ? <Spinner /> : <ArrowRight size={16} />}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
