import { Icon } from "@/components/icon/icon";
import { SideSection } from "@/components/side/section";
import { TreeEntry } from "@/components/tree/tree-entry";
import { CreateWorkspaceModal } from "@/modals/create_workspace/create_workspace";
import { useModal } from "@/utils/modal-store";
import { useUbento, useUbentoEngine } from "@/hooks/app-engine";
import { TabDefinition } from "../../../types";

export function WorkspaceItem({ workspace }: { workspace: any }) {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);
  const isActive = location.workspace === workspace.slug;

  return (
    <button
      onClick={() => engine.openWorkspace(workspace.slug)}
      className={`flex h-8 items-center gap-2 w-full rounded-lg px-3 cursor-pointer text-[13px] transition-all ${
        isActive
          ? "bg-accent/10 text-accent font-medium"
          : "text-neutral-content-subtle hover:bg-neutral-surface-hover hover:text-neutral-content"
      }`}
    >
      <Icon icon="workspace" />
      <span className="truncate">{workspace.name}</span>
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
      {(workspaces || []).map((workspace) => (
        <TreeEntry
          key={workspace.id}
          icon="workspace"
          active={location.workspace === workspace.slug}
          onClick={() => engine.openWorkspace(workspace.slug)}
        >
          {workspace.name}
        </TreeEntry>
      ))}
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
