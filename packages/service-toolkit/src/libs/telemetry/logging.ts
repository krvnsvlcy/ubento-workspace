import { BaseLogEvent, createLogger, Logger, LogLevel } from "../logger.js";
import { captureServiceState } from "./state.js";

/* ---------------------------- Schema ---------------------------- */

export type ServiceStartEvent = BaseLogEvent<"service.start"> & {
  port: number;
  host?: string;
};
export type ServiceEndEvent = BaseLogEvent<"service.end"> & {
  error?: string;
};
export type RequestStartEvent = BaseLogEvent<"request.start"> & {
  method: string;
  path: string;
};
export type RequestEndEvent = BaseLogEvent<"request.end"> & {
  method: string;
  path: string;
  status: number;
  duration?: number;
};

export type ServiceEvent =
  | ServiceStartEvent
  | ServiceEndEvent
  | RequestEndEvent
  | RequestStartEvent;

export type ServiceLogger<E extends BaseLogEvent<string> = ServiceEvent> =
  Logger<E | ServiceEvent>;

export function createServiceLogger<
  E extends BaseLogEvent<string> = BaseLogEvent<string>,
>({
  serviceName,
  level,
  logToConsole = process.env.NODE_ENV === "development",
  logToGcp = process.env.NODE_ENV === "production",
  meta,
  metaHook = (meta) => meta,
}: {
  serviceName: string;
  level?: LogLevel | string;
  logToConsole?: boolean;
  logToGcp?: boolean;
  meta?: Record<string, any>;
  metaHook?: (meta: Record<string, any>) => Record<string, any>;
}): ServiceLogger<E> {
  return createLogger<E | ServiceEvent>({
    serviceName,
    level,
    logToConsole,
    logToGcp,
    meta,
    metaHook: (meta) => metaHook({ ...meta, state: captureServiceState() }),
  });
}

export function getRequestLogger<
  E extends BaseLogEvent<string> = BaseLogEvent<string>,
>(req: Express.Request) {
  return req.context.logger as ServiceLogger<E>;
}
