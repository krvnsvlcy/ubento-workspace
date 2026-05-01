import { createZustandStateController } from "@ubento/bento-primitives";
import { createStore, Entity, useStoreEntity } from "@ubento/fabric";
import { parseEntityId } from "@ubento/primitives";
import { DuplexRpc } from "@ubento/rpc-utils";
import { useCallback, useEffect } from "react";
import { createStore as createZustandStore } from "zustand";
import {
  BentoEngineHostRpcInterface,
  BentoEngineRuntimeRpcInterface,
} from "./bridge.js";
import {
  ModuleData,
  ModuleReference,
  StableModuleReference,
} from "./models.js";

export function moduleKey(module: ModuleReference) {
  if (module.versionId) {
    return `${module.id}:${module.versionId}`;
  }
  return module.id;
}

export type ModuleState = {
  id: string;
  versionId: string;
  scope: ModuleReference["scope"];
  status: "pending" | "ready" | "error";
  error?: string;
};

export type ModuleManagerState = {
  resolutions: Record<string, ModuleState>;
  activeKeys: Record<string, string>; // Maps a base ID to its currently active stable key
};

export function createModuleManager({
  rpc,
  publicModuleUrlTemplate,
}: {
  rpc: DuplexRpc<BentoEngineRuntimeRpcInterface, BentoEngineHostRpcInterface>;
  publicModuleUrlTemplate: string;
}) {
  const moduleStore = createStore<ModuleData>({
    namespace: "module",
    getKey: (entity: ModuleData) => entity.id,
    fetchOne: async (key: string) => {
      const module = await rpc.egress.getModule({ moduleId: key });
      return module;
    },
    fetchMany: async () => {
      throw new Error("Cannot fetch modules in batch");
    },
  });

  const managerStore = createZustandStore<ModuleManagerState>(() => ({
    resolutions: {},
    activeKeys: {},
  }));
  const controller = createZustandStateController(managerStore);

  const moduleValues = new Map<string, any>();
  const moduleResolutions = new Map<string, Promise<any>>();

  // Reference tracking for external observers
  const watchCounts = new Map<string, number>();
  const watchCleanups = new Map<string, () => void>();

  const resolveModuleValue = async (ref: StableModuleReference) => {
    const key = moduleKey(ref);

    const cachedValue = moduleValues.get(key);
    if (cachedValue) return cachedValue;

    const cachedResolution = moduleResolutions.get(key);
    if (cachedResolution) return cachedResolution;

    controller.setState((s) => ({
      resolutions: {
        ...s.resolutions,
        [key]: {
          id: ref.id,
          versionId: ref.versionId!,
          scope: ref.scope,
          status: "pending",
        },
      },
    }));

    const resolution = (async () => {
      try {
        let mod;
        if (ref.scope === "private") {
          const artifact = await rpc.egress.readModule(ref);
          const blob = new Blob([artifact], { type: "application/javascript" });
          const url = URL.createObjectURL(blob);

          try {
            mod = await import(/* @vite-ignore */ url);
            moduleValues.set(key, mod);
          } finally {
            setTimeout(() => URL.revokeObjectURL(url), 10000);
          }
        } else {
          const bareModuleId = parseEntityId(ref.id).bareId;
          const bareVersionId = parseEntityId(ref.versionId!).bareId;
          const url = publicModuleUrlTemplate
            .replace("{module}", bareModuleId)
            .replace("{version}", bareVersionId);

          mod = await import(/* @vite-ignore */ url);
          moduleValues.set(key, mod);
        }

        controller.setState((s) => ({
          resolutions: {
            ...s.resolutions,
            [key]: { ...s.resolutions[key], status: "ready" },
          },
        }));

        return mod;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown import error";
        controller.setState((s) => ({
          resolutions: {
            ...s.resolutions,
            [key]: {
              ...s.resolutions[key],
              status: "error",
              error: errorMessage,
            },
          },
        }));
        throw error;
      }
    })().finally(() => {
      moduleResolutions.delete(key);
    });

    moduleResolutions.set(key, resolution);
    return resolution;
  };

  const selectModule = (state: ModuleManagerState, module: ModuleReference) => {
    const activeKey = module.versionId
      ? moduleKey(module)
      : state.activeKeys[module.id];

    const resolution = activeKey ? state.resolutions[activeKey] : undefined;
    const value = activeKey ? moduleValues.get(activeKey) : undefined;

    return {
      activeKey,
      error: resolution?.error,
      status: resolution?.status || "pending",
      value,
    };
  };

  const watchModule = (module: ModuleReference): (() => void) => {
    const watchKey = module.versionId ? moduleKey(module) : module.id;

    const currentCount = watchCounts.get(watchKey) || 0;
    watchCounts.set(watchKey, currentCount + 1);

    // Only set up the subscription/resolution if this is the first active watcher
    if (currentCount === 0) {
      if (module.versionId) {
        resolveModuleValue(module as StableModuleReference);
        watchCleanups.set(watchKey, () => {});
      } else {
        const handleEntityUpdate = (entity: Entity<ModuleData> | undefined) => {
          if (entity && entity.data.latestVersionId) {
            const stableRef: StableModuleReference = {
              id: module.id,
              scope: module.scope,
              versionId: entity.data.latestVersionId,
            };
            const stableKey = moduleKey(stableRef);

            // Point the base ID to the newly discovered stable key
            controller.setState((s) => {
              if (s.activeKeys[module.id] === stableKey) return s;
              return {
                ...s,
                activeKeys: { ...s.activeKeys, [module.id]: stableKey },
              };
            });

            resolveModuleValue(stableRef);
          }
        };

        const unsubscribe = moduleStore.store.subscribe((state, prevState) => {
          const current = moduleStore.selectEntity(module.id, state);
          const previous = moduleStore.selectEntity(module.id, prevState);
          // Trigger the update if the latestVersionId changes, or if it's the initial load
          if (
            current?.data.latestVersionId !== previous?.data.latestVersionId
          ) {
            handleEntityUpdate(current);
          }
        });

        // 1. Synchronously process what we already have in cache
        const existingEntity = moduleStore.selectEntity(
          module.id,
          moduleStore.store.getState(),
        );
        if (existingEntity) {
          handleEntityUpdate(existingEntity);
        }

        // 2. Fire and forget the network request.
        // When it resolves, it will update the store and trigger the unsubscribe block above.
        moduleStore.fetch(module.id).catch((err) => {
          console.error(
            `Failed to fetch metadata for module ${module.id}`,
            err,
          );
        });

        watchCleanups.set(watchKey, unsubscribe);
      }
    }

    // Return the unsubscribe function
    return () => {
      const count = (watchCounts.get(watchKey) || 1) - 1;
      watchCounts.set(watchKey, count);
      if (count === 0) {
        const cleanup = watchCleanups.get(watchKey);
        if (cleanup) cleanup();
        watchCleanups.delete(watchKey);
        watchCounts.delete(watchKey);
      }
    };
  };

  return {
    ...controller,
    moduleStore,
    selectModule,
    watchModule,

    // The React Hook is now just a thin consumer of the Engine
    useModuleValue(module: ModuleReference) {
      // 1. Watch the managerStore for resolution/compilation changes
      const snapshot = controller.useState(
        (s) => selectModule(s, module),
        (a, b) => {
          return (
            a.status === b.status &&
            a.value === b.value &&
            a.error === b.error &&
            a.activeKey === b.activeKey
          );
        },
      );

      // 2. Watch the moduleStore for entity metadata changes
      const entity = useStoreEntity(moduleStore, module.id);

      // 3. Inform the engine we are observing
      useEffect(() => {
        return watchModule(module);
      }, [module.id, module.versionId, module.scope]);

      const reload = useCallback(() => {
        if (snapshot.activeKey) {
          moduleValues.delete(snapshot.activeKey);
          controller.setState((s) => {
            const newState = { ...s };
            const newResolutions = { ...s.resolutions };
            delete newResolutions[snapshot.activeKey!];
            newState.resolutions = newResolutions;
            return newState;
          });
        }

        if (!module.versionId) {
          moduleStore.fetch(module.id);
        } else {
          resolveModuleValue(module as StableModuleReference);
        }
      }, [snapshot.activeKey, module.id, module.versionId]);

      return {
        ...snapshot,
        entity,
        reload,
      };
    },
  };
}

export type ModuleManager = ReturnType<typeof createModuleManager>;
