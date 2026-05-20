import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
import { PrimitiveButton as Button, PrimitiveInput as Input, ScrollArea } from "@ubento/bento.arlo-core";
import { Globe, Plus, Settings, Trash2 } from "lucide-react";
import { FC, useState } from "react";

import { useAppModal } from "@/modals/app/hook";
import { appModalRoutes } from "@/modals/app/routes";

interface ConnectionsTabProps {
  teamId?: string;
}

export const ConnectionsTab: FC<ConnectionsTabProps> = ({
  teamId: propTeamId,
}) => {
  const ubento = useUbento();
  const session = useSession();
  const teamId = propTeamId || session.teamId;
  const { push: navigate } = useAppModal();

  const [connectionSearch, setConnectionSearch] = useState("");

  const { data: connections = [], isFetching: isFetchingConnections } =
    ubento.vertex.useConnections({
      team_id: teamId,
    });
  const { data: allProviders = [] } = ubento.vertex.useConnectionProviders();
  const { mutate: deleteConnection } = ubento.vertex.useDeleteConnection();

  const getProvider = (providerId: string) =>
    allProviders.find((p: any) => p.id === providerId);

  const handleAddConnection = () => {
    navigate(appModalRoutes.providers.providers);
  };

  // Filter connections based on connection name or provider name
  const filteredConnections = connections.filter((conn: any) => {
    const provider = getProvider(conn.provider_id);
    const searchString = connectionSearch.toLowerCase();
    const connName = (conn.name || "").toLowerCase();
    const provName = (provider?.name || conn.provider_id || "").toLowerCase();
    return connName.includes(searchString) || provName.includes(searchString);
  });

  return (
    <section className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center gap-4 px-6">
        <div className="flex-1">
          <Input
            type="text"
            value={connectionSearch}
            onChange={(e) => setConnectionSearch(e.target.value)}
            placeholder="Search connections..."
          />
        </div>
        <Button
          onClick={handleAddConnection}
          align="start"
          variant="primary"
          size="lg"
        >
          <Plus className="h-4 w-4" />
          Add Connection
        </Button>
      </div>

      <ScrollArea className="flex-1 px-6 pb-6">
        <div className="space-y-3">
          {isFetchingConnections && (
            <div className="py-12 text-center text-neutral-content-muted">
              <p className="text-[13px]">Loading connections...</p>
            </div>
          )}
          {!isFetchingConnections && filteredConnections.length === 0 && (
            <div className="py-12 text-center text-neutral-content-muted">
              <p className="text-[13px]">
                {connectionSearch
                  ? "No connections match search query."
                  : "No active connections."}
              </p>
            </div>
          )}
          {filteredConnections.map((conn: any) => {
            const provider = getProvider(conn.provider_id);
            return (
              <div
                key={conn.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-neutral-surface border border-neutral-border group hover:border-neutral-border-hover transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-neutral-surface-hover text-neutral-content-muted">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">
                      {conn.name || provider?.name || conn.provider_id}
                    </p>
                    <p className="text-[10px] text-neutral-content-subtle font-medium">
                      Provider: {provider?.name || conn.provider_id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                    Active
                  </span>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => deleteConnection(conn.id)}
                      className="p-2 rounded-lg bg-neutral-surface-hover hover:text-destructive transition-all"
                      title="Delete Connection"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        const provider = getProvider(conn.provider_id);
                        if (provider) {
                          navigate(appModalRoutes.provider.provider, {
                            providerCode: provider.code,
                          });
                        }
                      }}
                      className="p-2 rounded-lg bg-neutral-surface-hover hover:text-accent transition-all"
                      title="Manage Connection"
                    >
                      <Settings className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </section>
  );
};
