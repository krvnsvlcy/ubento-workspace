import { IconPicker } from "@/components/icon/icon-picker.js";
import { Icon, IconName } from "@/components/icon/icon.js";
import { useUbento, useUbentoEngine } from "@/hooks/app-engine.js";
import { workspaceColorMap } from "@/utils/colors.js";
import { useModal } from "@/utils/modal-store.js";
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

  const [title, setTitle] = useState(workspace?.title || "");
  const [icon, setIcon] = useState<IconName>(workspace?.metadata?.icon);
  const [accentColor, setAccentColor] = useState<string>(
    workspace?.metadata?.accentColor || "",
  );

  useEffect(() => {
    if (workspace) {
      setTitle(workspace.title || "");
      setIcon(workspace.metadata?.icon || "workspace");
      setAccentColor(workspace.metadata?.accentColor || "");
    }
  }, [workspace]);

  const { mutate: updateWorkspace, isPending: isUpdating } =
    ubento.workspace.useUpdateWorkspace(workspace?.id || "");
  const { mutate: deleteWorkspace, isPending: isDeleting } =
    ubento.workspace.useDeleteWorkspace();

  const handleSave = () => {
    if (!workspace?.id) return;
    if (title === workspace.title) return;
    updateWorkspace(
      { title },
      {
        onSuccess: () => {
          // Cache invalidation and update is done automatically via the fabric store hooks
        },
      },
    );
  };

  const handleUpdateMetadata = (newIcon: string, newAccent: string) => {
    if (!workspace?.id) return;
    updateWorkspace(
      {
        metadata: {
          ...workspace.metadata,
          icon: newIcon || undefined,
          accentColor: newAccent || undefined,
        },
      },
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
            <Text shade="subtle">
              Manage general details of your workspace.
            </Text>
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. Stock Manager"
                  />
                </Field>

                <Field>
                  <FieldLabel>Workspace Icon</FieldLabel>
                  <div className="pt-1">
                    <IconPicker
                      value={icon}
                      onChange={(newIcon) => {
                        setIcon(newIcon);
                        handleUpdateMetadata(newIcon, accentColor);
                      }}
                    />
                  </div>
                </Field>

                <Field>
                  <FieldLabel>Accent Color</FieldLabel>
                  <div className="flex flex-wrap gap-3 pt-1">
                    {Object.entries(workspaceColorMap).map(
                      ([colorName, colorHex]) => {
                        const isSelected = accentColor === colorName;
                        return (
                          <button
                            key={colorName}
                            type="button"
                            onClick={() => {
                              setAccentColor(colorName);
                              handleUpdateMetadata(icon, colorName);
                            }}
                            style={{ backgroundColor: colorHex }}
                            className={`h-8 w-8 rounded-full border-2 transition-all cursor-pointer hover:scale-105 ${
                              isSelected
                                ? "border-content scale-110 shadow-md"
                                : "border-transparent opacity-80 hover:opacity-100"
                            }`}
                            title={colorName}
                          />
                        );
                      },
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setAccentColor("");
                        handleUpdateMetadata(icon, "");
                      }}
                      className={`h-8 w-8 rounded-full border border-dashed flex items-center justify-center transition-all cursor-pointer hover:scale-105 ${
                        accentColor === ""
                          ? "border-content bg-base/5 text-content scale-110 shadow-md"
                          : "border-border text-content-muted hover:text-content"
                      }`}
                      title="Default"
                    >
                      <Icon icon="trash" size={14} />
                    </button>
                  </div>
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
