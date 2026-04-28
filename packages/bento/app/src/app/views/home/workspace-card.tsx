interface WorkspaceCardProps {
  workspace: any;
  onClick: (workspace: any) => void;
}

export function WorkspaceCard({ workspace, onClick }: WorkspaceCardProps) {
  return (
    <button
      onClick={() => onClick(workspace)}
      className="group relative flex h-28 cursor-pointer flex-col justify-end overflow-hidden rounded-2xl bg-background-100 border p-4 transition-all hover:border-foreground/20 text-left"
    >
      <div className="absolute left-4 top-4 h-8 w-8 rounded-lg bg-background-500" />
      <h3 className="text-sm font-medium text-foreground">{workspace.name}</h3>
    </button>
  );
}
