import { Client } from "@hubspot/api-client";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ accessToken }: { accessToken: string }) {
  const hubspot = new Client({ accessToken });
  return {
    crm: createResourceProxy("hubspot", hubspot, "crm"),
    marketing: createResourceProxy("hubspot", hubspot, "marketing"),
    cms: createResourceProxy("hubspot", hubspot, "cms")
  };
}
