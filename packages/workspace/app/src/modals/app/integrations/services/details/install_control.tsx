import { WorkspaceEngine } from "@/engine/workspace/engine";
import {
  useServiceWorkspaceState,
  useWorkspaceServices,
} from "@/hooks/workspace";
import { useAppModal } from "@/modals/app/hook";
import { appModalRoutes } from "@/modals/app/routes";
import { Badge, Button } from "@ubento/bento.arlo-core";
import { vertexClient } from "@ubento/services.sdk";
import { ServiceSpecV1 } from "@ubento/vertex.core";
import { Plus, Settings, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export function InstallControl({
  workspaceEngine,
  service,
  specData,
  activeChannelId,
}: {
  workspaceEngine: WorkspaceEngine;
  service: vertexClient.Service;
  specData?: ServiceSpecV1;
  activeChannelId: string | null;
}) {
  const { push: navigate } = useAppModal();
  const { installedServices } = useWorkspaceServices(workspaceEngine);
  const { connections, isLoadingConnections } = useServiceWorkspaceState(
    workspaceEngine,
    {
      id: service.id,
      provider: specData?.connection?.provider,
    },
  );

  const [selectedConnectionId, setSelectedConnectionId] = useState<
    string | null
  >(null);

  // Set default selected connection
  useEffect(() => {
    if (connections && connections.length > 0 && !selectedConnectionId) {
      setSelectedConnectionId(connections[0].id);
    }
  }, [connections, selectedConnectionId]);

  const handleUninstall = () => {
    const updatedServices = { ...installedServices };
    delete updatedServices[service.name];
    workspaceEngine.updateWorkspaceSpec({
      spec: {
        services: updatedServices,
      },
    });
  };

  if (isLoadingConnections) {
    return (
      <div className="flex items-center gap-2 text-neutral-content-muted">
        <div className="w-4 h-4 border-2 border-neutral-border border-t-accent rounded-full animate-spin" />
        <span className="text-[12px]">Loading connections...</span>
      </div>
    );
  }

  // Case 1: No connections found
  if (!connections || connections.length === 0) {
    return (
      <Button
        onClick={() => {
          navigate(appModalRoutes.provider.provider, {
            providerCode: specData?.connection?.provider || "",
          });
        }}
        variant="primary"
        className="gap-2"
      >
        <Plus size={16} /> Connect {specData?.connection?.provider}
      </Button>
    );
  }

  const activeConnection =
    connections.find((c) => c.id === selectedConnectionId) || connections[0];
  const isInstalledWithActiveConnection = Object.values(installedServices).some(
    (s: any) => s.id === service.id && s.connectionId === activeConnection.id,
  );

  // Case 2: One connection
  if (connections.length === 1) {
    return (
      <div className="flex items-center gap-2">
        {isInstalledWithActiveConnection ? (
          <>
            <Badge
              variant="outline"
              className="bg-success/10 border-success/20 text-success text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
            >
              Installed
            </Badge>
            <Button
              onClick={handleUninstall}
              variant="destructive"
              size="sm"
              className="gap-2"
            >
              <Trash2 size={16} /> Uninstall
            </Button>
          </>
        ) : (
          <Button
            onClick={() =>
              workspaceEngine.installService(service.name, {
                id: service.id,
                channelId: activeChannelId || "",
                connectionId: activeConnection.id,
              })
            }
            variant="primary"
            className="gap-2"
          >
            <Sparkles size={16} /> Install
          </Button>
        )}
        <Button
          onClick={() => {
            navigate(appModalRoutes.provider.provider, {
              providerCode: specData?.connection?.provider || "",
            });
          }}
          variant="ghost"
          size="icon"
          title="Manage Connections"
        >
          <Settings size={16} />
        </Button>
      </div>
    );
  }

  // Case 3: Multiple connections
  return (
    <div className="flex items-center gap-2">
      <select
        value={selectedConnectionId ?? ""}
        onChange={(e) => setSelectedConnectionId(e.target.value)}
        className="bg-neutral-surface/50 border border-neutral-border/30 rounded-lg px-2 py-0.5 text-[12px] font-medium text-neutral-content focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
      >
        {connections.map((c: any) => (
          <option key={c.id} value={c.id}>
            {c.name || c.id}
          </option>
        ))}
      </select>

      {isInstalledWithActiveConnection ? (
        <Button
          onClick={handleUninstall}
          variant="destructive"
          size="sm"
          className="gap-2"
        >
          <Trash2 size={16} /> Uninstall
        </Button>
      ) : (
        <Button
          onClick={() => {
            workspaceEngine.installService(service.name, {
              id: service.id,
              channelId: activeChannelId || "",
              connectionId: activeConnection.id,
            });
          }}
          variant="primary"
          className="gap-2"
        >
          <Sparkles size={16} /> Install
        </Button>
      )}
      <Button
        onClick={() => {
          navigate(appModalRoutes.provider.provider, {
            providerCode: specData?.connection?.provider || "",
          });
        }}
        variant="ghost"
        size="icon"
        title="Manage Connections"
      >
        <Settings size={16} />
      </Button>
    </div>
  );
}
