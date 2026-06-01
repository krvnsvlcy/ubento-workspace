import { useSession } from "@/contexts/session";
import { useUbento } from "@/hooks/app-engine";
import { useModalInstance } from "@/utils/modal-store.js";
import { useAppModal } from "@/modals/app/hook.js";
import {
  AlertModalContainer,
  Button,
  Field,
  FieldError,
  FieldLabel,
  Heading,
  Input,
  ScrollArea,
  Textarea,
} from "@ubento/bento.arlo-core";
import { Check, Image as ImageIcon, Loader2 } from "lucide-react";
import React, { useRef, useState } from "react";

interface CreateCollectionFormProps {
  onClose: () => void;
  onComplete?: () => void;
  isRouted?: boolean;
}

export function CreateCollectionForm({ onClose, onComplete, isRouted = false }: CreateCollectionFormProps) {
  const session = useSession();
  const teamId = session.teamId;
  const ubento = useUbento();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [scope, setScope] = useState<"public" | "private">("private");
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all modules in this team to associate
  const { data: modulesData, isFetching: isFetchingModules } = ubento.module.useModules({
    team_id: teamId,
  });

  const modules = modulesData ?? [];

  // Mutations
  const { mutateAsync: createCollection } = ubento.module.useCreateModuleCollection();
  const { mutateAsync: uploadCoverImage } = ubento.module.useUploadCollectionCoverImage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const toggleModule = (id: string) => {
    setSelectedModuleIds((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Create collection first
      const newCollection = await createCollection({
        team_id: teamId,
        name: name.trim(),
        summary: summary.trim() || undefined,
        scope,
        module_ids: selectedModuleIds,
      });

      // 2. Upload cover image if selected
      if (imageFile && newCollection?.id) {
        await uploadCoverImage({
          collectionId: newCollection.id,
          file: imageFile,
        });
      }

      onComplete?.();
      onClose();
    } catch (err: any) {
      console.error("Error creating collection:", err);
      setError(err?.message || "Failed to create collection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <>
      {/* Header */}
      <div className="px-8 py-6 border-b border-border/30 shrink-0">
        <Heading>Create Module Collection</Heading>
        <p className="text-xs text-content-muted mt-1">
          Group modules into a collection with custom cover art and metadata.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 min-h-0 flex flex-col">
        <ScrollArea className="flex-1">
          <div className="px-8 py-6 space-y-5">
            {error && <FieldError>{error}</FieldError>}

            {/* Cover Image Upload */}
            <Field>
              <FieldLabel>Cover Image</FieldLabel>
              <div className="flex items-center gap-4">
                <div
                  onClick={() => !isSubmitting && fileInputRef.current?.click()}
                  className="relative group flex items-center justify-center h-20 w-36 bg-surface/50 border border-dashed border-border/50 rounded-xl overflow-hidden cursor-pointer hover:border-border hover:bg-surface-hover/30 transition-all duration-200 shrink-0"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-content-muted group-hover:text-base transition-colors" />
                  )}
                  {!isSubmitting && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-xs text-white font-medium">Upload</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-content font-medium">
                    Upload Cover Image
                  </span>
                  <span className="text-[10px] text-content-muted">
                    Supports PNG, JPG, or WEBP. Aspect ratio 16:9 recommended.
                  </span>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  disabled={isSubmitting}
                />
              </div>
            </Field>

            {/* Collection Name */}
            <Field>
              <FieldLabel>Collection Name</FieldLabel>
              <Input
                placeholder="e.g. Data Utilities, Auth Modules"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </Field>

            {/* Summary */}
            <Field>
              <FieldLabel>Summary</FieldLabel>
              <Textarea
                placeholder="Brief description of the collection..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={2}
                disabled={isSubmitting}
              />
            </Field>

            {/* Scope / Visibility */}
            <Field>
              <FieldLabel>Visibility</FieldLabel>
              <select
                value={scope}
                onChange={(e) => setScope(e.target.value as "public" | "private")}
                className="w-full bg-surface/50 border border-border/30 rounded-lg px-2.5 py-1.5 text-sm text-content focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
                disabled={isSubmitting}
              >
                <option value="private">Private (Team members only)</option>
                <option value="public">Public (Visible to everyone)</option>
              </select>
            </Field>

            {/* Module Checklist (with custom ScrollArea container) */}
            <div className="space-y-2">
              <FieldLabel>Associate Modules</FieldLabel>
              <div className="border border-border/35 rounded-2xl overflow-hidden bg-surface/30">
                <ScrollArea className="max-h-[160px]">
                  {isFetchingModules && (
                    <div className="py-6 text-center text-xs text-content-muted flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      Loading team modules...
                    </div>
                  )}
                  {!isFetchingModules && modules.length === 0 && (
                    <div className="py-6 text-center text-xs text-content-muted">
                      No modules found in this team.
                    </div>
                  )}
                  {!isFetchingModules && modules.length > 0 && (
                    <div className="divide-y divide-border/20">
                      {modules.map((mod: any) => {
                        const isChecked = selectedModuleIds.includes(mod.id);
                        return (
                          <div
                            key={mod.id}
                            onClick={() => !isSubmitting && toggleModule(mod.id)}
                            className="flex items-center justify-between px-4 py-3 hover:bg-surface-hover/30 cursor-pointer transition-colors select-none"
                          >
                            <div>
                              <p className="text-xs font-bold text-content">{mod.name}</p>
                              <p className="text-[10px] text-content-muted">
                                {mod.type || "module"} • {mod.scope}
                              </p>
                            </div>
                            <div
                              className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all ${
                                isChecked
                                  ? "bg-primary border-primary text-white"
                                  : "border-border/60 bg-transparent"
                              }`}
                            >
                              {isChecked && <Check className="h-3 w-3" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-border/30 flex justify-end gap-2 bg-surface/20 shrink-0">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            loadingText="Creating..."
            disabled={isSubmitting || !name.trim()}
          >
            Create
          </Button>
        </div>
      </form>
    </>
  );

  if (isRouted) {
    return <div className="flex flex-col h-full flex-1 min-h-0 bg-background">{formContent}</div>;
  }

  return (
    <AlertModalContainer className="flex flex-col w-[580px] max-h-[85vh]">
      {formContent}
    </AlertModalContainer>
  );
}

interface CreateCollectionModalProps {
  onComplete?: () => void;
}

export function CreateCollectionModal({ onComplete }: CreateCollectionModalProps) {
  const { close } = useModalInstance();
  return <CreateCollectionForm onClose={close} onComplete={onComplete} isRouted={false} />;
}

export function CreateCollectionPage() {
  const { goBack } = useAppModal();
  return <CreateCollectionForm onClose={goBack} isRouted={true} />;
}
