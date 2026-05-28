import { useSession } from "@/contexts/session";
import { useUbento } from "@/hooks/app-engine";
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
  const session = useSession();
  const teamId = session.teamId;

  const { data: team } = ubento.iam.useTeam(teamId, {
    enabled: !!teamId,
  });

  const [name, setName] = useState(team?.name || "");
  const [handle, setHandle] = useState(team?.handle || "");

  useEffect(() => {
    if (team) {
      setName(team.name || "");
      setHandle(team.handle || "");
    }
  }, [team]);

  const { mutate: updateTeam, isPending: isUpdating } =
    ubento.iam.useUpdateTeam(teamId);
  const { mutate: deleteTeam, isPending: isDeleting } =
    ubento.iam.useDeleteTeam();

  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    if (!team?.id) return;
    if (name === team.name && handle === team.handle) return;
    updateTeam(
      { name, handle },
      {
        onSuccess: () => {
          setShowSaved(true);
          setTimeout(() => setShowSaved(false), 2000);
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
    if (!team?.id) return;
    if (confirm("Are you sure you want to delete this team?")) {
      deleteTeam(team.id);
    }
  };

  return (
    <Content>
      <ContentHeader>
        <div className="space-y-1">
          <Heading>General</Heading>
          <Text shade="subtle">Manage general details of your team.</Text>
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
                  <FieldLabel>Team Name</FieldLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. Acme Corp"
                  />
                </Field>
                <Field>
                  <FieldLabel>Team Handle</FieldLabel>
                  <Input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    placeholder="acme"
                  />
                </Field>
              </div>

              <div className="h-6 flex items-center justify-end px-1 text-neutral-content-muted">
                {isUpdating && (
                  <div className="flex items-center gap-2 text-neutral-content-muted animate-in fade-in duration-200">
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

            <section className="pt-8 border-t border-neutral-border">
              <div className="p-4 rounded-2xl border border-neutral-border bg-neutral-surface">
                <div className="flex items-center justify-between">
                  <div>
                    <Text weight="semibold">Delete Team</Text>
                    <Text shade="muted" size="sm">
                      Permanently remove this team and all associated data.
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
