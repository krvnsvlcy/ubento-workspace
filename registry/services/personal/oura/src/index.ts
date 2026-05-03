import axios from "axios";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ accessToken }: { accessToken: string }) {
  const client = axios.create({
    baseURL: "https://api.ouraring.com/v2/usercollection/",
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  return {
    readiness: createResourceProxy("oura", client, "readiness"),
    sleep: createResourceProxy("oura", client, "sleep"),
    activity: createResourceProxy("oura", client, "activity")
  };
}
