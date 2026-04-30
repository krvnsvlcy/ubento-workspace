import { Header } from "@/app/components/header";
import { useSession } from "@/contexts/session";
import { useUbento, useUbentoEngine } from "@/engine/engine";
import { motion } from "motion/react";
import { Sidebar } from "./sidebar";
import { WorkspaceGrid } from "./workspace-grid";

export function Home() {
  const host = useUbentoEngine();
  const ubento = useUbento();
  const session = useSession();

  const { data: workspaces, isFetching } = ubento.workspace.useWorkspaces({
    team_id: session.teamId,
  });

  const onOpenWorkspace = (workspace: any) => {
    host.goToLocation({ view: "workspace", params: { slug: workspace.slug } });
  };

  return (
    <div className="relative flex min-h-screen justify-center px-8 py-10 font-sans text-neutral-content selection:bg-accent-surface overflow-x-hidden">
      <div className="relative flex w-full max-w-5xl flex-col">
        <Header />

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          className="mb-16 mt-8 text-2xl font-medium tracking-tight sm:text-3xl"
        >
          Good afternoon {session?.name || "Guest"}
        </motion.h1>

        <div className="flex flex-col gap-x-12 gap-y-12 md:grid md:grid-cols-4">
          <Sidebar />

          <div className="col-span-3 flex flex-col px-0">
            <h2 className="mb-4 text-lg font-medium tracking-tight text-neutral-content-muted">
              Your Workspaces
            </h2>

            {/* Main Action Card */}
            <div className="mb-6 flex cursor-pointer flex-row items-center rounded-2xl bg-background border border-neutral-border p-4 transition-colors hover:border-neutral-border-hover">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 shrink-0 rounded-lg bg-neutral-surface-active"></div>
                <div className="flex flex-col justify-center">
                  <p className="mb-1 text-xs leading-tight tracking-tight text-neutral-content">
                    Continue where you left off
                  </p>
                  <h3 className="text-[22px] font-medium leading-tight tracking-tight text-neutral-content">
                    Stock Manager
                  </h3>
                </div>
              </div>
            </div>

            <WorkspaceGrid
              workspaces={workspaces}
              isFetching={isFetching}
              onOpenWorkspace={onOpenWorkspace}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
