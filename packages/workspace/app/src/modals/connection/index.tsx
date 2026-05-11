import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
import { useModalInstance } from "@/utils/modal-store";
import { ConnectionProviderConfig } from "@ubento/vertex.core";
import { Button, Heading, Text } from "@ubento/workspace.primitives";
import { Globe, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

export interface ConnectionModalProps {
  providerName: string;
  onSuccess?: () => void;
}

export function ConnectionModal({ providerName, onSuccess }: ConnectionModalProps) {
  const { close } = useModalInstance();
  const ubento = useUbento();
  const session = useSession();
  
  const { data: providerData } = ubento.vertex.useConnectionProviderByName(providerName);
  
  const { data: allConnections = [], isLoading: isLoadingConnections } = 
    ubento.vertex.useConnections({ team_id: session.teamId });
    
  const { mutate: createConnection, isLoading: isCreating } = (ubento.vertex as any).useCreateConnection();
  const { mutate: deleteConnection } = (ubento.vertex as any).useDeleteConnection();

  const [apiKey, setApiKey] = useState("");
  const [connectionName, setConnectionName] = useState("");
  const [showAddCard, setShowAddCard] = useState(false);

  const config = (providerData as any)?.config as ConnectionProviderConfig | undefined;
  const supportsToken = !!config?.auth.apiKey;
  const supportsOAuth2 = !!config?.auth.oauth2;

  // Filter connections for this provider
  const connections = allConnections.filter(
    (c: any) => c.provider_id === providerData?.id
  );

  const handleSave = () => {
    if (!providerData?.id) return;
    createConnection(
      {
        team_id: session.teamId || "",
        provider_id: providerData.id,
        name: connectionName,
        auth: {
          token: apiKey,
        },
      },
      {
        onSuccess: () => {
          onSuccess?.();
          setShowAddCard(false);
          setApiKey("");
          setConnectionName("");
        },
      }
    );
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-border/30">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Manage {providerName} Connections
        </h2>
        <button
          onClick={() => close()}
          className="group flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-background-300"
        >
          <X className="h-5 w-5 text-foreground-300 group-hover:text-foreground-200" />
        </button>
      </div>

      {/* Body - Rail Layout */}
      <div className="flex-1 flex overflow-hidden h-full">
        {/* Left Rail - Provider Info */}
        <div className="w-64 border-r border-neutral-border/30 p-6 space-y-4 bg-neutral-surface/20">
          <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-neutral-surface border border-neutral-border text-neutral-content">
            <Globe className="h-6 w-6" />
          </div>
          <div>
            <Heading className="text-lg font-bold">{providerName}</Heading>
            <Text tone="subtle" className="text-sm">
              {providerData?.description || "Connect external services to your workspace."}
            </Text>
          </div>
        </div>

        {/* Right Content - Connections List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="flex justify-between items-center">
            <Heading className="text-lg font-bold">Active Connections</Heading>
            <Button
              onClick={() => setShowAddCard(true)}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Plus size={14} /> Add Connection
            </Button>
          </div>

          {/* Add Connection Card */}
          {showAddCard && (
            <div className="p-4 bg-neutral-surface border border-neutral-border rounded-xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <Heading className="text-sm font-bold">New Connection</Heading>
              
              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-neutral-content-muted uppercase">
                  Connection Name
                </label>
                <input
                  value={connectionName}
                  onChange={(e) => setConnectionName(e.target.value)}
                  placeholder="e.g. My Production Account"
                  className="w-full bg-neutral-surface/50 border border-neutral-border/30 rounded-lg px-3 py-2 text-sm text-neutral-content focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              {supportsToken && (
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold text-neutral-content-muted uppercase">
                    API Key or Token
                  </label>
                  <input
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full bg-neutral-surface/50 border border-neutral-border/30 rounded-lg px-3 py-2 text-sm text-neutral-content focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button onClick={() => setShowAddCard(false)} variant="ghost" size="sm">
                  Cancel
                </Button>
                <Button onClick={handleSave} variant="primary" size="sm" disabled={!apiKey || isCreating}>
                  {isCreating ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          )}

          {/* Connections List */}
          <div className="space-y-3">
            {isLoadingConnections ? (
              <div className="text-center py-6 text-neutral-content-muted text-sm">
                Loading connections...
              </div>
            ) : connections.length === 0 ? (
              <div className="text-center py-6 text-neutral-content-muted text-sm border border-dashed border-neutral-border/50 rounded-xl">
                No connections yet. Click "Add Connection" to start.
              </div>
            ) : (
              connections.map((conn: any) => (
                <div
                  key={conn.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-neutral-surface border border-neutral-border group hover:border-neutral-border-hover transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-neutral-surface-hover text-neutral-content-muted">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{conn.name || "Connection"}</p>
                      <p className="text-[10px] text-neutral-content-muted font-bold uppercase">
                        {conn.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => deleteConnection(conn.id)}
                      className="p-2 rounded-lg bg-neutral-surface-hover hover:text-destructive transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
