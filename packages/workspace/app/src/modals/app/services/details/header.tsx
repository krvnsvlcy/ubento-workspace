import { WorkspaceEngine } from "@/engine/workspace/engine";
import {
  Heading,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ubento/bento.arlo-core";
import { vertexClient } from "@ubento/services.sdk";
import { ServiceSpecV1 } from "@ubento/vertex.core";
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
          <div className="flex items-center gap-4">
            <Heading className="text-2xl font-bold tracking-tight">
              {service.name || service.handle}
            </Heading>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {channels && channels.length > 0 && (
            <div style={{ width: 120 }}>
              <Select
                value={activeChannelId ?? ""}
                onValueChange={setActiveChannelId}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {channels.map((channel: any) => (
                    <SelectItem key={channel.id} value={channel.id}>
                      {channel.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <InstallControl
            workspaceEngine={workspaceEngine}
            service={service}
            specData={specData}
            activeChannelId={activeChannelId}
          />
        </div>
      </div>

      {/* Search Bar */}
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Filter operations..."
        prefix={<Search size={16} />}
      />
    </div>
  );
}
