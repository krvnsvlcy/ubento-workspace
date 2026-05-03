import { useSession } from "@/contexts/session";
import { useUbento, useUbentoEngine } from "@/engine/engine";
import { Box, Plus, Search } from "lucide-react";
import { useState } from "react";
import { TabDefinition } from "../../types";

export function AssetsTab() {
  const [query, setQuery] = useState("");
  const ubento = useUbento();
  const session = useSession();
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);
  const modules = ubento.module.useModules({ team_id: session.teamId });

  const createModule = async (name: string) => {
    const mod = await ubento.module.createModule({
      team_id: session.teamId,
      name,
      source: "",
      scope: "private",
      type: "component",
    });
    setQuery("");
    engine.goToLocation({
      ...location,
      component: mod.id,
      componentTab: "ai",
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="px-3 py-2">
        <div className="flex items-center gap-2 rounded-lg bg-neutral-surface-hover px-2.5 py-1.5 border border-neutral-border focus-within:border-accent/50 transition-colors">
          <Search size={12} className="text-neutral-content-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components..."
            className="w-full bg-transparent text-[11px] text-neutral-content outline-none placeholder:text-neutral-content-muted"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-1 pb-8">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between px-3 py-2">
            <p className="text-[10px] font-bold text-neutral-content-muted uppercase tracking-wider">
              Components
            </p>
            <button
              onClick={() => {
                const name = prompt("Enter component name:");
                if (name) createModule(name);
              }}
              className="p-1 hover:bg-neutral-surface-hover rounded text-neutral-content-muted hover:text-accent transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="flex flex-col gap-px px-1">
            {modules.data
              ?.filter((m) =>
                m.name.toLowerCase().includes(query.toLowerCase()),
              )
              .map((module) => (
                <div
                  key={module.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      "application/bento-module",
                      JSON.stringify({
                        id: module.id,
                        name: module.name,
                        latestVersionId: module.latest_version_id,
                      }),
                    );
                  }}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer transition-colors hover:bg-neutral-surface-hover"
                  onClick={() => {
                    engine.goToLocation({
                      ...location,
                      component: module.id,
                      componentTab: "ai",
                    });
                  }}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-surface border border-neutral-border text-neutral-content-muted group-hover:text-accent group-hover:border-accent/30 transition-colors">
                    <Box size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-neutral-content truncate">
                      {module.name}
                    </div>
                    <div className="text-[10px] text-neutral-content-muted truncate">
                      {module.id.split("-")[0]}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {modules.data?.length === 0 && !modules.isLoading && !query && (
            <div className="p-8 text-center text-[11px] text-neutral-content-muted italic">
              No components found in this team.
            </div>
          )}

          {query &&
            !modules.data?.some((m) =>
              m.name.toLowerCase().includes(query.toLowerCase()),
            ) && (
              <div className="px-3 py-4">
                <button
                  onClick={() => createModule(query)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-accent/30 bg-accent/5 p-4 text-[11px] text-accent transition-all hover:border-accent/50 hover:bg-accent/10"
                >
                  <Plus size={14} />
                  Create component "{query}"
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export const assetsTab: TabDefinition = {
  id: "assets",
  name: "Assets",
  icon: Box,
  component: AssetsTab,
  enabled: (location) => !!location.workspace,
};
