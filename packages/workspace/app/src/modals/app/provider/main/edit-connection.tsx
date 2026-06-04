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
  HttpConnectionCredentials,
  HttpConnectionProviderConfig,
} from "@ubento/vertex.core";
import { useState } from "react";
import { Case, Default, If, Switch } from "react-if";
import { AuthMethodSelector, OAuthClientSelector } from "./shared";
import { extractProviderAuthMethods } from "./utils";

export function EditConnection() {
  const ubento = useUbento();
  const { params, goBack } = useAppModal();
  const connectionId = params.connectionId;
  const providerCode = params.providerCode;

  const { data: connection, isLoading: isLoadingConnection } =
    ubento.vertex.useConnection(connectionId || "");

  const { data: providerData, isLoading: isLoadingProvider } =
    ubento.vertex.useConnectionProviderByHandle(providerCode || "");

  const config = (providerData as any)?.config as
    | HttpConnectionProviderConfig
    | undefined;

  const isLoading = isLoadingConnection || isLoadingProvider;

  if (isLoading) {
    return (
      <Content className="flex items-center justify-center p-6">
        <Spinner />
      </Content>
    );
  }

  if (!connection || !providerData || !config) {
    return (
      <Content className="p-6 text-sm text-base">
        Connection or Provider not found.
      </Content>
    );
  }

  return (
    <EditConnectionForm
      connection={connection}
      providerData={providerData}
      config={config}
      onSuccess={goBack}
      onCancel={goBack}
    />
  );
}

function EditConnectionForm({
  connection,
  providerData,
  config,
  onSuccess,
  onCancel,
}: {
  connection: vertexClient.Connection;
  providerData: vertexClient.HttpConnectionProvider;
  config: HttpConnectionProviderConfig;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const ubento = useUbento();
  const session = useSession();

  const authMethods = extractProviderAuthMethods(config);
  const [authMethod, setAuthMethod] = useState<string>(
    authMethods[0]?.code || "api-key",
  );

  const [connectionName, setConnectionName] = useState(connection.name || "");
  const [apiKey, setApiKey] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [oauthClientId, setOauthClientId] = useState<string>("");

  const [error, setError] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { mutate: updateConnectionAuth, isLoading: isUpdating } = (
    ubento.vertex as any
  ).useUpdateConnectionAuth();

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

  const handleSave = () => {
    let credentials: HttpConnectionCredentials | undefined = undefined;

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
          <div className="p-3 text-xs text-base bg-base/10 rounded-lg font-medium">
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
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  variant="ghost"
                  disabled={!connectionName || isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save"}
                </Button>
                <Button
                  onClick={handleOAuthConnect}
                  variant="primary"
                  disabled={isRedirecting || !oauthClientId}
                >
                  {isRedirecting ? "Connecting..." : "Reconnect OAuth"}
                </Button>
              </div>
            </Case>
            <Default>
              <Button
                onClick={handleSave}
                variant="primary"
                disabled={!connectionName || isUpdating}
              >
                {isUpdating ? "Saving..." : "Save"}
              </Button>
            </Default>
          </Switch>
        </div>
      </ContentFooter>
    </Content>
  );
}
