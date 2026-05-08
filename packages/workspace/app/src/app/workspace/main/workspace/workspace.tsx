import { useSession } from "@/contexts/session";
import { useUbentoEngine } from "@/engine/engine";
import { workspaceClient } from "@ubento/services.sdk";
import { ErrorView, PendingView } from "@ubento/workspace.primitives";
import { useEffect, useState } from "react";
import { WorkspaceContent } from "./content";
import { WorkspaceControl } from "./control/control";
import { createWorkspaceEngine, WorkspaceEngine } from "./engine/engine";
import { createWorkspaceToolkit } from "./engine/toolkit";

function WorkspaceCanvas({
  workspace,
}: {
  workspace: workspaceClient.Workspace;
}) {
  const session = useSession();
  const engine = useUbentoEngine();

  // 1. Hold the engines in state, initializing as null
  const [engines, setEngines] = useState<{
    workspaceEngine: WorkspaceEngine;
    workspaceToolkit: any; // Replace with your actual toolkit type
  } | null>(null);

  useEffect(() => {
    // 2. Instantiate the engine inside the effect
    const newWorkspaceEngine = createWorkspaceEngine({
      workspace,
      engine,
      user: {
        name: session.name,
        email: session.email,
      },
    });

    const newWorkspaceToolkit = createWorkspaceToolkit({
      workspace: newWorkspaceEngine,
    });

    // 3. Set them in state so children can render
    setEngines({
      workspaceEngine: newWorkspaceEngine,
      workspaceToolkit: newWorkspaceToolkit,
    });

    // 4. Setup side effects
    engine.setActiveWorkspaceEngine(newWorkspaceEngine);
    engine.copilot.addToolkit(newWorkspaceToolkit);

    // 5. Cleanup tied exactly to this instance
    return () => {
      engine.clearActiveWorkspaceEngine(newWorkspaceEngine);
      engine.copilot.removeToolkit(newWorkspaceToolkit.name);
      newWorkspaceEngine.dispose();
    };
  }, [workspace.id, engine, session.name, session.email]); // Re-run if workspace changes

  // 6. Do not render children until the engine is successfully created
  if (!engines) {
    return null; // Or a subtle loading skeleton
  }

  return (
    <div className="relative w-full h-full">
      <WorkspaceContent
        engine={engines.workspaceEngine}
        key={"content-" + engines.workspaceEngine.id}
      />
      <WorkspaceControl
        engine={engines.workspaceEngine}
        key={"control-" + engines.workspaceEngine.id}
      />
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
