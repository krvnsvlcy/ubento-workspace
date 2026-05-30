import { ChevronDown, ChevronUp, Terminal, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ComponentEngine, LogEntry } from "./engine";

export function ComponentConsole({ engine }: { engine: ComponentEngine }) {
  const [logs, setLogs] = useState<LogEntry[]>(() => engine.getState().logs);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return engine.subscribe((state) => {
      setLogs(state.logs);
    });
  }, [engine]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isExpanded) {
    return (
      <div className="h-8 border-t border-border bg-surface flex items-center justify-between px-4 shrink-0">
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 text-[10px] font-bold text-content-muted uppercase tracking-wider hover:text-content transition-colors"
        >
          <Terminal size={12} />
          Console ({logs.length})
          <ChevronUp size={12} />
        </button>
        <button
          onClick={() => engine.clearLogs()}
          className="p-1 hover:bg-surface-hover rounded-md text-content-muted transition-colors"
        >
          <Trash2 size={12} />
        </button>
      </div>
    );
  }

  return (
    <div
      style={{ height: 320 }}
      className="border-t border-border bg-surface flex flex-col shrink-0 overflow-hidden"
    >
      <div className="h-8 flex items-center justify-between px-4 border-b border-border bg-surface/50">
        <button
          onClick={() => setIsExpanded(false)}
          className="flex items-center gap-2 text-[10px] font-bold text-content-muted uppercase tracking-wider hover:text-content transition-colors"
        >
          <Terminal size={12} />
          Console ({logs.length})
          <ChevronDown size={12} />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => engine.clearLogs()}
            className="p-1 hover:bg-surface-hover rounded-md text-content-muted transition-colors"
            title="Clear console"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-2 font-mono text-[11px] selection:bg-base/30"
      >
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-content-muted italic">
            No logs yet...
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            {logs.map((log) => (
              <div
                key={log.id}
                className={`flex gap-3 px-2 py-1 rounded hover:bg-surface-hover/50 border-l-2 ${
                  log.type === "error"
                    ? "border-red-500 bg-red-500/5"
                    : log.type === "warn"
                      ? "border-amber-500 bg-amber-500/5"
                      : "border-transparent"
                }`}
              >
                <span className="text-content-muted shrink-0 opacity-50">
                  {new Date(log.timestamp).toLocaleTimeString([], {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
                <div className="flex gap-2 flex-wrap">
                  {log.args.map((arg, i) => (
                    <LogValue key={i} value={arg} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LogValue({ value }: { value: any }) {
  if (value === null) return <span className="text-purple-400">null</span>;
  if (value === undefined)
    return <span className="text-content-muted">undefined</span>;
  if (typeof value === "string")
    return <span className="text-content">{value}</span>;
  if (typeof value === "number")
    return <span className="text-blue-400">{value}</span>;
  if (typeof value === "boolean")
    return <span className="text-orange-400">{value.toString()}</span>;
  if (typeof value === "object") {
    try {
      return (
        <span className="text-content-subtle">
          {JSON.stringify(value, null, 2)}
        </span>
      );
    } catch (e) {
      return <span className="text-content-subtle">[Object]</span>;
    }
  }
  return <span>{String(value)}</span>;
}
