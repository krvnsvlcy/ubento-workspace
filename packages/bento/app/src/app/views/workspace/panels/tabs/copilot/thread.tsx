import { Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface CopilotThreadProps {
  messages: Message[];
  isThinking?: boolean;
}

export function CopilotThread({ messages, isThinking }: CopilotThreadProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
        <div className="relative mb-6">
          <div className="absolute -inset-4 rounded-full bg-primary-500/5 blur-2xl animate-pulse" />
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 text-primary-500">
            <Sparkles size={32} />
          </div>
        </div>
        <h3 className="text-[15px] font-bold tracking-tight text-foreground">AI Copilot</h3>
        <p className="mt-2 max-w-[220px] text-[12px] leading-relaxed text-foreground-400">
          I'm your creative partner. Ask me to design, build, or explain anything in your workspace.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-1 scrollbar-hide">
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
                ? "bg-[#0084ff] text-white"
                : "border border-white/10 bg-white/5 text-foreground-100"
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
      {isThinking && (
        <div className="flex items-center gap-2.5 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-primary-500/80 animate-pulse">
          <div className="flex gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-bounce [animation-delay:-0.3s]" />
            <div className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-bounce [animation-delay:-0.15s]" />
            <div className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-bounce" />
          </div>
          Thinking
        </div>
      )}
    </div>
  );
}



