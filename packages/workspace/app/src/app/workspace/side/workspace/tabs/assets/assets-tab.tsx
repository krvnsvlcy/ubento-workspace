import { bentoModuleType } from "@/app/dnd";
import { useSession } from "@/contexts/session";
import { useUbento, useUbentoEngine } from "@/hooks/app-engine";
import {
  BrowserDataTransferStore,
  DataTransferPayload,
} from "@ubento/data-transfer";
import { EmptyView } from "@ubento/bento.arlo-core";
import { Box, Search } from "lucide-react";
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
      className={`group flex items-center gap-3 rounded-lg px-3 py-2 cursor-grab transition-colors hover:bg-surface-hover`}
      onClick={() => {
        ubento.goToLocation({
          ...location,
          component: module.id,
          componentTab: "ai",
        });
      }}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface border border-border text-content-muted group-hover:text-base group-hover:border-border/30 transition-colors">
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-content truncate">
          {module.name}
        </div>
        <div className="text-[10px] text-content-muted truncate">
          {module.id.split("-")[0]}
        </div>
      </div>
    </div>
  );
}

export function AssetsTab() {
  const [query, setQuery] = useState("");
  const ubento = useUbento();
  const session = useSession();
  const modules = ubento.module.useModules({
    team_id: session.teamId,
    type: "component",
  });

  const filteredModules = modules.data?.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col">
      <div className="px-2">
        <div className="flex items-center gap-2 rounded-lg bg-surface-hover px-2.5 py-1.5 border border-border focus-within:border-border/50 transition-colors">
          <Search size={12} className="text-content-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components..."
            className="w-full bg-transparent text-[11px] text-content outline-none placeholder:text-content-muted"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2">
        <div className="flex flex-col gap-px px-1">
          {filteredModules?.map((module) => (
            <AssetItem key={module.id} module={module} />
          ))}
        </div>

        {filteredModules?.length === 0 && !modules.isLoading && (
          <EmptyView
            message={query ? "No results found." : "No components found."}
          />
        )}
      </div>
    </div>
  );
}

export const assetsTab: TabDefinition = {
  id: "assets",
  name: "Assets",
  icon: "assets",
  component: AssetsTab,
  enabled: ({ location }) => !!location.workspace,
};
