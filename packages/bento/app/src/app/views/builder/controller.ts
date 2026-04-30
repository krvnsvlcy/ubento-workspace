import {
  ComponentGuestRpcInterface,
  ComponentHostRpcInterface,
} from "@ubento/engine";
import {
  createDuplexRpc,
  createWindowPort,
  DuplexRpc,
} from "@ubento/rpc-utils";
import { UbentoService } from "@/services/ubento/ubento";
import { createStore, StoreApi } from "zustand/vanilla";

export type BuilderState = {
  loading: boolean;
  error: boolean;
  connected: boolean;
  ready: boolean;
  moduleId: string;
  code: string;
  props: any;
};

export type BuilderStore = BuilderState & {
  connect: (target: Window) => void;
  dispose: () => void;
  load: () => Promise<void>;
  updateCode: (code: string) => void;
  updateProps: (props: any) => void;
  save: () => Promise<void>;
};

export type BuilderController = StoreApi<BuilderStore>;

export function createBuilderController({
  ubento,
  moduleId,
}: {
  ubento: UbentoService;
  moduleId: string;
}): BuilderController {
  let rpc: DuplexRpc<
    ComponentHostRpcInterface,
    ComponentGuestRpcInterface
  > | null = null;

  return createStore<BuilderStore>()((set, get) => ({
    loading: false,
    error: false,
    connected: false,
    ready: false,
    moduleId,
    code: "",
    props: {},

    connect: (target: Window) => {
      rpc = createDuplexRpc<
        ComponentHostRpcInterface,
        ComponentGuestRpcInterface
      >({
        port: createWindowPort(window, target),
        handlers: {
          connect: () => {
            set({ connected: true });
            const current = get();
            rpc?.egress.init({
              code: current.code,
              props: current.props,
            });
          },
          ready: () => {
            set({ ready: true });
          },
        },
      });
      rpc.run();
    },

    dispose: () => {
      rpc?.dispose();
    },

    load: async () => {
      set({ loading: true });
      try {
        const module = await ubento.module.getModule(moduleId);
        const source = await ubento.module.getModuleVersionSource(
          moduleId,
          module.latest_version_id || "",
        );
        set({
          code: source,
          loading: false,
        });
        rpc?.egress.init({ code: source, props: get().props });
      } catch (err) {
        set({
          error: true,
          loading: false,
        });
      }
    },

    updateCode: (code: string) => {
      set({ code });
      rpc?.egress.updateCode({ code });
    },

    updateProps: (props: any) => {
      set({ props });
      rpc?.egress.updateProps({ props });
    },

    save: async () => {
      const current = get();
      await ubento.module.publishModuleVersion(moduleId);
    },
  }));
}
