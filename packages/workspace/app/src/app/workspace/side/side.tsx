import { useUbentoEngine } from "@/hooks/app-engine";
import { TeamSide } from "./team/team-side";
import { WorkspaceSide } from "./workspace/workspace-side";

export function Side() {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);

  if (location.workspace) {
    return <WorkspaceSide />;
  }
  return <TeamSide />;
}
