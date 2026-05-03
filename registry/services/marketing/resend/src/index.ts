import { Resend } from "resend";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ apiKey }: { apiKey: string }) {
  const resend = new Resend(apiKey);
  return {
    emails: createResourceProxy("resend", resend, "emails"),
    domains: createResourceProxy("resend", resend, "domains"),
    audiences: createResourceProxy("resend", resend, "audiences")
  };
}
