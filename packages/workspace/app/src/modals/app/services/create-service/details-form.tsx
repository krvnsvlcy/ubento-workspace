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
  Textarea,
} from "@ubento/bento.arlo-core";

interface ServiceDetailsFormProps {
  name: string;
  handleNameChange: (value: string) => void;
  handle: string;
  setHandle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  error: string;
  isPending: boolean;
  handleCreate: () => void;
}

export function ServiceDetailsForm({
  name,
  handleNameChange,
  handle,
  setHandle,
  description,
  setDescription,
  error,
  isPending,
  handleCreate,
}: ServiceDetailsFormProps) {
  const { goBack } = useAppModal();

  return (
    <Content>
      <ContentHeader>
        <Heading className="text-lg font-bold">Create Service</Heading>
      </ContentHeader>

      <ContentBody>
        <div className="flex-1 space-y-4 border-neutral-border/30 overflow-y-auto">
          {error && (
            <div className="p-3 text-xs text-destructive bg-destructive/10 rounded-lg font-medium">
              {error}
            </div>
          )}

          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. My Custom Analytics"
              autoFocus
            />
          </Field>

          <Field>
            <FieldLabel>Service Identifier (Handle)</FieldLabel>
            <Input
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="e.g. my-custom-analytics"
            />
            <span className="text-[11px] text-neutral-content-muted">
              Used as the service ID/key. Must be alphanumeric with dashes or
              underscores.
            </span>
          </Field>

          <Field>
            <FieldLabel>Description</FieldLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does this service do?"
              rows={3}
            />
          </Field>
        </div>
      </ContentBody>

      <ContentFooter>
        <div className="flex justify-end gap-2">
          <Button onClick={() => goBack()}>Cancel</Button>
          <Button
            onClick={handleCreate}
            variant="primary"
            disabled={!name || !handle || isPending}
          >
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </ContentFooter>
    </Content>
  );
}
