import { SideSection } from "@/components/side/section";
import { TreeEntry } from "@/components/tree/tree-entry";
import { useUbento, useUbentoEngine } from "@/hooks/app-engine";
import { useAppModal } from "@/modals/app/hook";
import { appModalRoutes } from "@/modals/app/routes";
import { CreateWorkspaceModal } from "@/modals/create_workspace/create_workspace";
import { useModal } from "@/utils/modal-store";
import { Building2 } from "lucide-react";
import { TeamSideLayout } from "./team-layout";

export function TeamSide() {
  const engine = useUbentoEngine();
  const { push } = useAppModal();

  const session = engine.useState((s) => s.session);
  const { data: team } = engine.ubento.iam.useTeam(session?.teamId || "", {
    enabled: !!session?.teamId,
  });

  const ubento = useUbento();
  const location = engine.useState((s) => s.location);
  const { open } = useModal();

  const { data: workspaces } = ubento.workspace.useWorkspaces({
    team_id: session?.teamId,
  });

  const handleCreateWorkspace = async () => {
    await open(CreateWorkspaceModal, {});
  };

  return (
    <TeamSideLayout
      icon={<Building2 size={14} />}
      title={team?.name}
      onTitleClick={() => push(appModalRoutes.team.general)}
    >
      <div className="px-3">
        <SideSection
          title="Workspaces"
          actions={[
            {
              icon: "plus",
              title: "Create Workspace",
              handler: handleCreateWorkspace,
            },
          ]}
          actionMode="visible"
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
      </div>
    </TeamSideLayout>
  );
}
