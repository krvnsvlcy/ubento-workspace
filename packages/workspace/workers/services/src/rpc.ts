import {
  createDuplexRpc,
  createMessageChannelClientPort,
  createWindowPort,
} from "@ubento/rpc";
import {
  ServicesWorkerHostInterface,
  ServicesWorkerRuntimeInterface,
} from "@ubento/workspace.contracts";
import { loadService, unloadService } from "./loader";
import {
  activeConfigs,
  instances,
  setApiProxy,
  setInvocationProxy,
  statuses,
} from "./state";

const port = createMessageChannelClientPort(createWindowPort(self, self));

export const rpc = createDuplexRpc<
  ServicesWorkerRuntimeInterface,
  ServicesWorkerHostInterface
>({
  port,
  handlers: {
    init: async ({ apiProxyUrl, invocationProxyUrl }) => {
      setApiProxy(apiProxyUrl);
      setInvocationProxy(invocationProxyUrl);
    },

    syncServices: async ({ services }) => {
      const incomingNames = new Set(Object.keys(services));

      // 1. Teardown
      for (const name of activeConfigs.keys()) {
        if (!incomingNames.has(name)) {
          unloadService(name);
        }
      }

      // 2. Reconciliation
      for (const [name, config] of Object.entries(services)) {
        const existing = activeConfigs.get(name);
        const isNew = !existing;
        const isUpdated =
          existing?.module.versionId !== config.module.versionId ||
          existing?.module.id !== config.module.id;

        if (isNew || isUpdated) {
          if (!isNew) {
            unloadService(name);
          }

          activeConfigs.set(name, config);
          loadService(rpc, name, config).catch(console.error);
        }
      }
    },

    getServiceStatus: async ({ serviceName }) => {
      return statuses.get(serviceName) || { status: "idle" };
    },

    invokeService: async ({ serviceName, method, args }) => {
      const current = statuses.get(serviceName);
      if (current?.status !== "ready") {
        throw new Error(`Service [${serviceName}] is not ready.`);
      }

      const instance = instances.get(serviceName);
      if (!instance || typeof instance[method] !== "function") {
        throw new Error(`Method [${method}] not found on [${serviceName}]`);
      }

      return await instance[method](args);
    },
  },
});
