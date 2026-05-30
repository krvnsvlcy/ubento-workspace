import { GoBack } from "../../go-back.js";
import {
  Button,
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
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { useRef } from "react";

interface ServiceDetailsFormProps {
  serviceId: string;
  imageUrl?: string;
  isUploadingImage: boolean;
  onUploadImage: (file: File) => void;
  name: string;
  setName: (val: string) => void;
  handle: string;
  setHandle: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  error: string;
  channels: any[];
  selectedChannelId: string;
  setSelectedChannelId: (val: string) => void;
  showCreateChannel: boolean;
  setShowCreateChannel: (val: boolean) => void;
  newChannelName: string;
  setNewChannelName: (val: string) => void;
  isCreatingChannel: boolean;
  handleCreateChannel: () => void;
}

export function ServiceDetailsForm({
  serviceId,
  imageUrl,
  isUploadingImage,
  onUploadImage,
  name,
  setName,
  handle,
  setHandle,
  description,
  setDescription,
  error,
  channels,
  selectedChannelId,
  setSelectedChannelId,
  showCreateChannel,
  setShowCreateChannel,
  newChannelName,
  setNewChannelName,
  isCreatingChannel,
  handleCreateChannel,
}: ServiceDetailsFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadImage(e.target.files[0]);
    }
  };

  return (
    <Content>
      <ContentHeader>
        <GoBack />
        <Heading>Edit Custom Service</Heading>
      </ContentHeader>

      <ContentBody paddingX={false} paddingY={false} className="overflow-hidden">
        <ScrollArea>
          <div className="flex-1 space-y-4 px-6 py-4">
            {error && (
              <div className="p-3 text-xs text-base bg-base/10 rounded-lg font-medium">
                {error}
              </div>
            )}

            <Field>
              <FieldLabel>Service Logo</FieldLabel>
              <div className="flex items-center gap-4">
                <div
                  onClick={() => !isUploadingImage && fileInputRef.current?.click()}
                  className="relative group flex items-center justify-center h-16 w-16 bg-surface/50 border border-dashed border-border/50 rounded-xl overflow-hidden cursor-pointer hover:border-border hover:bg-surface-hover/30 transition-all duration-200"
                >
                  {isUploadingImage ? (
                    <Loader2 className="h-6 w-6 text-base animate-spin" />
                  ) : imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Service Logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-content-muted group-hover:text-base transition-colors" />
                  )}
                  {!isUploadingImage && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-[10px] text-white font-medium">Change</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-content font-medium">
                    Upload new image
                  </span>
                  <span className="text-[10px] text-content-muted">
                    Supports PNG, JPG, or WEBP.
                  </span>
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

            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
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

            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does this service do?"
                rows={2}
              />
            </Field>

            <Field>
              <FieldLabel>Service Channel</FieldLabel>
              <select
                value={selectedChannelId}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "__new__") {
                    setShowCreateChannel(true);
                  } else {
                    setSelectedChannelId(val);
                  }
                }}
                className="w-full bg-surface/50 border border-border/30 rounded-lg px-2.5 py-1.5 text-sm text-content focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
              >
                <option value="">Select a channel...</option>
                {channels.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
                <option value="__new__" className="text-base font-semibold">
                  + Create New Channel...
                </option>
              </select>
            </Field>

            {showCreateChannel && (
              <div className="p-3 bg-surface-hover/20 border border-border/30 rounded-lg space-y-3">
                <Field>
                  <FieldLabel>New Channel Name</FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      value={newChannelName}
                      onChange={(e) => setNewChannelName(e.target.value)}
                      placeholder="e.g. beta, stable"
                      className="flex-1"
                    />
                    <Button
                      onClick={handleCreateChannel}
                      variant="primary"
                      size="sm"
                      disabled={isCreatingChannel || !newChannelName.trim()}
                    >
                      {isCreatingChannel ? "Creating..." : "Create"}
                    </Button>
                    <Button
                      onClick={() => {
                        setShowCreateChannel(false);
                        setNewChannelName("");
                      }}
                      variant="ghost"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </Field>
              </div>
            )}
          </div>
        </ScrollArea>
      </ContentBody>
    </Content>
  );
}
