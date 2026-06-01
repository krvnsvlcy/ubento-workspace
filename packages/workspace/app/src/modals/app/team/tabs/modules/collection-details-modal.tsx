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
import { Image as ImageIcon, Loader2, Check, Edit2, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface CollectionDetailsFormProps {
  collectionId: string;
  onClose: () => void;
  onComplete?: () => void;
  isRouted?: boolean;
}

export function CollectionDetailsForm({
  collectionId,
  onClose,
  onComplete,
  isRouted = false,
}: CollectionDetailsFormProps) {
  const session = useSession();
  const teamId = session.teamId;
  const ubento = useUbento();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Read-only / Edit toggle
  const [isEditing, setIsEditing] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [scope, setScope] = useState<"public" | "private">("private");
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Queries
  const { data: collection, isLoading: isLoadingCollection } =
    ubento.module.useModuleCollection(collectionId, { enabled: !!collectionId });

  const { data: modules, isFetching: isFetchingModules } = ubento.module.useModules({
    team_id: teamId,
  });
  const allModules = modules ?? [];

  // Reset form states when collection data loads
  useEffect(() => {
    if (collection) {
      setName(collection.name);
      setSummary(collection.summary || "");
      setScope(collection.scope);
      setSelectedModuleIds(collection.module_ids || []);
      setImagePreview((collection as any).cover_url || null);
    }
  }, [collection]);

  // Mutations
  const { mutateAsync: updateCollection } = ubento.module.useUpdateModuleCollection();
  const { mutateAsync: uploadCoverImage } = ubento.module.useUploadCollectionCoverImage();
  const { mutateAsync: deleteCollection } = ubento.module.useDeleteModuleCollection();

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

  const handleUpdate = async () => {
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Update text metadata & module associations
      await updateCollection({
        collectionId,
        data: {
          name: name.trim(),
          summary: summary.trim() || null,
          scope,
          module_ids: selectedModuleIds,
        },
      });

      // 2. Upload image if a new one was selected
      if (imageFile) {
        await uploadCoverImage({
          collectionId,
          file: imageFile,
        });
      }

      onComplete?.();
      setIsEditing(false);
      setImageFile(null);
    } catch (err: any) {
      console.error("Error updating collection:", err);
      setError(err?.message || "Failed to update collection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this collection?")) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await deleteCollection(collectionId);
      onComplete?.();
      onClose();
    } catch (err: any) {
      console.error("Error deleting collection:", err);
      setError(err?.message || "Failed to delete collection.");
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    if (collection) {
      setName(collection.name);
      setSummary(collection.summary || "");
      setScope(collection.scope);
      setSelectedModuleIds(collection.module_ids || []);
      setImagePreview((collection as any).cover_url || null);
    }
    setImageFile(null);
    setError(null);
    setIsEditing(false);
  };

  if (isLoadingCollection) {
    const loadingContent = (
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-6 w-6 text-primary animate-spin" />
        <span className="text-xs text-content-muted">Loading collection details...</span>
      </div>
    );

    if (isRouted) {
      return (
        <div className="flex items-center justify-center h-full flex-1 min-h-0 bg-background">
          {loadingContent}
        </div>
      );
    }

    return (
      <AlertModalContainer className="flex items-center justify-center h-48 w-96">
        {loadingContent}
      </AlertModalContainer>
    );
  }

  // Filter modules in read-only view to only show associated ones
  const associatedModules = allModules.filter((mod: any) =>
    (collection?.module_ids || []).includes(mod.id),
  );

  const formContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-border/30 shrink-0">
        <div>
          <Heading>{isEditing ? "Edit Collection" : name}</Heading>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] uppercase font-black tracking-widest text-primary">
              {scope}
            </span>
            <span className="text-[10px] text-content-muted">•</span>
            <span className="text-[10px] text-content-muted">
              {collection?.module_ids?.length || 0} Modules
            </span>
          </div>
        </div>
        {!isEditing && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5"
          >
            <Edit2 className="h-3 w-3" />
            Edit
          </Button>
        )}
      </div>

      {isEditing ? (
        /* EDIT MODE FORM */
        <div className="flex-1 min-h-0 flex flex-col">
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
                      Change Cover Image
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

              {/* Name */}
              <Field>
                <FieldLabel>Collection Name</FieldLabel>
                <Input
                  placeholder="Collection name"
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

              {/* Scope */}
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

              {/* Associated Modules (Checklist) */}
              <div className="space-y-2">
                <FieldLabel>Associate Modules</FieldLabel>
                <div className="border border-border/35 rounded-2xl overflow-hidden bg-surface/30">
                  <ScrollArea className="max-h-[160px]">
                    {isFetchingModules && (
                      <div className="py-6 text-center text-xs text-content-muted">
                        Loading team modules...
                      </div>
                    )}
                    {!isFetchingModules && allModules.length === 0 && (
                      <div className="py-6 text-center text-xs text-content-muted">
                        No modules found in this team.
                      </div>
                    )}
                    {!isFetchingModules && allModules.length > 0 && (
                      <div className="divide-y divide-border/20">
                        {allModules.map((mod: any) => {
                          const isChecked = selectedModuleIds.includes(mod.id);
                          return (
                            <div
                              key={mod.id}
                              onClick={() => !isSubmitting && toggleModule(mod.id)}
                              className="flex items-center justify-between px-4 py-3 hover:bg-surface-hover/30 cursor-pointer transition-colors select-none"
                            >
                              <div>
                                <p className="text-xs font-bold text-content">
                                  {mod.name}
                                </p>
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

          {/* Edit Mode Footer */}
          <div className="px-8 py-5 border-t border-border/30 flex items-center justify-between bg-surface/20 shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleDelete}
              disabled={isSubmitting}
              className="text-red-500 border-red-500/20 hover:bg-red-500/10 hover:text-red-600 flex items-center gap-1.5"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancelEdit}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                isLoading={isSubmitting}
                loadingText="Updating..."
                disabled={isSubmitting || !name.trim()}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* READ-ONLY MODE VIEW */
        <div className="flex-1 min-h-0 flex flex-col">
          <ScrollArea className="flex-1">
            <div className="px-8 py-6 space-y-6">
              {/* Cover display */}
              {(collection as any)?.cover_url && (
                <div className="w-full h-40 rounded-2xl overflow-hidden border border-border/30 shadow-inner">
                  <img
                    src={(collection as any).cover_url}
                    alt="Collection Cover"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Description */}
              {collection?.summary && (
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-content-subtle">
                    Description
                  </span>
                  <p className="text-xs text-content leading-relaxed">
                    {collection.summary}
                  </p>
                </div>
              )}

              {/* Associated Modules List (Read-Only) */}
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-content-subtle">
                  Collection Modules
                </span>
                <div className="border border-border/35 rounded-2xl bg-surface/30 divide-y divide-border/20 max-h-[220px] overflow-hidden">
                  <ScrollArea className="max-h-[220px]">
                    {associatedModules.length === 0 ? (
                      <div className="py-8 text-center text-xs text-content-muted">
                        No modules in this collection.
                      </div>
                    ) : (
                      associatedModules.map((mod: any) => (
                        <div
                          key={mod.id}
                          className="flex items-center justify-between px-4 py-3"
                        >
                          <div>
                            <p className="text-xs font-bold text-content">
                              {mod.name}
                            </p>
                            <p className="text-[10px] text-content-muted">
                              {mod.type || "module"}
                            </p>
                          </div>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-surface-hover border border-border/40 text-content-muted">
                            {mod.scope}
                          </span>
                        </div>
                      ))
                    )}
                  </ScrollArea>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Read Only Mode Footer */}
          <div className="px-8 py-5 border-t border-border/30 flex justify-end bg-surface/20 shrink-0">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="w-32"
            >
              Close
            </Button>
          </div>
        </div>
      )}
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

interface CollectionDetailsModalProps {
  collectionId: string;
  onComplete?: () => void;
}

export function CollectionDetailsModal({
  collectionId,
  onComplete,
}: CollectionDetailsModalProps) {
  const { close } = useModalInstance();
  return (
    <CollectionDetailsForm
      collectionId={collectionId}
      onClose={close}
      onComplete={onComplete}
      isRouted={false}
    />
  );
}

export function CollectionDetailsPage() {
  const { params, goBack } = useAppModal();
  const collectionId = params.collectionId || "";
  return (
    <CollectionDetailsForm
      collectionId={collectionId}
      onClose={goBack}
      isRouted={true}
    />
  );
}
