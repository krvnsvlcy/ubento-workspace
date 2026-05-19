import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
import { ConnectionModal } from "@/modals/connection/connection";
import { useModal, useModalInstance } from "@/utils/modal-store";
import {
  Button,
  Content,
  ContentBody,
  ContentFooter,
  ContentHeader,
  Heading,
  Input,
  ScrollArea,
} from "@ubento/bento.arlo-core";
import { Globe, Plus, Search, Settings, Trash2 } from "lucide-react";
import { FC, useState } from "react";

// Inline helper: SelectProviderModal
interface SelectProviderModalProps {
  providers: any[];
  onSelect: (provider: any) => void;
}

export function SelectProviderModal({
  providers,
  onSelect,
}: SelectProviderModalProps) {
  const { close } = useModalInstance();
  const [search, setSearch] = useState("");

  const filtered = providers.filter((p) =>
    (p.name || p.id).toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Content className="w-[600px] max-w-[95vw] h-[500px]">
      <ContentHeader className="border-b border-neutral-border/30 pb-4">
        <Heading className="text-xl font-bold">Select Service Provider</Heading>
        <p className="text-sm text-neutral-content-subtle">
          Choose a service integration to add to your team.
        </p>
      </ContentHeader>

      <div className="px-6 py-4 border-b border-neutral-border/30 bg-neutral-surface-hover/10">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-content-muted" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search integrations (e.g., Slack, GitHub...)"
            className="pl-9 w-full bg-neutral-surface border border-neutral-border/30 rounded-xl"
            autoFocus
          />
        </div>
      </div>

      <ContentBody className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-neutral-content-muted">
            <p className="text-[13px]">
              No integration providers found matching "{search}".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filtered.map((provider) => (
              <button
                key={provider.id}
                onClick={() => {
                  close();
                  onSelect(provider);
                }}
                className="flex flex-col items-start text-left p-4 rounded-2xl bg-neutral-surface border border-neutral-border hover:border-neutral-border-hover hover:bg-neutral-surface-hover/30 hover:shadow-lg transition-all group duration-200 cursor-pointer"
              >
                <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-neutral-surface-hover group-hover:bg-neutral-surface-active text-neutral-content-muted group-hover:text-neutral-content transition-all mb-3">
                  <Globe className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-neutral-content group-hover:text-foreground transition-colors mb-1">
                  {provider.name || provider.id}
                </h4>
                <p className="text-xs text-neutral-content-muted line-clamp-2">
                  {provider.description ||
                    `Integrate ${provider.name || provider.id} services with your team.`}
                </p>
              </button>
            ))}
          </div>
        )}
      </ContentBody>

      <ContentFooter className="border-t border-neutral-border/30 pt-4 flex justify-end">
        <Button onClick={() => close()} variant="ghost" size="sm">
          Cancel
        </Button>
      </ContentFooter>
    </Content>
  );
}

interface ConnectionsTabProps {
  teamId?: string;
}

export const ConnectionsTab: FC<ConnectionsTabProps> = ({
  teamId: propTeamId,
}) => {
  const ubento = useUbento();
  const session = useSession();
  const teamId = propTeamId || session.teamId;
  const { open } = useModal();

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
    open(SelectProviderModal, {
      providers: allProviders,
      onSelect: (provider: any) => {
        open(ConnectionModal, {
          providerCode: provider.code,
        });
      },
    });
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
                          open(ConnectionModal, {
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
