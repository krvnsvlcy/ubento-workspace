import { WorkspaceCard } from "./workspace-card";

interface WorkspaceGridProps {
  workspaces: any[];
  isFetching: boolean;
  onOpenWorkspace: (workspace: any) => void;
}

export function WorkspaceGrid({ workspaces, isFetching, onOpenWorkspace }: WorkspaceGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {isFetching ? (
        [1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-2xl bg-background-300"
          />
        ))
      ) : workspaces.length > 0 ? (
        workspaces.map((workspace) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} onClick={onOpenWorkspace} />
        ))
      ) : (
        <div className="col-span-full py-12 text-center text-foreground-400">
          <p className="text-[13px]">No workspaces yet. Create your first one!</p>
        </div>
      )}
    </div>
  );
}
