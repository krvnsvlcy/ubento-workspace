interface WorkspaceCardProps {
  workspace: any;
  onClick: (workspace: any) => void;
}

export function WorkspaceCard({ workspace, onClick }: WorkspaceCardProps) {
  return (
    <button
      onClick={() => onClick(workspace)}
      className="group relative flex cursor-pointer rounded-2xl bg-transparent p-4 transition-all hover:bg-neutral-surface-hover text-left items-center gap-3"
    >
      <div className="h-8 w-8 rounded-lg bg-neutral-surface-active" />
      <h3 className="text-sm font-medium text-neutral-content">
        {workspace.name}
      </h3>
    </button>
  );
}
