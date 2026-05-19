import { CreateWorkspaceModal } from "@/modals/create_workspace/create_workspace";
import { useModal } from "@/utils/modal-store";
import { Button } from "@ubento/bento.arlo-core";
import { ArrowRight, Box, Plus, Sparkles } from "lucide-react";
import React from "react";
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

  return (
    <div className="h-full w-full flex flex-col items-center overflow-auto bg-background p-8 md:p-12 lg:p-16">
      <div className="w-full max-w-5xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Hero Section */}
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold w-fit border border-accent/20 shadow-sm shadow-accent/10">
            <Sparkles size={14} />
            <span>Welcome to Ubento</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-content">
            Let's build something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
              extraordinary
            </span>
          </h1>
          <p className="text-lg text-neutral-content-muted max-w-2xl">
            Select a workspace to get started, or create a new one to start your
            next big project.
          </p>
        </div>

        {/* Workspaces Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-neutral-content">
              Your Workspaces
            </h2>
            <Button
              onClick={handleCreateWorkspace}
              className="gap-2 shadow-lg shadow-accent/20"
            >
              <Plus size={16} />
              New Workspace
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(workspaces || []).map((workspace) => (
              <button
                key={workspace.id}
                onClick={() => engine.openWorkspace(workspace.slug)}
                className="group relative flex flex-col justify-between gap-4 p-6 text-left rounded-2xl bg-neutral-surface border border-neutral-border hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-surface-hover flex items-center justify-center text-neutral-content-subtle group-hover:bg-accent/10 group-hover:text-accent transition-colors shrink-0">
                    <Box size={24} />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="text-lg font-bold text-neutral-content truncate group-hover:text-accent transition-colors">
                      {workspace.name}
                    </h3>
                    <p className="text-xs text-neutral-content-muted truncate mt-1">
                      {workspace.slug}
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-xs font-semibold text-neutral-content-muted group-hover:text-accent transition-colors mt-2">
                  <span>Open workspace</span>
                  <ArrowRight
                    size={14}
                    className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/0 group-hover:ring-accent/10 transition-all pointer-events-none" />
              </button>
            ))}

            {/* Empty State / Create New Card */}
            {(!workspaces || workspaces.length === 0) && (
              <button
                onClick={handleCreateWorkspace}
                className="group flex flex-col items-center justify-center gap-4 p-8 text-center rounded-2xl border-2 border-dashed border-neutral-border hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 min-h-[200px]"
              >
                <div className="w-12 h-12 rounded-full bg-neutral-surface flex items-center justify-center text-neutral-content-muted group-hover:text-accent transition-colors">
                  <Plus size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-content group-hover:text-accent transition-colors">
                    Create your first workspace
                  </h3>
                  <p className="text-xs text-neutral-content-subtle mt-1">
                    Get started by creating a new workspace.
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
