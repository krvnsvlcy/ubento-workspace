import { SideSection } from "@/app/components/side/section";
import { Home, LayoutDashboard, Plus } from "lucide-react";
import { useModal } from "@/utils/modal-store";
import { CreateWorkspaceModal } from "@/modals/create_workspace/create_workspace";
import {
  useUbento,
  useUbentoEngine,
} from "../../../../../../engine/app/engine";
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
      <LayoutDashboard size={14} />
      <span className="truncate">{workspace.name}</span>
    </button>
  );
}

export function HomeTab() {
  const ubento = useUbento();
  const engine = useUbentoEngine();
  const session = engine.useState((s) => s.session);
  const { open } = useModal();

  const { data: workspaces } = ubento.workspace.useWorkspaces({
    team_id: session?.teamId,
  });

  const { mutateAsync: createWorkspace } =
    ubento.workspace.useCreateWorkspace();

  const handleCreateWorkspace = async () => {
    await open(CreateWorkspaceModal, {
      onSubmit: async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        try {
          await createWorkspace({ name, team_id: session?.teamId!, data: {} });
        } catch (err) {
          console.error("Error creating workspace:", err);
        }
      },
      isCreating: false,
    });
  };

  return (
    <SideSection
      title="Workspaces"
      actions={[
        {
          icon: Plus,
          tooltip: "Create Workspace",
          onClick: handleCreateWorkspace,
        },
      ]}
    >
      {(workspaces || []).map((workspace: any) => (
        <WorkspaceItem key={workspace.id} workspace={workspace} />
      ))}
    </SideSection>
  );
}

export const homeTab: TabDefinition = {
  id: "home",
  name: "Home",
  icon: Home,
  component: HomeTab,
  enabled: () => true,
};
