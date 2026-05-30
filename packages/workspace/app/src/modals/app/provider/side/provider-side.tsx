import { useSession } from "@/contexts/session";
import {
  Badge,
  Button,
  Content,
  ContentBody,
  ContentFooter,
  ContentHeader,
  Heading,
  Text,
} from "@ubento/bento.arlo-core";
import { vertexClient } from "@ubento/services.sdk";
import { ConnectionProviderConfig } from "@ubento/vertex.core";
import { Edit, Globe } from "lucide-react";
import { Case, Default, Switch } from "react-if";
import { GoBack } from "../../go-back.js";
import { useAppModal } from "../../hook.js";
import { appModalRoutes } from "../../routes.js";

export function ProviderSidebar({
  data,
  config,
}: {
  data?: vertexClient.ConnectionProvider;
  config?: ConnectionProviderConfig;
}) {
  const session = useSession();
  const { push } = useAppModal();
  const supportedAuth: Array<{ label: string }> = [];

  if (config?.auth.apiKey) {
    supportedAuth.push({ label: "API Key" });
  }
  if (config?.auth.basic) {
    supportedAuth.push({ label: "Basic Auth" });
  }
  if (config?.auth.oauth2) {
    supportedAuth.push({ label: "OAuth" });
  }

  return (
    <Content>
      <ContentHeader>
        <GoBack />
        <div className="flex items-center justify-center h-14 w-14 bg-background rounded-2xl overflow-hidden">
          <Switch>
            <Case condition={!!data?.image_url}>
              <img
                src={data?.image_url!}
                alt={data?.name}
                className="w-full h-full object-cover"
              />
            </Case>
            <Default>
              <Globe className="h-7 w-7" />
            </Default>
          </Switch>
        </div>

        <div className="space-y-2">
          <Heading>{data?.name}</Heading>
          <Text shade="subtle">{data?.description}</Text>
        </div>
        <div className="flex gap-2 flex-wrap">
          {supportedAuth.map((auth) => (
            <Badge key={auth.label}>{auth.label}</Badge>
          ))}
        </div>
      </ContentHeader>

      <ContentBody />

      {data?.team_id === session.teamId && (
        <ContentFooter className="border-t border-border/30 pt-3">
          <Button
            variant="primary"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => {
              if (data?.id) {
                push(appModalRoutes.services.editProvider, {
                  providerId: data.id,
                });
              }
            }}
          >
            <Edit size={16} /> Edit Provider
          </Button>
        </ContentFooter>
      )}
    </Content>
  );
}
