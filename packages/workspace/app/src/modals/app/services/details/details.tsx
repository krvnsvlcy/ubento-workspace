import { ErrorView } from "@/components/error";
import { useSession } from "@/contexts/session";
import { useWorkspaceEngine } from "@/contexts/workspace";
import { useUbento } from "@/engine/app/engine";
import { useAppModal } from "@/modals/app/hook.js";
import { appModalRoutes } from "@/modals/app/routes.js";
import { serviceSpecV1Schema } from "@ubento/vertex.core";
import { PrimitiveButton as Button, Content, ContentBody, ContentFooter, ContentHeader, PendingView, RailLayout, RailLayoutMain, RailLayoutSide, Text } from "@ubento/bento.arlo-core";
import { ArrowLeft, Edit, Server } from "lucide-react";
import { useEffect, useState } from "react";
import { DetailsBody } from "./body";
import { DetailsHeader } from "./header";

export function ServiceDetails() {
  const session = useSession();
  const ubento = useUbento();
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
            <Button
              onClick={goBack}
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
          {serviceData.team_id === session?.teamId && (
            <ContentFooter className="border-t border-neutral-border/30 pt-3">
              <Button
                variant="outline"
                className="w-full justify-center gap-2"
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
              isLoadingSpec={isLoadingSpec}
              specData={specData}
              specError={parsedSpec?.error?.message}
              service={serviceData}
              searchQuery={searchQuery}
            />
          </ContentBody>
        </Content>
      </RailLayoutMain>
    </RailLayout>
  );
}
