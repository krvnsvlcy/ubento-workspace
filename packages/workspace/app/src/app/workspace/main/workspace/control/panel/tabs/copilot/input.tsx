import { useUbentoEngine } from "@/engine/engine";
import { Button } from "@ubento/workspace.primitives";
import { ArrowRight, ChevronDown, Plus } from "lucide-react";

export function CopilotInput({ scope }: { scope: string }) {
  const engine = useUbentoEngine();
  const input = engine.copilot.useState((state) => state.input.text);

  const handleSend = () => {
    engine.copilot.sendMessage(scope);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3">
      <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all focus-within:border-primary-500/50 focus-within:ring-4 focus-within:ring-primary-500/10">
        <textarea
          value={input}
          onChange={(e) => engine.copilot.setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message AI Copilot..."
          rows={1}
          className="max-h-[200px] w-full resize-none bg-transparent p-4 text-[14px] leading-relaxed text-foreground-100 outline-none scrollbar-hide placeholder:text-foreground-500"
          style={{ height: "auto" }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`;
          }}
        />

        <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.02] px-3 py-2">
          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-400 transition-colors hover:bg-white/5 hover:text-foreground-200">
              <Plus size={18} />
            </button>
            <button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-foreground-400 transition-colors hover:bg-white/5 hover:text-foreground-200">
              <span>Auto</span>
              <ChevronDown size={14} />
            </button>
          </div>

          <Button
            size="sm"
            variant="primary"
            onClick={handleSend}
            disabled={!input.trim()}
            className="h-8 w-8 !p-0 rounded-lg"
          >
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
