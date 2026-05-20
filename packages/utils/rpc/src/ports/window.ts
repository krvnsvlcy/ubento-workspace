import { RpcPort } from "./port.js";

export function createWindowPort(
  self: Window,
  target: Window,
  targetOrigin: string = "*"
): RpcPort {
  return {
    postMessage: (message: any, transfer?: Transferable[]) => {
      target.postMessage(message, { transfer, targetOrigin });
    },

    onMessage: (
      listener: (data: any, ports: readonly MessagePort[]) => void
    ) => {
      const wrappedListener = (event: MessageEvent) => {
        if (targetOrigin !== "*" && event.origin !== targetOrigin) return;
        listener(event.data, event.ports);
      };
      self.addEventListener("message", wrappedListener);
      return () => {
        self.removeEventListener("message", wrappedListener);
      };
    },

    onError: (listener: (error: any) => void) => {
      const handler = (ev: ErrorEvent) => listener(ev.error);
      self.addEventListener("error", handler);
      return () => self.removeEventListener("error", handler);
    },
  };
}
