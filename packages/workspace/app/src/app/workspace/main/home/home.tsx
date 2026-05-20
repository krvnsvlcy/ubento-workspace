import { CreateWorkspaceModal } from "@/modals/create_workspace/create_workspace";
import { useModal } from "@/utils/modal-store";
import { PrimitiveButton as Button, Heading } from "@ubento/bento.arlo-core";
import { Box, Plus } from "lucide-react";
import React, { useMemo } from "react";
import { useUbento, useUbentoEngine } from "../../../../engine/app/engine";

export function Home() {
  const ubento = useUbento();
  const engine = useUbentoEngine();
  const session = engine.useState((s) => s.session);
  const { open, close } = useModal();

  const { data: workspaces } = ubento.workspace.useWorkspaces({
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

  // Dynamic greeting reflecting an operational state
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  // Graceful fallback to your name if session user data isn't fully wired yet
  const userName = session?.name;

  return (
    <div className="h-full w-full flex flex-col items-center overflow-auto bg-background p-8 md:p-12 lg:p-16 selection:bg-neutral-800 selection:text-white">
      <div className="w-full max-w-5xl space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 mt-8">
        {/* Command Center Header */}
        <div className="flex justify-between">
          <Heading level="display">
            {greeting}, {userName}.
          </Heading>
          <Button onClick={handleCreateWorkspace} variant="primary">
            <Plus size={14} />
            New Workspace
          </Button>
        </div>

        {/* Workspaces Directory */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(workspaces || []).map((workspace) => (
              <button
                key={workspace.id}
                onClick={() => engine.openWorkspace(workspace.slug)}
                className="group relative flex flex-col justify-between gap-6 p-5 text-left rounded-xl bg-neutral-surface transition-colors duration-200"
              >
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg border border-neutral-border bg-background flex items-center justify-center text-neutral-content group-hover:bg-neutral-content group-hover:text-background transition-colors shrink-0">
                      <Box size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-neutral-content truncate">
                        {workspace.name}
                      </h3>
                      <p className="text-xs text-neutral-content-muted font-mono mt-0.5 truncate">
                        {workspace.slug}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            ))}

            {/* Empty State / Create New Card */}
            {(!workspaces || workspaces.length === 0) && (
              <button
                onClick={handleCreateWorkspace}
                className="group flex flex-col items-center justify-center gap-3 p-8 text-center rounded-xl border border-dashed border-neutral-border hover:border-neutral-content hover:bg-neutral-surface-hover transition-all duration-200 min-h-[180px]"
              >
                <div className="w-10 h-10 rounded-lg border border-neutral-border flex items-center justify-center text-neutral-content-muted group-hover:text-neutral-content group-hover:border-neutral-content transition-colors">
                  <Plus size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-content">
                    Deploy your first workspace
                  </h3>
                  <p className="text-xs text-neutral-content-muted mt-1">
                    Initialize a new environment to begin.
                  </p>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
