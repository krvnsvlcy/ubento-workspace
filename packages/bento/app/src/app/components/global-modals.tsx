import { useGlobalModals } from "@/contexts/modals";
import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/engine";
import { AccountModal } from "@/modals/account/account";
import { CreateWorkspaceModal } from "@/modals/create_workspace/create_workspace";
import { TeamModal } from "@/modals/team/team_modal";
import { useState } from "react";

export function GlobalModals() {
  const { activeModal, closeModal } = useGlobalModals();
  const session = useSession();
  const ubento = useUbento();
  const { mutateAsync: createWorkspace } =
    ubento.workspace.useCreateWorkspace();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateWorkspace = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const team_id = session.teamId;

    try {
      await createWorkspace({ name, team_id, data: {} });
      closeModal();
    } catch (err) {
      console.error("Error creating workspace:", err);
    } finally {
      setIsCreating(false);
    }
  };

  const { data: team } = ubento.iam.useTeam(session?.teamId || "", {
    enabled: !!session?.teamId,
  });

  return (
    <>
      <CreateWorkspaceModal
        isOpen={activeModal === "create"}
        onClose={closeModal}
        onSubmit={handleCreateWorkspace}
        isCreating={isCreating}
      />

      <TeamModal
        isOpen={activeModal === "team"}
        onClose={closeModal}
        team={team}
      />

      <AccountModal
        isOpen={activeModal === "account"}
        onClose={closeModal}
        user={session}
      />
    </>
  );
}
