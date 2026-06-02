import { Icon } from "@/components/icon/icon.js";
import { useUbento, useUbentoEngine } from "@/hooks/app-engine";
import { useAppModal } from "@/modals/app/hook";
import { appModalRoutes } from "@/modals/app/routes";
import { CreateWorkspaceModal } from "@/modals/create_workspace/create_workspace";
import { DeleteWorkspaceModal } from "@/modals/delete_workspace/delete_workspace";
import { workspaceColorMap } from "@/utils/colors.js";
import { useModal } from "@/utils/modal-store";
import {
  Button,
  Card,
  ErrorView,
  Heading,
  PendingView,
  Text,
} from "@ubento/bento.arlo-core";
import {
  FolderOpen,
  MoreHorizontal,
  Plus,
  Settings,
  Trash2,
} from "lucide-react";
import { useMemo } from "react";

function Greeting({ name }: { name?: string }) {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  return (
    <Text shade="subtle">
      {greeting}, {name}
    </Text>
  );
}

export function Home() {
  const ubento = useUbento();
  const engine = useUbentoEngine();
  const session = engine.useState((s) => s.session);
  const { open } = useModal();
  const { push: openAppModal } = useAppModal();

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
        className="h-full w-full flex flex-col items-center justify-center bg-background p-8 selection:bg-base-800 selection:text-white"
      >
        <div className="flex flex-col items-center text-center max-w-md animate-in fade-in duration-500 gap-6">
          <Text shade="muted" size="sm">
            Hi, {session?.name}
          </Text>
          <Heading level="display">Welcome to Ubento!</Heading>
          <Text shade="subtle">
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
    <div className="h-full w-full flex flex-col items-center overflow-auto bg-background p-8 md:p-12 lg:p-16 selection:bg-base-800 selection:text-white">
      <div className="w-full max-w-5xl space-y-12 animate-in fade-in duration-500 mt-8">
        {/* Command Center Header */}
        <div className="space-y-1">
          <Greeting name={session?.name} />
          <div className="flex items-center justify-between">
            <Heading level="h1">Your Workspaces</Heading>
            <div className="flex gap-3 items-center">
              <Button
                onClick={() => openAppModal(appModalRoutes.account.root)}
                variant="ghost"
                size="icon"
              >
                <Settings size={14} />
              </Button>
              <Button onClick={handleCreateWorkspace} variant="primary">
                <Plus size={14} />
                New Workspace
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {workspaces.map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                workspace={workspace}
                onClick={() => engine.openWorkspace(workspace.id)}
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
  workspace: any;
  onClick: () => void;
  onDelete?: () => Promise<void>;
}) {
  const { open } = useModal();
  const engine = useUbentoEngine();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    engine.openContextMenu({ x: e.clientX, y: e.clientY }, [
      {
        id: "open",
        label: "Open Workspace",
        icon: <FolderOpen size={13} />,
        action: onClick,
      },
      {
        id: "delete",
        label: "Delete Workspace",
        icon: <Trash2 size={13} />,
        action: async () => {
          await open(DeleteWorkspaceModal, {
            workspaceName: workspace.title,
            onConfirm: onDelete,
          });
        },
      },
    ]);
  };

  return (
    <Card
      onClick={onClick}
      onContextMenu={handleContextMenu}
      variant="surface-interactive"
      padding="sm"
      className="space-y-3 cursor-pointer group relative"
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-content transition-colors shrink-0">
          <Icon
            icon={(workspace.metadata?.icon || "layout-grid") as any}
            size={20}
            strokeWidth={1.75}
            style={
              workspace.metadata?.accentColor
                ? { color: workspaceColorMap[workspace.metadata.accentColor] }
                : undefined
            }
          />
        </div>

        {/* More button */}
        <button
          onClick={handleContextMenu}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-content-muted opacity-0 group-hover:opacity-100 transition-all hover:bg-surface hover:text-content"
          aria-label="More options"
        >
          <MoreHorizontal size={15} />
        </button>
      </div>

      <div>
        <Text weight="semibold">{workspace.title}</Text>
      </div>
    </Card>
  );
}
