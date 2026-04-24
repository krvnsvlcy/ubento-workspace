"use client";

import { env } from "@/lib/env";
import { ubento } from "@/lib/ubento";
import { Bento, Host } from "@ubento/bento-app";
import { Session } from "../hooks/session";

export function Dashboard({ session }: { session: Session }) {
  const host: Host = {
    currentSession: session,
    ubento,
    iframeUrl: env.BENTO_RUNTIME_URL,
  };

  return <Bento host={host} />;
}
