import { AppData, GuestRpcInterface, HostRpcInterface } from "@ubento/engine";
import {
  createDuplexRpc,
  createWindowPort,
  DuplexRpc,
} from "@ubento/rpc-utils";
import { proxy } from "valtio";

export type AppInteractionMode = "edit" | "live";

export type AppState = {
  loading: boolean;
  error: boolean;
  mode: AppInteractionMode;
  scope?: string;
  selection: string[];
  connected: boolean;
};

export type AppController = {
  state: AppState;
  connect: (target: Window) => void;
  load: (data: AppData) => void;
  dispose: () => void;
};

export function createAppController({
  initialState,
}: {
  initialState?: Partial<AppState>;
}): AppController {
  const state = proxy<AppState>({
    loading: false,
    error: false,
    mode: "live",
    selection: [],
    connected: false,
    ...initialState,
  });

  let isReady = false;
  let pendingLoad: AppData | null = null;

  let rpc: DuplexRpc<HostRpcInterface, GuestRpcInterface> | null = null;

  return {
    state,
    connect: (target: Window) => {
      console.log("[Controller] Connecting to iframe window");
      rpc = createDuplexRpc<HostRpcInterface, GuestRpcInterface>({
        port: createWindowPort(window, target),
        handlers: {
          ready: () => {
            console.log("[Controller] Received 'ready' from iframe");
            isReady = true;
            state.connected = true;

            if (pendingLoad) {
              console.log("[Controller] Sending pending load data");
              rpc!.egress.init(pendingLoad as any);
              pendingLoad = null;
            } else {
              console.log("[Controller] No pending load data");
            }
          },
          toggleMode: () => {
            state.mode = state.mode === "edit" ? "live" : "edit";
          },
        },
      });

      rpc.run();
    },
    load: (data: AppData) => {
      console.log("[Controller] Load called. isReady:", isReady);
      if (rpc) {
        rpc.egress.init(data as any);
      } else {
        console.log("[Controller] Iframe not ready, queuing load");
        pendingLoad = data;
      }
    },
    dispose: () => {
      rpc?.dispose();
    },
  };
}
