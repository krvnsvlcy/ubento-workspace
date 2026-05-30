import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as z from "zod";
import { useUbento } from "../app-engine";

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

export function useSettings<S extends z.ZodObject<any, any>>({
  scopes,
  bareKey,
  schema,
  init,
  debounceDelay = 1000,
}: {
  scopes: string[];
  bareKey: string;
  schema: S;
  init: z.infer<S>;
  debounceDelay?: number;
}) {
  const ubento = useUbento();

  // The gatekeeper to ensure we only hydrate from the server once
  const hasInitialized = useRef(false);

  const { data, isLoading, isSuccess, updateCachedData, isFetched } =
    ubento.settings.useSettingByScopesAndKey(scopes, bareKey, {
      initialData: init,
    });
  const { mutateAsync: updateSetting, isPending: isUpdating } =
    ubento.settings.useUpsertSetting();
  const [localState, setLocalState] = useState<z.infer<S>>(
    schema.safeParse(data?.data).data ?? init,
  );

  // 1. Sync server state to local state (Initial Load Only)
  useEffect(() => {
    // Only proceed if we have success, data, AND we haven't initialized yet
    if (
      !hasInitialized.current &&
      !isLoading &&
      isSuccess &&
      data.id && // id is empty for initial state
      data?.data
    ) {
      const parsed = schema.safeParse(data.data);
      if (parsed.success) {
        setLocalState(parsed.data);

        // Lock the gate: subsequent background refetches will be ignored
        hasInitialized.current = true;
      }
    }
  }, [data, isSuccess, schema, isLoading]);

  const debouncedUpdate = useMemo(
    () => debounce(updateSetting, debounceDelay),
    [updateSetting, debounceDelay],
  );

  const update = useCallback(
    (
      updater:
        | Partial<z.infer<S>>
        | ((value: z.infer<S>) => Partial<z.infer<S>>),
    ) => {
      setLocalState((prev) => {
        const updates = typeof updater === "function" ? updater(prev) : updater;
        const newState = { ...prev, ...updates };

        updateCachedData(newState);
        if (isFetched) {
          debouncedUpdate({ scopes, key: bareKey, data: newState });
        }

        return newState;
      });
    },
    [scopes, bareKey, debouncedUpdate, isFetched],
  );

  return {
    data: localState,
    update,
    isUpdating,
    isLoading,
    isLoaded: isSuccess,
  };
}
