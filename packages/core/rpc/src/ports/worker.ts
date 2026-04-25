import { RpcPort } from "./port.js";

export function createWorkerPort(worker: Worker): RpcPort {
  return {
    postMessage: (message: any, transfer?: Transferable[]) => {
      if (transfer && transfer.length > 0) {
        worker.postMessage(message, transfer);
      } else {
        worker.postMessage(message);
      }
    },
    onMessage: (
      listener: (data: any, ports: readonly MessagePort[]) => void
    ) => {
      const handler = (ev: MessageEvent) => listener(ev.data, ev.ports);
      worker.addEventListener("message", handler);
      return () => worker.removeEventListener("message", handler);
    },
    onError: (listener: (error: any) => void) => {
      const handler = (ev: ErrorEvent) => listener(ev.error);
      worker.addEventListener("error", handler);
      return () => worker.removeEventListener("error", handler);
    },
  };
}
