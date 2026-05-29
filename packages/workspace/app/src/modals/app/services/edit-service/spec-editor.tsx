import { Button, Content, ContentBody, ContentFooter, ContentHeader, Field, FieldLabel, Heading, Input } from "@ubento/bento.arlo-core";
import { CodeEditor } from "@/components/code-editor";
import { ProviderSelector } from "../create-service/provider-selector.js";

interface ServiceSpecEditorProps {
  specText: string;
  setSpecText: (val: string) => void;
  importMode: boolean;
  setImportMode: (val: boolean) => void;
  specUrl: string;
  setSpecUrl: (val: string) => void;
  fetchingSpec: boolean;
  specError: string;
  setSpecError: (val: string) => void;
  selectedProviderId: string;
  setSelectedProviderId: (id: string) => void;
  handleFetchAndGenerate: () => void;
  handleSave: () => void;
  isPending: boolean;
  saveDisabled: boolean;
}

export function ServiceSpecEditor({
  specText,
  setSpecText,
  importMode,
  setImportMode,
  specUrl,
  setSpecUrl,
  fetchingSpec,
  specError,
  setSpecError,
  selectedProviderId,
  setSelectedProviderId,
  handleFetchAndGenerate,
  handleSave,
  isPending,
  saveDisabled,
}: ServiceSpecEditorProps) {
  if (importMode) {
    return (
      <Content>
        <ContentHeader>
          <Heading className="text-lg font-bold">Import OpenAPI Specification</Heading>
        </ContentHeader>

        <ContentBody className="space-y-4">
          <ProviderSelector
            selectedProviderId={selectedProviderId}
            setSelectedProviderId={setSelectedProviderId}
          />

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
            <Button
              onClick={() => {
                setImportMode(false);
                setSpecError("");
              }}
              variant="ghost"
            >
              Cancel
            </Button>
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

  return (
    <Content>
      <ContentHeader>
        <div className="flex items-center justify-between w-full">
          <Heading className="text-lg font-bold">Service Specification</Heading>
          <Button
            onClick={() => {
              setImportMode(true);
              setSpecError("");
            }}
            variant="outline"
          >
            Import from OpenAPI Spec
          </Button>
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
          <Button onClick={handleSave} variant="primary" disabled={saveDisabled}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </ContentFooter>
    </Content>
  );
}
