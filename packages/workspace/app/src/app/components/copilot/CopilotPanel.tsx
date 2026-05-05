import { useUbentoEngine } from "@/engine/engine";
import { Send } from "lucide-react";
import React, { useEffect } from "react";
import {
  useCopilotStore,
  useCopilotThread,
  useSendCopilotMessage,
} from "./store.js";

export function CopilotPanel() {
  const host = useUbentoEngine();
  const { threadId, input, setInput, setThreadId } = useCopilotStore();
  const { data: messages, loading } = useCopilotThread(
    host.ubento,
    threadId,
  );
  const sendMessage = useSendCopilotMessage(host.ubento);

  // Initialize a thread if one does not exist
  useEffect(() => {
    if (!threadId) {
      host.ubento.intelligence
        .createThread({
          workspace_id: (host.getState().session as any)?.workspaceId || "default",
          title: "Copilot Chat",
        })
        .then((thread: any) => {
          setThreadId(thread.id);
        })
        .catch(console.error);
    }
  }, [threadId, host, setThreadId]);

  const handleSend = () => {
    if (!input.trim() || !threadId) return;
    sendMessage.mutate({ threadId, content: input });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full w-80 flex-col border-r border-neutral-border bg-background/50 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between border-b border-neutral-border px-4">
        <h2 className="font-semibold text-neutral-content">AI Copilot</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-4">
          {/* Informational message */}
          <div className="rounded-xl border border-neutral-border bg-neutral-surface/50 p-3 text-sm text-neutral-content-muted">
            Tell the AI what you want to build or change in this component.
          </div>

          {/* Chat Messages */}
          <div className="flex flex-col gap-3">
            {loading ? (
              <div className="text-sm text-neutral-content-muted">
                Loading messages...
              </div>
            ) : (
              messages?.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "self-end bg-accent text-accent-contrast"
                      : "self-start bg-neutral-surface text-neutral-content-subtle"
                  }`}
                >
                  {msg.content}
                </div>
              ))
            )}
            {sendMessage.isPending && (
              <div className="self-start rounded-2xl bg-neutral-surface px-4 py-2 text-sm text-neutral-content-muted italic">
                Copilot is thinking...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-neutral-border p-4">
        <div className="relative flex items-center bg-neutral-surface rounded-xl border border-neutral-border-active focus-within:border-accent transition-colors">
          <textarea
            className="w-full resize-none bg-transparent px-4 py-3 text-sm text-neutral-content focus:outline-none"
            placeholder="Ask AI to generate code..."
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || sendMessage.isPending}
            className="absolute right-2 bottom-2 p-1.5 text-neutral-content-muted hover:text-accent hover:bg-neutral-surface-hover rounded-lg disabled:opacity-50 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
