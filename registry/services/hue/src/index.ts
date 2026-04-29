import { v3 } from "node-hue-api";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ host, username }: { host: string, username: string }) {
  // node-hue-api is largely async/factory based. 
  // We provide a way to get the api instance.
  return {
    api: () => v3.api.createLocal(host).connect(username)
  };
}
