import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStore,
  useMutation,
  useStoreEntities,
  useStoreEntity,
  UseStoreOptions,
} from "@ubento/fabric";
import { ubentoEntities } from "@ubento/services.primitives";
import { settingsClient, UbentoSDK } from "@ubento/services.sdk";
import { useCallback } from "react";
import { UbentoApiPage, ubentoToFabricPagedResponse } from "../libs/pagination";

export function createUbentoSettingsService({
  ubentoSdk,
}: {
  ubentoSdk: UbentoSDK;
}) {
  // --- Stores ---

  const settingStore = createStore<
    settingsClient.Setting,
    { scopes?: string[] },
    UbentoApiPage
  >({
    namespace: ubentoEntities.setting.name,
    getKey: (s) => s.id,
    fetchOne: async (key) => {
      return await ubentoSdk.settings.getSetting(key);
    },
    fetchMany: async ({ page, params }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.settings.listSettings({
          scopes: params?.scopes,
          cursor: page?.cursor,
          limit: page?.limit,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities].filter((s) => {
        if (params?.scopes && params.scopes.length > 0) {
          return s.scopes.some((scope) => params.scopes?.includes(scope));
        }
        return true;
      });
    },
  });

  // --- Hooks ---

  const hooks = {
    useSetting: (id: string, options?: UseStoreOptions) => {
      return useStoreEntity(settingStore, id, options);
    },
    useSettingByScopesAndKey: (
      scopes: string[],
      key: string,
      options?: { enabled?: boolean; initialData?: any },
    ) => {
      const compositeKey = [...scopes].sort().join("|") + "|" + key;
      const queryClient = useQueryClient();
      const query = useQuery({
        queryKey: ["setting", "compositeKey", compositeKey],
        queryFn: async () => {
          const setting =
            await ubentoSdk.settings.getSettingByKey(compositeKey);
          settingStore.push(setting);
          return setting;
        },
        initialData: options?.initialData
          ? {
              id: "",
              entity: ubentoEntities.setting.name,
              key: compositeKey,
              scopes,
              data: options?.initialData,
              version: 0,
              created_at: "",
              updated_at: "",
            }
          : undefined,
        enabled:
          options?.enabled !== false && scopes.length > 0 && Boolean(key),
      });
      const updateCachedData = useCallback((data: any) => {
        const cached = queryClient.getQueryData([
          "setting",
          "compositeKey",
          compositeKey,
        ]) as settingsClient.Setting;
        if (cached) {
          queryClient.setQueryData(["setting", "compositeKey", compositeKey], {
            ...cached,
            data,
          });
          settingStore.push({
            ...cached,
            data,
          });
        }
      }, []);

      return {
        ...query,
        updateCachedData,
      };
    },
    useSettings: (
      params: { scopes?: string[] } = {},
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(settingStore, params, options);
    },
    useUpsertSetting: () => {
      return useMutation({
        mutationFn: async (data: {
          key: string;
          scopes: string[];
          data: any;
        }) => {
          return await ubentoSdk.settings.upsertSetting(data);
        },
        onSuccess: (setting) => {
          settingStore.push(setting);
        },
      });
    },
    useDeleteSetting: () => {
      return useMutation({
        mutationFn: async (id: string) => {
          return await ubentoSdk.settings.deleteSetting(id);
        },
        onSuccess: (_, id) => {
          settingStore.remove(id);
        },
      });
    },
  };

  // --- Imperatives ---

  const imperatives = {
    getSetting: async (id: string) => {
      const setting = await ubentoSdk.settings.getSetting(id);
      settingStore.push(setting);
      return setting;
    },
    getSettingByKey: async (key: string) => {
      const setting = await ubentoSdk.settings.getSettingByKey(key);
      settingStore.push(setting);
      return setting;
    },
    listSettings: async (params: {
      scopes?: string[];
      limit?: number;
      cursor?: string;
    }) => {
      const res = await ubentoSdk.settings.listSettings(params);
      settingStore.pushMany(res.data);
      return res;
    },
    upsertSetting: async (data: {
      key: string;
      scopes: string[];
      data: any;
    }) => {
      const setting = await ubentoSdk.settings.upsertSetting(data);
      settingStore.push(setting);
      return setting;
    },
    deleteSetting: async (id: string) => {
      const res = await ubentoSdk.settings.deleteSetting(id);
      settingStore.remove(id);
      return res;
    },
  };

  return {
    settingStore,
    ...hooks,
    ...imperatives,
  };
}
export type UbentoSettingsService = ReturnType<
  typeof createUbentoSettingsService
>;
