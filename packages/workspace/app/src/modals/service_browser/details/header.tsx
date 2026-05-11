import { WorkspaceEngine } from "@/engine/workspace/engine";
import { vertexClient } from "@ubento/services.sdk";
import { ServiceSpecV1 } from "@ubento/vertex.core";
import { Button, Heading, Text } from "@ubento/workspace.primitives";
import { ArrowLeft, Server } from "lucide-react";
import { InstallControl } from "./install_control";

export function DetailsHeader({
  onBack,
  service,
  specData,
  workspaceEngine,
  activeChannelId,
  channels,
  setActiveChannelId,
}: {
  onBack: () => void;
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
}) {
  return (
    <div className="space-y-4">
      {/* Back Button */}
      <Button onClick={onBack} variant="ghost">
        <ArrowLeft size={16} />
        Back to marketplace
      </Button>

      {/* Header Content */}
      <div className="flex items-start gap-4">
        {/* <Button onClick={onBack} variant="ghost" size="icon">
          <ArrowLeft size={16} />
        </Button> */}
        {/* Service Icon */}
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-neutral-border/50 text-neutral-content backdrop-blur-sm">
          <Server size={32} />
        </div>

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
          <Text tone="subtle">
            {specData?.description || service.description}
          </Text>
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
    </div>
  );
}
