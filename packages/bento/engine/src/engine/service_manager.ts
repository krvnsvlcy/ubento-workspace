import { createZustandStateController } from "@ubento/bento-primitives";
import { useCallback, useEffect } from "react";
import { createStore as createZustandStore } from "zustand";
import { ModuleReference } from "../models.js";
import { ModuleManager, ModuleManagerState } from "./module_manager.js";

export type ServiceState = {
  status: "pending" | "ready" | "error";
  error?: string;
};

export type ServiceManagerState = {
  services: Record<string, ServiceState>;
};

// Helper to create deterministic cache keys from arbitrary config objects
function stringifyArgs(args?: Record<string, any>) {
  if (!args) return "{}";
  const sortedKeys = Object.keys(args).sort();
  const sortedArgs: Record<string, any> = {};
  for (const key of sortedKeys) {
    sortedArgs[key] = args[key];
  }
  return JSON.stringify(sortedArgs);
}

export function createServiceManager({
  moduleManager,
}: {
  moduleManager: ModuleManager;
}) {
  const managerStore = createZustandStore<ServiceManagerState>(() => ({
    services: {},
  }));
  const controller = createZustandStateController(managerStore);

  const serviceValues = new Map<string, any>();
  const serviceResolutions = new Map<string, Promise<any>>();

  const resolveService = async (
    serviceKey: string,
    moduleValue: any,
    args?: Record<string, any>,
  ) => {
    if (serviceValues.has(serviceKey)) return serviceValues.get(serviceKey);
    if (serviceResolutions.has(serviceKey))
      return serviceResolutions.get(serviceKey);

    controller.setState((s) => ({
      services: {
        ...s.services,
        [serviceKey]: { status: "pending" },
      },
    }));

    const resolution = (async () => {
      try {
        if (!moduleValue || typeof moduleValue.default !== "function") {
          throw new Error("Service module does not export a default function");
        }

        const serviceInstance = await moduleValue.default(args);
        serviceValues.set(serviceKey, serviceInstance);

        controller.setState((s) => ({
          services: {
            ...s.services,
            [serviceKey]: { status: "ready" },
          },
        }));

        return serviceInstance;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Unknown service instantiation error";
        controller.setState((s) => ({
          services: {
            ...s.services,
            [serviceKey]: { status: "error", error: errorMessage },
          },
        }));
        throw error;
      } finally {
        serviceResolutions.delete(serviceKey);
      }
    })();

    serviceResolutions.set(serviceKey, resolution);
    return resolution;
  };

  const selectService = (
    serviceManagerState: ServiceManagerState,
    activeModuleKey: string | undefined,
    args?: Record<string, any>,
  ) => {
    const argsHash = stringifyArgs(args);

    // FIX 1: Safely handle undefined activeModuleKey
    const serviceKey = activeModuleKey
      ? `${activeModuleKey}|${argsHash}`
      : undefined;

    const sState = serviceKey
      ? (serviceManagerState.services[serviceKey] as ServiceState | undefined)
      : undefined;

    const service = serviceKey ? serviceValues.get(serviceKey) : undefined;

    return {
      activeKey: serviceKey,
      status: sState?.status || "pending",
      error: sState?.error,
      service,
    };
  };

  const watchService = (
    module: ModuleReference,
    args?: Record<string, any>,
  ): (() => void) => {
    const argsHash = stringifyArgs(args);

    const unwatchModule = moduleManager.watchModule(module);

    const checkAndResolve = (state: ModuleManagerState) => {
      const modSnapshot = moduleManager.selectModule(state, module);

      // Safety check: wait until we have a real underlying activeKey
      if (!modSnapshot.activeKey) return;

      const serviceKey = `${modSnapshot.activeKey}|${argsHash}`;
      if (serviceValues.has(serviceKey)) return;

      // FIX 3: Ensure modSnapshot.value is actually defined
      if (modSnapshot.status === "ready" && modSnapshot.value) {
        resolveService(serviceKey, modSnapshot.value, args);
      }
    };

    checkAndResolve(moduleManager.getState());
    const unsubscribe = moduleManager.subscribe(checkAndResolve);

    return () => {
      unwatchModule();
      unsubscribe();
    };
  };

  return {
    ...controller,
    selectService,
    watchService,

    useService(module: ModuleReference, args?: Record<string, any>) {
      const argsHash = stringifyArgs(args);
      const moduleSnapshot = moduleManager.useModuleValue(module);

      // Added equality check to prevent excessive re-renders
      const serviceSnapshot = controller.useState(
        (s) => selectService(s, moduleSnapshot.activeKey, args),
        (a, b) =>
          a.activeKey === b.activeKey &&
          a.status === b.status &&
          a.error === b.error &&
          a.service === b.service,
      );

      // FIX 2: Use stable identifiers (argsHash, not args) for the hook dependencies
      useEffect(() => {
        return watchService(module, args);
      }, [module.id, module.versionId, module.scope, argsHash]);

      const reload = useCallback(() => {
        if (serviceSnapshot.activeKey) {
          serviceValues.delete(serviceSnapshot.activeKey);
          controller.setState((s) => {
            const next = { ...s };
            const nextServices = { ...s.services };
            delete nextServices[serviceSnapshot.activeKey!];
            next.services = nextServices;
            return next;
          });

          if (moduleSnapshot.status === "ready" && moduleSnapshot.value) {
            resolveService(
              serviceSnapshot.activeKey,
              moduleSnapshot.value,
              args,
            );
          }
        }
      }, [
        serviceSnapshot.activeKey,
        moduleSnapshot.status,
        moduleSnapshot.value,
        argsHash, // Safe to depend on hash here, though args is also fine inside useCallback
        args,
      ]);

      const status =
        moduleSnapshot.status === "ready"
          ? serviceSnapshot.status || "pending"
          : moduleSnapshot.status;

      const error =
        moduleSnapshot.status === "ready"
          ? serviceSnapshot.error || moduleSnapshot.error
          : moduleSnapshot.error;

      return {
        entity: moduleSnapshot.entity,
        status,
        error,
        service: serviceSnapshot.service,
        reload,
      };
    },
  };
}

export type ServiceManager = ReturnType<typeof createServiceManager>;
