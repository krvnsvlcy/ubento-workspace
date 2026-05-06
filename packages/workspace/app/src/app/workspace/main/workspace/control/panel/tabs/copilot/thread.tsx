import { useUbentoEngine } from "@/engine/engine";
import { Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

export function CopilotThread({ scope }: { scope: string }) {
  const engine = useUbentoEngine();
  const activeThreadId = engine.copilot.useState(
    (s) => s.activeThreadMap[scope],
  );
  const { data: messages = [] } = engine.ubento.intelligence.useMessages(
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
      className="flex flex-1 flex-col gap-6 overflow-y-auto p-4 scrollbar-hide"
    >
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex flex-col gap-1.5 animate-in slide-in-from-bottom-2 duration-300 ${
            message.role === "user" ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`max-w-[85%] rounded-[20px] px-4 py-3 text-[14px] leading-[1.5] ${
              message.role === "user"
                ? "bg-neutral-surface"
                : "border border-white/10 bg-white/5 text-foreground-100 shadow-sm"
            }`}
          >
            {(message.data as any).text}
          </div>
        </div>
      ))}
    </div>
  );
}
