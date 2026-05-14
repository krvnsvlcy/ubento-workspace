import { WorkspaceEngine } from "@/engine/workspace/engine";
import { vertexClient } from "@ubento/services.sdk";
import { ServiceSpecV1 } from "@ubento/vertex.core";
import { Button, Heading, Text } from "@ubento/workspace.primitives";
import { Search } from "lucide-react";
import { InstallControl } from "./install_control";

export function DetailsHeader({
  service,
  specData,
  workspaceEngine,
  activeChannelId,
  channels,
  setActiveChannelId,
  searchQuery,
  onSearchChange,
}: {
  service: vertexClient.Service;
  specData?: ServiceSpecV1;
  isSpecLoading: boolean;
  isSpecError: boolean;
  refetchSpec: () => void;
  isSpecValid: boolean;
  workspaceEngine: WorkspaceEngine;
  activeChannelId: string | null;
  channels?: any[];
  setActiveChannelId: (id: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Header Content */}
      <div className="flex items-start gap-4">
        {/* Service Info */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <Heading className="text-2xl font-bold tracking-tight">
              {service.display_name || service.name}
            </Heading>
            {channels && channels.length > 0 && (
              <select
                value={activeChannelId ?? ""}
                onChange={(e) => setActiveChannelId(e.target.value)}
                className="bg-neutral-surface/50 border border-neutral-border/30 rounded-lg px-2 py-0.5 text-[12px] font-medium text-neutral-content-muted hover:text-neutral-content focus:outline-none focus:ring-1 focus:ring-accent transition-colors cursor-pointer"
              >
                {channels.map((channel: any) => (
                  <option key={channel.id} value={channel.id}>
                    {channel.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Actions Column */}
        <div className="flex flex-col items-end gap-2">
          <InstallControl
            workspaceEngine={workspaceEngine}
            service={service}
            specData={specData}
            activeChannelId={activeChannelId}
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-content-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter operations..."
          className="w-full pl-10 pr-4 py-2 bg-neutral-surface/50 border border-neutral-border/30 rounded-lg text-sm text-neutral-content placeholder-neutral-content-muted focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
        />
      </div>
    </div>
  );
}
