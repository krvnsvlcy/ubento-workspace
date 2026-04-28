import { useState } from "react";
import { useStore } from "zustand";
import { WorkspaceController } from "../../../controller";
import { CopilotInput } from "./input";
import { CopilotThread } from "./thread";

export function CopilotTab({
  controller,
}: {
  controller: WorkspaceController;
}) {
  const [messages, setMessages] = useState<
    { id: string; role: "user" | "assistant"; content: string }[]
  >([]);
  const [isThinking, setIsThinking] = useState(false);

  const state = useStore(controller);
  const selectedId = state.selection?.[0];

  const handleSend = (content: string) => {
    const userMessage = {
      id: Math.random().toString(36).substring(7),
      role: "user" as const,
      content,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simple mock response
    setIsThinking(true);
    setTimeout(() => {
      const assistantMessage = {
        id: Math.random().toString(36).substring(7),
        role: "assistant" as const,
        content: `I'll help you with "${content}"${selectedId ? ` for element ${selectedId}` : ""}.`,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsThinking(false);
    }, 1000);
  };

  return (
    <div className="flex h-full flex-col">
      <CopilotThread messages={messages} isThinking={isThinking} />
      <CopilotInput onSend={handleSend} disabled={isThinking} />
    </div>
  );
}
