import { useAppModal } from "@/modals/app/hook";
import { appModalRoutes, routeMatch } from "@/modals/app/routes";
import { vertexClient } from "@ubento/services.sdk";
import { ConnectionProviderConfig } from "@ubento/vertex.core";
import { Case, Switch } from "react-if";
import { AddConnection } from "./add-connection.js";
import { ConnectionList } from "./connection-list.js";
import { EditConnection } from "./edit-connection.js";
import { EditProvider } from "./edit-provider.js";

interface ConnectionMainProps {
  connections: vertexClient.Connection[];
  isLoadingConnections: boolean;
  providerData?: vertexClient.ConnectionProvider;
  config?: ConnectionProviderConfig;
}

export function ConnectionMain({
  connections,
  isLoadingConnections,
  providerData,
  config,
}: ConnectionMainProps) {
  const { path, params, goBack, push } = useAppModal();
  const connectionId = params.connectionId;
  const providerCode = params.providerCode;

  const editingConnection = connections.find((c) => c.id === connectionId);

  const handleSuccess = () => {
    goBack();
  };

  const handleCancel = () => {
    goBack();
  };

  return (
    <Switch>
      <Case
        condition={
          routeMatch(path, appModalRoutes.provider.editConnection) &&
          !!editingConnection &&
          !!providerData &&
          !!config
        }
      >
        <EditConnection
          connection={editingConnection!}
          providerData={providerData!}
          config={config!}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </Case>
      <Case
        condition={
          routeMatch(path, appModalRoutes.provider.createConnection) &&
          !!providerData &&
          !!config
        }
      >
        <AddConnection
          providerData={providerData!}
          config={config!}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </Case>
      <Case
        condition={
          routeMatch(path, appModalRoutes.provider.editProvider) &&
          !!providerData
        }
      >
        <EditProvider
          providerData={providerData!}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </Case>
      <Case condition={routeMatch(path, appModalRoutes.provider.provider)}>
        <ConnectionList
          connections={connections}
          isLoadingConnections={isLoadingConnections}
          providerData={providerData}
          config={config}
          onAddConnection={() =>
            push(appModalRoutes.provider.createConnection, { providerCode })
          }
          onEditConnection={(conn) =>
            push(appModalRoutes.provider.editConnection, {
              connectionId: conn.id,
              providerCode,
            })
          }
          onEditProvider={() =>
            push(appModalRoutes.provider.editProvider, { providerCode })
          }
        />
      </Case>
    </Switch>
  );
}
