import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
import { useAppModal } from "@/modals/app/hook.js";
import { Button, Content, ContentBody, ContentFooter, ContentHeader, Field, FieldLabel, Heading, Input, Textarea } from "@ubento/bento.arlo-core";
import { useState } from "react";

// Helper function to slugify display name into a clean, machine-readable name
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove special chars
    .replace(/[\s_]+/g, "-") // replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
}

export function CreateServiceModal() {
  const ubento = useUbento();
  const session = useSession();
  const { goBack } = useAppModal();

  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const { mutate: createService, isPending } = ubento.vertex.useCreateService();

  const handleNameChange = (value: string) => {
    setName(value);
    setHandle(slugify(value));
  };

  const handleCreate = () => {
    setError("");
    const trimmedHandle = handle.trim();
    if (!trimmedHandle) {
      setError("Service identifier is required.");
      return;
    }
    if (!/^[a-z0-9-_]+$/.test(trimmedHandle)) {
      setError(
        "Service identifier must only contain lowercase letters, numbers, hyphens, and underscores.",
      );
      return;
    }

    createService(
      {
        team_id: session.teamId,
        scope: "team", // standard scope for custom team services
        handle: trimmedHandle,
        name: name.trim(),
        description: description.trim(),
      },
      {
        onSuccess: (createdService: any) => {
          goBack();
        },
        onError: (err: any) => {
          setError(
            err.message || "Failed to create custom service. Please try again.",
          );
        },
      },
    );
  };

  return (
    <Content className="w-[450px]">
      <ContentHeader>
        <Heading className="text-lg font-bold">Create Custom Service</Heading>
      </ContentHeader>

      <ContentBody className="space-y-4">
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
      </ContentBody>

      <ContentFooter className="flex justify-end gap-2 border-t border-neutral-border/30 pt-5 space-y-0">
        <Button onClick={() => goBack()} variant="ghost" size="sm">
          Cancel
        </Button>
        <Button
          onClick={handleCreate}
          variant="primary"
          size="sm"
          disabled={!name || !handle || isPending}
        >
          {isPending ? "Creating..." : "Create"}
        </Button>
      </ContentFooter>
    </Content>
  );
}
