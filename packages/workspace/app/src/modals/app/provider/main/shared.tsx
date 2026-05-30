import { useSession } from "@/contexts/session";
import { useUbento } from "@/hooks/app-engine";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Field,
  FieldLabel,
  Heading,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ubento/bento.arlo-core";
import { vertexClient } from "@ubento/services.sdk";
import { Edit, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export function AuthMethodSelector({
  authMethods,
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
  authMethods: Array<{
    code: string;
    name: string;
  }>;
}) {
  return (
    <div className="flex gap-2">
      {authMethods.map((authMethod) => (
        <Button
          key={authMethod.code}
          variant={value === authMethod.code ? "primary" : "secondary"}
          onClick={() => onChange(authMethod.code)}
        >
          {authMethod.name}
        </Button>
      ))}
    </div>
  );
}

export function OAuthClientSelector({
  providerData,
  value,
  onChange,
}: {
  providerData: vertexClient.ConnectionProvider;
  value: string;
  onChange: (value: string) => void;
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

  const defaultClient = clients.find((c: any) => !c.team_id);
  const teamClient = clients.find((c: any) => c.team_id === session.teamId);

  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Set default selection if none selected
  useEffect(() => {
    if (!value && clients.length > 0) {
      if (teamClient) {
        onChange(teamClient.id);
      } else if (defaultClient) {
        onChange(defaultClient.id);
      }
    }
  }, [clients, value, defaultClient, teamClient, onChange]);

  const handleOpenCreate = () => {
    setClientId("");
    setClientSecret("");
    setFormError("");
    setIsEditing(true);
  };

  const handleOpenEdit = () => {
    if (!teamClient) return;
    setClientId("");
    setClientSecret("");
    setFormError("");
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!clientId || !clientSecret) {
      setFormError("Both Client ID and Client Secret are required.");
      return;
    }
    setIsSaving(true);
    setFormError("");
    try {
      if (teamClient) {
        // Edit existing
        await ubento.sdk.vertex.updateOAuthClient(teamClient.id, {
          credentials: {
            clientId,
            clientSecret,
          },
        });
      } else {
        // Create new
        const newClient = await ubento.sdk.vertex.createOAuthClient({
          team_id: session.teamId || "",
          provider_id: providerData.id,
          name: `${providerData.name} Dedicated Client`,
          credentials: {
            clientId,
            clientSecret,
          },
        });
        onChange(newClient.id);
      }
      setIsEditing(false);
      queryClient.invalidateQueries({
        queryKey: ["oauth-clients", providerData.id],
      });
    } catch (err: any) {
      setFormError(err.message || "Failed to save client credentials.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-xs text-content-muted">
        Loading OAuth clients...
      </div>
    );
  }

  const selectValue =
    value ||
    (teamClient ? teamClient.id : defaultClient ? defaultClient.id : "");

  const availableClients = [
    ...(defaultClient ? [defaultClient] : []),
    ...(teamClient ? [teamClient] : []),
  ];

  return (
    <div className="space-y-3">
      <Field>
        <FieldLabel>Client</FieldLabel>
        <Select
          value={selectValue}
          onValueChange={onChange}
          disabled={!availableClients.length}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                availableClients.length
                  ? "Select an OAuth Client"
                  : "No OAuth Clients Found"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {availableClients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      {!isEditing && (
        <div className="text-xs flex justify-end">
          {teamClient ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenEdit}
              disabled={isSaving}
            >
              <Edit size={14} /> Edit Dedicated Client
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenCreate}
              disabled={isSaving}
            >
              <Plus size={14} /> Configure Dedicated Client
            </Button>
          )}
        </div>
      )}

      {isEditing && (
        <Card className="p-4 space-y-3" variant="outline">
          <Heading className="text-sm font-semibold">OAuth Client</Heading>

          {formError && (
            <div className="p-2 text-xs text-base bg-base/10 rounded-lg">
              {formError}
            </div>
          )}

          <Field>
            <FieldLabel>Client ID</FieldLabel>
            <Input
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="Enter Client ID"
            />
          </Field>

          <Field>
            <FieldLabel>Client Secret</FieldLabel>
            <Input
              type="password"
              value={clientSecret}
              onChange={(e) => setClientSecret(e.target.value)}
              placeholder="Enter Client Secret"
            />
          </Field>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
