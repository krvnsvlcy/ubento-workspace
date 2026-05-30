import { useUbento, useUbentoEngine } from "@/hooks/app-engine.js";
import {
  Button,
  Content,
  ContentBody,
  ContentHeader,
  Field,
  FieldLabel,
  Heading,
  Input,
  ScrollArea,
  Text,
} from "@ubento/bento.arlo-core";
import { Loader2 } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useModal } from "@/utils/modal-store.js";

export const GeneralTab: FC = () => {
  const ubento = useUbento();
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);
  const { close } = useModal();

  const isWorkspace = location.view === "workspace";
  const workspaceId = isWorkspace ? location.params.workspaceId : "";
  const { data: workspace, isLoading } = ubento.workspace.useWorkspace(
    workspaceId,
    { enabled: !!workspaceId },
  );

  const [name, setName] = useState(workspace?.name || "");
  const [description, setDescription] = useState(workspace?.description || "");

  useEffect(() => {
    if (workspace) {
      setName(workspace.name || "");
      setDescription(workspace.description || "");
    }
  }, [workspace]);

  const { mutate: updateWorkspace, isPending: isUpdating } =
    ubento.workspace.useUpdateWorkspace(workspace?.id || "");
  const { mutate: deleteWorkspace, isPending: isDeleting } =
    ubento.workspace.useDeleteWorkspace();

  const handleSave = () => {
    if (!workspace?.id) return;
    if (name === workspace.name && description === workspace.description) return;
    updateWorkspace(
      { name, description },
      {
        onSuccess: () => {
          // Cache invalidation and update is done automatically via the fabric store hooks
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  const handleDelete = () => {
    if (!workspace?.id) return;
    if (confirm("Are you sure you want to delete this workspace?")) {
      deleteWorkspace(workspace.id, {
        onSuccess: () => {
          // Clear active workspace in the engine location so it goes back to Team view
          engine.goToLocation({
            view: "home",
            params: {},
          });
          close();
        },
      });
    }
  };

  if (isLoading) {
    return (
      <Content>
        <ContentHeader>
          <div className="space-y-1">
            <Heading>General</Heading>
            <Text shade="subtle">Manage general details of your workspace.</Text>
          </div>
        </ContentHeader>
        <ContentBody className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-content-muted" />
        </ContentBody>
      </Content>
    );
  }

  return (
    <Content>
      <ContentHeader>
        <div className="space-y-1">
          <Heading>General</Heading>
          <Text shade="subtle">Manage general details of your workspace.</Text>
        </div>
      </ContentHeader>
      <ContentBody
        paddingX={false}
        paddingY={false}
        className="overflow-hidden flex flex-col"
      >
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-8">
            <section className="space-y-6">
              <div className="grid gap-6">
                <Field>
                  <FieldLabel>Workspace Name</FieldLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. Stock Manager"
                  />
                </Field>
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    placeholder="Manage your inventory and stock levels."
                  />
                </Field>
              </div>

              <div className="h-6 flex items-center justify-end px-1 text-content-muted">
                {isUpdating && (
                  <div className="flex items-center gap-2 text-content-muted animate-in fade-in duration-200">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span className="text-[11px] font-medium">Saving...</span>
                  </div>
                )}
                {!isUpdating && (
                  <div className="flex items-center fade-in slide-in-from-bottom-1 duration-300">
                    <span className="text-[11px]">Up to date.</span>
                  </div>
                )}
              </div>
            </section>

            <section className="pt-8 border-t border-border">
              <div className="p-4 rounded-2xl border border-border bg-surface">
                <div className="flex items-center justify-between">
                  <div>
                    <Text weight="semibold">Delete Workspace</Text>
                    <Text shade="muted" size="sm">
                      Permanently remove this workspace and all associated data.
                    </Text>
                  </div>
                  <Button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    variant="secondary-destructive"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>
      </ContentBody>
    </Content>
  );
};
