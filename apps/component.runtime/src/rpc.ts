import type {
  ComponentEngineRuntimeHostRpcInterface,
  ComponentEngineRuntimeRpcInterface,
} from "@ubento/bento.engine";
import { createDuplexRpc, createWindowPort } from "@ubento/rpc";

const port = createWindowPort(window, window.parent);
export const rpc = createDuplexRpc<
  ComponentEngineRuntimeRpcInterface,
  ComponentEngineRuntimeHostRpcInterface
>({
  channel: "component",
  port,
});

// Intercept console logs
const originalConsole = {
  log: console.log,
  error: console.error,
  warn: console.warn,
  info: console.info,
};
let logging = false;
const createIntercept = (type: "log" | "error" | "warn" | "info") => {
  return (...args: any[]) => {
    if (!logging) {
      logging = true;
      rpc.egress.log({ type, args });
      logging = false;
    } else {
      // originalConsole[type].apply(console, args);
    }
  };
};

console.log = createIntercept("log");
console.error = createIntercept("error");
console.warn = createIntercept("warn");
console.info = createIntercept("info");

rpc.run();

// rpc.watch((event) => {
//   console.log(`[component.runtime.rpc.event] ${event.type}`, event);
// });
