import { useUbentoEngine } from "@/engine/engine";
import { ErrorView, PendingView } from "@ubento/bento-primitives";
import { workspaceClient } from "@ubento/sdk";
import { useEffect, useMemo } from "react";
import { WorkspaceContent } from "./content";
import { createWorkspaceEngine } from "./engine/engine";
import { WorkspaceControl } from "./interactor/control";

function WorkspaceCanvas({
  workspace,
}: {
  workspace: workspaceClient.Workspace;
}) {
  const engine = useUbentoEngine();

  const workspaceEngine = useMemo(
    () =>
      createWorkspaceEngine({
        workspaceId: workspace.id,
        engine,
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
    return <PendingView message={`Loading workspace ${slug}...`} />;
  } else if (status === "error") {
    return <ErrorView message={`Failed to load workspace ${slug}...`} />;
  } else if (!workspace) {
    return <ErrorView message={`Workspace ${slug} not found...`} />;
  }
  return <WorkspaceCanvas workspace={workspace} />;
}
