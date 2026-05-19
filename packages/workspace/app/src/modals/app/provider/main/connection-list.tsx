import { useUbento } from "@/engine/app/engine";
import { vertexClient } from "@ubento/services.sdk";
import { ConnectionProviderConfig } from "@ubento/vertex.core";
import {
  Button,
  Content,
  ContentBody,
  ContentHeader,
  Heading,
} from "@ubento/bento.arlo-core";
import { Globe, Plus, Trash2, Edit2 } from "lucide-react";

interface ConnectionListProps {
  connections: vertexClient.Connection[];
  isLoadingConnections: boolean;
  providerData?: vertexClient.ConnectionProvider;
  config?: ConnectionProviderConfig;
  onAddConnection: () => void;
  onEditConnection: (connection: vertexClient.Connection) => void;
  onEditProvider?: () => void;
}

export function ConnectionList({
  connections,
  isLoadingConnections,
  providerData,
  config,
  onAddConnection,
  onEditConnection,
  onEditProvider,
}: ConnectionListProps) {
  const ubento = useUbento();

  const { mutate: deleteConnection } = (
    ubento.vertex as any
  ).useDeleteConnection();

  const canAdd = !!providerData && !!config;

  if (isLoadingConnections) {
    return (
      <div className="text-center py-6 text-neutral-content-muted text-sm">
        Loading connections...
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <Content>
        <ContentHeader>
          <div className="flex justify-between items-center w-full">
            <Heading className="text-lg font-bold">Active Connections</Heading>
            <div className="flex items-center gap-2">
              {config?.auth.oauth2 && onEditProvider && (
                <Button onClick={onEditProvider} variant="ghost" size="sm">
                  Configure OAuth
                </Button>
              )}
              {canAdd && (
                <Button onClick={onAddConnection} size="sm" className="gap-2">
                  <Plus size={14} /> Add Connection
                </Button>
              )}
            </div>
          </div>
        </ContentHeader>
        <ContentBody>
          <div className="text-center py-6 text-neutral-content-muted text-sm border border-dashed border-neutral-border/50 rounded-xl">
            No connections yet.
            {canAdd ? ' Click "Add Connection" to start.' : ""}
          </div>
        </ContentBody>
      </Content>
    );
  }

  return (
    <Content>
      <ContentHeader>
        <div className="flex justify-between items-center w-full">
          <Heading className="text-lg font-bold">Active Connections</Heading>
          <div className="flex items-center gap-2">
            {config?.auth.oauth2 && onEditProvider && (
              <Button onClick={onEditProvider} variant="ghost" size="sm">
                Configure OAuth
              </Button>
            )}
            {canAdd && (
              <Button onClick={onAddConnection} size="sm" className="gap-2">
                <Plus size={14} /> Add Connection
              </Button>
            )}
          </div>
        </div>
      </ContentHeader>
      <ContentBody>
        <div className="space-y-3">
          {connections.map((conn: any) => (
            <div
              key={conn.id}
              className="flex items-center justify-between p-4 rounded-xl bg-neutral-surface border border-neutral-border group hover:border-neutral-border-hover transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-neutral-surface-hover text-neutral-content-muted">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold">
                    {conn.name || "Connection"}
                  </p>
                  <p className="text-[10px] text-neutral-content-muted font-bold uppercase">
                    {conn.id}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button
                  onClick={() => onEditConnection(conn)}
                  className="p-2 rounded-lg bg-neutral-surface-hover hover:text-neutral-content transition-all"
                  title="Edit Connection"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => deleteConnection(conn.id)}
                  className="p-2 rounded-lg bg-neutral-surface-hover hover:text-destructive transition-all"
                  title="Delete Connection"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </ContentBody>
    </Content>
  );
}
