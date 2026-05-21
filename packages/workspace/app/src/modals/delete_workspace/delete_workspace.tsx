import { useModalInstance } from "@/utils/modal-store";
import {
  AlertModalContainer,
  Button,
  Heading,
  Text,
} from "@ubento/bento.arlo-core";
import React from "react";

interface DeleteWorkspaceModalProps {
  workspaceName: string;
  onConfirm?: () => Promise<void>;
}

export function DeleteWorkspaceModal({
  workspaceName,
  onConfirm,
}: DeleteWorkspaceModalProps) {
  const { close } = useModalInstance();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm?.();
      close();
    } catch (err) {
      console.error("Error deleting workspace:", err);
      setIsDeleting(false);
    }
  };

  return (
    <AlertModalContainer className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6">
        <Heading>Delete Workspace</Heading>
      </div>

      {/* Content */}
      <div className="px-8 pb-8 flex flex-col space-y-6">
        <Text tone="subtle">
          Deleting <span className="font-semibold">{workspaceName}</span> will
          permanently remove all its data, boards, and members.
        </Text>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => close()}
            disabled={isDeleting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            isLoading={isDeleting}
            loadingText="Deleting..."
            className="flex-1"
          >
            Delete Workspace
          </Button>
        </div>
      </div>
    </AlertModalContainer>
  );
}
