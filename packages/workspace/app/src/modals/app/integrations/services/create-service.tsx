import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
import { useModal } from "@/utils/modal-store";
import { PrimitiveButton as Button, Content, ContentBody, ContentFooter, ContentHeader, Field, FieldLabel, Heading, PrimitiveInput as Input, Textarea } from "@ubento/bento.arlo-core";
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
  const { close } = useModal();

  const [displayName, setDisplayName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const { mutate: createService, isPending } = ubento.vertex.useCreateService();

  const handleDisplayNameChange = (value: string) => {
    setDisplayName(value);
    setName(slugify(value));
  };

  const handleCreate = () => {
    setError("");
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Service name/identifier is required.");
      return;
    }
    if (!/^[a-z0-9-_]+$/.test(trimmedName)) {
      setError(
        "Service name must only contain lowercase letters, numbers, hyphens, and underscores.",
      );
      return;
    }

    createService(
      {
        team_id: session.teamId,
        scope: "team", // standard scope for custom team services
        name: trimmedName,
        display_name: displayName.trim(),
        description: description.trim(),
      },
      {
        onSuccess: (createdService: any) => {
          close(createdService); // resolve the modal promise with the new service object!
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
          <FieldLabel>Display Name</FieldLabel>
          <Input
            value={displayName}
            onChange={(e) => handleDisplayNameChange(e.target.value)}
            placeholder="e.g. My Custom Analytics"
            autoFocus
          />
        </Field>

        <Field>
          <FieldLabel>Service Identifier (Name)</FieldLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <Button onClick={() => close(null)} variant="ghost" size="sm">
          Cancel
        </Button>
        <Button
          onClick={handleCreate}
          variant="primary"
          size="sm"
          disabled={!displayName || !name || isPending}
        >
          {isPending ? "Creating..." : "Create"}
        </Button>
      </ContentFooter>
    </Content>
  );
}
