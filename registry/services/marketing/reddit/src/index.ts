import Snoowrap from "snoowrap";
import { createResourceProxy } from "@ubento/registry-proxy";

export * from "@ubento/registry-proxy";

export default function({ userAgent, clientId, clientSecret, refreshToken }: { userAgent: string, clientId: string, clientSecret: string, refreshToken: string }) {
  const r = new Snoowrap({ userAgent, clientId, clientSecret, refreshToken });
  return {
    getSubreddit: r.getSubreddit.bind(r),
    getUser: r.getUser.bind(r),
    getSubmission: r.getSubmission.bind(r)
  };
}
