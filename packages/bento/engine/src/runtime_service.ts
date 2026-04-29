import { createStore } from "zustand/vanilla";
import { createZustandStateController, StateController } from "@ubento/bento-primitives";
import { EngineStoreApi } from "./engine.js";
import { ServiceData } from "./models.js";

export type RuntimeServiceStatus = "loading" | "ready" | "error";

export type RuntimeServiceState = {
  status: RuntimeServiceStatus;
  error: Error | null;
  api: any | null;
  data: ServiceData;
};

export type RuntimeService = StateController<RuntimeServiceState> & {
  init: () => Promise<void>;
  update: (data: ServiceData) => void;
};

// Placeholder for now
export type UbentoRuntimeApi = {
  // TODO: Define the runtime API
};

export function createRuntimeService(
  name: string,
  data: ServiceData,
  engine: EngineStoreApi,
): RuntimeService {
  const store = createStore<RuntimeServiceState>(() => ({
    status: "loading",
    error: null,
    api: null,
    data,
  }));

  const controller = createZustandStateController(store);

  const init = async () => {
    controller.setState({ status: "loading", error: null });

    try {
      const { moduleId, moduleVersionId, args } = controller.getState().data;
      const engineState = engine.getState();

      const versionId =
        moduleVersionId && moduleVersionId !== "latest"
          ? moduleVersionId
          : (await engineState.getModule(moduleId)).latestVersionId;

      const moduleValue = await engineState.resolveModuleValue(
        moduleId,
        versionId,
      );

      // The service factory is the default export
      const createService = moduleValue.default;

      if (typeof createService === "function") {
        // For now, passing a placeholder for ubento api
        const ubento: UbentoRuntimeApi = {}; 
        
        const serviceInstance = createService({ ubento, ...args });

        controller.setState({
          api: serviceInstance,
          status: "ready",
        });
      } else {
        throw new Error(`Default export (service factory) not found in module ${moduleId}`);
      }
    } catch (err: any) {
      controller.setState({
        status: "error",
        error: err,
      });
      console.error(`Failed to initialize service ${name}:`, err);
    }
  };

  const update = (newData: ServiceData) => {
    const currentData = controller.getState().data;
    const moduleChanged = newData.moduleId !== currentData.moduleId;
    const versionChanged = newData.moduleVersionId !== currentData.moduleVersionId;
    const argsChanged = JSON.stringify(newData.args) !== JSON.stringify(currentData.args);

    if (moduleChanged || versionChanged || argsChanged) {
      controller.setState({ data: newData });
      init();
    }
  };

  // Run initial init
  init();

  return {
    ...controller,
    init,
    update,
  };
}
