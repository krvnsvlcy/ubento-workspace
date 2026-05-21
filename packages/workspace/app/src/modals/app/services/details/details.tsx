import { ErrorView } from "@/components/error";
import { useWorkspaceEngine } from "@/contexts/workspace";
import { useUbentoEngine } from "@/engine/app/engine";
import { useAppModal } from "@/modals/app/hook.js";
import { appModalRoutes } from "@/modals/app/routes.js";
import {
  Button,
  Content,
  ContentBody,
  ContentFooter,
  ContentHeader,
  PendingView,
  RailLayout,
  RailLayoutMain,
  RailLayoutSide,
  ScrollArea,
  Text,
} from "@ubento/bento.arlo-core";
import { serviceSpecV1Schema } from "@ubento/vertex.core";
import { Edit, Server } from "lucide-react";
import { useEffect, useState } from "react";
import { Case, Default, Switch } from "react-if";
import { GoBack } from "../../go-back";
import { DetailsBody } from "./body";
import { DetailsHeader } from "./header";

export function ServiceDetails() {
  const engine = useUbentoEngine();
  const ubento = engine.ubento;
  const session = engine.useState((s) => s.session);
  const { params, goBack, push } = useAppModal();
  const serviceId = params.serviceId || params.id || "";
  const workspaceEngine = useWorkspaceEngine();

  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: serviceData,
    isLoading: isLoadingService,
    isError: isServiceError,
    refetch: refetchService,
  } = ubento.vertex.useService(serviceId);

  const { data: channels, isLoading: isLoadingChannels } =
    ubento.vertex.useServiceChannels(serviceId, {
      enabled: !!serviceId,
    });

  const {
    data: spec,
    isLoading: isLoadingSpec,
    isError: isSpecError,
    refetch: refetchSpec,
  } = ubento.vertex.useServiceChannelSpec(activeChannelId ?? "", {
    enabled: !!activeChannelId,
  });

  useEffect(() => {
    if (channels && channels.length > 0 && !activeChannelId) {
      setActiveChannelId(channels[0].id);
    }
  }, [channels, activeChannelId]);
  const parsedSpec = spec ? serviceSpecV1Schema.safeParse(spec) : null;
  const specData = parsedSpec?.success ? parsedSpec.data : undefined;

  if (isLoadingService) {
    return <PendingView message="Service" />;
  }
  if (isServiceError || !serviceData) {
    return (
      <ErrorView
        message={`Failed to load service ${serviceId}`}
        action={{
          label: "Retry",
          handler: () => refetchService(),
        }}
      />
    );
  }

  return (
    <RailLayout>
      <RailLayoutSide>
        <Content>
          <ContentHeader>
            <GoBack />
          </ContentHeader>
          <ContentBody className="space-y-4">
            {/* Service Icon */}
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-neutral-border/50 text-neutral-content backdrop-blur-sm overflow-hidden bg-background">
              <Switch>
                <Case condition={!!serviceData.image_url}>
                  <img
                    src={serviceData.image_url!}
                    alt={serviceData.name}
                    className="w-full h-full object-cover"
                  />
                </Case>
                <Default>
                  <Server size={32} />
                </Default>
              </Switch>
            </div>

            {/* Description */}
            <Text tone="subtle">
              {specData?.description || serviceData.description}
            </Text>
          </ContentBody>
          {serviceData.team_id === session?.teamId && (
            <ContentFooter className="border-t border-neutral-border/30 pt-3">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  push(appModalRoutes.services.edit, { serviceId });
                }}
              >
                <Edit size={16} /> Edit Service
              </Button>
            </ContentFooter>
          )}
        </Content>
      </RailLayoutSide>
      <RailLayoutMain>
        <Content className="bg-gradient-to-br from-neutral-background to-neutral-surface/20">
          <ContentHeader>
            <DetailsHeader
              service={serviceData}
              specData={specData}
              isSpecLoading={isLoadingSpec}
              isSpecError={isSpecError}
              refetchSpec={refetchSpec}
              isSpecValid={parsedSpec?.success || false}
              workspaceEngine={workspaceEngine}
              activeChannelId={activeChannelId}
              channels={channels}
              setActiveChannelId={setActiveChannelId}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </ContentHeader>
          <ContentBody
            paddingX={false}
            paddingY={false}
            className="overflow-hidden"
          >
            <ScrollArea className="pb-6 px-6">
              <DetailsBody
                isLoadingSpec={isLoadingSpec}
                specData={specData}
                specError={parsedSpec?.error?.message}
                service={serviceData}
                searchQuery={searchQuery}
              />
            </ScrollArea>
          </ContentBody>
        </Content>
      </RailLayoutMain>
    </RailLayout>
  );
}
