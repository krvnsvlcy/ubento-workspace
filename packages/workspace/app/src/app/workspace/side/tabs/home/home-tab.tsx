import { Home } from "lucide-react";
import { useUbento, useUbentoEngine } from "../../../../../engine/engine";
import { TabDefinition } from "../../types";
import { NewWorkspaceButton } from "./new-wokspace";
import { WorkspaceItem } from "./workspace-item";

export function HomeTab() {
  const ubento = useUbento();
  const engine = useUbentoEngine();
  const session = engine.useState((s) => s.session);

  const { data: workspaces } = ubento.workspace.useWorkspaces({
    team_id: session?.teamId,
  });

  return (
    <div className="flex flex-col gap-0.5">
      <p className="px-3 py-2 text-[10px] font-bold text-neutral-content-muted uppercase tracking-wider">
        Workspaces
      </p>
      {(workspaces || []).map((workspace: any) => (
        <WorkspaceItem key={workspace.id} workspace={workspace} />
      ))}
      <NewWorkspaceButton />
    </div>
  );
}

export const homeTab: TabDefinition = {
  id: "home",
  name: "Home",
  icon: Home,
  component: HomeTab,
  enabled: () => true,
};
