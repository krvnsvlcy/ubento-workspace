import axios from "axios";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ token, organizationSlug }: { token: string, organizationSlug: string }) {
  const client = axios.create({
    baseURL: `https://sentry.io/api/0/organizations/${organizationSlug}/`,
    headers: { Authorization: `Bearer ${token}` }
  });

  return {
    projects: createResourceProxy("sentry", client, "projects"),
    issues: createResourceProxy("sentry", client, "issues"),
    releases: createResourceProxy("sentry", client, "releases")
  };
}
