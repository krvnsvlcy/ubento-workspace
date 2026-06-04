import { useCopilot } from "@/contexts/copilot";
import { useUbentoEngine } from "@/hooks/app-engine";
import { Button, Spinner, useStoreState } from "@ubento/bento.arlo-core";
import { LogLevel, LogRecord } from "@ubento/telemetry";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Cpu,
  Info,
  Pause,
  Play,
  Search,
  Square,
  Trash2,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-border/40 rounded-lg overflow-hidden my-1 bg-black/15">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-1.5 text-left font-sans font-semibold text-[11px] text-content hover:bg-white/5 transition-colors"
      >
        <span>{title}</span>
        {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
      </button>
      {isOpen && <div className="p-2 border-t border-border/20">{children}</div>}
    </div>
  );
}

function LogMetaViewer({ meta }: { meta: Record<string, any> }) {
  if (meta.event === "orchestrator_model_response") {
    return (
      <div className="flex flex-col gap-2 p-3 bg-black/35 rounded-xl border border-border text-xs font-mono my-2 text-content-muted">
        <div>
          <span className="text-primary-400 font-semibold">Event:</span>{" "}
          orchestrator_model_response
        </div>
        {meta.modelId && (
          <div>
            <span className="text-secondary-400 font-semibold">Model ID:</span>{" "}
            {meta.modelId}
          </div>
        )}
        {meta.instructions && (
          <CollapsibleSection title="System Instructions">
            <pre className="whitespace-pre-wrap max-h-48 overflow-y-auto bg-black/20 p-2 rounded border border-border/50 text-[11px] leading-normal text-content/80 font-mono">
              {meta.instructions}
            </pre>
          </CollapsibleSection>
        )}
        {meta.prompt && (
          <CollapsibleSection title="Prompt Context">
            <pre className="whitespace-pre-wrap max-h-48 overflow-y-auto bg-black/20 p-2 rounded border border-border/50 text-[11px] leading-normal text-content/80 font-mono">
              {meta.prompt}
            </pre>
          </CollapsibleSection>
        )}
        {meta.content && (
          <CollapsibleSection title="Model Generation (Raw)" defaultOpen>
            <pre className="whitespace-pre-wrap max-h-64 overflow-y-auto bg-amber-500/5 p-2 rounded border border-amber-500/10 text-amber-200/90 text-[11px] leading-normal font-mono">
              {meta.content}
            </pre>
          </CollapsibleSection>
        )}
      </div>
    );
  }

  if (meta.event === "tool_run") {
    return (
      <div className="flex flex-col gap-1 p-3 bg-black/35 rounded-xl border border-border text-xs font-mono my-2 text-content-muted">
        <div>
          <span className="text-yellow-400 font-semibold">Tool Call:</span>{" "}
          {meta.tool}
        </div>
        {meta.args && (
          <div>
            <span className="text-content-subtle">Arguments:</span>
            <pre className="mt-1 bg-black/20 p-2 rounded border border-border/50 text-[11px] text-content-muted overflow-x-auto max-h-40 font-mono">
              {JSON.stringify(meta.args, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  }

  if (meta.event === "tool_execution_completed") {
    return (
      <div className="flex flex-col gap-1 p-3 bg-black/35 rounded-xl border border-border text-xs font-mono my-2 text-content-muted">
        <div>
          <span className="text-emerald-400 font-semibold">Tool Result:</span>{" "}
          {meta.tool}
        </div>
        {meta.output && (
          <div>
            <span className="text-content-subtle">Output:</span>
            <pre className="mt-1 bg-black/20 p-2 rounded border border-border/50 text-[11px] text-content-muted overflow-x-auto max-h-40 font-mono">
              {typeof meta.output === "string"
                ? meta.output
                : JSON.stringify(meta.output, null, 2)}
            </pre>
          </div>
        )}
        {meta.structuredOutput && (
          <div>
            <span className="text-content-subtle">Structured Output:</span>
            <pre className="mt-1 bg-black/20 p-2 rounded border border-border/50 text-[11px] text-content-muted overflow-x-auto max-h-40 font-mono">
              {JSON.stringify(meta.structuredOutput, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  }

  return (
    <pre className="p-3 bg-black/35 rounded-xl border border-border text-[11px] font-mono my-2 text-content-muted overflow-x-auto max-h-64 leading-normal">
      {JSON.stringify(meta, null, 2)}
    </pre>
  );
}

export function LogsTab() {
  const appEngine = useUbentoEngine();
  const copilot = useCopilot();

  const [logs, setLogs] = useState<LogRecord[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [filterType, setFilterType] = useState<"ai" | "all">("ai");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevels, setSelectedLevels] = useState<
    Record<LogLevel, boolean>
  >({
    debug: true,
    info: true,
    warn: true,
    error: true,
  });
  const [expandedLogs, setExpandedLogs] = useState<Record<number, boolean>>({});
  const [autoScroll, setAutoScroll] = useState(true);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const eventStream = (appEngine.logger as any).stream;

  useEffect(() => {
    if (!eventStream) return;

    // Load initial snapshot
    setLogs(eventStream.snapshot());

    // Subscribe to new logs
    const unsubscribe = eventStream.subscribe((record: LogRecord) => {
      if (isPaused) return;
      setLogs((prev) => {
        const next = [...prev, record];
        // Buffer limit
        if (next.length > 500) {
          next.shift();
        }
        return next;
      });
    });

    return () => unsubscribe();
  }, [eventStream, isPaused]);

  useEffect(() => {
    if (autoScroll && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, autoScroll]);

  const toggleLevel = (level: LogLevel) => {
    setSelectedLevels((prev) => ({ ...prev, [level]: !prev[level] }));
  };

  const clearLogs = () => {
    if (eventStream) {
      eventStream.clear();
    }
    setLogs([]);
    setExpandedLogs({});
  };

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      // 1. Module filter
      const isAiRelated =
        log.module?.some((m) =>
          ["copilot", "workspace_engine", "agent", "intelligence"].includes(
            m.toLowerCase(),
          ),
        ) ||
        log.appName.toLowerCase().includes("copilot") ||
        log.message.toLowerCase().includes("agent") ||
        log.message.toLowerCase().includes("copilot");

      if (filterType === "ai" && !isAiRelated) {
        return false;
      }

      // 2. Level filter
      if (!selectedLevels[log.level]) {
        return false;
      }

      // 3. Search text filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const msgMatch = log.message.toLowerCase().includes(query);
        const moduleMatch = log.module?.some((m) =>
          m.toLowerCase().includes(query),
        );
        const metaMatch = JSON.stringify(log.meta)
          .toLowerCase()
          .includes(query);
        if (!msgMatch && !moduleMatch && !metaMatch) {
          return false;
        }
      }

      return true;
    });
  }, [logs, filterType, selectedLevels, searchQuery]);

  const getLevelStyles = (level: LogLevel) => {
    switch (level) {
      case "error":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "warn":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "info":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "debug":
        return "bg-sky-500/10 text-sky-400 border-sky-500/20";
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Filter and Search Bar */}
      <div className="p-3 border-b border-border bg-surface/10 flex flex-col gap-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          {/* Search box */}
          <div className="relative flex-1">
            <Search
              size={13}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-content-subtle"
            />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-border hover:border-border-active focus:border-primary-500 rounded-lg pl-8 pr-3 py-1.5 text-xs text-content outline-none transition-colors placeholder:text-content-subtle"
            />
          </div>

          {/* Scope Filters */}
          <div className="flex rounded-lg border border-border overflow-hidden p-0.5 bg-surface/30">
            <button
              onClick={() => setFilterType("ai")}
              className={`px-2 py-1 text-[10px] font-semibold rounded-md transition-colors ${
                filterType === "ai"
                  ? "bg-primary-500 text-white"
                  : "text-content-subtle hover:text-content hover:bg-white/5"
              }`}
            >
              AI Logs
            </button>
            <button
              onClick={() => setFilterType("all")}
              className={`px-2 py-1 text-[10px] font-semibold rounded-md transition-colors ${
                filterType === "all"
                  ? "bg-primary-500 text-white"
                  : "text-content-subtle hover:text-content hover:bg-white/5"
              }`}
            >
              All
            </button>
          </div>
        </div>

        {/* Level Controls & Pause/Clear */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {(["debug", "info", "warn", "error"] as LogLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => toggleLevel(level)}
                className={`px-1.5 py-0.5 rounded border text-[9px] font-semibold font-mono uppercase transition-colors ${
                  selectedLevels[level]
                    ? getLevelStyles(level)
                    : "bg-surface/10 text-content-subtle border-border/40 hover:bg-white/5"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Auto Scroll Checkbox */}
            <label className="flex items-center gap-1 cursor-pointer select-none text-[10px] text-content-subtle hover:text-content">
              <input
                type="checkbox"
                checked={autoScroll}
                onChange={(e) => setAutoScroll(e.target.checked)}
                className="rounded border-border text-primary-500 focus:ring-0 bg-transparent"
              />
              <span>Scroll</span>
            </label>

            <span className="w-px h-3 bg-border" />

            {/* Pause Stream */}
            <Button
              size="icon"
              shape="circle"
              variant="ghost"
              className="w-6 h-6"
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? "Resume log stream" : "Pause log stream"}
            >
              {isPaused ? <Play size={10} /> : <Pause size={10} />}
            </Button>

            {/* Clear Logs */}
            <Button
              size="icon"
              shape="circle"
              variant="ghost"
              className="w-6 h-6 text-rose-400 hover:text-rose-300"
              onClick={clearLogs}
              title="Clear logs buffer"
            >
              <Trash2 size={10} />
            </Button>
          </div>
        </div>
      </div>

      {/* Log Console Container */}
      <div className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-1.5 scrollbar-hide">
        {filteredLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 text-content-subtle">
            <Cpu size={24} className="opacity-30 mb-2" />
            <div className="text-xs font-semibold">No logs match filters</div>
            <div className="text-[10px] mt-0.5">
              Interact with the Copilot or change filters to see events.
            </div>
          </div>
        ) : (
          filteredLogs.map((log, idx) => {
            const hasMeta = log.meta && Object.keys(log.meta).length > 0;
            const isExpanded = expandedLogs[idx];
            const timeStr = new Date(log.ts).toTimeString().split(" ")[0];
            const msStr = String(log.ts % 1000).padStart(3, "0");

            return (
              <div
                key={`${log.ts}-${idx}`}
                className={`flex flex-col border border-border/30 rounded-lg bg-surface/5 transition-colors overflow-hidden ${
                  hasMeta ? "cursor-pointer hover:bg-surface/10" : ""
                }`}
                onClick={() => {
                  if (hasMeta) {
                    setExpandedLogs((prev) => ({
                      ...prev,
                      [idx]: !prev[idx],
                    }));
                  }
                }}
              >
                {/* Log Header Row */}
                <div className="flex items-start gap-2 p-2 text-xs leading-normal">
                  {hasMeta ? (
                    <span className="flex-shrink-0 mt-0.5 text-content-subtle">
                      {isExpanded ? (
                        <ChevronDown size={12} />
                      ) : (
                        <ChevronRight size={12} />
                      )}
                    </span>
                  ) : (
                    <span className="w-3" />
                  )}

                  {/* Timestamp */}
                  <span className="flex-shrink-0 font-mono text-[10px] text-content-subtle mt-0.5 font-mono">
                    {timeStr}.{msStr}
                  </span>

                  {/* Level Badge */}
                  <span
                    className={`flex-shrink-0 px-1 py-0.2 rounded border font-mono text-[8px] font-bold uppercase ${getLevelStyles(
                      log.level,
                    )}`}
                  >
                    {log.level}
                  </span>

                  {/* Module Name */}
                  {log.module && log.module.length > 0 && (
                    <span className="flex-shrink-0 font-mono text-[9px] bg-white/5 border border-white/10 rounded px-1 text-content-subtle max-w-[100px] truncate">
                      {log.module.join("/")}
                    </span>
                  )}

                  {/* Log Message */}
                  <span className="text-[11px] font-mono break-all text-content/90 font-medium font-mono">
                    {log.message}
                  </span>
                </div>

                {/* Expanded Metadata view */}
                {hasMeta && isExpanded && (
                  <div
                    className="px-8 pb-3 pt-1 border-t border-border/20 bg-black/10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <LogMetaViewer meta={log.meta} />
                  </div>
                )}
              </div>
            );
          })
        )}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
}
