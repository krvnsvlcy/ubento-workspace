import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
import { useModal } from "@/utils/modal-store";
import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
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
import { useState, useEffect } from "react";
import { parse as parseYaml } from "yaml";
import { CreateProviderModal } from "./create-provider-modal";

export function EditServiceModal({ service }: { service: any }) {
  const session = useSession();
  const ubento = useUbento();
  const { close, open } = useModal();

  const [displayName, setDisplayName] = useState(service.display_name || "");
  const [name, setName] = useState(service.name || "");
  const [description, setDescription] = useState(service.description || "");
  const [error, setError] = useState("");

  // Channel State
  const [selectedChannelId, setSelectedChannelId] = useState("");
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");

  // OpenAPI Import State
  const [importMode, setImportMode] = useState(false);
  const initialProvider = service.config?.connection?.provider || "";
  const [selectedProviderId, setSelectedProviderId] = useState(initialProvider);
  const [specUrl, setSpecUrl] = useState("");
  const [fetchingSpec, setFetchingSpec] = useState(false);
  const [specError, setSpecError] = useState("");

  // Autocomplete state
  const [providerSearch, setProviderSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Raw editable Spec state
  const [specText, setSpecText] = useState("");

  // Subscriptions & Queries
  const { data: providers = [] } = ubento.vertex.useConnectionProviders();
  const { data: channels = [], isLoading: isLoadingChannels } =
    ubento.vertex.useServiceChannels(service.id);
  const { data: channelSpec } = ubento.vertex.useServiceChannelSpec(
    selectedChannelId,
    { enabled: !!selectedChannelId },
  );

  // Mutations
  const { mutate: updateService, isPending } = ubento.vertex.useUpdateService();
  const { mutate: createChannel, isPending: isCreatingChannel } =
    ubento.vertex.useCreateServiceChannel();
  const { mutate: uploadSpec, isPending: isUploadingSpec } =
    ubento.vertex.useUploadServiceChannelSpec();

  // Effects
  useEffect(() => {
    if (channels && channels.length > 0 && !selectedChannelId) {
      setSelectedChannelId(channels[0].id);
    }
  }, [channels, selectedChannelId]);

  useEffect(() => {
    if (channelSpec) {
      setSpecText(JSON.stringify(channelSpec, null, 2));
    } else {
      setSpecText("");
    }
  }, [channelSpec]);

  useEffect(() => {
    if (providers && providers.length > 0 && initialProvider) {
      const found = providers.find((p: any) => p.id === initialProvider);
      if (found) {
        setProviderSearch(found.name || found.id);
      }
    }
  }, [providers, initialProvider]);

  const filteredProviders = providers.filter((p: any) =>
    (p.name || p.id).toLowerCase().includes(providerSearch.toLowerCase()),
  );

  const handleCreateChannel = () => {
    const trimmed = newChannelName.trim();
    if (!trimmed) return;
    createChannel(
      {
        serviceId: service.id,
        data: {
          team_id: session.teamId || service.team_id,
          name: trimmed,
        },
      },
      {
        onSuccess: (newChan: any) => {
          setSelectedChannelId(newChan.id);
          setShowCreateChannel(false);
          setNewChannelName("");
        },
        onError: (err: any) => {
          setError(err.message || "Failed to create channel.");
        },
      },
    );
  };

  const handleFetchAndGenerate = async () => {
    if (!specUrl) {
      setSpecError("Please enter an OpenAPI Spec URL.");
      return;
    }
    if (!selectedProviderId) {
      setSpecError("Please select a Connection Provider.");
      return;
    }

    setFetchingSpec(true);
    setSpecError("");

    try {
      const res = await fetch(specUrl);
      if (!res.ok) {
        throw new Error(`Failed to fetch spec (Status: ${res.status})`);
      }
      const rawText = await res.text();
      let openapiObj: any;

      // Attempt JSON parsing first, fall back to YAML
      try {
        openapiObj = JSON.parse(rawText);
      } catch {
        try {
          openapiObj = parseYaml(rawText);
        } catch {
          throw new Error("Could not parse file as JSON or YAML.");
        }
      }

      if (!openapiObj || typeof openapiObj !== "object") {
        throw new Error("Invalid OpenAPI specification.");
      }

      // Generate service spec config
      const spec = generateServiceSpecFromOpenApi({
        openapi: openapiObj,
        template: {
          name: name || "custom-service",
          connection: {
            provider: selectedProviderId,
            baseUrl: openapiObj.servers?.[0]?.url || "https://api.example.com",
          },
          discover: true,
        },
      });

      setSpecText(JSON.stringify(spec, null, 2));
      setImportMode(false);
      setSpecError("");
    } catch (err: any) {
      setSpecError(
        err.message || "Failed to generate configuration from OpenAPI spec.",
      );
    } finally {
      setFetchingSpec(false);
    }
  };

  const handleSave = () => {
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

    let parsedSpec = null;
    if (specText.trim()) {
      try {
        parsedSpec = JSON.parse(specText);
      } catch {
        setError("Service specification is not valid JSON.");
        return;
      }
    }

    // 1. Update the service record
    updateService(
      {
        serviceId: service.id,
        data: {
          name: trimmedName,
          display_name: displayName.trim(),
          description: description.trim(),
        },
      },
      {
        onSuccess: (updatedService: any) => {
          // 2. If spec config was generated/loaded, upload it to the selected channel!
          if (selectedChannelId && parsedSpec) {
            uploadSpec(
              {
                serviceChannelId: selectedChannelId,
                spec: parsedSpec,
              },
              {
                onSuccess: () => {
                  close(updatedService);
                },
                onError: (err: any) => {
                  setError(
                    err.message || "Failed to upload channel specification.",
                  );
                },
              },
            );
          } else {
            close(updatedService);
          }
        },
        onError: (err: any) => {
          setError(
            err.message || "Failed to update custom service. Please try again.",
          );
        },
      },
    );
  };

  return (
    <Content className="w-[950px] max-w-[95vw]">
      <ContentHeader>
        <Heading className="text-lg font-bold">Edit Custom Service</Heading>
      </ContentHeader>

      <ContentBody className="space-y-0 p-0 h-[480px]">
        <div className="flex gap-6 h-full p-6">
          {/* Left Side: Form */}
          <div className="flex-1 space-y-4 pr-3 border-r border-neutral-border/30 overflow-y-auto">
            {error && (
              <div className="p-3 text-xs text-destructive bg-destructive/10 rounded-lg font-medium">
                {error}
              </div>
            )}

            <Field>
              <FieldLabel>Display Name</FieldLabel>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
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
                className="w-full bg-neutral-surface/50 border border-neutral-border/30 rounded-lg px-2.5 py-1.5 text-sm text-neutral-content focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
              >
                <option value="">Select a channel...</option>
                {channels.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
                <option value="__new__" className="text-accent font-semibold">
                  + Create New Channel...
                </option>
              </select>
            </Field>

            {showCreateChannel && (
              <div className="p-3 bg-neutral-surface-hover/20 border border-neutral-border/30 rounded-lg space-y-3">
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

          {/* Right Side: Specification / Import */}
          {importMode ? (
            <div className="flex-1 flex flex-col h-full pl-3 justify-between">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-neutral-content">
                  Import OpenAPI Specification
                </h3>

                <Field className="relative">
                  <FieldLabel>Connection Provider</FieldLabel>
                  <Input
                    value={providerSearch}
                    onChange={(e) => {
                      setProviderSearch(e.target.value);
                      setShowSuggestions(true);
                      const matched = providers.find(
                        (p: any) =>
                          (p.name || p.id).toLowerCase() ===
                          e.target.value.toLowerCase(),
                      );
                      if (matched) {
                        setSelectedProviderId(matched.id);
                      } else {
                        setSelectedProviderId("");
                      }
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => {
                      setTimeout(() => setShowSuggestions(false), 200);
                    }}
                    placeholder="Search or select connection provider..."
                    className="w-full"
                  />

                  {showSuggestions && (
                    <div className="absolute z-[100] top-full left-0 right-0 mt-1 max-h-[180px] overflow-y-auto bg-neutral-surface border border-neutral-border/30 rounded-lg shadow-xl py-1">
                      {filteredProviders.length > 0 ? (
                        filteredProviders.map((p: any) => (
                          <div
                            key={p.id}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setSelectedProviderId(p.id);
                              setProviderSearch(p.name || p.id);
                              setShowSuggestions(false);
                            }}
                            className={`px-3 py-1.5 text-xs text-neutral-content hover:bg-neutral-surface-hover cursor-pointer flex justify-between items-center ${
                              selectedProviderId === p.id
                                ? "bg-neutral-surface-hover/60 text-accent font-medium"
                                : ""
                            }`}
                          >
                            <span>{p.name || p.id}</span>
                            <span className="text-[9px] text-neutral-content-muted uppercase font-mono px-1 bg-neutral-surface-hover rounded">
                              {p.type}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="px-3 py-1.5 text-xs text-neutral-content-muted italic">
                          No providers found
                        </div>
                      )}

                      <div
                        onMouseDown={async (e) => {
                          e.preventDefault();
                          setShowSuggestions(false);
                          const newProvider: any = await open(CreateProviderModal);
                          if (newProvider) {
                            setSelectedProviderId(newProvider.id);
                            setProviderSearch(newProvider.name || newProvider.id);
                          }
                        }}
                        className="border-t border-neutral-border/20 mt-1 px-3 py-1.5 text-xs text-accent font-medium hover:bg-neutral-surface-hover cursor-pointer flex items-center gap-1.5"
                      >
                        ⚡ Create new provider...
                      </div>
                    </div>
                  )}
                </Field>

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
              </div>

              <div className="flex justify-end gap-2 border-t border-neutral-border/30 pt-4">
                <Button
                  onClick={() => {
                    setImportMode(false);
                    setSpecError("");
                  }}
                  variant="ghost"
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleFetchAndGenerate}
                  variant="primary"
                  size="sm"
                  disabled={fetchingSpec || !specUrl || !selectedProviderId}
                >
                  {fetchingSpec ? "Fetching..." : "Generate & Import"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col h-full pl-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-neutral-content">
                  Service Specification
                </h3>
                <Button
                  onClick={() => {
                    setImportMode(true);
                    setSpecError("");
                  }}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 px-2.5 py-0"
                >
                  Import from OpenAPI Spec
                </Button>
              </div>

              <div className="flex-1 flex flex-col min-h-[300px]">
                <textarea
                  value={specText}
                  onChange={(e) => setSpecText(e.target.value)}
                  placeholder="No specification defined yet. Paste raw JSON here or click Import to generate one."
                  className="flex-1 w-full font-mono text-[11px] bg-neutral-surface border border-neutral-border/30 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-accent resize-none text-neutral-content"
                />
              </div>
            </div>
          )}
        </div>
      </ContentBody>

      <ContentFooter className="flex justify-end gap-2 border-t border-neutral-border/30 pt-5 space-y-0">
        <Button onClick={() => close(null)} variant="ghost" size="sm">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="primary"
          size="sm"
          disabled={!displayName || !name || isPending || isUploadingSpec}
        >
          {isPending || isUploadingSpec ? "Saving..." : "Save Changes"}
        </Button>
      </ContentFooter>
    </Content>
  );
}
