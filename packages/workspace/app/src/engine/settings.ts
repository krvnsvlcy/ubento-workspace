import { UbentoService } from "@/services/ubento/ubento";
import { createZustandStateController, StateController } from "@ubento/state";
import { z } from "zod";
import { createStore, StoreApi } from "zustand";

export const teamAppSettingsSchema = z.object({});
export const userAppSettingsSchema = z.object({
  sidePanelPinned: z.boolean().default(true),
  sidePanelWidth: z.number().default(240),
});

export const teamWorkspaceSettingsSchema = z.object({});
export const userWorkspaceSettingsSchema = z.object({
  activeTab: z.enum(["home", "workspace", "assets"]).default("workspace"),
  mode: z.enum(["live", "edit"]).default("live"),
  board: z
    .object({
      id: z.string(),
      params: z.record(z.string(), z.string()).default({}),
    })
    .optional(),
  editingModule: z
    .object({
      id: z.string(),
      versionId: z.string(),
    })
    .optional(),
  boardExplorer: z
    .object({
      expandedStates: z.record(z.string(), z.boolean()).default({}),
    })
    .default({ expandedStates: {} }),
  moduleExplorer: z
    .object({
      expandedStates: z.record(z.string(), z.boolean()).default({}),
    })
    .default({ expandedStates: {} }),
});

// Helper debounce function
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export interface SettingState<T> extends StateController<{
  data: T;
  isLoaded: boolean;
}> {
  store: StoreApi<{
    data: T;
    isLoaded: boolean;
  }>;
  update: (updater: Partial<T> | ((prev: T) => Partial<T>)) => void;
  isLoaded: Promise<boolean>;
}

export function createSettingState<T>({
  key,
  scopes,
  schema,
  ubentoService,
  init,
}: {
  key: string;
  scopes: string[];
  schema: z.ZodType<T>;
  ubentoService: UbentoService;
  init: T;
}): SettingState<T> {
  const cachedSetting = ubentoService.settings.getCachedSettingByScopesAndKey(
    scopes,
    key,
  );
  console.log("getCachedSettingByScopesAndKey", {
    init,
    k: schema.safeParse(cachedSetting?.data).data,
  });

  const store = createStore<{ data: T; isLoaded: boolean }>()(() => ({
    data: schema.safeParse(cachedSetting?.data).data ?? init,
    isLoaded: false,
  }));

  const controller = createZustandStateController(store);

  // Debounced API call to save settings to backend
  const debouncedUpsert = debounce((data: T) => {
    ubentoService.settings
      .upsertSetting({
        scopes,
        key,
        data,
      })
      .catch((err: any) => {
        console.error(`Failed to persist setting for key ${key}`, err);
      });
  }, 1000);

  // Helper method to update the data directly
  const update = (updater: any) => {
    controller.setState((state) => {
      const updates =
        typeof updater === "function" ? updater(state.data) : updater;
      const newData = { ...state.data, ...updates };

      debouncedUpsert(newData);

      return { data: newData };
    });
  };

  // Initialize/Load the setting from the backend
  const isLoaded = ubentoService.settings
    .getSettingByScopesAndKey(scopes, key, { initialData: init })
    .then((result: any) => {
      if (result && result.data) {
        const parsed = schema.parse(result.data);
        controller.setState({ data: parsed, isLoaded: true });
      } else {
        controller.setState({ isLoaded: true });
      }
      return true;
    })
    .catch((err: any) => {
      console.error(`Failed to load setting for key ${key}`, err);
      controller.setState({ isLoaded: true });
      return true;
    });

  return {
    ...controller,
    store,
    update,
    isLoaded,
  };
}
