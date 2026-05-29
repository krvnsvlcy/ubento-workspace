import { WorkspaceEngine } from "@/engine/workspace/engine";
import {
  useServiceWorkspaceState,
  useWorkspaceServices,
} from "@/hooks/workspace";
import { useAppModal } from "@/modals/app/hook";
import { appModalRoutes } from "@/modals/app/routes";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
} from "@ubento/bento.arlo-core";
import { vertexClient } from "@ubento/services.sdk";
import { ServiceSpecV1 } from "@ubento/vertex.core";
import { AlertCircle, Plus, Settings, Sparkles, Trash2 } from "lucide-react";
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
  const { connections, isPending, isError, provider } =
    useServiceWorkspaceState(workspaceEngine, {
      serviceId: service.id,
      specData,
    });

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

  if (isPending) {
    return (
      <Button disabled variant="primary">
        <Spinner /> Connection
        {provider && "PP"}
      </Button>
    );
  }

  if (isError) {
    return (
      <Button disabled variant="primary">
        <AlertCircle size={16} /> Failed to load connection
      </Button>
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
        <Plus size={16} /> Connect {provider?.name}
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
          <Button
            onClick={handleUninstall}
            variant="primary"
            tone="destructive"
            className="gap-2"
          >
            <Trash2 size={16} /> Uninstall
          </Button>
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
      <Select
        value={selectedConnectionId ?? ""}
        onValueChange={setSelectedConnectionId}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {connections.map((c: any) => (
            <SelectItem key={c.id} value={c.id}>
              {c.name || c.id}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isInstalledWithActiveConnection ? (
        <Button onClick={handleUninstall} variant="destructive">
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
        variant="secondary"
        size="icon"
        title="Manage Connections"
        className="shrink-0"
      >
        <Settings size={16} />
      </Button>
    </div>
  );
}
