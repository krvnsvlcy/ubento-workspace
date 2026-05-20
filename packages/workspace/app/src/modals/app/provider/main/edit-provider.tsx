import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { vertexClient } from "@ubento/services.sdk";
import { PrimitiveButton as Button, Content, ContentBody, ContentFooter, ContentHeader, Field, FieldLabel, Heading, PrimitiveInput as Input } from "@ubento/bento.arlo-core";
import { useState } from "react";

export function EditProvider({
  providerData,
  onSuccess,
  onCancel,
}: {
  providerData: vertexClient.ConnectionProvider;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const ubento = useUbento();
  const session = useSession();
  const queryClient = useQueryClient();

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ["oauth-clients", providerData.id],
    queryFn: async () => {
      const res = await ubento.sdk.vertex.listOAuthClients({
        provider_id: providerData.id,
      });
      return res.data || [];
    },
  });

  const teamClient = clients.find((c: any) => c.team_id === session.teamId);

  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
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
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to save client credentials.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-neutral-content-muted">
        Loading configuration...
      </div>
    );
  }

  return (
    <Content>
      <ContentHeader>
        <Heading className="text-lg font-bold">
          Configure Dedicated OAuth Client
        </Heading>
        <p className="text-sm text-neutral-content-subtle">
          Configure a custom OAuth client for {providerData.name} integration.
        </p>
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
              teamClient ? "Enter new Client Secret to update" : "OAuth Client Secret"
            }
          />
        </Field>
      </ContentBody>

      <ContentFooter className="flex justify-end gap-2 border-t border-neutral-border/30 pt-5">
        <Button onClick={onCancel} variant="ghost" size="sm">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="primary"
          size="sm"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Configuration"}
        </Button>
      </ContentFooter>
    </Content>
  );
}
