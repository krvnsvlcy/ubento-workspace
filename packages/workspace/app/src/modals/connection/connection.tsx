import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
import { ConnectionProviderConfig } from "@ubento/vertex.core";
import {
  RailLayout,
  RailLayoutMain,
  RailLayoutSide,
} from "@ubento/bento.arlo-core";
import { useState } from "react";
import { ConnectionMain } from "./main/connection-main";
import { ProviderSidebar } from "./side/connection-side";

export interface ConnectionModalProps {
  providerCode: string;
  onSuccess?: () => void;
}

export function ConnectionModal({
  providerCode,
  onSuccess,
}: ConnectionModalProps) {
  const ubento = useUbento();
  const session = useSession();

  const { data: providerData } =
    ubento.vertex.useConnectionProviderByCode(providerCode);

  const { data: allConnections = [], isLoading: isLoadingConnections } =
    ubento.vertex.useConnections({ team_id: session.teamId });

  const [showAddCard, setShowAddCard] = useState(false);
  const [editingConnection, setEditingConnection] = useState<any | undefined>(
    undefined,
  );

  const config = (providerData as any)?.config as
    | ConnectionProviderConfig
    | undefined;

  // Filter connections for this provider
  const connections = allConnections.filter(
    (c: any) => c.provider_id === providerData?.id,
  );

  const handleSuccess = () => {
    setShowAddCard(false);
    setEditingConnection(undefined);
    onSuccess?.();
  };

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
          showAddCard={showAddCard}
          onShowAddCard={setShowAddCard}
          editingConnection={editingConnection}
          onEditConnection={setEditingConnection}
          onSuccess={handleSuccess}
        />
      </RailLayoutMain>
    </RailLayout>
  );
}
