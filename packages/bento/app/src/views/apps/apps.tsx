import { useBentoHost } from "@/contexts/host";
import { useBentoSession } from "@/contexts/session";
import { useApps } from "@/hooks/app";
import { AppGrid } from "@/views/home/app-grid";
import { ArrowLeft, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function Apps() {
  const host = useBentoHost();
  const session = useBentoSession();
  const { data: appsData, isFetching } = useApps({ team_id: session.teamId });
  const [search, setSearch] = useState("");

  const apps = appsData || [];
  const filteredApps = apps.filter((app: any) =>
    app.name.toLowerCase().includes(search.toLowerCase()),
  );

  const onBack = () => {
    host.goToLocation({ view: "home", params: {} });
  };

  const onOpenApp = (app: any) => {
    host.goToLocation({ view: "app", params: { slug: app.slug } });
  };

  return (
    <div className="relative min-h-screen bg-background px-8 py-10 font-sans text-foreground overflow-x-hidden selection:bg-foreground-200">
      {/* Background Gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[300px] bg-gradient-to-b from-primary-500/10 dark:from-primary-300/7 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-5xl">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-12 flex flex-col gap-8"
        >
          <button
            onClick={onBack}
            className="group flex w-fit items-center gap-2 text-sm font-medium text-foreground-300 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </button>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                All Applications
              </h1>
              <p className="mt-2 text-sm text-foreground-400">
                Manage and access all your projects in one place.
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-2xl border border-white/10 bg-background-300/50 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary-500/50 focus:bg-background-300 focus:ring-4 focus:ring-primary-500/10"
              />
            </div>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
        >
          <AppGrid
            apps={filteredApps}
            isFetching={isFetching}
            onOpenApp={onOpenApp}
          />
        </motion.div>
      </div>
    </div>
  );
}
