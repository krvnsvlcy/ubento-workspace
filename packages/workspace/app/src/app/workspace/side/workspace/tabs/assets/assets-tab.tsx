import { bentoModuleType } from "@/app/dnd";
import { useSession } from "@/contexts/session";
import { useUbento, useUbentoEngine } from "@/engine/app/engine";
import {
  BrowserDataTransferStore,
  DataTransferPayload,
} from "@ubento/data-transfer";
import { Box, Plus, Search } from "lucide-react";
import { useState } from "react";
import { TabDefinition } from "../../../types";

export function AssetItem({ module }: { module: any }) {
  const ubento = useUbentoEngine();
  const location = ubento.useState((s) => s.location);
  const Icon = Box;

  return (
    <div
      draggable
      onDragStart={(e) => {
        const payload = new DataTransferPayload(
          new BrowserDataTransferStore(e.dataTransfer),
        );
        payload.setData(bentoModuleType, {
          ref: {
            scope: "private",
            id: module.id,
            versionId: module.latest_version_id,
          },
        });
      }}
      className={`group flex items-center gap-3 rounded-lg px-3 py-2 cursor-grab transition-colors hover:bg-neutral-surface-hover`}
      onClick={() => {
        ubento.goToLocation({
          ...location,
          component: module.id,
          componentTab: "ai",
        });
      }}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-surface border border-neutral-border text-neutral-content-muted group-hover:text-accent group-hover:border-accent/30 transition-colors">
        <Icon size={16} />
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
  );
}

function AssetSection({
  title,
  type,
  query,
}: {
  title: string;
  type: "component";
  query: string;
}) {
  const ubento = useUbento();
  const session = useSession();
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);
  const modules = ubento.module.useModules({ team_id: session.teamId, type });

  const createModule = async (name: string) => {
    const mod = await ubento.module.createModule({
      team_id: session.teamId,
      name,
      source: "",
      scope: "private",
      type,
    });
    engine.goToLocation({
      ...location,
      component: mod.id,
      componentTab: "ai",
    });
  };

  const filteredModules = modules.data?.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase()),
  );

  if (query && filteredModules?.length === 0) return null;

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center justify-between px-3 py-2">
        <p className="text-[10px] font-bold text-neutral-content-muted uppercase tracking-wider">
          {title}
        </p>
        <button
          onClick={() => {
            const name = prompt(`Enter ${type} name:`);
            if (name) createModule(name);
          }}
          className="p-1 hover:bg-neutral-surface-hover rounded text-neutral-content-muted hover:text-accent transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="flex flex-col gap-px px-1">
        {filteredModules?.map((module) => (
          <AssetItem key={module.id} module={module} />
        ))}
      </div>

      {modules.data?.length === 0 && !modules.isLoading && !query && (
        <div className="px-3 py-2 text-[11px] text-neutral-content-muted italic">
          No {title.toLowerCase()} found.
        </div>
      )}
    </div>
  );
}

export function AssetsTab() {
  const [query, setQuery] = useState("");

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
        <AssetSection title="Components" type="component" query={query} />
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
