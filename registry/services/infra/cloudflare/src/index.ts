import Cloudflare from "cloudflare";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ apiKey, apiEmail, apiToken }: { apiKey?: string, apiEmail?: string, apiToken?: string }) {
  const cf = new Cloudflare({ apiKey, apiEmail, apiToken });
  return {
    zones: createResourceProxy("cloudflare", cf, "zones"),
    dns: createResourceProxy("cloudflare", cf, "dns"),
    accounts: createResourceProxy("cloudflare", cf, "accounts"),
    workers: createResourceProxy("cloudflare", cf, "workers")
  };
}
