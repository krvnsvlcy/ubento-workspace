import { useUbentoEngine } from "@/hooks/app-engine";
import { TeamSide } from "./team/team-side";
import { WorkspaceSide } from "./workspace/workspace-side";
import { ComponentSide } from "./component/component-side";
import { useUserActiveWorkspaceSettings } from "@/hooks/settings/workspace";

export function Side() {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);
  const { data: userSettings } = useUserActiveWorkspaceSettings();

  const isWorkspace = location.view === "workspace";
  const activeModule = isWorkspace ? userSettings?.module : undefined;

  if (activeModule) {
    return <ComponentSide />;
  }
  if (isWorkspace) {
    return <WorkspaceSide />;
  }
  return <TeamSide />;
}
