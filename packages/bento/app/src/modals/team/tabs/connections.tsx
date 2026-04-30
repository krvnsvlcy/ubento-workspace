import { FC } from "react";
import { Globe, Plus, Settings, Zap, Trash2 } from "lucide-react";
import { useUbento } from "@/engine/engine";
import { useSession } from "@/contexts/session";

interface ConnectionsTabProps {
  team?: any;
}

export const ConnectionsTab: FC<ConnectionsTabProps> = ({ team: initialTeam }) => {
  const ubento = useUbento();
  const session = useSession();
  const teamId = initialTeam?.id || session.teamId;

  const { data: connections = [], isFetching } = ubento.integration.useConnections({
    organization_id: teamId,
  });
  const { data: providers = [] } = ubento.integration.useConnectionProviders();
  const { mutate: deleteConnection } = ubento.integration.useDeleteConnection();

  const getProvider = (providerId: string) =>
    providers.find((p) => p.id === providerId);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Connections</h3>
            <p className="text-sm text-neutral-content-subtle">
              Manage your organization's external service integrations.
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-content text-neutral-contrast text-xs font-black uppercase tracking-wider">
            <Plus className="h-3 w-3" />
            Add Connection
          </button>
        </div>

        <div className="space-y-3">
          {isFetching && (
            <div className="py-12 text-center text-neutral-content-muted">
              <p className="text-[13px]">Loading connections...</p>
            </div>
          )}
          {!isFetching && connections.length === 0 && (
            <div className="py-12 text-center text-neutral-content-muted">
              <p className="text-[13px]">No connections yet.</p>
            </div>
          )}
          {connections.map((conn) => {
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
                      {provider?.name || conn.provider_id}
                    </p>
                    <p className="text-[10px] text-neutral-content-muted font-bold uppercase">
                      {conn.account_id || "Active"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                    Connected
                  </span>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => deleteConnection(conn.id)}
                      className="p-2 rounded-lg bg-neutral-surface-hover hover:text-destructive transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <button className="p-2 rounded-lg bg-neutral-surface-hover">
                      <Settings className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="p-6 rounded-2xl bg-accent-surface border border-accent-border flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-accent-surface-hover flex items-center justify-center">
          <Zap className="h-5 w-5 text-accent" />
        </div>
        <div>
          <p className="text-sm font-bold">Auto-sync active</p>
          <p className="text-xs text-foreground-300">
            Your connections are synchronized across all workspace instances.
          </p>
        </div>
      </div>
    </div>
  );
};
