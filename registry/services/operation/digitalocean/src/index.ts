import { client } from "digitalocean";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ token }: { token: string }) {
  const doClient = (client as any)(token);
  return {
    droplets: createResourceProxy("digitalocean", doClient, "droplets"),
    domains: createResourceProxy("digitalocean", doClient, "domains"),
    account: createResourceProxy("digitalocean", doClient, "account")
  };
}
