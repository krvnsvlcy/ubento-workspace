import {
  createZustandStateController,
  StateController,
} from "@ubento/bento-primitives";
import type { UbentoSDK } from "@ubento/sdk";
import { createContext, useContext } from "react";
import { createStore } from "zustand";
import { createUbentoCopilot, UbentoCopilot } from "./copilot/copilot";
import { UbentoLocation } from "./location";
import { UbentoSession } from "./session";

export type UbentoEngineState = {
  session?: UbentoSession;
  location: UbentoLocation;
};

export type UbentoEngine = StateController<UbentoEngineState> & {
  // modules
  copilot: UbentoCopilot;
  ubentoApi: UbentoSDK;

  // configs
  workspaceRuntimeUrl: string;
  componentRuntimeUrl: string;

  // commands
  goToLocation: (location: UbentoLocation) => void;
};

export function createUbentoEngine({
  workspaceRuntimeUrl,
  componentRuntimeUrl,
  ubentoApi,
}: {
  workspaceRuntimeUrl: string;
  componentRuntimeUrl: string;
  ubentoApi: UbentoSDK;
}): UbentoEngine {
  const store = createStore<UbentoEngineState>()(() => ({
    location: {
      view: "home",
      params: {},
    },
  }));
  const stateController = createZustandStateController(store);

  return {
    ...stateController,

    workspaceRuntimeUrl,
    componentRuntimeUrl,
    ubentoApi,
    copilot: createUbentoCopilot(),
    goToLocation(location: UbentoLocation) {
      stateController.setState((state) => ({
        ...state,
        location,
      }));
    },
  };
}

export const UbentoEngineContext = createContext<UbentoEngine | null>(null);
export function useUbentoEngine() {
  const engine = useContext(UbentoEngineContext);
  if (!engine) {
    throw new Error("useUbentoEngine must be used within UbentoEngineProvider");
  }
  return engine;
}
