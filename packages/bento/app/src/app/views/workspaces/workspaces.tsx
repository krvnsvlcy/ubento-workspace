import { Header } from "@/app/components/header";
import { WorkspaceGrid } from "@/app/views/home/workspace-grid";
import { useUbentoEngine } from "@/engine/engine";
import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/engine";
import { ArrowLeft, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function Workspaces() {
  const host = useUbentoEngine();
  const ubento = useUbento();
  const session = useSession();
  const { data: workspacesData, isFetching } = ubento.workspace.useWorkspaces({
    team_id: session.teamId,
  });
  const [search, setSearch] = useState("");

  const workspaces = workspacesData || [];
  const filteredWorkspaces = workspaces.filter((workspace: any) =>
    workspace.name.toLowerCase().includes(search.toLowerCase()),
  );

  const onBack = () => {
    host.goToLocation({ view: "home", params: {} });
  };

  const onOpenWorkspace = (workspace: any) => {
    host.goToLocation({ view: "workspace", params: { slug: workspace.slug } });
  };

  return (
    <div className="relative min-h-screen px-8 py-10 font-sans text-neutral-content overflow-x-hidden selection:bg-accent-surface">
      <div className="relative mx-auto w-full max-w-5xl">
        <Header />
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-12 mt-8 flex flex-col gap-8"
        >
          <button
            onClick={onBack}
            className="group flex w-fit items-center gap-2 text-sm font-medium text-neutral-content-muted transition-colors hover:text-neutral-content"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </button>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                All Workspaces
              </h1>
              <p className="mt-2 text-sm text-neutral-content-muted">
                Manage and access all your projects in one place.
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-content-muted" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-2xl border border-neutral-border bg-neutral-surface pl-10 pr-4 text-sm text-neutral-content placeholder:text-neutral-content-muted outline-none transition-all focus:border-neutral-border-hover focus:bg-neutral-surface-hover"
              />
            </div>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
        >
          <WorkspaceGrid
            workspaces={filteredWorkspaces}
            isFetching={isFetching}
            onOpenWorkspace={onOpenWorkspace}
          />
        </motion.div>
      </div>
    </div>
  );
}
