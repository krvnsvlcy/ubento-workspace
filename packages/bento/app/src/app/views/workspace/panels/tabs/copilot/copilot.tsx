import { useUbentoEngine } from "@/engine/engine";
import { useState } from "react";
import { WorkspaceEngine } from "../../../engine";
import { CopilotInput } from "./input";
import { CopilotThread } from "./thread";

export function CopilotTab({ controller }: { controller: WorkspaceEngine }) {
  const engine = useUbentoEngine();
  const [activeThreadId, setActiveThreadId] = useState<string | undefined>(
    undefined,
  );
  const [messages, setMessages] = useState<
    { id: string; role: "user" | "assistant"; content: string }[]
  >([]);
  const [isThinking, setIsThinking] = useState(false);

  const state = controller.useState();
  const selectedId = state.selection?.[0];

  const handleSend = async (content: string) => {
    let threadId = activeThreadId;
    if (!threadId) {
      const thread = await engine.copilot.createThread({ title: content });
      threadId = thread.getState().id;
      setActiveThreadId(threadId);
    }
    await engine.copilot.sendMessage(content, {
      threadId: threadId,
    });
  };

  return (
    <div className="flex h-full flex-col">
      <CopilotThread messages={messages} isThinking={isThinking} />
      <CopilotInput onSend={handleSend} disabled={isThinking} />
    </div>
  );
}
