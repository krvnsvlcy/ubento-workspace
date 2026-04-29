import { AccountModal } from "@/modals/AccountModal";
import { CreateWorkspaceModal } from "@/modals/CreateWorkspaceModal";
import { TeamModal } from "@/modals/TeamModal";
import { useGlobalModals } from "@/contexts/modals";
import { useBentoSession } from "@/contexts/session";
import { useUbento } from "@/services/ubento/ubento";
import { useState } from "react";

export function GlobalModals() {
  const { activeModal, closeModal } = useGlobalModals();
  const session = useBentoSession();
  const ubento = useUbento();
  const { mutateAsync: createWorkspace } = ubento.workspace.useCreateWorkspace();
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
        team={{ name: "Acme Corp", handle: "acme" }}
      />

      <AccountModal
        isOpen={activeModal === "account"}
        onClose={closeModal}
        user={session}
      />
    </>
  );
}
