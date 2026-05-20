/* --------------------------------- Schema -------------------------------- */

export type LogLevel = "error" | "warn" | "info" | "debug";

export type LogEvent = {
  event: string;
} & Record<string, any>;

export type Logger = {
  info: (message: string, event: LogEvent) => void;
  warn: (message: string, event: LogEvent) => void;
  error: (message: string, event: LogEvent) => void;
  debug: (message: string, event: LogEvent) => void;

  child: (
    meta: Record<string, any> & { module?: string | string[] },
    metaHook?: (meta: Record<string, any>) => Record<string, any>,
  ) => Logger;
};

/* ------------------------------ Record Types ------------------------------ */

export type LogRecord = {
  ts: number;
  level: LogLevel;
  message: string;

  appName: string;
  module?: string[];

  meta: Record<string, any>;
};

export type LogFilter = (record: LogRecord) => boolean;
export type Unsubscribe = () => void;

export type LogTransport = {
  name: string;
  emit: (record: LogRecord) => void;
  flush?: () => void;
};

export type EventStream = {
  emit: (record: LogRecord) => void;
  subscribe: (
    fn: (record: LogRecord) => void,
    filter?: LogFilter,
  ) => Unsubscribe;

  // observability UX helpers
  snapshot: () => LogRecord[];
  clear: () => void;

  addTransport: (transport: LogTransport, filter?: LogFilter) => Unsubscribe;
};

/* --------------------------------- Utils --------------------------------- */

const LEVEL_RANK: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

function shouldLog(minLevel: LogLevel, level: LogLevel) {
  return LEVEL_RANK[level] <= LEVEL_RANK[minLevel];
}

function safeJson(value: any) {
  // Avoid crashing when meta has circular refs (devtools / transport)
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return { __unserializable: true };
  }
}

function normalizeModule(parent?: string[], next?: string | string[]) {
  const p = parent ?? [];
  if (!next) return p.length ? p : undefined;
  const n = Array.isArray(next) ? next : [next];
  const merged = [...p, ...n].filter(Boolean);
  return merged.length ? merged : undefined;
}

function nowIsoLike(ts: number) {
  // "YYYY-MM-DD HH:mm:ss.mmm"
  const d = new Date(ts);
  return d.toISOString().replace("T", " ").replace("Z", "");
}

/* ----------------------------- Filter Helpers ----------------------------- */

export function filterByMinLevel(min: LogLevel): LogFilter {
  return (r) => LEVEL_RANK[r.level] <= LEVEL_RANK[min];
}

export function filterByModulePrefix(prefix: string[]): LogFilter {
  return (r) => {
    const m = r.module ?? [];
    if (prefix.length > m.length) return false;
    for (let i = 0; i < prefix.length; i++) {
      if (m[i] !== prefix[i]) return false;
    }
    return true;
  };
}

export function filterByModuleIncludes(name: string): LogFilter {
  return (r) => (r.module ?? []).includes(name);
}

/* ------------------------------ Global Stream ----------------------------- */

export function createEventStream(opts?: { bufferSize?: number }): EventStream {
  const bufferSize = opts?.bufferSize ?? 10_000;

  const buffer: LogRecord[] = [];
  const subs = new Set<{ fn: (r: LogRecord) => void; filter?: LogFilter }>();
  const transports = new Set<{ t: LogTransport; filter?: LogFilter }>();

  function pushBuffer(r: LogRecord) {
    buffer.push(r);
    if (buffer.length > bufferSize) {
      buffer.splice(0, buffer.length - bufferSize);
    }
  }

  return {
    emit(record) {
      pushBuffer(record);

      // Subscribers first (devtools)
      subs.forEach(({ fn, filter }) => {
        if (!filter || filter(record)) fn(record);
      });

      // Then transports (console, remote, etc.)
      transports.forEach(({ t, filter }) => {
        if (!filter || filter(record)) t.emit(record);
      });
    },

    subscribe(fn, filter) {
      const entry = { fn, filter };
      subs.add(entry);
      return () => subs.delete(entry);
    },

    snapshot() {
      return buffer.slice();
    },

    clear() {
      buffer.splice(0, buffer.length);
    },

    addTransport(t, filter) {
      const entry = { t, filter };
      transports.add(entry);
      return () => transports.delete(entry);
    },
  };
}

/* -------------------------- Pretty Console Transport ----------------------- */

export function createPrettyConsoleTransport(options?: {
  collapsedGroups?: boolean;
  showAppAndModuleInline?: boolean;
}): LogTransport {
  const collapsedGroups = options?.collapsedGroups ?? true;
  const showInline = options?.showAppAndModuleInline ?? true;

  return {
    name: "console.pretty",
    emit(record) {
      const ts = nowIsoLike(record.ts);
      const lvl = record.level.toUpperCase();

      const css =
        record.level === "error"
          ? "color:#ef4444;font-weight:700"
          : record.level === "warn"
            ? "color:#f59e0b;font-weight:700"
            : record.level === "info"
              ? "color:#22c55e;font-weight:700"
              : "color:#06b6d4;font-weight:700";

      const reset = "color:inherit;font-weight:inherit";

      const moduleStr = record.module?.join("/") ?? "";
      const prefix = showInline
        ? ` ${record.appName}${moduleStr ? `::${moduleStr}` : ""}`
        : "";

      const header = `%c${ts} ${lvl}%c${prefix} ${record.message}`;

      const hasMeta = record.meta && Object.keys(record.meta).length > 0;
      const group = collapsedGroups ? console.groupCollapsed : console.group;

      if (hasMeta) {
        group(header, css, reset);
        if (!showInline) {
          console.log("appName:", record.appName);
          if (record.module) console.log("module:", record.module);
        }
        console.log(record.meta);
        console.groupEnd();
      } else {
        const logFn =
          record.level === "error"
            ? console.error
            : record.level === "warn"
              ? console.warn
              : record.level === "info"
                ? console.info
                : console.debug;
        logFn(header, css, reset);
      }
    },
  };
}

/* ------------------------------ createLogger ------------------------------ */

export function createLogger({
  serviceName,
  module,
  level,
  logToConsole = true,

  meta,
  metaHook,

  stream,
  streamBufferSize,
  transports,
}: {
  serviceName: string;

  module?: string | string[];
  level?: LogLevel | string;
  logToConsole?: boolean;

  meta?: Record<string, any>;
  metaHook?: (meta: Record<string, any>) => Record<string, any>;

  // Stream control
  stream?: EventStream;
  streamBufferSize?: number;

  // Extra transports (remote, etc.)
  transports?: Array<{ transport: LogTransport; filter?: LogFilter }>;
}): Logger & { stream: EventStream } {
  const minLevel = ((level as LogLevel) ?? "info") as LogLevel;

  const baseStream =
    stream ?? createEventStream({ bufferSize: streamBufferSize });

  if (logToConsole) {
    baseStream.addTransport(createPrettyConsoleTransport());
  }

  transports?.forEach(({ transport, filter }) =>
    baseStream.addTransport(transport, filter),
  );

  type InternalState = {
    baseMeta: Record<string, any>;
    modulePath?: string[];
    hook: (m: Record<string, any>) => Record<string, any>;
  };

  function makeLogger(state: InternalState): Logger {
    function child(
      extra: Record<string, any> & { module?: string | string[] },
      childHook: (meta: Record<string, any>) => Record<string, any> = (m) => m,
    ): Logger {
      const nextModule = normalizeModule(state.modulePath, extra.module);

      // Remove module from meta so it doesn’t duplicate inside meta
      const { module: _module, ...restExtra } = extra;

      return makeLogger({
        baseMeta: { ...state.baseMeta, ...restExtra },
        modulePath: nextModule,
        // chain like server: childHook(metaHook(meta))
        hook: (m) => childHook(state.hook(m)),
      });
    }

    function log(lvl: LogLevel, message: string, event: LogEvent) {
      if (!shouldLog(minLevel, lvl)) return;

      // Merge: baseMeta + event, then hook
      const merged = state.hook({
        ...(state.baseMeta ?? {}),
        ...(event as any),
      });

      const record: LogRecord = {
        ts: Date.now(),
        level: lvl,
        message,
        appName: serviceName,
        module: state.modulePath,
        meta: safeJson(merged),
      };

      baseStream.emit(record);
    }

    return {
      child,
      info: (message, event) => log("info", message, event),
      warn: (message, event) => log("warn", message, event),
      error: (message, event) => log("error", message, event),
      debug: (message, event) => log("debug", message, event),
    };
  }

  const root = makeLogger({
    baseMeta: meta ?? {},
    modulePath: normalizeModule(undefined, module),
    hook: metaHook ?? ((m) => m),
  });

  return Object.assign(root, { stream: baseStream });
}
