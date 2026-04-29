import axios from "axios";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ token }: { token: string }) {
  const client = axios.create({
    baseURL: "https://api.deel.com/rest/v1/",
    headers: { Authorization: `Bearer ${token}` }
  });

  return {
    contracts: createResourceProxy("deel", client, "contracts"),
    payments: createResourceProxy("deel", client, "payments"),
    people: createResourceProxy("deel", client, "people")
  };
}
