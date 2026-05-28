import { useSession } from "@/contexts/session";
import { useUbento } from "@/hooks/app-engine";
import {
  RailLayout,
  RailLayoutMain,
  RailLayoutSide,
} from "@ubento/bento.arlo-core";
import { ConnectionProviderConfig } from "@ubento/vertex.core";
import { useAppModal } from "../hook.js";
import { ConnectionMain } from "./main/connection-main.js";
import { ProviderSidebar } from "./side/provider-side.js";

export function ProviderModal() {
  const ubento = useUbento();
  const session = useSession();
  const { params } = useAppModal();
  const providerCode = params.providerCode;

  const { data: providerData } = ubento.vertex.useConnectionProviderByHandle(
    providerCode || "",
  );

  const { data: allConnectionsData, isLoading: isLoadingConnections } =
    ubento.vertex.useConnections({ teamId: session.teamId || "" });
  const allConnections =
    allConnectionsData?.pages.flatMap((page) => page.data) ?? [];

  const config = (providerData as any)?.config as
    | ConnectionProviderConfig
    | undefined;

  // Filter connections for this provider
  const connections = allConnections.filter(
    (c: any) => c.provider_id === providerData?.id,
  );

  return (
    <RailLayout>
      <RailLayoutSide>
        <ProviderSidebar data={providerData} config={config} />
      </RailLayoutSide>
      <RailLayoutMain>
        <ConnectionMain
          connections={connections}
          isLoadingConnections={isLoadingConnections}
          providerData={providerData}
          config={config}
        />
      </RailLayoutMain>
    </RailLayout>
  );
}
