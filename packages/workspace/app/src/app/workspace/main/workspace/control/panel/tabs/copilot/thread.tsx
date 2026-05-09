import { useCopilot } from "@/contexts/copilot";
import { useUbentoEngine } from "@/engine/app/engine";
import { Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { CopilotMessage } from "./message/message";

export function CopilotThread() {
  const appEngine = useUbentoEngine();
  const copilot = useCopilot();
  const activeThreadId = copilot.useState((s) => s.activeThreadId);
  const { data: messages = [] } = appEngine.ubento.intelligence.useMessages(
    { thread_id: activeThreadId ?? "" },
    { enabled: !!activeThreadId },
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
        <div className="relative mb-6">
          <div className="absolute -inset-4 rounded-full bg-primary-500/5 blur-2xl animate-pulse" />
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 text-primary-500">
            <Sparkles size={32} />
          </div>
        </div>
        <h3 className="text-[15px] font-bold tracking-tight text-foreground">
          AI Copilot
        </h3>
        <p className="mt-2 max-w-[220px] text-[12px] leading-relaxed text-foreground-400">
          I'm your creative partner. Ask me to design, build, or explain
          anything in your workspace.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex flex-1 flex-col gap-6 overflow-y-auto p-4 scrollbar-hide scroll-smooth"
    >
      {messages.map((message) => (
        <CopilotMessage key={message.id} message={message} />
      ))}
    </div>
  );
}
