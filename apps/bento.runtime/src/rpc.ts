import type { GuestRpcInterface, HostRpcInterface } from "@ubento/engine";
import { createDuplexRpc, createWindowPort } from "@ubento/rpc-utils";

const port = createWindowPort(window, window.parent);
export const rpc = createDuplexRpc<GuestRpcInterface, HostRpcInterface>({
  port,
});

rpc.run();
