import { Button } from "@ubento/bento-primitives";
import { ArrowRight, ChevronDown, Plus } from "lucide-react";
import { useState } from "react";

interface CopilotInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export function CopilotInput({ onSend, disabled }: CopilotInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-2">
      <div className="text-sm flex flex-col rounded-lg border bg-background-200">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={2}
          className="w-full resize-none p-3 outline-none"
        />

        <div className="flex items-center justify-between px-3 pb-2">
          <div className="flex items-center gap-2">
            <Button shape="circle" size="icon" variant="ghost">
              <Plus size={16} />
            </Button>
            <Button shape="circle">
              Gemini 3 Flash
              <ChevronDown size={14} />
            </Button>
          </div>

          <Button
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            shape="circle"
            size="icon"
          >
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
