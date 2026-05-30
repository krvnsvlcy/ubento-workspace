import { GoBack } from "../../go-back.js";
import { ProviderSelector } from "./provider-selector.js";
import {
  Content,
  ContentBody,
  ContentHeader,
  Field,
  FieldLabel,
  Heading,
  Input,
  ScrollArea,
  Textarea,
} from "@ubento/bento.arlo-core";
import { Image as ImageIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface ServiceDetailsFormProps {
  name: string;
  handleNameChange: (value: string) => void;
  handle: string;
  setHandle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  error: string;
  selectedProviderId: string;
  setSelectedProviderId: (id: string) => void;
  imageFile: File | null;
  onImageChange: (file: File | null) => void;
}

export function ServiceDetailsForm({
  name,
  handleNameChange,
  handle,
  setHandle,
  description,
  setDescription,
  error,
  selectedProviderId,
  setSelectedProviderId,
  imageFile,
  onImageChange,
}: ServiceDetailsFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <Content>
      <ContentHeader>
        <GoBack />
        <Heading>Create Service</Heading>
      </ContentHeader>

      <ContentBody paddingX={false} paddingY={false} className="overflow-hidden">
        <ScrollArea>
          <div className="flex-1 space-y-4 border-border/30 px-6 py-4">
            {error && (
              <div className="p-3 text-xs text-base bg-base/10 rounded-lg font-medium">
                {error}
              </div>
            )}

            <Field>
              <FieldLabel>Service Logo</FieldLabel>
              <div className="flex items-center gap-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative group flex items-center justify-center h-16 w-16 bg-surface/50 border border-dashed border-border/50 rounded-xl overflow-hidden cursor-pointer hover:border-border hover:bg-surface-hover/30 transition-all duration-200"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Logo preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-content-muted group-hover:text-base transition-colors" />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-[10px] text-white font-medium">Upload</span>
                  </div>
                </div>
                {imageFile && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-content-subtle max-w-[150px] truncate">
                      {imageFile.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => onImageChange(null)}
                      className="text-[11px] text-base hover:underline text-left font-medium"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </Field>

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
              <span className="text-[11px] text-content-muted">
                Used as the service ID/key. Must be alphanumeric with dashes or
                underscores.
              </span>
            </Field>

            <ProviderSelector
              selectedProviderId={selectedProviderId}
              setSelectedProviderId={setSelectedProviderId}
            />

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
        </ScrollArea>
      </ContentBody>
    </Content>
  );
}
