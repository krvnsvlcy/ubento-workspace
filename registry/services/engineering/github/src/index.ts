import { Octokit } from "octokit";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ token }: { token: string }) {
  const octokit = new Octokit({ auth: token });
  return {
    repos: createResourceProxy("github", octokit.rest, "repos"),
    issues: createResourceProxy("github", octokit.rest, "issues"),
    pulls: createResourceProxy("github", octokit.rest, "pulls"),
    users: createResourceProxy("github", octokit.rest, "users")
  };
}
