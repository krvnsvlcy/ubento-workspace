import { RpcPort } from "~/ports/port.js";
import {
  engineStateChanged,
  HandlerMap,
  HandlerMapProxy,
  ReqOf,
  RpcInterfaceDefinition,
  RpcMethod,
} from "../types.js";

let RPC_DEFAULT_TIMEOUT = 60_000;

type ReqMsg<
  T extends RpcInterfaceDefinition = RpcInterfaceDefinition,
  K extends RpcMethod<T> = keyof T,
> = {
  __rpc__: true;
  kind: "request";
  id: string;
  method: K;
  payload: ReqOf<T[K]>;
};

type ResOkMsg<
  T extends RpcInterfaceDefinition = RpcInterfaceDefinition,
  K extends RpcMethod<T> = keyof T,
> = {
  __rpc__: true;
  kind: "response";
  id: string;
  method: K;
  ok: true;
  payload: engineStateChanged<T[K]>;
};

type ResErrMsg = {
  __rpc__: true;
  kind: "response";
  id: string;
  method: string;
  ok: false;
  error: string;
};

type AnyMsg = ReqMsg | ResOkMsg | ResErrMsg;

const isRpcMsg = (x: any): x is AnyMsg =>
  !!x && x.__rpc__ === true && (x.kind === "request" || x.kind === "response");

const rid = () => Math.random().toString(36).slice(2);

// ---------- API Types ----------

type CallFn<T extends RpcInterfaceDefinition> = <K extends RpcMethod<T>>(
  method: K,
  request: ReqOf<T[K]>,
  options?: { timeout?: number; transfer?: Transferable[] },
) => Promise<engineStateChanged<T[K]>>;

export type RpcEvent = {
  id: string;
  direction: "out" | "in";
  type: string;
  request: any;
  response?: any;
  error?: string;
  timedOut?: boolean;
  startedAt: number;
  endedAt: number;
  durationMs: number;
  transferCount?: number;
};

// ---------- Overloads ----------
export type DuplexRpc<
  Ingress extends RpcInterfaceDefinition,
  Egress extends RpcInterfaceDefinition,
> = {
  run: () => void;
  ingress: HandlerMapProxy<Ingress>;
  egress: HandlerMapProxy<Egress>;
  call: CallFn<Egress>;
  setHandlers: (handlers: Partial<HandlerMap<Ingress>>) => void;
  watch: (watcher: (event: RpcEvent) => void) => () => void;
  getTimeOffset: () => Promise<number>;
  dispose: () => void;
};

export function createDuplexRpc<
  Ingress extends RpcInterfaceDefinition,
  Egress extends RpcInterfaceDefinition,
>(opts: {
  port: RpcPort;
  handlers?: HandlerMap<Ingress>;
}): DuplexRpc<Ingress, Egress>;

// ---------- Impl ----------
export function createDuplexRpc<
  Ingress extends RpcInterfaceDefinition,
  Egress extends RpcInterfaceDefinition,
>(opts: {
  port: RpcPort;
  handlers?: HandlerMap<Ingress>;
}): DuplexRpc<Ingress, Egress> {
  const { port } = opts;

  // ─────────────────────────────────────────────
  // Handlers
  // ─────────────────────────────────────────────
  type SystemHandlers = {
    __sys_ping__: (hostTime: number) => {
      workerTime: number;
      echoedHostTime: number;
    };
  };
  const sysHandlers: HandlerMap<SystemHandlers> = {
    __sys_ping__: (hostTime: number) => {
      return {
        workerTime: performance.now(),
        echoedHostTime: hostTime,
      };
    },
  };
  let userHandlers: Partial<HandlerMap<Ingress>> = opts.handlers || {};
  const setHandlers = (h: Partial<HandlerMap<Ingress>>) => {
    userHandlers = { ...userHandlers, ...h };
  };
  const ingressHandlerMapProxy: HandlerMapProxy<Ingress> = new Proxy(
    {} as HandlerMapProxy<Ingress>,
    {
      get: (_, prop) => {
        // Safely ignore symbols (like Symbol.toStringTag)
        if (typeof prop !== "string") {
          return undefined;
        }

        // Return the handler if it exists, or undefined if it doesn't
        return (sysHandlers as any)[prop] || (userHandlers as any)[prop];
      },
    },
  );
  // ─────────────────────────────────────────────
  // Notifications
  // ─────────────────────────────────────────────
  const watchers = new Set<(rec: RpcEvent) => void>();
  const notify = (rec: RpcEvent) => {
    for (const fn of watchers) {
      try {
        fn(rec);
      } catch {
        // ignore watcher errors
      }
    }
  };
  const watch = (cb: (rec: RpcEvent) => void) => {
    watchers.add(cb);
    return () => watchers.delete(cb);
  };

  // ─────────────────────────────────────────────
  // Outbox
  // ─────────────────────────────────────────────
  const pending = new Map<
    string,
    {
      type: keyof Egress;
      request: any;
      transferCount?: number;
      startedAt: number;
      resolve: (v: any) => void;
      reject: (e: any) => void;
      timer?: any;
    }
  >();
  type Outgoing = {
    msg: AnyMsg;
    transfer?: Transferable[];
  };
  let outbox: Outgoing[] = [];
  let outboxScheduled = false;
  const flushOutbox = () => {
    outboxScheduled = false;
    if (outbox.length === 0) return;

    const messages = outbox.map((o) => o.msg);

    const allTransfers: Transferable[] = [];
    for (const item of outbox) {
      if (item.transfer && item.transfer.length > 0) {
        allTransfers.push(...item.transfer);
      }
    }

    outbox = [];

    if (allTransfers.length > 0) {
      port.postMessage(messages, allTransfers);
    } else {
      port.postMessage(messages);
    }
  };
  const enqueueOutbox = (msg: AnyMsg, transfer?: Transferable[]) => {
    outbox.push({ msg, transfer });
    if (!outboxScheduled) {
      outboxScheduled = true;
      queueMicrotask(flushOutbox);
    }
  };
  const call: CallFn<any> = (method, request, options) => {
    return new Promise((resolve, reject) => {
      const id = rid();
      const msg: ReqMsg = {
        __rpc__: true,
        kind: "request",
        id,
        method: method as any,
        payload: request,
      };

      const timeout = options?.timeout ?? RPC_DEFAULT_TIMEOUT;
      const transferCount = options?.transfer?.length ?? 0;
      const startedAt = Date.now();

      const timer = setTimeout(() => {
        pending.delete(id);
        const endedAt = Date.now();
        notify({
          id,
          direction: "out",
          type: String(method as any),
          request,
          timedOut: true,
          error: `RPC call timed out: ${String(method)}`,
          startedAt,
          endedAt,
          durationMs: endedAt - startedAt,
          transferCount,
        });
        reject(new Error(`RPC call timed out: ${String(method)}`));
      }, timeout);

      pending.set(id, {
        type: method as any,
        request,
        transferCount,
        startedAt,
        resolve,
        reject,
        timer,
      });

      enqueueOutbox(msg, options?.transfer);
    });
  };
  const egressHandlerMapProxy: HandlerMapProxy<Egress> = new Proxy(
    {} as HandlerMapProxy<Egress>,
    {
      get: (_, prop) => {
        if (typeof prop !== "string") {
          return undefined;
        }
        return (arg: any) => call(prop, arg);
      },
    },
  );

  // ─────────────────────────────────────────────
  // Inbox
  // ─────────────────────────────────────────────
  const handleInboxMessage = (msg: AnyMsg) => {
    // 1. Response handling (we received a response to our call)
    if (msg.kind === "response") {
      const p = pending.get(msg.id);
      if (!p) return;

      pending.delete(msg.id);
      if (p.timer) clearTimeout(p.timer);

      const endedAt = Date.now();
      const durationMs = endedAt - p.startedAt;

      if (msg.ok) {
        notify({
          id: msg.id,
          direction: "out",
          type: String(p.type),
          request: p.request,
          response: (msg as ResOkMsg).payload,
          startedAt: p.startedAt,
          endedAt,
          durationMs,
          transferCount: p.transferCount,
        });
        p.resolve((msg as ResOkMsg).payload);
      } else {
        const error = (msg as ResErrMsg).error || "RPC error";
        notify({
          id: msg.id,
          direction: "out",
          type: String(p.type),
          request: p.request,
          error,
          startedAt: p.startedAt,
          endedAt,
          durationMs,
          transferCount: p.transferCount,
        });
        p.reject(new Error(error));
      }
      return;
    } else if (msg.kind === "request") {
      // 2. Request handling (we received a request to handle)
      const req = msg as ReqMsg;
      const startedAt = Date.now();

      const method = req.method as string;
      const fn = (sysHandlers as any)[method] || (userHandlers as any)[method];

      if (!fn) {
        const err: ResErrMsg = {
          __rpc__: true,
          kind: "response",
          id: req.id,
          method: req.method as string,
          ok: false,
          error: `Unknown method: ${String(req.method)}`,
        };
        enqueueOutbox(err);

        notify({
          id: req.id,
          direction: "in",
          type: String(req.method),
          request: req.payload,
          error: err.error,
          startedAt,
          endedAt: Date.now(),
          durationMs: Date.now() - startedAt,
        });
        return;
      }

      (async () => {
        try {
          const payload = await fn(req.payload);
          const ok: ResOkMsg = {
            __rpc__: true,
            kind: "response",
            id: req.id,
            method: req.method as string,
            ok: true,
            payload,
          };
          enqueueOutbox(ok);

          notify({
            id: req.id,
            direction: "in",
            type: String(req.method),
            request: req.payload,
            response: payload,
            startedAt,
            endedAt: Date.now(),
            durationMs: Date.now() - startedAt,
          });
        } catch (e: any) {
          debugger;
          const error = e?.message ?? String(e ?? "Unknown error");
          console.error(e);
          const err: ResErrMsg = {
            __rpc__: true,
            kind: "response",
            id: req.id,
            method: req.method as string,
            ok: false,
            error,
          };
          enqueueOutbox(err);

          notify({
            id: req.id,
            direction: "in",
            type: String(req.method),
            request: req.payload,
            error,
            startedAt,
            endedAt: Date.now(),
            durationMs: Date.now() - startedAt,
          });
        }
      })();
    }
  };
  const onMessage = (data: any) => {
    if (Array.isArray(data)) {
      for (const item of data) {
        if (isRpcMsg(item)) {
          handleInboxMessage(item);
        }
      }
    } else if (isRpcMsg(data)) {
      handleInboxMessage(data);
    }
  };

  // ─────────────────────────────────────────────
  // Error handling
  // ─────────────────────────────────────────────
  const onError = (error: any) => {
    const message = error?.message || "RPC port error";
    for (const [id, p] of pending) {
      if (p.timer) clearTimeout(p.timer);
      pending.delete(id);
      p.reject(new Error(message, { cause: error }));
    }
  };

  // ─────────────────────────────────────────────
  // Lifecycle
  // ─────────────────────────────────────────────
  let disposeMessageListener: () => void;
  let disposeErrorListener: () => void;
  const run = () => {
    disposeMessageListener?.();
    disposeMessageListener = port.onMessage(onMessage);

    disposeErrorListener?.();
    disposeErrorListener = port.onError(onError);
  };
  const dispose = () => {
    disposeMessageListener?.();
    disposeErrorListener?.();

    // Cleanup pending
    for (const [id, p] of pending) {
      if (p.timer) clearTimeout(p.timer);
      pending.delete(id);
      p.reject(new Error("RPC disposed"));
    }
  };

  // ─────────────────────────────────────────────
  // Time Sync
  // ─────────────────────────────────────────────
  let timeOffset = 0;
  const getTimeOffset = async (): Promise<number> => {
    if (timeOffset !== 0) return timeOffset;
    // Burst Sampling: Ping 10 times, pick the sample with lowest RTT (Round Trip Time).
    // Lowest RTT = least network jitter = most accurate offset.
    const SAMPLES = 10;
    let bestSample = { rtt: Infinity, offset: 0 };

    for (let i = 0; i < SAMPLES; i++) {
      const hostStart = performance.now();

      // Call the internal system handler
      const res: any = await call("__sys_ping__", hostStart);

      const hostEnd = performance.now();
      const rtt = hostEnd - hostStart;

      if (rtt < bestSample.rtt) {
        // Latency is roughly half the Round Trip Time
        const latency = rtt / 2;

        // RemoteTime = LocalTime + Offset
        // Offset = RemoteTime - (LocalTime + Latency)
        const offset = res.workerTime - (res.echoedHostTime + latency);

        bestSample = { rtt, offset };
      }
    }

    timeOffset = bestSample.offset;
    return timeOffset;
  };

  return {
    run,
    dispose,
    ingress: ingressHandlerMapProxy,
    egress: egressHandlerMapProxy,
    setHandlers: setHandlers as (h: Partial<HandlerMap<Ingress>>) => void,
    call: call as CallFn<Egress>,
    watch,
    getTimeOffset,
  };
}
