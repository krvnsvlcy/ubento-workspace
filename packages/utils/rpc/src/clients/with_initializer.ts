import { RpcPort } from "~/ports/port.js";
import { HandlerMap, RpcInterfaceDefinition } from "~/types.js";
import { createDuplexRpc, DuplexRpc } from "./core.js";

export type DuplexRpcWithInitializer<
  Ingress extends RpcInterfaceDefinition,
  Egress extends RpcInterfaceDefinition,
> = DuplexRpc<Ingress, Egress> & {
  /** Manually trigger initialization (idempotent). */
  initialize: () => Promise<void>;
};

export function createDuplexRpcWithInitializer<
  Ingress extends RpcInterfaceDefinition,
  Egress extends RpcInterfaceDefinition,
>(opts: {
  port: RpcPort;
  handlers?: HandlerMap<Ingress>;
  /**
   * Called once before the first call() resolves.
   * You get the live DuplexRpc instance; do any handshakes (ping), warmups,
   * capability fetches, etc. Throw to fail this attempt (a later call retries).
   */
  initializer: (rpc: DuplexRpc<Ingress, Egress>) => Promise<void>;
}): DuplexRpcWithInitializer<Ingress, Egress> {
  const core = createDuplexRpc<Ingress, Egress>({
    port: opts.port,
    handlers: opts.handlers,
  });

  // Track whether core.run() has been called; we’ll auto-run on initialize()
  let started = false;
  const runOnce = () => {
    if (!started) {
      core.run();
      started = true;
    }
  };

  // Simple state machine for init
  type InitState = "idle" | "running" | "ready" | "failed";
  let state: InitState = "idle";
  let inflight: Promise<void> | null = null;

  const initialize = (): Promise<void> => {
    // Fast path
    if (state === "ready") return Promise.resolve();

    // If already running, return same promise
    if (state === "running" && inflight) return inflight;

    // (Re)start initialization
    runOnce();
    state = "running";
    inflight = (async () => {
      try {
        await opts.initializer(core);
        state = "ready";
      } catch (err) {
        // allow retry on next call/initialize()
        state = "failed";
        inflight = null;
        throw err;
      }
    })();

    return inflight;
  };

  // Wrap call() to gate on initialization
  const callWrapped: typeof core.call = async (method, request, options) => {
    await initialize();
    return core.call(method as any, request as any, options as any);
  };

  // Wrap run()/dispose() to keep state consistent (but preserve public API)
  const runWrapped = () => {
    runOnce();
  };

  const disposeWrapped = () => {
    core.dispose();
    started = false;
    state = "idle";
    inflight = null;
  };

  // Return the augmented API without breaking the original surface
  const api: DuplexRpcWithInitializer<Ingress, Egress> = {
    ...core,
    run: runWrapped,
    dispose: disposeWrapped,
    call: callWrapped as any,
    initialize,
  };

  return api;
}
