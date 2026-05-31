import { Command, Send, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { WorkspaceEngine } from "../../../../../engine/workspace/engine.js";

export function Console({ controller }: { controller: WorkspaceEngine }) {
  const userSettings = controller.userSetting.useState((s) => s.data);
  const mode = userSettings?.mode;
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <AnimatePresence>
      {mode === "edit" && (
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 200,
            padding: 16,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-2 rounded-2xl border border-border bg-surface/80 p-3 shadow-2xl backdrop-blur-xl transition-all focus-within:max-w-3xl focus-within:border-border/50">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface text-base">
                <Sparkles className="h-4 w-4" />
              </div>

              <div className="flex-1">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  placeholder="Ask AI to edit or build..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full resize-none bg-transparent py-2 text-sm font-medium text-content outline-none placeholder:text-content-muted"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-2 ml-11">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-md bg-surface px-1.5 py-1 text-[10px] font-bold text-content-muted border border-border">
                  <Command className="h-3 w-3" />
                  <span>K</span>
                </div>
                <span className="text-[10px] text-content-subtle font-medium">
                  Use Shift + Enter for new lines
                </span>
              </div>

              <button
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                  input.trim()
                    ? "bg-base text-contrast shadow-lg shadow-accent/20"
                    : "bg-surface text-content-subtle cursor-not-allowed"
                }`}
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
