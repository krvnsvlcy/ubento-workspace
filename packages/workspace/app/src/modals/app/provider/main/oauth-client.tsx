import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
import { useAppModal } from "@/modals/app/hook.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  PrimitiveButton as Button,
  Content,
  ContentBody,
  ContentFooter,
  ContentHeader,
  EmptyView,
  Field,
  FieldLabel,
  Heading,
  PrimitiveInput as Input,
  PendingView,
  Text,
} from "@ubento/bento.arlo-core";
import { useState } from "react";

export function OAuthClientView() {
  const ubento = useUbento();
  const session = useSession();
  const queryClient = useQueryClient();
  const { params, goBack } = useAppModal();
  const providerCode = params.providerCode;

  const { data: providerData, isLoading: isLoadingProvider } =
    ubento.vertex.useConnectionProviderByCode(providerCode || "");

  const { data: clients = [], isLoading: isLoadingClients } = useQuery({
    queryKey: ["oauth-clients", providerData?.id],
    queryFn: async () => {
      const res = await ubento.sdk.vertex.listOAuthClients({
        provider_id: providerData!.id,
      });
      return res.data || [];
    },
    enabled: !!providerData?.id,
  });

  const isLoading = isLoadingProvider || isLoadingClients;
  const teamClient = clients.find((c: any) => c.team_id === session.teamId);

  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!providerData) return;
    if (!clientId || !clientSecret) {
      setError("Both Client ID and Client Secret are required.");
      return;
    }
    setIsSaving(true);
    setError("");
    try {
      if (teamClient) {
        await ubento.sdk.vertex.updateOAuthClient(teamClient.id, {
          credentials: { clientId, clientSecret },
        });
      } else {
        await ubento.sdk.vertex.createOAuthClient({
          team_id: session.teamId || "",
          provider_id: providerData.id,
          name: `${providerData.name} Dedicated Client`,
          credentials: { clientId, clientSecret },
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["oauth-clients", providerData.id],
      });
      goBack();
    } catch (err: any) {
      setError(err.message || "Failed to save client credentials.");
    } finally {
      setIsSaving(false);
    }
  };

  if (1 || isLoading) {
    return <PendingView message="OAuth Client" />;
  }

  if (!providerData) {
    return (
      <EmptyView
        message="Provider not found"
        action={{
          label: "Go Back",
          onClick: goBack,
        }}
      />
    );
  }

  return (
    <Content>
      <ContentHeader>
        <div className="space-y-2">
          <Heading>OAuth Client</Heading>
          <Text tone="subtle">
            Configure a custom OAuth client for {providerData.name} integration.
          </Text>
        </div>
      </ContentHeader>

      <ContentBody className="space-y-4">
        {error && (
          <div className="p-3 text-xs text-destructive bg-destructive/10 rounded-lg font-medium">
            {error}
          </div>
        )}

        <Field>
          <FieldLabel>Client ID</FieldLabel>
          <Input
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder="OAuth Client ID"
          />
        </Field>

        <Field>
          <FieldLabel>Client Secret</FieldLabel>
          <Input
            type="password"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            placeholder={
              teamClient
                ? "Enter new Client Secret to update"
                : "OAuth Client Secret"
            }
          />
        </Field>
      </ContentBody>

      <ContentFooter>
        <div className="flex justify-end gap-2">
          <Button onClick={goBack} variant="ghost">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="primary" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Configuration"}
          </Button>
        </div>
      </ContentFooter>
    </Content>
  );
}
