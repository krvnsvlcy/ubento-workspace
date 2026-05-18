import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { vertexClient } from "@ubento/services.sdk";
import {
  ConnectionCredentials,
  ConnectionProviderConfig,
} from "@ubento/vertex.core";
import {
  Button,
  Content,
  ContentBody,
  ContentFooter,
  ContentHeader,
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
} from "@ubento/workspace.primitives";
import { useEffect, useState } from "react";
import { Case, Default, If, Switch } from "react-if";
import { extractProviderAuthMethods } from "./utils";

function AuthMethodSelector({
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
          variant={value === authMethod.code ? "primary" : "default"}
          onClick={() => onChange(authMethod.code)}
        >
          {authMethod.name}
        </Button>
      ))}
    </div>
  );
}

function OAuthClientSelector({
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
      <div className="text-xs text-neutral-content-muted">
        Loading OAuth clients...
      </div>
    );
  }

  const selectValue =
    value ||
    (teamClient ? teamClient.id : defaultClient ? defaultClient.id : "");

  return (
    <div className="space-y-3">
      <Field>
        <FieldLabel>Client</FieldLabel>
        <Select value={selectValue} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an OAuth Client" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {defaultClient && (
                <SelectItem value={defaultClient.id}>
                  Default {providerData.name} Client
                </SelectItem>
              )}
              {teamClient && (
                <SelectItem value={teamClient.id}>
                  Team Dedicated Client
                </SelectItem>
              )}
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
              className="text-blue-500 hover:text-blue-600 font-medium"
              onClick={handleOpenEdit}
              disabled={isSaving}
            >
              ✏️ Edit Dedicated Client
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-500 hover:text-blue-600 font-medium"
              onClick={handleOpenCreate}
              disabled={isSaving}
            >
              ➕ Configure Dedicated Client for Team
            </Button>
          )}
        </div>
      )}

      {isEditing && (
        <div className="p-4 border border-neutral-border/30 rounded-xl bg-neutral-surface-hover/10 space-y-3">
          <Heading className="text-sm font-semibold">
            {teamClient
              ? "Edit Dedicated Client"
              : "Configure Dedicated Client"}
          </Heading>

          {formError && (
            <div className="p-2 text-xs text-destructive bg-destructive/10 rounded-lg">
              {formError}
            </div>
          )}

          <Field>
            <FieldLabel className="text-xs">Client ID</FieldLabel>
            <Input
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder={teamClient ? "Enter new Client ID" : "Client ID"}
              className="text-xs h-8"
            />
          </Field>

          <Field>
            <FieldLabel className="text-xs">Client Secret</FieldLabel>
            <Input
              type="password"
              value={clientSecret}
              onChange={(e) => setClientSecret(e.target.value)}
              placeholder={
                teamClient ? "Enter new Client Secret" : "Client Secret"
              }
              className="text-xs h-8"
            />
          </Field>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
              className="h-7 text-xs"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="h-7 text-xs"
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function AddConnection({
  providerData,
  config,
  onSuccess,
  onCancel,
}: {
  providerData: vertexClient.ConnectionProvider;
  config: ConnectionProviderConfig;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const ubento = useUbento();
  const session = useSession();

  const authMethods = extractProviderAuthMethods(config);

  const [connectionName, setConnectionName] = useState(providerData.name);
  const [apiKey, setApiKey] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authMethod, setAuthMethod] = useState<string>(authMethods[0]?.code);
  const [oauthClientId, setOauthClientId] = useState<string>("");

  const [error, setError] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { mutate: createConnection, isLoading: isCreating } = (
    ubento.vertex as any
  ).useCreateConnection();

  const handleOAuthConnect = async () => {
    try {
      setError("");
      setIsRedirecting(true);
      if (!oauthClientId) {
        setError("Please select or configure an OAuth Client first.");
        setIsRedirecting(false);
        return;
      }
      // Open connection endpoint in a new tab
      window.open(
        `http://localhost:28642/vertex/oauth/connect?oauth_client_id=${oauthClientId}&team_id=${session.teamId}`,
        "_blank",
      );
      setIsRedirecting(false);
    } catch (err: any) {
      setError(err.message || "Failed to initiate OAuth flow.");
      setIsRedirecting(false);
    }
  };
  const handleCreate = async () => {
    let credentials: ConnectionCredentials;
    if (authMethod === "api-key") {
      credentials = {
        type: "api_key",
        token: apiKey,
      };
    } else if (authMethod === "basic") {
      credentials = {
        type: "basic",
        username,
        password,
      };
    } else {
      return;
    }

    createConnection(
      {
        team_id: session.teamId || "",
        provider_id: providerData.id,
        name: connectionName,
        credentials,
      },
      {
        onSuccess: () => {
          onSuccess();
        },
        onError: () => {
          setError("Failed to create connection. Please try again.");
        },
      },
    );
  };

  const inputsAreValid = () => {
    if (authMethod === "api-key") {
      return !!apiKey;
    }
    if (authMethod === "basic") {
      return !!username;
    }
    return false;
  };

  return (
    <Content>
      <ContentHeader>
        <Heading className="text-lg font-bold">New Connection</Heading>
      </ContentHeader>

      <ContentBody className="space-y-4">
        {error && (
          <div className="p-3 text-xs text-destructive bg-destructive/10 rounded-lg font-medium">
            {error}
          </div>
        )}

        <Field>
          <FieldLabel>Connection Name</FieldLabel>
          <Input
            value={connectionName}
            onChange={(e) => setConnectionName(e.target.value)}
            placeholder="e.g. My Production Account"
          />
        </Field>

        <If condition={authMethods.length > 1}>
          <Field>
            <FieldLabel>Authentication Method</FieldLabel>
            <AuthMethodSelector
              authMethods={authMethods}
              value={authMethod}
              onChange={setAuthMethod}
            />
          </Field>
        </If>

        <Switch>
          <Case condition={authMethod === "api-key"}>
            <Field>
              <FieldLabel>API Key</FieldLabel>
              <Input
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
              />
            </Field>
          </Case>

          <Case condition={authMethod === "basic"}>
            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </Field>
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
              />
            </Field>
          </Case>

          <Case condition={authMethod === "oauth2"}>
            <OAuthClientSelector
              providerData={providerData}
              value={oauthClientId}
              onChange={setOauthClientId}
            />
          </Case>
        </Switch>
      </ContentBody>

      <ContentFooter className="flex justify-end gap-2 space-y-0 border-t border-neutral-border/30 pt-5">
        <Button onClick={onCancel} variant="ghost" size="sm">
          Cancel
        </Button>
        <Switch>
          <Case condition={authMethod === "oauth2"}>
            <Button
              onClick={handleOAuthConnect}
              variant="primary"
              size="sm"
              disabled={isRedirecting || !oauthClientId}
            >
              {isRedirecting ? "Connecting..." : "Connect"}
            </Button>
          </Case>
          <Default>
            <Button
              onClick={handleCreate}
              variant="primary"
              size="sm"
              disabled={!connectionName || !inputsAreValid || isCreating}
            >
              {isCreating ? "Creating..." : "Create"}
            </Button>
          </Default>
        </Switch>
      </ContentFooter>
    </Content>
  );
}
