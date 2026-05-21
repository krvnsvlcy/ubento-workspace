import {
  Badge,
  Content,
  ContentHeader,
  Heading,
  Text,
} from "@ubento/bento.arlo-core";
import { vertexClient } from "@ubento/services.sdk";
import { ConnectionProviderConfig } from "@ubento/vertex.core";
import { Globe } from "lucide-react";
import { GoBack } from "../../go-back.js";

export function ProviderSidebar({
  data,
  config,
}: {
  data?: vertexClient.ConnectionProvider;
  config?: ConnectionProviderConfig;
}) {
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
        <div className="flex items-center justify-center h-14 w-14 bg-background rounded-xl">
          <Globe className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <Heading>{data?.name}</Heading>
          <Text tone="subtle">{data?.description}</Text>
        </div>
        <div className="flex gap-2 flex-wrap">
          {supportedAuth.map((auth) => (
            <Badge key={auth.label}>{auth.label}</Badge>
          ))}
        </div>
      </ContentHeader>
    </Content>
  );
}
