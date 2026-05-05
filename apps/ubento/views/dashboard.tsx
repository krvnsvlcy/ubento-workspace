"use client";

import { env } from "@/lib/env";
import { ubento } from "@/lib/ubento";
import { Bento, createBentoHost } from "@ubento/workspace.app";
import { useMemo } from "react";
import { Session } from "../hooks/session";

export function Dashboard({ session }: { session: Session }) {
  const host = useMemo(() => {
    return createBentoHost({
      session: {
        userId: session.userId,
        teamId: session.tenantId,
        email: "", // Not available in session
        name: session.name || "",
        picture: session.picture,
      },
      location: { view: "home", params: {} },
      ubento,
      iframeUrl: env.BENTO_RUNTIME_URL,
      componentIframeUrl:
        (env as any).BENTO_COMPONENT_RUNTIME_URL || "http://localhost:4030",
      moduleUrlTemplate:
        (env as any).BENTO_MODULE_URL_TEMPLATE ||
        "https://modules.ubento.pro/{moduleId}/{versionId}/index.js",
    });
  }, [session, ubento]);

  return <Bento host={host} />;
}
