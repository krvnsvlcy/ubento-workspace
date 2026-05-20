import { ServiceConfig, ServiceStatus } from "@ubento/workspace.contracts";
import { apiProxy, instances, invocationProxy, statuses } from "./state";

export const setStatus = (
  rpc: any,
  name: string,
  status: ServiceStatus,
  details?: Record<string, unknown>,
) => {
  statuses.set(name, { status, details });
  rpc.call("onServiceStatusChanged", {
    serviceName: name,
    status,
    details,
  });
};

export const loadService = async (
  rpc: any,
  name: string,
  config: ServiceConfig,
) => {
  setStatus(rpc, name, "starting");

  try {
    // 1. Fetch raw untrusted code
    const codeUrl = `${apiProxy}/${config.module.id}@${config.module.versionId}.js`;
    const response = await fetch(codeUrl);
    if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);
    const sourceCode = await response.text();

    // 2. Define strict endowments (The OCap pattern)
    const endowments = {
      console,
      env: {
        args: config.args,
        invocationUrl: invocationProxy,
      },
      fetch: (url: string, init?: RequestInit) => {
        const proxiedUrl = `${invocationProxy}?url=${encodeURIComponent(url)}`;
        return fetch(proxiedUrl, init);
      },
    };

    // 3. Create a new isolated Compartment
    const compartment = new Compartment(endowments);

    // 4. Evaluate the source code within the compartment
    const serviceExports = compartment.evaluate(sourceCode);

    const serviceFactory = serviceExports.default;

    const instance = serviceFactory(endowments.env);

    instances.set(name, instance);
    setStatus(rpc, name, "ready");
  } catch (error) {
    setStatus(rpc, name, "error", {
      message:
        error instanceof Error ? error.message : "Lockdown evaluation failed",
    });
  }
};

export const unloadService = (name: string) => {
  const instance = instances.get(name);
  if (instance?.destroy) {
    try {
      instance.destroy();
    } catch (e) {
      /* Hardened silence */
    }
  }
  instances.delete(name);
  statuses.delete(name);
};
