import { PostHog } from "posthog-node";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ apiKey, host }: { apiKey: string, host?: string }) {
  const posthog = new PostHog(apiKey, { host: host || 'https://app.posthog.com' });
  return {
    capture: posthog.capture.bind(posthog),
    identify: posthog.identify.bind(posthog),
    alias: posthog.alias.bind(posthog),
    groupIdentify: posthog.groupIdentify.bind(posthog)
  };
}
