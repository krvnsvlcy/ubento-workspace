"use client";

import { ubentoApi } from "@/lib/ubento";
import { routes } from "@/routes";
import { PendingView } from "@ubento/bento.arlo-core";
import {
  createUbentoEngine,
  Ubento,
  UbentoEngine,
} from "@ubento/workspace.app";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "../hooks/session";

const workspaceRuntimeUrl = process.env.NEXT_PUBLIC_WORKSPACE_RUNTIME_URL!;
const componentRuntimeUrl = process.env.NEXT_PUBLIC_COMPONENT_RUNTIME_URL!;
const registryModuleUrlTemplate =
  process.env.NEXT_PUBLIC_REGISTRY_MODULE_URL_TEMPLATE!;

if (!workspaceRuntimeUrl)
  throw new Error("Missing NEXT_PUBLIC_WORKSPACE_RUNTIME_URL");
if (!componentRuntimeUrl)
  throw new Error("Missing NEXT_PUBLIC_COMPONENT_RUNTIME_URL");
if (!registryModuleUrlTemplate)
  throw new Error("Missing NEXT_PUBLIC_REGISTRY_MODULE_URL_TEMPLATE");

export function Dashboard() {
  const session = useSession();
  const router = useRouter();
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
        registryModuleUrlTemplate,
        ubentoApi,
      });
      setEngine(engine);
    } else {
      router.push(routes.login());
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
