import Plausible from "plausible-api";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ siteId, apiKey, url }: { siteId: string, apiKey: string, url?: string }) {
  const Client = Plausible as any;
  const plausible = new Client({ siteId, apiKey, url: url || 'https://plausible.io' });
  return {
    events: createResourceProxy("plausible", plausible, "events"),
    stats: createResourceProxy("plausible", plausible, "stats")
  };
}
