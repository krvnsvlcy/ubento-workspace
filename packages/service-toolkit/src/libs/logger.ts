import { LoggingWinston } from "@google-cloud/logging-winston";
import util from "util";
import winston, { format } from "winston";

/* ---------------------------- Schema ---------------------------- */

export type LogLevel = "error" | "warn" | "info" | "debug";
export type BaseLogEvent<E extends string> = {
  event: E;
};
export type ErrorEvent = BaseLogEvent<"error"> & {
  code?: string;
  stack?: string;
  context?: Record<string, any>;
};
export type WarningEvent = BaseLogEvent<"warning"> & {
};
export type InfoEvent = BaseLogEvent<"info"> & {
};
export type DebugEvent = BaseLogEvent<"debug"> & {
};

export type LogEvent =
  | ErrorEvent
  | WarningEvent
  | InfoEvent
  | DebugEvent;

export type Logger<E extends BaseLogEvent<string>> = {
  info: (message: string, event: E | LogEvent) => void;
  warn: (message: string, event: E | LogEvent) => void;
  error: (message: string, event: E | LogEvent) => void;
  debug: (message: string, event: E | LogEvent) => void;
  child: (meta: Record<string, any>) => Logger<E>;
};


/* --------------------------- Factory ---------------------------- */

// Pretty console formatter
const prettyConsoleFormat = format.printf(
  ({ level, message, timestamp, service, event, ...meta }) => {
    // pick color
    const color =
      level === "error"
        ? "\x1b[31m" // red
        : level === "warn"
          ? "\x1b[33m" // yellow
          : level === "info"
            ? "\x1b[32m" // green
            : "\x1b[36m"; // cyan for debug/others

    // reset color
    const reset = "\x1b[0m";

    // base line
    let line = `${color}${timestamp} ${level.toUpperCase()} ${reset} ${message}`;

    // print event/context if present
    if (event) {
      line += `\n${util.inspect(event, { colors: true, depth: null })}`;
    } else if (Object.keys(meta).length) {
      line += `\n${util.inspect(meta, { colors: true, depth: null })}`;
    }

    return line;
  }
);

export function createLogger<E extends BaseLogEvent<string>>({
  serviceName,
  level,
  logToConsole = process.env.NODE_ENV === "development",
  logToGcp = process.env.NODE_ENV === "production",
  meta,
  metaHook,
}: {
  serviceName: string;
  level?: LogLevel | string;
  logToConsole?: boolean;
  logToGcp?: boolean;
  meta?: Record<string, any>;
  metaHook?: (meta: Record<string, any>) => Record<string, any>;
}): Logger<E> {
  const transports: winston.transport[] = [];

  if (logToConsole) {
    transports.push(
      new winston.transports.Console({
        format: format.combine(
          format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          prettyConsoleFormat
        ),
      })
    );
  }

  if (logToGcp) {
    transports.push(
      new LoggingWinston({
        logName: `services.${serviceName}`,
        serviceContext: { service: serviceName },
      })
    );
  }

  const base = winston.createLogger({
    level: (level as string) ?? process.env.LOG_LEVEL ?? "info",
    transports,
    defaultMeta: { ...meta, service: serviceName },
  });

  function makeLogger(logger: winston.Logger, metaHook: (meta: Record<string, any>) => Record<string, any> = (meta) => meta): Logger<E> {
    function child(extra: Record<string, any>, childMetaHook: (meta: Record<string, any>) => Record<string, any> = (meta) => meta) {
      return makeLogger(logger.child(extra), meta => childMetaHook(metaHook(meta)));
    }

    function log(level: string, message: string, event: E | LogEvent) {
      logger.log(
        level,
        message,
        metaHook({ ...meta, ...event }),
      );
    }
    return {
      child,
      info: (message: string, event: E | LogEvent) => log("info", message, event),
      warn: (message: string, event: E | LogEvent) => log("warn", message, event),
      error: (message: string, event: E | LogEvent) => log("error", message, event),
      debug: (message: string, event: E | LogEvent) => log("debug", message, event),
    };
  }

  return makeLogger(base, metaHook);
}
