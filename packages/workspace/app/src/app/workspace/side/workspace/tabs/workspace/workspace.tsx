import { TreeEntry } from "@/components/tree/tree-entry";
import { WorkspaceEngineProvider } from "@/contexts/workspace";
import { useUbento, useUbentoEngine } from "@/engine/app/engine";
import { TabDefinition } from "../../../types";

import { BoardsSection } from "./boards-section";
import { ServicesSection } from "./services-section";

export function WorkspaceTab() {
  const engine = useUbentoEngine();
  const activeWorkspaceEngine = engine.useState((s) => s.workspace);
  const ubento = useUbento();
  const location = engine.useState((s) => s.location);

  const { data: workspace, isLoading } = ubento.workspace.useWorkspaceBySlug(
    { slug: location.workspace! },
    { enabled: !!location.workspace },
  );

  if (isLoading && !workspace) {
    return (
      <div className="p-4 text-xs text-neutral-content-muted">Workspace</div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="px-2">
        <TreeEntry
          icon="home"
          onClick={() => {
            engine.goToLocation({
              board: undefined,
              params: {},
            });
          }}
          active={!location.board}
        >
          <span>Home</span>
        </TreeEntry>
      </div>
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
  enabled: ({ location }) => !!location.workspace,
};
