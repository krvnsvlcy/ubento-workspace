import { LinearClient } from "@linear/sdk";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ apiKey }: { apiKey: string }) {
  const linear = new LinearClient({ apiKey });
  return {
    issues: createResourceProxy("linear", linear, "issues"),
    projects: createResourceProxy("linear", linear, "projects"),
    teams: createResourceProxy("linear", linear, "teams"),
    users: createResourceProxy("linear", linear, "users")
  };
}
