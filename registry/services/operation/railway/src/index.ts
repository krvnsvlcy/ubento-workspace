import axios from "axios";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ token }: { token: string }) {
  const client = axios.create({
    baseURL: "https://backboard.railway.app/graphql",
    headers: { Authorization: `Bearer ${token}` }
  });

  return {
    query: (query: string, variables?: any) => client.post("", { query, variables }),
  };
}
