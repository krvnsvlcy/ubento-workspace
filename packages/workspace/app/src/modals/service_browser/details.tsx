import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
import { WorkspaceEngine } from "@/engine/workspace/engine";
import { useQuery } from "@tanstack/react-query";
import { ServiceData } from "@ubento/bento.core";
import {
  ConnectionProviderConfig,
  serviceSpecV1Schema,
} from "@ubento/vertex.core";
import {
  Badge,
  Button,
  Card,
  Content,
  ContentBody,
  ContentHeader,
  Heading,
  Tabs,
  TabsList,
  TabsTrigger,
  Text,
} from "@ubento/workspace.primitives";
import { ArrowLeft, Server, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

function ConnectionBlock({
  providerName,
  isMissing,
}: {
  providerName: string;
  isMissing: boolean;
}) {
  const ubento = useUbento();
  const { data: providerData } =
    ubento.vertex.useConnectionProviderByName(providerName);

  if (!isMissing) return null;

  const config = (providerData as any)?.config as
    | ConnectionProviderConfig
    | undefined;

  const supportsOAuth2 = !!config?.auth.oauth2;
  const supportsToken = !!config?.auth.apiKey;

  return (
    <div className="p-3 bg-destructive/5 border border-destructive/10 rounded-lg w-64">
      <p className="text-[10px] text-destructive font-bold uppercase tracking-wider mb-2">
        Missing Connection
      </p>
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-mono text-neutral-content-subtle truncate">
          {providerName}
        </span>
        <div className="flex gap-2 justify-end">
          {supportsToken && (
            <Button
              size="sm"
              variant="outline"
              className="h-6 text-[10px] py-0 px-2"
            >
              Add API Key
            </Button>
          )}
          {supportsOAuth2 && (
            <Button
              size="sm"
              variant="outline"
              className="h-6 text-[10px] py-0 px-2"
            >
              Connect (OAuth)
            </Button>
          )}
          {!supportsToken && !supportsOAuth2 && (
            <div>
              <Text tone="subtle">No connection method available</Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ServiceDetails({
  workspaceEngine,
  serviceId,
  onBack,
  onInstall,
}: {
  workspaceEngine: WorkspaceEngine;
  serviceId: string;
  onBack: () => void;
  onInstall: (serviceName: string, data: ServiceData) => void;
}) {
  const workspaceSpec = workspaceEngine.useState((s) => s.workspace.spec) || {};
  const installedServices =
    workspaceSpec.status === "valid" ? workspaceSpec.data?.services || {} : {};
  const installedServiceNames = new Set(
    Object.values(installedServices).map((s) => s.name),
  );

  const session = useSession();
  const ubento = useUbento();
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  const { data: service, isLoading } = ubento.vertex.useService(serviceId);
  const { data: channels, isLoading: isLoadingChannels } =
    ubento.vertex.useServiceChannels(serviceId, {
      enabled: !!serviceId,
    });
  const isInstalled = service?.name && installedServiceNames.has(service?.name);

  const { data: spec, isLoading: isLoadingSpec } =
    ubento.vertex.useServiceChannelSpec(activeChannelId ?? "", {
      enabled: !!activeChannelId,
    });
  const parsedSpec = spec ? serviceSpecV1Schema.safeParse(spec) : null;
  const specData = parsedSpec?.success ? parsedSpec.data : null;

  const provider = specData?.connection?.provider;

  const { data: connection, isLoading: isLoadingConnection } = useQuery({
    queryKey: ["team-connection", session.teamId, provider],
    queryFn: async () => {
      return await ubento.sdk.vertex.getTeamConnection(
        session.teamId || "",
        provider || "",
      );
    },
    enabled: !!session.teamId && !!provider,
  });

  const isConnectionMissing = !!provider && !connection && !isLoadingConnection;

  useEffect(() => {
    if (channels && channels.length > 0 && !activeChannelId) {
      setActiveChannelId(channels[0].id);
    }
  }, [channels, activeChannelId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] gap-4 text-neutral-content-muted">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        <p className="text-[13px]">Loading service details...</p>
      </div>
    );
  }

  if (!service) return null;

  return (
    <Content>
      <ContentHeader>
        <Button
          onClick={onBack}
          variant="ghost"
          className="flex items-center gap-2 text-neutral-content-muted hover:text-neutral-content transition-colors text-[13px] font-medium mb-4 group h-auto p-0"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Back to marketplace
        </Button>
        <div className="flex items-center gap-6">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] bg-neutral-surface border border-neutral-border text-neutral-content shadow-sm">
            <Server size={40} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <Heading>{service.name}</Heading>
              {isInstalled && (
                <Badge
                  variant="outline"
                  className="bg-success/10 border-success/20 text-success text-[10px] font-bold uppercase tracking-wider"
                >
                  Installed
                </Badge>
              )}
            </div>
            <Text tone="subtle">
              {specData?.description ||
                service.description ||
                "No description available."}
            </Text>
          </div>
          {!isInstalled && (
            <div className="flex flex-col gap-3 items-end">
              {isConnectionMissing && (
                <ConnectionBlock
                  providerName={provider || ""}
                  isMissing={isConnectionMissing}
                />
              )}
              <Button
                onClick={() =>
                  onInstall(service.name, {
                    name: service.name,
                    channel: activeChannelId || "",
                    connectionId: connection?.id || "",
                  })
                }
                variant="primary"
                className="gap-2 shadow-lg shadow-accent/20"
                disabled={isConnectionMissing || isLoadingConnection}
              >
                Install <Sparkles size={16} />
              </Button>
            </div>
          )}
        </div>
      </ContentHeader>
      <ContentBody className="overflow-auto">
        <pre>{JSON.stringify(specData?.connection, null, 2)}</pre>
        {isLoadingChannels ? (
          <div className="flex items-center gap-2 text-neutral-content-muted mb-6">
            <div className="w-4 h-4 border-2 border-neutral-border border-t-neutral-content-muted rounded-full animate-spin" />
            <p className="text-[13px]">Loading channels...</p>
          </div>
        ) : channels && channels.length > 0 ? (
          <Tabs
            value={activeChannelId ?? undefined}
            onValueChange={setActiveChannelId}
            className="mb-6"
          >
            <TabsList>
              {channels.map((channel: any) => (
                <TabsTrigger key={channel.id} value={channel.id}>
                  {channel.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        ) : (
          <Text tone="muted" className="mb-6">
            No channels available.
          </Text>
        )}

        {isLoadingSpec ? (
          <div className="flex items-center gap-2 text-neutral-content-muted mb-6">
            <div className="w-4 h-4 border-2 border-neutral-border border-t-neutral-content-muted rounded-full animate-spin" />
            <p className="text-[13px]">Loading specification...</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-8">
              <section>
                <Heading level="h3" as="h3" className="mb-3">
                  About this service
                </Heading>
                <Text tone="muted" className="leading-relaxed">
                  {specData?.description ||
                    service.description ||
                    "No description available."}
                </Text>
              </section>

              {specData?.entities &&
                Object.keys(specData.entities).length > 0 && (
                  <section>
                    <Heading level="h3" as="h3" className="mb-3">
                      Entities
                    </Heading>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(specData.entities).map(
                        ([key, entity]) => (
                          <Card key={key} className="p-4">
                            <div className="font-bold text-neutral-content">
                              {entity.name}
                            </div>
                            <div className="text-[11px] text-neutral-content-muted">
                              PK: {entity.primaryKey}
                            </div>
                          </Card>
                        ),
                      )}
                    </div>
                  </section>
                )}

              {specData?.queries &&
                Object.keys(specData.queries).length > 0 && (
                  <section>
                    <Heading level="h3" as="h3" className="mb-3">
                      Queries
                    </Heading>
                    <div className="space-y-2">
                      {Object.entries(specData.queries).map(([key, query]) => (
                        <Card
                          key={key}
                          className="p-3 flex items-center justify-between"
                        >
                          <div className="font-medium text-neutral-content">
                            {query.name}
                          </div>
                          <div className="text-[11px] text-neutral-content-muted">
                            {Object.keys(query.args || {}).length} args
                          </div>
                        </Card>
                      ))}
                    </div>
                  </section>
                )}

              {specData?.actions &&
                Object.keys(specData.actions).length > 0 && (
                  <section>
                    <Heading level="h3" as="h3" className="mb-3">
                      Mutations
                    </Heading>
                    <div className="space-y-2">
                      {Object.entries(specData.actions).map(([key, action]) => (
                        <Card
                          key={key}
                          className="p-3 flex items-center justify-between"
                        >
                          <div className="font-medium text-neutral-content">
                            {action.name}
                          </div>
                          <div className="text-[11px] text-neutral-content-muted">
                            {Object.keys(action.args || {}).length} args
                          </div>
                        </Card>
                      ))}
                    </div>
                  </section>
                )}

              {!specData && !isLoadingSpec && (
                <Text tone="muted">
                  No specification details available for this channel.
                </Text>
              )}
            </div>

            <div className="space-y-6">
              <Card
                variant="ghost"
                className="p-6 bg-neutral-surface/30 border border-neutral-border/50"
              >
                <Heading
                  level="h4"
                  as="h4"
                  className="uppercase tracking-wider mb-4"
                >
                  Details
                </Heading>
                <div className="space-y-4">
                  <div>
                    <Text
                      size="sm"
                      tone="muted"
                      className="uppercase font-bold mb-1"
                    >
                      Version
                    </Text>
                    <Text weight="medium">
                      {specData?.spec ? `v${specData.spec}` : "N/A"}
                    </Text>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </ContentBody>
    </Content>
  );
}
