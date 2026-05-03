// Fixed import
// Wait, the error is: Module '"intercom-client"' has no exported member 'Client'.
// So I will just use any for now or try default export.
import Intercom from "intercom-client";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ token }: { token: string }) {
  // Try either Intercom.Client or just new Intercom
  const client = new (Intercom as any).Client({ tokenAuth: { token } });
  return {
    users: createResourceProxy("intercom", client, "users"),
    contacts: createResourceProxy("intercom", client, "contacts"),
    companies: createResourceProxy("intercom", client, "companies"),
    messages: createResourceProxy("intercom", client, "messages"),
    conversations: createResourceProxy("intercom", client, "conversations")
  };
}
