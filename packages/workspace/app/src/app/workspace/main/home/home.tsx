import { CreateWorkspaceModal } from "@/modals/create_workspace/create_workspace";
import { useModal } from "@/utils/modal-store";
import {
  PrimitiveButton as Button,
  Card,
  ErrorView,
  Heading,
  PendingView,
  Text,
} from "@ubento/bento.arlo-core";
import { Box, Plus } from "lucide-react";
import React, { useMemo } from "react";
import { useUbento, useUbentoEngine } from "../../../../engine/app/engine";

function Greeting({ name }: { name?: string }) {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  return (
    <Text tone="subtle">
      {greeting}, {name}
    </Text>
  );
}

export function Home() {
  const ubento = useUbento();
  const engine = useUbentoEngine();
  const session = engine.useState((s) => s.session);
  const { open, close } = useModal();

  const {
    data: workspaces,
    isLoading,
    isError,
    refetch,
  } = ubento.workspace.useWorkspaces({
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
          const ws = await createWorkspace({
            name,
            team_id: session?.teamId!,
            data: {},
          });
          close();
          if (ws) {
            engine.openWorkspace(ws.slug);
          }
        } catch (err) {
          console.error("Error creating workspace:", err);
        }
      },
      isCreating: false,
    });
  };

  if (isLoading) {
    return <PendingView message="Workspaces" />;
  }

  if (isError) {
    return (
      <ErrorView
        message="Error loading workspaces"
        action={{
          label: "Retry",
          onClick: () => refetch(),
        }}
      />
    );
  }

  // The Full-Page Centered Replacement
  if (!workspaces || workspaces.length === 0) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-background p-8 selection:bg-neutral-800 selection:text-white">
        <div className="flex flex-col items-center text-center max-w-md animate-in fade-in duration-500 gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-neutral-border bg-neutral-surface text-neutral-content-muted">
            <Box size={28} strokeWidth={1.5} />
          </div>
          <Heading level="display">Welcome to Ubento!</Heading>
          <Text tone="subtle">
            It's a blank slate right now. Create your first workspace to start
            organizing your tools, tasks, and data in one unified environment.
          </Text>
          <Button onClick={handleCreateWorkspace} variant="primary">
            Get Me Started
          </Button>
        </div>
      </div>
    );
  }

  // The Populated Dashboard
  return (
    <div className="h-full w-full flex flex-col items-center overflow-auto bg-background p-8 md:p-12 lg:p-16 selection:bg-neutral-800 selection:text-white">
      <div className="w-full max-w-5xl space-y-12 animate-in fade-in duration-500 mt-8">
        {/* Command Center Header */}
        <div className="space-y-1">
          <Greeting name={session?.name} />
          <div className="flex items-center justify-between">
            <Heading level="display">Your Workspaces</Heading>
            <Button onClick={handleCreateWorkspace} variant="primary">
              <Plus size={14} className="mr-2" />
              New Workspace
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workspaces.map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                workspace={workspace}
                onClick={() => engine.openWorkspace(workspace.slug)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkspaceCard({
  workspace,
  onClick,
}: {
  workspace: { id: string; name: string; slug: string };
  onClick: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      variant="surface-interactive"
      className="space-y-3 cursor-pointer group"
    >
      <div className="w-12 h-12 rounded-xl border border-neutral-border bg-background flex items-center justify-center text-neutral-content group-hover:bg-neutral-content group-hover:text-background transition-colors shrink-0">
        <Box size={18} />
      </div>
      <div>
        <Text weight="semibold">{workspace.name}</Text>
        <Text tone="subtle" size="sm">
          Workspace summary goes here.
        </Text>
      </div>
    </Card>
  );
}
