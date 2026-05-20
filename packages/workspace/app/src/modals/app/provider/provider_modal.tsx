import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
import { ConnectionProviderConfig } from "@ubento/vertex.core";
import { RailLayout, RailLayoutMain, RailLayoutSide } from "@ubento/bento.arlo-core";
import { useAppModal } from "../hook.js";
import { ProviderSidebar } from "./side/provider-side.js";
import { ConnectionMain } from "./main/connection-main.js";

export function ProviderModal() {
  const ubento = useUbento();
  const session = useSession();
  const { params } = useAppModal();
  const providerCode = params.providerCode;

  const { data: providerData } =
    ubento.vertex.useConnectionProviderByCode(providerCode || "");

  const { data: allConnections = [], isLoading: isLoadingConnections } =
    ubento.vertex.useConnections({ team_id: session.teamId || "" });

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
