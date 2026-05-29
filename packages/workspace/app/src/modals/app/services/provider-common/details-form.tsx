import {
  Button,
  Content,
  ContentBody,
  ContentHeader,
  Field,
  FieldLabel,
  Heading,
  ScrollArea,
  Textarea,
} from "@ubento/bento.arlo-core";
import { GoBack } from "../../go-back.js";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface ProviderDetailsFormProps {
  provider?: any;
  setTemplate: (val: "basic" | "apiKey" | "oauth2") => void;
  description: string;
  setDescription: (val: string) => void;
  error: string;
  imageFile?: File | null;
  onImageChange?: (file: File | null) => void;
  imageUrl?: string;
  isUploadingImage?: boolean;
  onUploadImage?: (file: File) => void;
}

export function ProviderDetailsForm({
  provider,
  setTemplate,
  description,
  setDescription,
  error,
  imageFile,
  onImageChange,
  imageUrl,
  isUploadingImage,
  onUploadImage,
}: ProviderDetailsFormProps) {
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
      if (provider && onUploadImage) {
        onUploadImage(e.target.files[0]);
      } else if (onImageChange) {
        onImageChange(e.target.files[0]);
      }
    }
  };

  return (
    <Content>
      <ContentHeader>
        <GoBack />
        <Heading>{provider ? "Edit Provider" : "Create Provider"}</Heading>
      </ContentHeader>

      <ContentBody
        paddingX={false}
        paddingY={false}
        className="overflow-hidden"
      >
        <ScrollArea>
          <div className="flex-1 space-y-4 px-6 py-4">
            {error && (
              <div className="p-3 text-xs text-destructive bg-destructive/10 rounded-lg font-medium">
                {error}
              </div>
            )}

            <Field>
              <FieldLabel>Provider Logo</FieldLabel>
              <div className="flex items-center gap-4">
                <div
                  onClick={() => !isUploadingImage && fileInputRef.current?.click()}
                  className="relative group flex items-center justify-center h-16 w-16 bg-neutral-surface/50 border border-dashed border-neutral-border/50 rounded-xl overflow-hidden cursor-pointer hover:border-accent hover:bg-neutral-surface-hover/30 transition-all duration-200"
                >
                  {isUploadingImage ? (
                    <Loader2 className="h-6 w-6 text-accent animate-spin" />
                  ) : previewUrl || imageUrl ? (
                    <img
                      src={previewUrl || imageUrl}
                      alt="Provider Logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-neutral-content-muted group-hover:text-accent transition-colors" />
                  )}
                  {!isUploadingImage && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-[10px] text-white font-medium">
                        {previewUrl || imageUrl ? "Change" : "Upload"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  {imageFile ? (
                    <>
                      <span className="text-xs text-neutral-content-subtle max-w-[150px] truncate">
                        {imageFile.name}
                      </span>
                      {onImageChange && (
                        <button
                          type="button"
                          onClick={() => onImageChange(null)}
                          className="text-[11px] text-destructive hover:underline text-left font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="text-xs text-neutral-content font-medium font-semibold">
                        Upload Logo
                      </span>
                      <span className="text-[10px] text-neutral-content-muted">
                        Supports PNG, JPG, or WEBP.
                      </span>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  disabled={isUploadingImage}
                />
              </div>
            </Field>

            {!provider && (
              <Field>
                <FieldLabel>Auth Method Template</FieldLabel>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTemplate("apiKey")}
                    className="text-xs font-semibold"
                  >
                    API Key
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTemplate("oauth2")}
                    className="text-xs font-semibold"
                  >
                    OAuth 2.0
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTemplate("basic")}
                    className="text-xs font-semibold"
                  >
                    Basic Auth
                  </Button>
                </div>
              </Field>
            )}

            <Field>
              <FieldLabel>Description (Optional)</FieldLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. My custom API connection provider"
                rows={4}
              />
            </Field>
          </div>
        </ScrollArea>
      </ContentBody>
    </Content>
  );
}
