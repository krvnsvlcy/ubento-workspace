import { useSession } from "@/contexts/session";
import { useUbento } from "@/hooks/app-engine";
import { useAppModal } from "@/modals/app/hook.js";
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
  Spinner,
} from "@ubento/bento.arlo-core";
import { vertexClient } from "@ubento/services.sdk";
import {
  ConnectionCredentials,
  ConnectionProviderConfig,
} from "@ubento/vertex.core";
import { useState } from "react";
import { Case, Default, If, Switch } from "react-if";
import { AuthMethodSelector, OAuthClientSelector } from "./shared";
import { extractProviderAuthMethods } from "./utils";

export function AddConnection() {
  const ubento = useUbento();
  const { params, goBack } = useAppModal();
  const providerCode = params.providerCode;

  const { data: providerData, isLoading } =
    ubento.vertex.useConnectionProviderByHandle(providerCode || "");

  const config = (providerData as any)?.config as
    | ConnectionProviderConfig
    | undefined;

  if (isLoading) {
    return (
      <Content className="flex items-center justify-center p-6">
        <Spinner />
      </Content>
    );
  }

  if (!providerData || !config) {
    return (
      <Content className="p-6 text-sm text-destructive">
        Provider not found.
      </Content>
    );
  }

  return (
    <AddConnectionForm
      providerData={providerData}
      config={config}
      onSuccess={goBack}
      onCancel={goBack}
    />
  );
}

function AddConnectionForm({
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

  const { mutate: createConnection, isPending: isCreating } =
    ubento.vertex.useCreateConnection();

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

      <ContentFooter>
        <div className="flex justify-end gap-2">
          <Button onClick={onCancel} variant="ghost">
            Cancel
          </Button>
          <Switch>
            <Case condition={authMethod === "oauth2"}>
              <Button
                onClick={handleOAuthConnect}
                variant="primary"
                disabled={isRedirecting || !oauthClientId}
              >
                {isRedirecting ? "Connecting..." : "Connect"}
              </Button>
            </Case>
            <Default>
              <Button
                onClick={handleCreate}
                variant="primary"
                disabled={!connectionName || !inputsAreValid || isCreating}
              >
                {isCreating ? "Creating..." : "Create"}
              </Button>
            </Default>
          </Switch>
        </div>
      </ContentFooter>
    </Content>
  );
}
