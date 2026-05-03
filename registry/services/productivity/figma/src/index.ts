import axios from "axios";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ personalAccessToken }: { personalAccessToken: string }) {
  const client = axios.create({
    baseURL: "https://api.figma.com/v1/",
    headers: { "X-Figma-Token": personalAccessToken }
  });

  return {
    files: createResourceProxy("figma", client, "files"),
    projects: createResourceProxy("figma", client, "projects")
  };
}
