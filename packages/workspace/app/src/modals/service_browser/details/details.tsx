import { ErrorView } from "@/components/error";
import { useUbento } from "@/engine/app/engine";
import { WorkspaceEngine } from "@/engine/workspace/engine";
import { serviceSpecV1Schema } from "@ubento/vertex.core";
import {
  Content,
  ContentBody,
  ContentHeader,
  PendingView,
  RailLayout,
  RailLayoutMain,
  RailLayoutSide,
  Button,
  Heading,
  Text,
} from "@ubento/workspace.primitives";
import { ArrowLeft, Server } from "lucide-react";
import { useEffect, useState } from "react";
import { DetailsBody } from "./body";
import { DetailsHeader } from "./header";

export function ServiceDetails({
  workspaceEngine,
  serviceId,
  onBack,
}: {
  workspaceEngine: WorkspaceEngine;
  serviceId: string;
  onBack: () => void;
}) {
  const ubento = useUbento();
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
            <Button
              onClick={onBack}
              variant="ghost"
              className="w-full justify-start gap-2"
            >
              <ArrowLeft size={16} />
              Back to marketplace
            </Button>
          </ContentHeader>
          <ContentBody className="space-y-4">
            {/* Service Icon */}
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-neutral-border/50 text-neutral-content backdrop-blur-sm">
              <Server size={32} />
            </div>

            {/* Description */}
            <Text tone="subtle">
              {specData?.description || serviceData.description}
            </Text>
          </ContentBody>
        </Content>
      </RailLayoutSide>
      <RailLayoutMain>
        <Content className="bg-gradient-to-br from-neutral-background to-neutral-surface/20">
          <ContentHeader className="pb-6 border-b border-neutral-border/30">
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
          <ContentBody className="overflow-auto pt-6">
            <DetailsBody
              serviceId={serviceId}
              activeChannelId={activeChannelId}
              setActiveChannelId={setActiveChannelId}
              isLoadingSpec={isLoadingSpec}
              specData={specData}
              service={serviceData}
              searchQuery={searchQuery}
            />
          </ContentBody>
        </Content>
      </RailLayoutMain>
    </RailLayout>
  );
}
