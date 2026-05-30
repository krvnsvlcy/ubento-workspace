import { TreeEntry } from "@/components/tree/tree-entry";
import { WorkspaceEngineProvider } from "@/contexts/workspace";
import {
  useActiveWorkspaceId,
  useUbento,
  useUbentoEngine,
} from "@/hooks/app-engine";
import { useUserWorkspaceSettings } from "@/hooks/settings/workspace";
import { TabDefinition } from "../../../types";

import { BoardsSection } from "./boards-section";
import { ServicesSection } from "./services-section";

export function WorkspaceTab() {
  const engine = useUbentoEngine();
  const activeWorkspaceEngine = engine.useState((s) => s.workspace);
  const ubento = useUbento();
  const workspaceId = useActiveWorkspaceId();
  const { data: workspace, isLoading } = ubento.workspace.useWorkspace(
    workspaceId || "",
    { enabled: !!workspaceId },
  );

  const { data: userSettings, update: updateSettings } =
    useUserWorkspaceSettings(workspaceId || "");

  if (isLoading && !workspace) {
    return <div className="p-4 text-xs text-content-muted">Workspace</div>;
  }

  const activeBoardId = userSettings?.board?.id;

  return (
    <div className="flex flex-col gap-4 pb-8">
      <TreeEntry
        icon="home"
        onClick={() => {
          updateSettings({
            board: undefined,
          });
        }}
        active={!activeBoardId}
      >
        <span>Home</span>
      </TreeEntry>
      <BoardsSection />
      {activeWorkspaceEngine && <ServicesSection />}
    </div>
  );
}

export const workspaceTab: TabDefinition = {
  id: "workspace",
  name: "Workspace",
  icon: "workspace",
  component: () => (
    <WorkspaceEngineProvider>
      <WorkspaceTab />
    </WorkspaceEngineProvider>
  ),
  enabled: ({ location }) => location.view === "workspace",
};
