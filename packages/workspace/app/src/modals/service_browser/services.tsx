import { WorkspaceEngine } from "@/app/workspace/main/workspace/engine/engine";
import { useSession } from "@/contexts/session";
import { useUbento, useUbentoEngine } from "@/engine/engine";
import {
  Briefcase,
  Code2,
  Cpu,
  LayoutGrid,
  Search,
  Server,
  Sparkles,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Modal } from "../../app/components/modal";

const CATEGORIES = [
  { id: "all", name: "All Services", icon: LayoutGrid },
  { id: "ai", name: "AI & Intelligence", icon: Sparkles },
  { id: "infra", name: "Infrastructure", icon: Cpu },
  { id: "dev", name: "Developer Tools", icon: Code2 },
  { id: "biz", name: "Business", icon: Briefcase },
  { id: "util", name: "Utilities", icon: Wrench },
];

function ServiceBrowserModalContent({
  isOpen,
  onClose,
  onAdd,
  activeWorkspaceEngine,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (moduleId: string, name: string) => void;
  activeWorkspaceEngine: WorkspaceEngine;
}) {
  const ubento = useUbento();
  const session = useSession();
  const installedServices =
    activeWorkspaceEngine?.useState((s) => s.workspaceData?.services || {}) ||
    {};

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: services, isLoading } = ubento.module.useModules({
    team_id: session.teamId,
    type: "service",
  });

  const filtered = services?.filter((s) => {
    const matchesQuery =
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.summary?.toLowerCase().includes(query.toLowerCase());
    // For now we don't have categories in metadata, so we just show all in 'all'
    const matchesCategory = activeCategory === "all";
    return matchesQuery && matchesCategory;
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Service Marketplace">
      <div className="flex h-full -mx-8 -mb-8">
        {/* Sidebar */}
        <div className="w-64 p-4 flex flex-col gap-1">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-neutral-content-muted hover:bg-neutral-surface hover:text-neutral-content"
                }`}
              >
                <Icon size={16} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Main Area */}
        <div className="flex-1 flex flex-col bg-background min-w-0">
          {/* Search Header */}
          <div className="p-6">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-content-muted"
              />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for services, integrations, and tools..."
                className="w-full rounded-2xl border border-neutral-border bg-neutral-surface-hover pl-12 pr-4 py-3.5 text-[14px] text-neutral-content placeholder:text-neutral-content-muted focus:border-accent/50 focus:bg-background focus:ring-4 focus:ring-accent/5 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-neutral-content-muted">
                <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                <p className="text-[13px]">Loading marketplace...</p>
              </div>
            ) : filtered?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-neutral-surface flex items-center justify-center mb-4 text-neutral-content-muted">
                  <Search size={32} />
                </div>
                <h3 className="text-[16px] font-semibold text-neutral-content mb-1">
                  No services found
                </h3>
                <p className="text-[13px] text-neutral-content-muted max-w-[280px]">
                  We couldn't find any services matching "{query}". Try
                  searching for something else.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6 pb-6">
                {filtered?.map((service) => {
                  const isInstalled = Object.values(installedServices).some(
                    (s: any) => s.module.id === service.id,
                  );

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={service.id}
                      onClick={() =>
                        !isInstalled && onAdd(service.id, service.name)
                      }
                      className={`group relative flex flex-col items-start gap-5 p-6 rounded-[24px] border transition-all ${
                        isInstalled
                          ? "border-neutral-border bg-neutral-surface/50 opacity-80 cursor-default"
                          : "border-neutral-border bg-neutral-surface hover:border-accent/30 hover:bg-background hover:shadow-xl hover:shadow-accent/5 cursor-pointer"
                      }`}
                    >
                      <div className="flex w-full items-start justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-surface-hover border border-neutral-border text-neutral-content-muted group-hover:text-accent group-hover:border-accent/30 transition-colors shadow-sm">
                          <Server size={28} />
                        </div>
                        {isInstalled && (
                          <div className="px-2.5 py-1 rounded-full bg-success/10 border border-success/20 text-success text-[10px] font-bold uppercase tracking-wider">
                            Installed
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 w-full">
                        <h3 className="text-[15px] font-bold text-neutral-content truncate mb-1.5 text-left group-hover:text-accent transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-[12.5px] text-neutral-content-muted line-clamp-3 leading-relaxed text-left">
                          {service.summary ||
                            "Powerful integration to enhance your workspace productivity and automate complex workflows."}
                        </p>
                      </div>

                      {!isInstalled && (
                        <div className="mt-2 w-full flex items-center justify-end">
                          <div className="text-[11px] font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            Install Service <Sparkles size={12} />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
export function ServiceBrowserModal({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (moduleId: string, name: string) => void;
}) {
  const engine = useUbentoEngine();
  const activeWorkspaceEngine = engine.useState((s) => s.activeWorkspaceEngine);

  if (activeWorkspaceEngine !== undefined) {
    return (
      <ServiceBrowserModalContent
        isOpen={isOpen}
        onClose={onClose}
        onAdd={onAdd}
        activeWorkspaceEngine={activeWorkspaceEngine}
      />
    );
  }
}
