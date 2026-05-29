import { useSession } from "@/contexts/session";
import { useUbento } from "@/hooks/app-engine";
import { useAppModal } from "@/modals/app/hook.js";
import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import {
  PendingView,
  RailLayout,
  RailLayoutMain,
  RailLayoutSide,
} from "@ubento/bento.arlo-core";
import { useState, useEffect } from "react";
import { parse as parseYaml } from "yaml";
import { ServiceDetailsForm } from "./details-form.js";
import { ServiceSpecEditor } from "./spec-editor.js";

// Inner component — all hooks are unconditional here
function EditServiceContent({ service }: { service: any }) {
  const session = useSession();
  const ubento = useUbento();
  const { goBack } = useAppModal();

  const [name, setName] = useState(service.name || "");
  const [handle, setHandle] = useState(service.handle || "");
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

  // Raw editable Spec state
  const [specText, setSpecText] = useState("");

  // Subscriptions & Queries
  const { data: channels = [] } =
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
  const { mutate: uploadServiceImage, isPending: isUploadingImage } =
    ubento.vertex.useUploadServiceImage();

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
          name: handle || "custom-service",
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
          handle: trimmedHandle,
          name: name.trim(),
          description: description.trim(),
        },
      },
      {
        onSuccess: () => {
          // 2. If spec config was generated/loaded, upload it to the selected channel!
          if (selectedChannelId && parsedSpec) {
            uploadSpec(
              {
                serviceChannelId: selectedChannelId,
                spec: parsedSpec,
              },
              {
                onSuccess: () => {
                  goBack();
                },
                onError: (err: any) => {
                  setError(
                    err.message || "Failed to upload channel specification.",
                  );
                },
              },
            );
          } else {
            goBack();
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
    <RailLayout>
      <RailLayoutSide style={{ width: "33%" }}>
        <ServiceDetailsForm
          serviceId={service.id}
          imageUrl={service.image_url}
          isUploadingImage={isUploadingImage}
          onUploadImage={(file) =>
            uploadServiceImage({ serviceId: service.id, file })
          }
          name={name}
          setName={setName}
          handle={handle}
          setHandle={setHandle}
          description={description}
          setDescription={setDescription}
          error={error}
          channels={channels}
          selectedChannelId={selectedChannelId}
          setSelectedChannelId={setSelectedChannelId}
          showCreateChannel={showCreateChannel}
          setShowCreateChannel={setShowCreateChannel}
          newChannelName={newChannelName}
          setNewChannelName={setNewChannelName}
          isCreatingChannel={isCreatingChannel}
          handleCreateChannel={handleCreateChannel}
        />
      </RailLayoutSide>
      <RailLayoutMain>
        <ServiceSpecEditor
          specText={specText}
          setSpecText={setSpecText}
          importMode={importMode}
          setImportMode={setImportMode}
          specUrl={specUrl}
          setSpecUrl={setSpecUrl}
          fetchingSpec={fetchingSpec}
          specError={specError}
          setSpecError={setSpecError}
          selectedProviderId={selectedProviderId}
          setSelectedProviderId={setSelectedProviderId}
          handleFetchAndGenerate={handleFetchAndGenerate}
          handleSave={handleSave}
          isPending={isPending}
          saveDisabled={!name || !handle || isPending || isUploadingSpec}
        />
      </RailLayoutMain>
    </RailLayout>
  );
}

// Outer wrapper — handles loading, then delegates to content component
export function EditServiceModal() {
  const ubento = useUbento();
  const { params } = useAppModal();
  const serviceId = params.serviceId || "";
  const { data: service, isLoading } = ubento.vertex.useService(serviceId);

  if (isLoading || !service) return <PendingView message="Service" />;

  return <EditServiceContent service={service} />;
}
