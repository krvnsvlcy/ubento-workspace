import { useSession } from "@/contexts/session";
import { useUbento } from "@/hooks/app-engine";
import { useAppModal } from "@/modals/app/hook.js";
import {
  RailLayout,
  RailLayoutMain,
  RailLayoutSide,
} from "@ubento/bento.arlo-core";
import { HttpConnectionProviderConfig } from "@ubento/vertex.core";
import { useState } from "react";
import { ProviderConfigEditor } from "../provider-common/config-editor.js";
import { ProviderDetailsForm } from "../provider-common/details-form.js";

const getAuthTemplate = (method: "apiKey" | "oauth2" | "basic") => {
  if (method === "basic") {
    const auth: HttpConnectionProviderConfig["auth"]["basic"] = {};
    return auth;
  } else if (method === "apiKey") {
    const auth: HttpConnectionProviderConfig["auth"]["apiKey"] = {
      location: "header",
      name: "Authorization",
      template: "Bearer {{key}}",
    };
    return auth;
  } else {
    const auth: HttpConnectionProviderConfig["auth"]["oauth2"] = {
      baseUrl: "https://auth.example.com",
      authorize: {
        request: {
          method: "GET",
          path: "/oauth/authorize",
          baseUrl: "https://example.com",
        },
        response: {
          type: "json",
          data: {
            access_token: "access_token",
            refresh_token: "refresh_token",
            expires_in: "expires_in",
            token_type: "token_type",
          },
        },
      },
      token: {
        request: {
          method: "POST",
          path: "/oauth/token",
          baseUrl: "https://example.com",
        },
        response: {
          type: "json",
          data: {
            access_token: "access_token",
            refresh_token: "refresh_token",
            expires_in: "expires_in",
            token_type: "token_type",
          },
        },
      },
    };
    return auth;
  }
};

const defaultHttpProvider: Partial<HttpConnectionProviderConfig> = {
  handle: "http-provider",
  name: "HTTP Provider",
  type: "http",
  auth: {
    apiKey: getAuthTemplate("apiKey") as any,
  },
};

export function CreateProviderModal() {
  const ubento = useUbento();
  const { goBack } = useAppModal();
  const session = useSession();

  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [configText, setConfigText] = useState(() =>
    JSON.stringify(defaultHttpProvider, null, 2),
  );

  const { mutate: createProvider, isPending: isCreatingProvider } =
    ubento.vertex.useCreateConnectionProvider();
  const { mutate: uploadProviderImage, isPending: isUploadingImage } =
    ubento.vertex.useUploadConnectionProviderImage();

  const isPending = isCreatingProvider || isUploadingImage;

  const handleSetTemplate = (val: "basic" | "apiKey" | "oauth2") => {
    let currentObj: any = {};
    try {
      currentObj = JSON.parse(configText);
    } catch {
      currentObj = structuredClone(defaultHttpProvider);
    }

    switch (val) {
      case "basic":
        currentObj.auth = {
          ...currentObj.auth,
          basic: getAuthTemplate("basic"),
        };
        break;
      case "apiKey":
        currentObj.auth = {
          ...currentObj.auth,
          apiKey: getAuthTemplate("apiKey"),
        };
        break;
      case "oauth2":
        currentObj.auth = {
          ...currentObj.auth,
          oauth2: getAuthTemplate("oauth2"),
        };
        break;
    }

    setConfigText(JSON.stringify(currentObj, null, 2));
  };

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

    createProvider(
      {
        handle: handle.trim(),
        name: name.trim(),
        type: "http",
        description: description.trim(),
        config: parsedConfig,
        team_id: session.teamId,
      },
      {
        onSuccess: (createdProvider: any) => {
          if (imageFile) {
            uploadProviderImage(
              { providerId: createdProvider.id, file: imageFile },
              {
                onSuccess: () => {
                  goBack();
                },
                onError: (err: any) => {
                  setError(err.message || "Failed to upload provider image.");
                },
              },
            );
          } else {
            goBack();
          }
        },
        onError: (err: any) => {
          setError(
            err.message ||
              "Failed to create connection provider. Please try again.",
          );
        },
      },
    );
  };

  return (
    <RailLayout>
      <RailLayoutSide style={{ width: "33%" }}>
        <ProviderDetailsForm
          setTemplate={handleSetTemplate}
          description={description}
          setDescription={setDescription}
          error={error}
          imageFile={imageFile}
          onImageChange={setImageFile}
        />
      </RailLayoutSide>
      <RailLayoutMain>
        <ProviderConfigEditor
          configText={configText}
          setConfigText={setConfigText}
          handleSave={handleSave}
          isPending={isPending}
        />
      </RailLayoutMain>
    </RailLayout>
  );
}
