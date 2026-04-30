import { createUbentoService, UbentoService } from "@/services/ubento/ubento";
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
  ubento: UbentoService;

  // configs
  workspaceRuntimeUrl: string;
  componentRuntimeUrl: string;
  moduleUrlTemplate: string;

  // commands
  goToLocation: (location: UbentoLocation) => void;
};

export function createUbentoEngine({
  workspaceRuntimeUrl,
  componentRuntimeUrl,
  moduleUrlTemplate,
  ubentoApi,
  session,
  location,
}: {
  workspaceRuntimeUrl: string;
  componentRuntimeUrl: string;
  moduleUrlTemplate: string;
  ubentoApi: UbentoSDK;
  session?: UbentoSession;
  location?: UbentoLocation;
}): UbentoEngine {
  const store = createStore<UbentoEngineState>()(() => ({
    session,
    location: location || {
      view: "home",
      params: {},
    },
  }));
  const stateController = createZustandStateController(store);

  const ubento = createUbentoService({ ubentoSdk: ubentoApi });
  const copilot = createUbentoCopilot({ ubento });

  return {
    ...stateController,
    ubento,
    copilot,
    workspaceRuntimeUrl,
    componentRuntimeUrl,
    moduleUrlTemplate,
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

export function useUbento() {
  const engine = useUbentoEngine();
  return engine.ubento;
}
