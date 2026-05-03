import { Client } from "@notionhq/client";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ apiKey }: { apiKey: string }) {
  const notion = new Client({ auth: apiKey });
  return {
    pages: createResourceProxy("notion", notion, "pages"),
    databases: createResourceProxy("notion", notion, "databases"),
    blocks: createResourceProxy("notion", notion, "blocks"),
    users: createResourceProxy("notion", notion, "users")
  };
}
