import { TwitterApi } from "twitter-api-v2";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ bearerToken }: { bearerToken: string }) {
  const client = new TwitterApi(bearerToken);
  return {
    v2: createResourceProxy("x", client, "v2"),
    v1: createResourceProxy("x", client, "v1")
  };
}
