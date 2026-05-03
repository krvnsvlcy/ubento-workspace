import type {
  BentoEngineHostRpcInterface,
  BentoEngineRuntimeRpcInterface,
} from "@ubento/engine";
import { createDuplexRpc, createWindowPort } from "@ubento/rpc-utils";

const port = createWindowPort(window, window.parent);
export const rpc = createDuplexRpc<
  BentoEngineRuntimeRpcInterface,
  BentoEngineHostRpcInterface
>({
  channel: "workspace",
  port,
});

rpc.watch((event) => {
  console.log(`[guest.rpc.event] ${event.type}`, event);
});
