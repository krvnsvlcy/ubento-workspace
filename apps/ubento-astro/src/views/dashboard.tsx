"use client";

import { ubentoApi } from "@/lib/ubento";
import { routes } from "@/routes";
import { PendingView } from "@ubento/bento.arlo-core";
import {
  createUbentoEngine,
  Ubento,
} from "@ubento/workspace.app";
import type { UbentoEngine } from "@ubento/workspace.app";
import { useEffect, useState } from "react";
import { useSession } from "../hooks/session";

const workspaceRuntimeUrl = process.env.NEXT_PUBLIC_WORKSPACE_RUNTIME_URL!;
const componentRuntimeUrl = process.env.NEXT_PUBLIC_COMPONENT_RUNTIME_URL!;

if (!workspaceRuntimeUrl)
  throw new Error("Missing NEXT_PUBLIC_WORKSPACE_RUNTIME_URL");
if (!componentRuntimeUrl)
  throw new Error("Missing NEXT_PUBLIC_COMPONENT_RUNTIME_URL");

import type { Session } from "../hooks/session";

export function Dashboard({ session: propSession }: { session?: Session }) {
  const contextSession = useSession();
  const session = propSession || contextSession;
  const [engine, setEngine] = useState<UbentoEngine | undefined>();

  useEffect(() => {
    if (session) {
      const engine = createUbentoEngine({
        session: {
          userId: session.userId,
          teamId: session.teamId,
          email: session.email,
          name: session.name,
          picture: session.picture,
        },
        workspaceRuntimeUrl,
        componentRuntimeUrl,
        ubentoApi,
      });
      setEngine(engine);
    } else {
      window.location.href = routes.login();
    }
  }, [session]);

  if (!engine)
    return (
      <div className="h-screen w-screen">
        <PendingView message="Ubento" />
      </div>
    );

  return <Ubento engine={engine} />;
}
