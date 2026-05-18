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
import { Case, Default, If, Switch } from "react-if";
import { extractProviderAuthMethods } from "./utils";
import { AuthMethodSelector, OAuthClientSelector } from "./shared";

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
