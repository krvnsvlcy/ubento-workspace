import { useSession } from "@/contexts/session";
import { useUbentoEngine } from "@/engine/engine";
import { workspaceClient } from "@ubento/services.sdk";
import { ErrorView, PendingView } from "@ubento/workspace.primitives";
import { useEffect, useMemo } from "react";
import { WorkspaceContent } from "./content";
import { WorkspaceControl } from "./control/control";
import { createWorkspaceEngine } from "./engine/engine";

function WorkspaceCanvas({
  workspace,
}: {
  workspace: workspaceClient.Workspace;
}) {
  const session = useSession();
  const engine = useUbentoEngine();

  const workspaceEngine = useMemo(
    () =>
      createWorkspaceEngine({
        workspace,
        engine,
        user: {
          name: session.name,
          email: session.email,
        },
      }),
    [workspace],
  );

  useEffect(() => {
    engine.setActiveWorkspaceEngine(workspaceEngine);
    return () => {
      engine.clearActiveWorkspaceEngine(workspaceEngine);
    };
  }, [engine, workspaceEngine]);

  return (
    <div className="relative w-full h-full">
      <WorkspaceContent engine={workspaceEngine} />
      <WorkspaceControl engine={workspaceEngine} />
    </div>
  );
}

export function Workspace({ slug }: { slug: string }) {
  const engine = useUbentoEngine();
  const { data: workspace, status } =
    engine.ubento.workspace.useWorkspaceBySlug({ slug });

  if (status === "pending") {
    return <PendingView message={slug} />;
  } else if (status === "error") {
    return <ErrorView message={`Failed to load workspace ${slug}...`} />;
  } else if (!workspace) {
    return <ErrorView message={`Workspace ${slug} not found...`} />;
  }
  return <WorkspaceCanvas workspace={workspace} />;
}
