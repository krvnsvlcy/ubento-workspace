import axios from "axios";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ apiKey }: { apiKey: string }) {
  const client = axios.create({
    baseURL: "https://api.apollo.io/v1/",
    params: { api_key: apiKey }
  });

  return {
    people: createResourceProxy("apollo", client, "people"),
    accounts: createResourceProxy("apollo", client, "accounts")
  };
}
