import type {
  ComponentGuestRpcInterface,
  ComponentHostRpcInterface,
} from "@ubento/engine";
import { createDuplexRpc, createWindowPort } from "@ubento/rpc-utils";

const port = createWindowPort(window, window.parent);
export const rpc = createDuplexRpc<
  ComponentGuestRpcInterface,
  ComponentHostRpcInterface
>({
  port,
});

rpc.run();

rpc.watch((event) => {
  console.log(`[component.runtime.rpc.event] ${event.type}`, event);
});
