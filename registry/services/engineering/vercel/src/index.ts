import * as Vercel from "@vercel/client";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ token }: { token: string }) {
  // @vercel/client provides utility functions directly, not an API client.
  // We return a proxy to these functions or just the functions themselves.
  return {
    client: Vercel,
    token
  };
}
