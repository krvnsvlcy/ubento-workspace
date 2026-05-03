import { Client } from "coinbase-node";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ apiKey, apiSecret }: { apiKey: string, apiSecret: string }) {
  const coinbase = new Client({ apiKey, apiSecret });
  return {
    accounts: createResourceProxy("coinbase", coinbase, "getAccounts"),
    buys: createResourceProxy("coinbase", coinbase, "getBuys"),
    sells: createResourceProxy("coinbase", coinbase, "getSells")
  };
}
