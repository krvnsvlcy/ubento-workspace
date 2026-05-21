import { CreateWorkspaceModal } from "@/modals/create_workspace/create_workspace";
import { DeleteWorkspaceModal } from "@/modals/delete_workspace/delete_workspace";
import { useModal } from "@/utils/modal-store";
import {
  Button,
  Card,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ErrorView,
  Heading,
  PendingView,
  Text,
} from "@ubento/bento.arlo-core";
import { Box, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { useMemo } from "react";
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
  const { open } = useModal();

  const {
    data: workspaces,
    isLoading,
    isError,
    refetch,
  } = ubento.workspace.useWorkspaces({
    team_id: session?.teamId,
  });

  const { mutateAsync: deleteWorkspace } =
    ubento.workspace.useDeleteWorkspace();

  const handleCreateWorkspace = async () => {
    await open(CreateWorkspaceModal, {});
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
      <div
        key="empty"
        className="h-full w-full flex flex-col items-center justify-center bg-background p-8 selection:bg-neutral-800 selection:text-white"
      >
        <div className="flex flex-col items-center text-center max-w-md animate-in fade-in duration-500 gap-6">
          <Text tone="muted" size="sm">
            Hi, {session?.name}
          </Text>
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
                onDelete={async () => {
                  await deleteWorkspace(workspace.id);
                }}
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
  onDelete,
}: {
  workspace: { id: string; name: string; slug: string };
  onClick: () => void;
  onDelete?: () => Promise<void>;
}) {
  const { open } = useModal();

  const handleDeleteClick = async (e: Event) => {
    e.stopPropagation();
    await open(DeleteWorkspaceModal, {
      workspaceName: workspace.name,
      onConfirm: onDelete,
    });
  };

  return (
    <Card
      onClick={onClick}
      variant="surface-interactive"
      className="space-y-3 cursor-pointer group relative"
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl border border-neutral-border bg-background flex items-center justify-center text-neutral-content group-hover:bg-neutral-content group-hover:text-background transition-colors shrink-0">
          <Box size={18} />
        </div>

        {/* More button + dropdown menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-neutral-content-muted opacity-0 group-hover:opacity-100 transition-all hover:bg-neutral-surface hover:text-neutral-content"
              aria-label="More options"
            >
              <MoreHorizontal size={15} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem
              className="text-destructive-content focus:text-destructive-content focus:bg-destructive-surface"
              onSelect={handleDeleteClick}
            >
              <Trash2 size={13} className="mr-2 shrink-0" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
