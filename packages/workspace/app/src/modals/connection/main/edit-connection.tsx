import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
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
} from "@ubento/workspace.primitives";
import { useState } from "react";
import { Case, Default, Switch } from "react-if";
import { extractProviderAuthMethods } from "./utils";

export function EditConnection({
  connection,
  providerData,
  config,
  onSuccess,
  onCancel,
}: {
  connection: vertexClient.Connection;
  providerData: vertexClient.ConnectionProvider;
  config: ConnectionProviderConfig;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const ubento = useUbento();
  const session = useSession();

  const authMethods = extractProviderAuthMethods(config);
  const authMethod = authMethods[0]?.code || "api-key";
  const authMethodName = authMethods[0]?.name || "API Key";

  const [connectionName, setConnectionName] = useState(connection.name || "");
  const [apiKey, setApiKey] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { mutate: updateConnectionAuth, isLoading: isUpdating } = (
    ubento.vertex as any
  ).useUpdateConnectionAuth();

  const handleOAuthConnect = async () => {
    try {
      setError("");
      setIsRedirecting(true);
      const result = await ubento.sdk.vertex.listOAuthClients({
        provider_id: providerData.id,
      });
      const clients = result.data || [];
      if (clients.length === 0) {
        setError(
          "No OAuth Client is configured for this provider. Please configure an OAuth Client first.",
        );
        setIsRedirecting(false);
        return;
      }
      const oauthClient = clients[0];
      // Redirect to the connection endpoint to re-auth
      window.location.href = `/api/vertex/oauth/connect?oauth_client_id=${oauthClient.id}&team_id=${session.teamId}`;
    } catch (err: any) {
      setError(err.message || "Failed to initiate OAuth flow.");
      setIsRedirecting(false);
    }
  };

  const handleSave = () => {
    let credentials: ConnectionCredentials | undefined = undefined;

    if (authMethod === "api-key" && apiKey) {
      credentials = {
        type: "api_key",
        token: apiKey,
      };
    } else if (authMethod === "basic" && username) {
      credentials = {
        type: "basic",
        username,
        password,
      };
    }

    updateConnectionAuth(
      {
        connectionId: connection.id,
        credentials: {
          name: connectionName,
          credentials,
        },
      },
      {
        onSuccess: () => {
          onSuccess();
        },
        onError: () => {
          setError("Failed to update connection. Please try again.");
        },
      },
    );
  };

  return (
    <Content>
      <ContentHeader>
        <Heading className="text-lg font-bold">Edit Connection</Heading>
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

        <Field>
          <FieldLabel>Authentication Method</FieldLabel>
          <div className="text-sm font-semibold px-3 py-2 bg-neutral-surface-hover/30 rounded-lg w-fit border border-neutral-border text-neutral-content-muted select-none">
            {authMethodName}
          </div>
        </Field>

        <Switch>
          <Case condition={authMethod === "api-key"}>
            <Field>
              <FieldLabel>API Key</FieldLabel>
              <Input
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Leave blank to keep existing key"
              />
            </Field>
          </Case>
          <Case condition={authMethod === "basic"}>
            <div className="space-y-4">
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
                  placeholder="Leave blank to keep existing password"
                  type="password"
                />
              </Field>
            </div>
          </Case>
          <Case condition={authMethod === "oauth2"}>
            <div className="space-y-2 p-4 rounded-xl bg-neutral-surface border border-neutral-border text-center">
              <p className="text-sm font-semibold">OAuth Authorization</p>
              <p className="text-xs text-neutral-content-muted">
                To update OAuth credentials, re-authorize your connection with{" "}
                {providerData.name}.
              </p>
            </div>
          </Case>
        </Switch>
      </ContentBody>

      <ContentFooter className="flex justify-end gap-2 space-y-0 border-t border-neutral-border/30 pt-5">
        <Button onClick={onCancel} variant="ghost" size="sm">
          Cancel
        </Button>
        <Switch>
          <Case condition={authMethod === "oauth2"}>
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                variant="outline"
                size="sm"
                disabled={!connectionName || isUpdating}
              >
                {isUpdating ? "Saving..." : "Save Name"}
              </Button>
              <Button
                onClick={handleOAuthConnect}
                variant="primary"
                size="sm"
                disabled={isRedirecting}
              >
                {isRedirecting ? "Connecting..." : "Reconnect OAuth"}
              </Button>
            </div>
          </Case>
          <Default>
            <Button
              onClick={handleSave}
              variant="primary"
              size="sm"
              disabled={!connectionName || isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </Button>
          </Default>
        </Switch>
      </ContentFooter>
    </Content>
  );
}
