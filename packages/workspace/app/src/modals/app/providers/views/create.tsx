import { useUbento } from "@/hooks/app-engine";
import { Button, Content, ContentBody, ContentFooter, ContentHeader, Field, FieldLabel, Heading, Input, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@ubento/bento.arlo-core";
import { FC, useState } from "react";
import { useAppModal } from "../../hook.js";

export const CreateProvider: FC = () => {
  const { goBack } = useAppModal();
  const ubento = useUbento();
  const { mutate: createProvider, isPending } =
    (ubento.vertex as any).useCreateConnectionProvider();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [authType, setAuthType] = useState("oauth2");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!code || !name) {
      setError("Code and Name are required.");
      return;
    }
    setError("");

    const config: Record<string, any> = { auth: {} };
    if (authType === "oauth2") {
      config.auth.oauth2 = {};
    } else if (authType === "apiKey") {
      config.auth.apiKey = {};
    } else if (authType === "basic") {
      config.auth.basic = {};
    }

    createProvider(
      {
        code,
        name,
        description,
        type: authType,
        config,
      },
      {
        onSuccess: () => {
          goBack();
        },
        onError: (err: any) => {
          setError(err.message || "Failed to create connection provider.");
        },
      },
    );
  };

  return (
    <Content>
      <ContentHeader className="border-b border-border/30 pb-4">
        <Heading className="text-xl font-bold">Create Connection Provider</Heading>
        <p className="text-sm text-content-subtle">
          Register a new custom integration provider.
        </p>
      </ContentHeader>

      <ContentBody className="space-y-4 pt-4">
        {error && (
          <div className="p-3 text-xs text-base bg-base/10 rounded-lg font-medium">
            {error}
          </div>
        )}

        <Field>
          <FieldLabel>Provider Name</FieldLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Slack, GitHub"
          />
        </Field>

        <Field>
          <FieldLabel>Provider Code</FieldLabel>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g., slack, github (lowercase, unique)"
          />
        </Field>

        <Field>
          <FieldLabel>Description</FieldLabel>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A short description of this connection provider"
          />
        </Field>

        <Field>
          <FieldLabel>Authentication Method</FieldLabel>
          <Select value={authType} onValueChange={setAuthType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select auth method" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                <SelectItem value="apiKey">API Key</SelectItem>
                <SelectItem value="basic">Basic Auth</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </ContentBody>

      <ContentFooter className="border-t border-border/30 pt-4 flex justify-end gap-2">
        <Button onClick={goBack} variant="ghost" size="sm">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="primary" size="sm" disabled={isPending}>
          {isPending ? "Creating..." : "Create Provider"}
        </Button>
      </ContentFooter>
    </Content>
  );
};
