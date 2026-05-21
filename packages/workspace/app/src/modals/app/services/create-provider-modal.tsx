import { useUbento } from "@/engine/app/engine";
import { useAppModal } from "@/modals/app/hook.js";
import { Button, Content, ContentBody, ContentFooter, ContentHeader, Field, FieldLabel, Heading } from "@ubento/bento.arlo-core";
import { useState } from "react";

interface CreateProviderModalProps {
  provider?: any;
}

export function CreateProviderModal({ provider }: CreateProviderModalProps = {}) {
  const ubento = useUbento();
  const { goBack } = useAppModal();

  const [description, setDescription] = useState(provider?.description || "");
  const [templateType, setTemplateType] = useState("oauth2");
  const [error, setError] = useState("");

  const getTemplate = (method: string) => {
    if (method === "basic") {
      return JSON.stringify(
        {
          type: "http",
          code: "custom-basic-provider",
          name: "My Custom Basic Provider",
          baseUrl: "https://api.example.com",
          auth: {
            basic: {},
          },
        },
        null,
        2,
      );
    }
    if (method === "apiKey") {
      return JSON.stringify(
        {
          type: "http",
          code: "custom-apikey-provider",
          name: "My Custom API Key Provider",
          baseUrl: "https://api.example.com",
          auth: {
            apiKey: {
              location: "header",
              name: "Authorization",
              template: "Bearer {{key}}",
            },
          },
        },
        null,
        2,
      );
    }
    return JSON.stringify(
      {
        type: "http",
        code: "custom-oauth2-provider",
        name: "My Custom OAuth2 Provider",
        baseUrl: "https://api.example.com",
        auth: {
          oauth2: {
            type: "oauth2",
            authorize: {
              request: {
                method: "GET",
                path: "/oauth/authorize",
                baseUrl: "https://example.com",
              },
            },
            token: {
              request: {
                method: "POST",
                path: "/oauth/token",
                baseUrl: "https://example.com",
              },
            },
          },
        },
      },
      null,
      2,
    );
  };

  const [configText, setConfigText] = useState(() =>
    provider
      ? JSON.stringify(provider.config || provider, null, 2)
      : getTemplate("oauth2"),
  );

  const { mutate: createProvider, isPending: isCreating } =
    ubento.vertex.useCreateConnectionProvider();
  const { mutate: updateProvider, isPending: isUpdating } =
    ubento.vertex.useUpdateConnectionProvider();

  const isPending = isCreating || isUpdating;

  const handleTemplateChange = (val: string) => {
    setTemplateType(val);
    setConfigText(getTemplate(val));
  };

  const handleSave = () => {
    setError("");

    let parsedConfig: any = null;
    try {
      parsedConfig = JSON.parse(configText);
    } catch {
      setError("Configuration is not valid JSON.");
      return;
    }

    if (!parsedConfig || typeof parsedConfig !== "object") {
      setError("Configuration must be a valid JSON object.");
      return;
    }

    const { code, name } = parsedConfig;

    if (!code || typeof code !== "string" || !code.trim()) {
      setError(
        "A string property 'code' must be defined in the JSON configuration.",
      );
      return;
    }
    if (!/^[a-z0-9-_]+$/.test(code.trim())) {
      setError(
        "Provider 'code' must only contain lowercase letters, numbers, hyphens, and underscores.",
      );
      return;
    }
    if (!name || typeof name !== "string" || !name.trim()) {
      setError(
        "A string property 'name' must be defined in the JSON configuration.",
      );
      return;
    }

    if (provider) {
      updateProvider(
        {
          providerId: provider.id,
          data: {
            code: code.trim(),
            name: name.trim(),
            type: "http",
            description: description.trim(),
            config: parsedConfig,
          },
        },
        {
          onSuccess: (updated: any) => {
            goBack();
          },
          onError: (err: any) => {
            setError(
              err.message ||
                "Failed to update connection provider. Please try again.",
            );
          },
        },
      );
    } else {
      createProvider(
        {
          code: code.trim(),
          name: name.trim(),
          type: "http",
          description: description.trim(),
          config: parsedConfig,
        },
        {
          onSuccess: (newProvider: any) => {
            goBack();
          },
          onError: (err: any) => {
            setError(
              err.message ||
                "Failed to create connection provider. Please try again.",
            );
          },
        },
      );
    }
  };

  return (
    <Content className="w-[850px] max-w-[95vw]">
      <ContentHeader>
        <Heading className="text-lg font-bold">
          {provider ? "Edit Connection Provider" : "Create Connection Provider"}
        </Heading>
      </ContentHeader>

      <ContentBody className="space-y-0 p-0 h-[400px]">
        <div className="flex gap-6 h-full p-6">
          {/* Left Side: General Controls */}
          <div className="w-[280px] shrink-0 space-y-4 pr-3 border-r border-neutral-border/30 overflow-y-auto">
            {error && (
              <div className="p-3 text-xs text-destructive bg-destructive/10 rounded-lg font-medium">
                {error}
              </div>
            )}

            {!provider && (
              <Field>
                <FieldLabel>Load Template</FieldLabel>
                <select
                  value={templateType}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="w-full bg-neutral-surface/50 border border-neutral-border/30 rounded-lg px-2.5 py-1.5 text-sm text-neutral-content focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
                >
                  <option value="oauth2">OAuth 2.0 Template</option>
                  <option value="apiKey">API Key Template</option>
                  <option value="basic">Basic Auth Template</option>
                </select>
              </Field>
            )}

            <Field>
              <FieldLabel>Description (Optional)</FieldLabel>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. My custom API connection provider"
                className="w-full bg-neutral-surface/50 border border-neutral-border/30 rounded-lg px-2.5 py-2 text-sm text-neutral-content focus:outline-none focus:ring-1 focus:ring-accent h-[120px] resize-none"
              />
            </Field>
          </div>

          {/* Right Side: JSON Textarea */}
          <div className="flex-1 flex flex-col h-full pl-3">
            <Field className="flex-1 flex flex-col h-full">
              <FieldLabel>JSON Configuration</FieldLabel>
              <textarea
                value={configText}
                onChange={(e) => setConfigText(e.target.value)}
                placeholder="Paste your JSON configuration here..."
                className="flex-1 w-full font-mono text-[11px] bg-neutral-surface border border-neutral-border/30 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-accent h-full resize-none text-neutral-content"
              />
            </Field>
          </div>
        </div>
      </ContentBody>

      <ContentFooter className="flex justify-end gap-2 border-t border-neutral-border/30 pt-5 space-y-0">
        <Button onClick={() => goBack()} variant="ghost" size="sm">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="primary"
          size="sm"
          disabled={isPending}
        >
          {isPending
            ? provider
              ? "Saving..."
              : "Creating..."
            : provider
            ? "Save Changes"
            : "Create Provider"}
        </Button>
      </ContentFooter>
    </Content>
  );
}
