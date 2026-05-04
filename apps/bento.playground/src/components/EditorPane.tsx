import Editor from "@monaco-editor/react";

interface EditorPaneProps {
  code: string;
  onChange: (value: string) => void;
  onFormat: () => void;
  error: string | null;
}

export function EditorPane({ code, onChange, onFormat, error }: EditorPaneProps) {
  return (
    <div className="flex flex-col w-[45%] border-r border-white/5 bg-[#0a0a0a] shadow-2xl z-20">
      <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-[#0d0d0d]/50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <span className="font-bold text-lg">B</span>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider text-white/90 uppercase">
              Bento Playground
            </h1>
            <p className="text-[10px] text-white/40 font-medium">
              REAL-TIME RENDER ENGINE
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {error ? (
            <div className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-wider">
              Syntax Error
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
              Valid Config
            </div>
          )}
          <button
            onClick={onFormat}
            className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold transition-all active:scale-95"
          >
            Format
          </button>
        </div>
      </div>

      <div className="flex-1 relative bg-[#0a0a0a]">
        <Editor
          height="100%"
          defaultLanguage="json"
          theme="vs-dark"
          value={code}
          onChange={(value) => onChange(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 32, bottom: 32 },
            lineNumbers: "on",
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: 0.5,
            lineHeight: 1.6,
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
          }}
        />
      </div>
    </div>
  );
}
