import { useUbentoEngine } from "@/hooks/app-engine";
import { memo } from "react";
import { TeamSide } from "./team/team-side";
import { WorkspaceSide } from "./workspace/workspace-side";

export const Side = memo(() => {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);

  const isWorkspace = location.view === "workspace";
  if (isWorkspace) {
    return <WorkspaceSide />;
  }
  return <TeamSide />;
});
