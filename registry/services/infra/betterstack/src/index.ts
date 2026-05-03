import axios from "axios";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ token }: { token: string }) {
  const client = axios.create({
    baseURL: "https://uptime.betterstack.com/api/v2/",
    headers: { Authorization: `Bearer ${token}` }
  });

  return {
    monitors: createResourceProxy("betterstack", client, "monitors"),
    heartbeats: createResourceProxy("betterstack", client, "heartbeats"),
    incidents: createResourceProxy("betterstack", client, "incidents")
  };
}
