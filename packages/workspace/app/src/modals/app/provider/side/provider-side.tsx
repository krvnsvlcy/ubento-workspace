import { vertexClient } from "@ubento/services.sdk";
import { ConnectionProviderConfig } from "@ubento/vertex.core";
import { PrimitiveBadge as Badge, Heading, Text } from "@ubento/bento.arlo-core";
import { Globe } from "lucide-react";

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
    <div className="w-full p-6 space-y-4">
      <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-neutral-surface border border-neutral-border text-neutral-content">
        <Globe className="h-6 w-6" />
      </div>
      <div className="space-y-2">
        <Heading className="text-lg font-bold">{data?.name}</Heading>
        <div className="flex gap-2">
          {supportedAuth.map((auth) => (
            <Badge variant="secondary" key={auth.label}>
              {auth.label}
            </Badge>
          ))}
        </div>
      </div>
      <Text tone="subtle" className="text-sm">
        {data?.description}
      </Text>
    </div>
  );
}
