import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll.js";
import { useAppModal } from "@/modals/app/hook.js";
import { appModalRoutes } from "@/modals/app/routes.js";
import {
  PrimitiveButton as Button,
  Card,
  Content,
  ContentBody,
  ContentHeader,
  EmptyView,
  Heading,
  Spinner,
  Text,
} from "@ubento/bento.arlo-core";
import { vertexClient } from "@ubento/services.sdk";
import { ConnectionProviderConfig } from "@ubento/vertex.core";
import { Globe, Plus, Trash2 } from "lucide-react";
import { FC, useState } from "react";
import { Case, Default, Switch } from "react-if";

export function ConnectionList() {
  const ubento = useUbento();
  const session = useSession();
  const { params, push } = useAppModal();
  const providerCode = params.providerCode;

  const { data: providerData } = ubento.vertex.useConnectionProviderByCode(
    providerCode || "",
  );
  const config = (providerData as any)?.config as
    | ConnectionProviderConfig
    | undefined;

  const {
    data: connectionsData,
    isLoading: isLoadingConnections,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = ubento.vertex.useConnections(
    { providerId: providerData?.id, teamId: session.teamId },
    { enabled: !!providerData?.id && !!session.teamId },
  );

  const sentinelRef = useInfiniteScroll({
    hasNextPage: !!hasNextPage,
    isFetching,
    onLoadMore: fetchNextPage,
  });

  const connections = connectionsData?.pages.flatMap((page) => page.data) ?? [];

  const { mutate: deleteConnection } = (
    ubento.vertex as any
  ).useDeleteConnection();

  const onAddConnection = () => {
    push(appModalRoutes.provider.createConnection, { providerCode });
  };

  const onEditConnection = (conn: vertexClient.Connection) => {
    push(appModalRoutes.provider.editConnection, {
      connectionId: conn.id,
      providerCode,
    });
  };

  const onConfigureOauthClient = () => {
    push(appModalRoutes.provider.oauthClient, { providerCode });
  };

  if (isLoadingConnections) {
    return (
      <div className="text-center py-6 text-neutral-content-muted text-sm">
        Loading connections...
      </div>
    );
  }

  return (
    <Content>
      <ContentHeader>
        <div className="flex justify-between items-center w-full">
          <Heading className="text-lg font-bold">Active Connections</Heading>
          <div className="flex items-center gap-2">
            {config?.auth.oauth2 && (
              <Button onClick={onConfigureOauthClient} variant="ghost">
                Configure OAuth Client
              </Button>
            )}
            <Button onClick={onAddConnection} variant="primary">
              <Plus size={16} /> Add Connection
            </Button>
          </div>
        </div>
      </ContentHeader>
      <ContentBody>
        <Switch>
          <Case condition={!connections?.length}>
            <EmptyView
              message="No connections yet for this provider."
              action={{
                label: "Add Connection",
                onClick: onAddConnection,
              }}
            />
          </Case>
          <Default>
            <div className="space-y-3">
              {connections.map((conn) => (
                <ConnectionCard
                  key={conn.id}
                  connection={conn}
                  onEdit={onEditConnection}
                  onDelete={deleteConnection}
                />
              ))}

              <div ref={sentinelRef} className="flex justify-center h-6" />

              {isFetching && !isLoadingConnections && (
                <div className="flex justify-center p-6">
                  <Spinner className="text-neutral-content-muted" />
                </div>
              )}
            </div>
          </Default>
        </Switch>
      </ContentBody>
    </Content>
  );
}

interface ConnectionCardProps {
  connection: vertexClient.Connection;
  onEdit: (connection: vertexClient.Connection) => void;
  onDelete: (id: string) => void;
}

const ConnectionCard: FC<ConnectionCardProps> = ({
  connection,
  onEdit,
  onDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (isDeleting) {
    return (
      <Card
        key="destructive"
        padding="sm"
        intent="destructive"
        className="flex items-center justify-between"
      >
        <div className="flex flex-col gap-1">
          <Text weight="semibold">Delete Connection?</Text>
          <Text tone="muted" size="sm">
            Are you sure you want to delete "
            {connection.name || "this connection"}"?
          </Text>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => setIsDeleting(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            intent="destructive"
            onClick={() => onDelete(connection.id)}
          >
            Delete
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      padding="sm"
      variant="surface-interactive"
      className="group flex items-center justify-between"
      onClick={() => onEdit(connection)}
    >
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-neutral-content/10 text-neutral-content-muted">
          <Globe className="h-4 w-4" />
        </div>
        <div>
          <Text weight="semibold">{connection.name}</Text>
          <Text tone="muted" size="sm">
            {connection.id}
          </Text>
        </div>
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setIsDeleting(true);
          }}
          variant="secondary-destructive"
          size="icon"
          title="Delete Connection"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </Card>
  );
};
