import { TreeEntry } from "@/components/tree/tree-entry";
import {
  useActiveWorkspaceId,
  useUbento,
  useUbentoEngine,
} from "@/hooks/app-engine";
import { TabDefinition } from "../../../types";

import { standardIcons } from "@/components/icon/icon";
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

  const userSettings = activeWorkspaceEngine?.userSetting?.useState(
    (s) => s.data,
  );
  const updateSettings =
    activeWorkspaceEngine?.userSetting?.update || (() => {});

  if (isLoading && !workspace) {
    return <div className="p-4 text-xs text-content-muted">Workspace</div>;
  }

  const activeBoardId = userSettings?.board?.id;

  return (
    <div className="flex flex-col gap-4 pb-8">
      <TreeEntry
        icon={standardIcons.home}
        onClick={() => {
          updateSettings({
            board: undefined,
            mode: "live",
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
  icon: "layout-grid",
  component: WorkspaceTab,
  enabled: ({ location }) => location.view === "workspace",
};
