import { Button, Content, ContentBody, ContentFooter, ContentHeader, Field, FieldLabel, Heading, Input } from "@ubento/bento.arlo-core";
import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { useState } from "react";
import { parse as parseYaml } from "yaml";
import { CodeEditor } from "@/components/code-editor";

interface ServiceSpecEditorProps {
  handle: string;
  specText: string;
  setSpecText: (value: string) => void;
  handleCreate: () => void;
  isPending: boolean;
  createDisabled: boolean;
  selectedProviderId: string;
}

export function ServiceSpecEditor({
  handle,
  specText,
  setSpecText,
  handleCreate,
  isPending,
  createDisabled,
  selectedProviderId,
}: ServiceSpecEditorProps) {
  const [importMode, setImportMode] = useState(false);

  if (importMode) {
    return (
      <OpenApiImporter
        handle={handle}
        selectedProviderId={selectedProviderId}
        onImport={(spec) => {
          setSpecText(JSON.stringify(spec, null, 2));
          setImportMode(false);
        }}
        onCancel={() => setImportMode(false)}
      />
    );
  }

  return (
    <RawSpecEditor
      specText={specText}
      setSpecText={setSpecText}
      onImportModeToggle={() => setImportMode(true)}
      handleCreate={handleCreate}
      isPending={isPending}
      disabled={createDisabled}
    />
  );
}

interface OpenApiImporterProps {
  handle: string;
  selectedProviderId: string;
  onImport: (spec: any) => void;
  onCancel: () => void;
}

function OpenApiImporter({
  handle,
  selectedProviderId,
  onImport,
  onCancel,
}: OpenApiImporterProps) {
  const [specUrl, setSpecUrl] = useState("");
  const [fetchingSpec, setFetchingSpec] = useState(false);
  const [specError, setSpecError] = useState("");

  const handleFetchAndGenerate = async () => {
    if (!specUrl) {
      setSpecError("Please enter an OpenAPI Spec URL.");
      return;
    }
    if (!selectedProviderId) {
      setSpecError("Please select a Connection Provider in the side form first.");
      return;
    }

    setFetchingSpec(true);
    setSpecError("");

    try {
      const res = await fetch(specUrl);
      if (!res.ok) {
        throw new Error(`Failed to fetch spec (Status: ${res.status})`);
      }
      const rawText = await res.text();
      let openapiObj: any;

      // Attempt JSON parsing first, fall back to YAML
      try {
        openapiObj = JSON.parse(rawText);
      } catch {
        try {
          openapiObj = parseYaml(rawText);
        } catch {
          throw new Error("Could not parse file as JSON or YAML.");
        }
      }

      if (!openapiObj || typeof openapiObj !== "object") {
        throw new Error("Invalid OpenAPI specification.");
      }

      // Generate service spec config
      const spec = generateServiceSpecFromOpenApi({
        openapi: openapiObj,
        template: {
          name: handle || "custom-service",
          connection: {
            provider: selectedProviderId,
            baseUrl: openapiObj.servers?.[0]?.url || "https://api.example.com",
          },
          discover: true,
        },
      });

      onImport(spec);
      setSpecError("");
    } catch (err: any) {
      setSpecError(
        err.message || "Failed to generate configuration from OpenAPI spec.",
      );
    } finally {
      setFetchingSpec(false);
    }
  };

  return (
    <Content>
      <ContentHeader>
        <Heading className="text-lg font-bold">
          Import OpenAPI Specification
        </Heading>
      </ContentHeader>

      <ContentBody className="space-y-4 overflow-y-auto">
        {!selectedProviderId && (
          <div className="p-3 text-xs text-warning bg-warning/10 rounded-lg font-medium">
            ⚠️ Please select a Connection Provider in the side form first.
          </div>
        )}

        <Field>
          <FieldLabel>OpenAPI Spec URL</FieldLabel>
          <Input
            value={specUrl}
            onChange={(e) => setSpecUrl(e.target.value)}
            placeholder="https://api.example.com/openapi.yaml"
          />
        </Field>

        {specError && (
          <div className="p-2.5 text-xs text-destructive bg-destructive/10 rounded-lg font-medium">
            {specError}
          </div>
        )}
      </ContentBody>

      <ContentFooter>
        <div className="flex justify-end gap-2 w-full">
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            onClick={handleFetchAndGenerate}
            variant="primary"
            disabled={fetchingSpec || !specUrl || !selectedProviderId}
          >
            {fetchingSpec ? "Fetching..." : "Generate & Import"}
          </Button>
        </div>
      </ContentFooter>
    </Content>
  );
}

interface RawSpecEditorProps {
  specText: string;
  setSpecText: (value: string) => void;
  onImportModeToggle: () => void;
  handleCreate: () => void;
  isPending: boolean;
  disabled: boolean;
}

function RawSpecEditor({
  specText,
  setSpecText,
  onImportModeToggle,
  handleCreate,
  isPending,
  disabled,
}: RawSpecEditorProps) {
  return (
    <Content>
      <ContentHeader>
        <div className="flex items-center justify-between w-full">
          <Heading className="text-lg font-bold">Specification</Heading>
          <Button onClick={onImportModeToggle}>Import from OpenAPI Spec</Button>
        </div>
      </ContentHeader>

      <ContentBody paddingY={false}>
        <div className="h-full border rounded-lg overflow-hidden flex flex-col bg-background">
          <CodeEditor
            value={specText}
            onChange={setSpecText}
            language="json"
            className="flex-1"
          />
        </div>
      </ContentBody>

      <ContentFooter>
        <div className="flex justify-end w-full">
          <Button onClick={handleCreate} variant="primary" disabled={disabled}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </ContentFooter>
    </Content>
  );
}
