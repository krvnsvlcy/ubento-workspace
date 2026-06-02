import { Icon } from "@/components/icon/icon";
import { SideSection } from "@/components/side/section";
import { TreeEntry } from "@/components/tree/tree-entry";
import { useUbento, useUbentoEngine } from "@/hooks/app-engine";
import { CreateWorkspaceModal } from "@/modals/create_workspace/create_workspace";
import { workspaceColorMap } from "@/utils/colors.js";
import { useModal } from "@/utils/modal-store";
import { TabDefinition } from "../../../types";

export function WorkspaceItem({ workspace }: { workspace: any }) {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);
  const isActive =
    location.view === "workspace" &&
    location.params.workspaceId === workspace.id;

  return (
    <button
      onClick={() => engine.openWorkspace(workspace.id)}
      className={`flex h-8 items-center gap-2 w-full rounded-lg px-3 cursor-pointer text-[13px] transition-all ${
        isActive
          ? "bg-base/10 text-base font-medium"
          : "text-content-subtle hover:bg-surface-hover hover:text-content"
      }`}
    >
      <Icon
        icon={workspace.metadata?.icon || "layout-grid"}
        style={
          workspace.metadata?.accentColor
            ? { color: workspaceColorMap[workspace.metadata.accentColor] }
            : undefined
        }
      />
      <span className="truncate">{workspace.title}</span>
    </button>
  );
}

export function HomeTab() {
  const ubento = useUbento();
  const engine = useUbentoEngine();
  const session = engine.useState((s) => s.session);
  const location = engine.useState((s) => s.location);
  const { open } = useModal();

  const { data: workspaces } = ubento.workspace.useWorkspaces({
    team_id: session?.teamId,
  });

  const handleCreateWorkspace = async () => {
    await open(CreateWorkspaceModal, {});
  };

  return (
    <SideSection
      title="Workspaces"
      actions={[
        {
          icon: "plus",
          title: "Create Workspace",
          handler: handleCreateWorkspace,
        },
      ]}
    >
      {(workspaces || []).map((workspace) => {
        const workspaceIcon = (workspace.metadata?.icon || "workspace") as any;
        const accentColor = workspace.metadata?.accentColor;
        const colorHex = accentColor
          ? workspaceColorMap[accentColor]
          : undefined;
        const iconNode = (
          <Icon
            icon={workspaceIcon}
            style={colorHex ? { color: colorHex } : undefined}
          />
        );

        return (
          <TreeEntry
            key={workspace.id}
            icon={iconNode}
            active={
              location.view === "workspace" &&
              location.params.workspaceId === workspace.id
            }
            onClick={() => engine.openWorkspace(workspace.id)}
          >
            {workspace.title}
          </TreeEntry>
        );
      })}
    </SideSection>
  );
}

export const homeTab: TabDefinition = {
  id: "home",
  name: "Home",
  icon: "home",
  component: HomeTab,
  enabled: () => true,
};
