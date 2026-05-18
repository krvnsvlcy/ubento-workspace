import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
import { ConnectionModal } from "@/modals/connection/connection";
import { CreateProviderModal } from "@/modals/service_browser/create-provider-modal";
import { useModal, useModalInstance } from "@/utils/modal-store";
import {
  Badge,
  Button,
  Content,
  ContentBody,
  ContentFooter,
  ContentHeader,
  Heading,
  Input,
} from "@ubento/workspace.primitives";
import { Globe, Plus, Search, Settings, Trash2 } from "lucide-react";
import { FC, useState } from "react";

interface IntegrationsTabProps {
  team?: any;
}

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

export const IntegrationsTab: FC<IntegrationsTabProps> = ({
  team: initialTeam,
}) => {
  const ubento = useUbento();
  const session = useSession();
  const teamId = initialTeam?.id || session.teamId;
  const { open } = useModal();

  const [subTab, setSubTab] = useState<"connections" | "providers">(
    "connections",
  );
  const [connectionSearch, setConnectionSearch] = useState("");
  const [providerSearch, setProviderSearch] = useState("");

  const { data: connections = [], isFetching: isFetchingConnections } =
    ubento.vertex.useConnections({
      team_id: teamId,
    });
  const { data: allProviders = [], isFetching: isFetchingAllProviders } =
    ubento.vertex.useConnectionProviders({
      name: providerSearch,
    });
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

  const handleCreateProvider = () => {
    open(CreateProviderModal);
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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-xl font-bold">Integrations</h3>
        <p className="text-sm text-neutral-content-subtle">
          Manage external connections and custom connection providers for your
          team.
        </p>
      </div>

      {/* Sub-tab Switcher */}
      <div className="flex border-b border-neutral-border/30 gap-6">
        <button
          onClick={() => setSubTab("connections")}
          className={`pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            subTab === "connections"
              ? "border-accent text-accent"
              : "border-transparent text-neutral-content-subtle hover:text-neutral-content"
          }`}
        >
          Connections
        </button>
        <button
          onClick={() => setSubTab("providers")}
          className={`pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            subTab === "providers"
              ? "border-accent text-accent"
              : "border-transparent text-neutral-content-subtle hover:text-neutral-content"
          }`}
        >
          Connection Providers
        </button>
      </div>

      {subTab === "connections" && (
        <section className="space-y-6 animate-in fade-in duration-200">
          <div className="flex justify-between items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-content-muted" />
              <input
                type="text"
                value={connectionSearch}
                onChange={(e) => setConnectionSearch(e.target.value)}
                placeholder="Search connections..."
                className="pl-9 pr-4 py-2 w-full bg-neutral-surface border border-neutral-border/30 rounded-xl text-xs focus:outline-none focus:border-neutral-border-hover transition-colors"
              />
            </div>
            <button
              onClick={handleAddConnection}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-content text-neutral-contrast text-xs font-black uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all"
            >
              <Plus className="h-3 w-3" />
              Add Connection
            </button>
          </div>

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
        </section>
      )}

      {subTab === "providers" && (
        <section className="space-y-6 animate-in fade-in duration-200">
          <div className="flex justify-between items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-content-muted" />
              <input
                type="text"
                value={providerSearch}
                onChange={(e) => setProviderSearch(e.target.value)}
                placeholder="Search providers..."
                className="pl-9 pr-4 py-2 w-full bg-neutral-surface border border-neutral-border/30 rounded-xl text-xs focus:outline-none focus:border-neutral-border-hover transition-colors"
              />
            </div>
            <button
              onClick={handleCreateProvider}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-content text-neutral-contrast text-xs font-black uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all"
            >
              <Plus className="h-3 w-3" />
              Create Provider
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isFetchingAllProviders && (
              <div className="col-span-full py-12 text-center text-neutral-content-muted">
                <p className="text-[13px]">Loading providers...</p>
              </div>
            )}
            {!isFetchingAllProviders && allProviders.length === 0 && (
              <div className="col-span-full py-12 text-center text-neutral-content-muted">
                <p className="text-[13px]">
                  {providerSearch
                    ? "No providers match search query."
                    : "No providers found."}
                </p>
              </div>
            )}
            {allProviders.map((p: any) => {
              const supportedAuth: string[] = [];
              if (p.config?.auth?.apiKey) supportedAuth.push("API Key");
              if (p.config?.auth?.basic) supportedAuth.push("Basic");
              if (p.config?.auth?.oauth2) supportedAuth.push("OAuth 2.0");

              return (
                <div
                  key={p.id}
                  className="flex flex-col p-5 rounded-2xl bg-neutral-surface border border-neutral-border hover:border-neutral-border-hover hover:shadow-lg transition-all group duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-neutral-surface-hover text-neutral-content-muted group-hover:text-neutral-content transition-all">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div className="flex gap-1.5 flex-wrap justify-end">
                      {supportedAuth.map((auth) => (
                        <Badge
                          key={auth}
                          variant="outline"
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                        >
                          {auth}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-content group-hover:text-foreground transition-colors mb-1">
                    {p.name || p.id}
                  </h4>
                  <p className="text-xs text-neutral-content-muted line-clamp-2 flex-grow mb-4">
                    {p.description ||
                      `Integration provider for ${p.name || p.id}.`}
                  </p>
                  <div className="flex justify-end pt-2 border-t border-neutral-border/20">
                    <Button
                      onClick={() =>
                        open(CreateProviderModal, {
                          provider: p,
                        })
                      }
                      variant="primary"
                      size="sm"
                      className="text-xs h-7 px-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity"
                    >
                      <Settings size={12} /> Edit
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
