import { Send } from "lucide-react";
import React, { useEffect } from "react";
import { useCopilotStore, useCopilotThread, useSendCopilotMessage } from "./store.js";
import { useBentoHost } from "@/contexts/host";

export function CopilotPanel() {
  const host = useBentoHost();
  const { threadId, input, setInput, setThreadId } = useCopilotStore();
  const { data: messages, isLoading } = useCopilotThread(host.ubentoApi, threadId);
  const sendMessage = useSendCopilotMessage(host.ubentoApi);

  // Initialize a thread if one does not exist
  useEffect(() => {
    if (!threadId) {
      host.ubentoApi.intelligence.createThread({
        workspace_id: host.getState().session?.workspaceId || "default",
        title: "Copilot Chat"
      }).then((thread) => {
        setThreadId(thread.id);
      }).catch(console.error);
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
    <div className="flex h-full w-80 flex-col border-r border-background-300 bg-background-100/50 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between border-b border-background-300 px-4">
        <h2 className="font-semibold text-foreground-100">AI Copilot</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-4">
          {/* Informational message */}
          <div className="rounded-xl border border-background-300 bg-background-200/50 p-3 text-sm text-foreground-400">
            Tell the AI what you want to build or change in this component.
          </div>

          {/* Chat Messages */}
          <div className="flex flex-col gap-3">
            {isLoading ? (
              <div className="text-sm text-foreground-400">Loading messages...</div>
            ) : (
              messages?.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "self-end bg-primary-500 text-white"
                      : "self-start bg-background-200 text-foreground-200"
                  }`}
                >
                  {msg.content}
                </div>
              ))
            )}
            {sendMessage.isPending && (
              <div className="self-start rounded-2xl bg-background-200 px-4 py-2 text-sm text-foreground-400 italic">
                Copilot is thinking...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-background-300 p-4">
        <div className="relative flex items-center bg-background-200 rounded-xl border border-background-400 focus-within:border-primary-500 transition-colors">
          <textarea
            className="w-full resize-none bg-transparent px-4 py-3 text-sm text-foreground-100 focus:outline-none"
            placeholder="Ask AI to generate code..."
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || sendMessage.isPending}
            className="absolute right-2 bottom-2 p-1.5 text-foreground-400 hover:text-primary-500 hover:bg-background-300 rounded-lg disabled:opacity-50 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
