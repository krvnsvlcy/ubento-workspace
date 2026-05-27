import { useUbento, useUbentoEngine } from "@/engine/app/engine";
import { useModalInstance } from "@/utils/modal-store";
import {
  AlertModalContainer,
  Button,
  Field,
  FieldError,
  FieldLabel,
  Heading,
  Input,
} from "@ubento/bento.arlo-core";
import { WorkspaceSpec } from "@ubento/bento.runtime";
import React from "react";

interface CreateWorkspaceModalProps {
  onComplete?: () => void;
}

export function CreateWorkspaceModal({
  onComplete,
}: CreateWorkspaceModalProps) {
  const { close } = useModalInstance();
  const ubento = useUbento();
  const engine = useUbentoEngine();
  const session = engine.useState((s) => s.session);

  const { mutateAsync: createWorkspace } =
    ubento.workspace.useCreateWorkspace();

  const [workspaceName, setWorkspaceName] = React.useState("");
  const [isCreating, setIsCreating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!workspaceName.trim()) return;

    setIsCreating(true);
    setError(null);
    try {
      const data: Omit<WorkspaceSpec, "title" | "id"> = {
        version: 1,
        services: {},
        components: {},
        libraries: {},
        boards: {},
        roots: [],
      };
      const ws = await createWorkspace({
        name: workspaceName.trim(),
        team_id: session?.teamId!,
        data,
      });
      if (ws) {
        engine.openWorkspace(ws.slug);
      }
      onComplete?.();
      close();
    } catch (err: any) {
      console.error("Error creating workspace:", err);
      setError(err?.message || "Failed to create workspace. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <AlertModalContainer className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6">
        <Heading>Create New Workspace</Heading>
      </div>

      {/* Content */}
      <form
        onSubmit={handleSubmit}
        className="px-8 pb-8 flex flex-col space-y-6"
      >
        <Field>
          <FieldLabel>Workspace Name</FieldLabel>
          <Input
            autoFocus
            placeholder="e.g. Stock Manager"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            required
            disabled={isCreating}
          />
        </Field>

        {error && <FieldError>{error}</FieldError>}

        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => close()}
            disabled={isCreating}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isCreating}
            loadingText="Creating..."
            className="flex-1"
          >
            Create Workspace
          </Button>
        </div>
      </form>
    </AlertModalContainer>
  );
}
