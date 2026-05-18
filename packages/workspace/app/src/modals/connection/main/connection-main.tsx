import { vertexClient } from "@ubento/services.sdk";
import { ConnectionProviderConfig } from "@ubento/vertex.core";
import { Case, Default, Switch } from "react-if";
import { AddConnection } from "./add-connection";
import { EditConnection } from "./edit-connection";
import { ConnectionList } from "./connection-list";

interface ConnectionMainProps {
  connections: vertexClient.Connection[];
  isLoadingConnections: boolean;
  providerData?: vertexClient.ConnectionProvider;
  config?: ConnectionProviderConfig;
  showAddCard: boolean;
  onShowAddCard: (show: boolean) => void;
  editingConnection?: vertexClient.Connection;
  onEditConnection: (connection?: vertexClient.Connection) => void;
  onSuccess: () => void;
}

export function ConnectionMain({
  connections,
  isLoadingConnections,
  providerData,
  config,
  showAddCard,
  onShowAddCard,
  editingConnection,
  onEditConnection,
  onSuccess,
}: ConnectionMainProps) {
  return (
    <Switch>
      <Case condition={!!editingConnection && !!providerData && !!config}>
        <EditConnection
          connection={editingConnection!}
          providerData={providerData!}
          config={config!}
          onSuccess={onSuccess}
          onCancel={() => onEditConnection(undefined)}
        />
      </Case>
      <Case condition={showAddCard && !!providerData && !!config}>
        <AddConnection
          providerData={providerData!}
          config={config!}
          onSuccess={onSuccess}
          onCancel={() => onShowAddCard(false)}
        />
      </Case>
      <Default>
        <ConnectionList
          connections={connections}
          isLoadingConnections={isLoadingConnections}
          providerData={providerData}
          config={config}
          onAddConnection={() => onShowAddCard(true)}
          onEditConnection={onEditConnection}
        />
      </Default>
    </Switch>
  );
}
