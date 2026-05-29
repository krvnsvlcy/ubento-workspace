import { useSession } from "@/contexts/session";
import { useUbento } from "@/hooks/app-engine";
import { useAppModal } from "@/modals/app/hook.js";
import {
  RailLayout,
  RailLayoutMain,
  RailLayoutSide,
} from "@ubento/bento.arlo-core";
import { useState } from "react";
import { ServiceDetailsForm } from "./details-form.js";
import { ServiceSpecEditor } from "./spec-editor.js";

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
  const [specText, setSpecText] = useState("");
  const [selectedProviderId, setSelectedProviderId] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Mutations
  const { mutate: createService, isPending: isCreatingService } =
    ubento.vertex.useCreateService();
  const { mutate: createChannel, isPending: isCreatingChannel } =
    ubento.vertex.useCreateServiceChannel();
  const { mutate: uploadSpec, isPending: isUploadingSpec } =
    ubento.vertex.useUploadServiceChannelSpec();
  const { mutate: uploadServiceImage, isPending: isUploadingImage } =
    ubento.vertex.useUploadServiceImage();

  const isPending =
    isCreatingService ||
    isCreatingChannel ||
    isUploadingSpec ||
    isUploadingImage;

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
    if (!selectedProviderId) {
      setError("Connection provider is required.");
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
          const proceed = () => {
            if (imageFile) {
              uploadServiceImage(
                { serviceId: createdService.id, file: imageFile },
                {
                  onSuccess: () => {
                    goBack();
                  },
                  onError: (err: any) => {
                    setError(err.message || "Failed to upload service image.");
                  },
                },
              );
            } else {
              goBack();
            }
          };

          // If a spec was provided, create a default channel and upload the spec to it!
          if (parsedSpec) {
            createChannel(
              {
                serviceId: createdService.id,
                data: {
                  team_id: session.teamId,
                  name: "openapi", // standard default channel name
                },
              },
              {
                onSuccess: (newChan: any) => {
                  uploadSpec(
                    {
                      serviceChannelId: newChan.id,
                      spec: parsedSpec,
                    },
                    {
                      onSuccess: () => {
                        proceed();
                      },
                      onError: (err: any) => {
                        setError(
                          err.message ||
                            "Failed to upload channel specification.",
                        );
                      },
                    },
                  );
                },
                onError: (err: any) => {
                  setError(err.message || "Failed to create default channel.");
                },
              },
            );
          } else {
            proceed();
          }
        },
        onError: (err: any) => {
          setError(
            err.message || "Failed to create service. Please try again.",
          );
        },
      },
    );
  };

  return (
    <RailLayout>
      <RailLayoutSide style={{ width: "33%" }}>
        <ServiceDetailsForm
          name={name}
          handleNameChange={handleNameChange}
          handle={handle}
          setHandle={setHandle}
          description={description}
          setDescription={setDescription}
          error={error}
          selectedProviderId={selectedProviderId}
          setSelectedProviderId={setSelectedProviderId}
          imageFile={imageFile}
          onImageChange={setImageFile}
        />
      </RailLayoutSide>
      <RailLayoutMain>
        <ServiceSpecEditor
          handle={handle}
          specText={specText}
          setSpecText={setSpecText}
          handleCreate={handleCreate}
          isPending={isPending}
          createDisabled={!name || !handle || !selectedProviderId || isPending}
          selectedProviderId={selectedProviderId}
        />
      </RailLayoutMain>
    </RailLayout>
  );
}
