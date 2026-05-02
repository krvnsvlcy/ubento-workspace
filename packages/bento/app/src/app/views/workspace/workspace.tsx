import { useUbentoEngine } from "@/engine/engine";
import { ErrorView, PendingView } from "@ubento/bento-primitives";
import { workspaceClient } from "@ubento/sdk";
import { useMemo } from "react";
import { WorkspaceContent } from "./content";
import { createWorkspaceEngine } from "./engine/engine";

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

  return <WorkspaceContent engine={workspaceEngine} />;
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
