import { Command, Send, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { WorkspaceState } from "../controller.js";

export function Console({ state }: { state: WorkspaceState }) {
  const snap = useSnapshot(state);
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const mode = snap.context.mode;

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="bg-background mx-auto flex w-full max-w-2xl flex-col gap-2 rounded-2xl border border-white/10 bg-background-300/80 p-3 shadow-2xl backdrop-blur-xl transition-all focus-within:max-w-3xl focus-within:border-primary-500/50">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500">
                <Sparkles className="h-4 w-4" />
              </div>

              <div className="flex-1">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  placeholder="Ask AI to edit or build..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full resize-none bg-transparent py-2 text-sm font-medium text-foreground outline-none placeholder:text-foreground-500"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-2 ml-11">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-md bg-white/5 px-1.5 py-1 text-[10px] font-bold text-foreground-400 border border-white/5">
                  <Command className="h-3 w-3" />
                  <span>K</span>
                </div>
                <span className="text-[10px] text-foreground-500 font-medium">
                  Use Shift + Enter for new lines
                </span>
              </div>

              <button
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                  input.trim()
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20"
                    : "bg-white/5 text-foreground-500 cursor-not-allowed"
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
