import { Button, Content, ContentBody, ContentFooter, ContentHeader, Heading } from "@ubento/bento.arlo-core";
import { CodeEditor } from "@/components/code-editor";

interface ProviderConfigEditorProps {
  provider?: any;
  configText: string;
  setConfigText: (val: string) => void;
  handleSave: () => void;
  isPending: boolean;
}

export function ProviderConfigEditor({
  provider,
  configText,
  setConfigText,
  handleSave,
  isPending,
}: ProviderConfigEditorProps) {
  return (
    <Content>
      <ContentHeader>
        <Heading className="text-lg font-bold">Configuration</Heading>
      </ContentHeader>

      <ContentBody paddingY={false}>
        <div className="h-full border rounded-lg overflow-hidden flex flex-col bg-background">
          <CodeEditor
            value={configText}
            onChange={setConfigText}
            language="json"
            className="flex-1"
          />
        </div>
      </ContentBody>

      <ContentFooter>
        <div className="flex justify-end w-full">
          <Button onClick={handleSave} variant="primary" disabled={isPending}>
            {isPending
              ? provider
                ? "Saving..."
                : "Creating..."
              : provider
              ? "Save Changes"
              : "Create Provider"}
          </Button>
        </div>
      </ContentFooter>
    </Content>
  );
}
