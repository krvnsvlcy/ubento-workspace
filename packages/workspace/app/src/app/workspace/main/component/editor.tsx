import { useDarkMode } from "@/app/hooks/use-dark-mode";
import Editor from "@monaco-editor/react";
import { ComponentEngine } from "./engine";

export function ComponentCodeEditor({
  engine,
  isLoading,
}: {
  engine: ComponentEngine;
  isLoading?: boolean;
}) {
  const isDark = useDarkMode();
  const source = engine.useState((s) => s.source);

  return (
    <div className="flex-1 h-full bg-neutral-surface border-r border-neutral-border flex flex-col shrink-0 min-w-0">
      <div className="px-4 py-2 border-b border-neutral-border bg-neutral-surface/30 flex items-center justify-between">
        <p className="text-[10px] font-bold text-neutral-content-muted uppercase tracking-wider">
          index.tsx
        </p>
        {isLoading && (
          <span className="text-[9px] text-neutral-content-muted animate-pulse">
            Fetching source...
          </span>
        )}
      </div>
      <div className="flex-1 relative">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          theme={isDark ? "vs-dark" : "light"}
          value={source}
          onChange={(val) => engine.setSource(val || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 12,
            fontFamily: "var(--font-mono)",
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            padding: { top: 16, bottom: 16 },
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
