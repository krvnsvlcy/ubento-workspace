import { useSession } from "@/contexts/session";
import { useUbento } from "@/hooks/app-engine";
import { useAppModal } from "@/modals/app/hook.js";
import {
  PendingView,
  RailLayout,
  RailLayoutMain,
  RailLayoutSide,
} from "@ubento/bento.arlo-core";
import { useState } from "react";
import { ProviderConfigEditor } from "../provider-common/config-editor.js";
import { ProviderDetailsForm } from "../provider-common/details-form.js";

function EditProviderContent({ provider }: { provider: any }) {
  const ubento = useUbento();
  const { goBack } = useAppModal();
  const session = useSession();

  const [description, setDescription] = useState(provider.description || "");
  const [error, setError] = useState("");

  const [configText, setConfigText] = useState(() =>
    JSON.stringify(provider.config || provider, null, 2),
  );

  const { mutate: updateProvider, isPending } =
    ubento.vertex.useUpdateConnectionProvider();
  const { mutate: uploadProviderImage, isPending: isUploadingImage } =
    ubento.vertex.useUploadConnectionProviderImage();

  const handleSetTemplate = () => {};

  const handleSave = () => {
    setError("");

    let parsedConfig: any = null;
    try {
      parsedConfig = JSON.parse(configText);
    } catch {
      setError("Configuration is not valid JSON.");
      return;
    }

    if (!parsedConfig || typeof parsedConfig !== "object") {
      setError("Configuration must be a valid JSON object.");
      return;
    }

    const { handle, name } = parsedConfig;

    if (!handle || typeof handle !== "string" || !handle.trim()) {
      setError(
        "A string property 'handle' must be defined in the JSON configuration.",
      );
      return;
    }
    if (!/^[a-z0-9-_]+$/.test(handle.trim())) {
      setError(
        "Provider 'handle' must only contain lowercase letters, numbers, hyphens, and underscores.",
      );
      return;
    }
    if (!name || typeof name !== "string" || !name.trim()) {
      setError(
        "A string property 'name' must be defined in the JSON configuration.",
      );
      return;
    }

    updateProvider(
      {
        providerId: provider.id,
        data: {
          handle: handle.trim(),
          name: name.trim(),
          type: "http",
          description: description.trim(),
          config: parsedConfig,
          team_id: session.teamId,
        },
      },
      {
        onSuccess: () => {
          goBack();
        },
        onError: (err: any) => {
          setError(
            err.message ||
              "Failed to update connection provider. Please try again.",
          );
        },
      },
    );
  };

  return (
    <RailLayout>
      <RailLayoutSide style={{ width: "33%" }}>
        <ProviderDetailsForm
          provider={provider}
          setTemplate={handleSetTemplate}
          description={description}
          setDescription={setDescription}
          error={error}
          imageUrl={provider.image_url}
          isUploadingImage={isUploadingImage}
          onUploadImage={(file) =>
            uploadProviderImage({ providerId: provider.id, file })
          }
        />
      </RailLayoutSide>
      <RailLayoutMain>
        <ProviderConfigEditor
          provider={provider}
          configText={configText}
          setConfigText={setConfigText}
          handleSave={handleSave}
          isPending={isPending}
        />
      </RailLayoutMain>
    </RailLayout>
  );
}

export function EditProviderModal() {
  const ubento = useUbento();
  const { params } = useAppModal();
  const providerId = params.providerId || "";

  const { data: provider, isLoading } = ubento.vertex.useConnectionProvider(
    providerId,
    { enabled: !!providerId },
  );

  if (isLoading || !provider) {
    return <PendingView message="Provider" />;
  }

  return <EditProviderContent provider={provider} />;
}
