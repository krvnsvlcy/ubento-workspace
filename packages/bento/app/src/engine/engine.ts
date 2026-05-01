import { createUbentoService, UbentoService } from "@/services/ubento/ubento";
import {
  createZustandStateController,
  StateController,
} from "@ubento/bento-primitives";
import type { UbentoSDK } from "@ubento/sdk";
import { createContext, useContext } from "react";
import { createStore } from "zustand";
import { createUbentoCopilot, UbentoCopilot } from "./copilot/copilot";
import { parseLocation, stringifyLocation, UbentoLocation } from "./location";
import { UbentoSession } from "./session";

export type UbentoEngineState = {
  session?: UbentoSession;
  location: UbentoLocation;
  leftPanelOpen: boolean;
  leftPanelWidth: number;
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
  openWorkspace: (slug: string) => void;
};

export function createUbentoEngine({
  workspaceRuntimeUrl,
  componentRuntimeUrl,
  moduleUrlTemplate,
  ubentoApi,
  session,
}: {
  workspaceRuntimeUrl: string;
  componentRuntimeUrl: string;
  moduleUrlTemplate: string;
  ubentoApi: UbentoSDK;
  session?: UbentoSession;
}): UbentoEngine {
  const initialLocation = parseLocation();
  const store = createStore<UbentoEngineState>()(() => ({
    session,
    location: initialLocation,
    leftPanelOpen: true,
    leftPanelWidth: 240,
  }));
  const stateController = createZustandStateController(store);

  // Sync state to URL
  store.subscribe((state, prevState) => {
    if (state.location !== prevState.location) {
      const url = stringifyLocation(state.location);
      if (window.location.pathname + window.location.search !== url) {
        window.history.pushState(null, "", url);
      }
    }
  });

  // Sync URL to state
  window.addEventListener("popstate", () => {
    stateController.setState((state) => ({
      ...state,
      location: parseLocation(),
    }));
  });

  const ubento = createUbentoService({ ubentoSdk: ubentoApi });
  const copilot = createUbentoCopilot({ ubento });

  return {
    ...stateController,
    ubento,
    copilot,
    workspaceRuntimeUrl,
    componentRuntimeUrl,
    moduleUrlTemplate,
    goToLocation(location: Partial<UbentoLocation>) {
      stateController.setState((state) => ({
        ...state,
        location: {
          ...state.location,
          ...location,
        },
      }));
    },
    openWorkspace(slug: string) {
      stateController.setState((state) => ({
        ...state,
        location: {
          workspace: slug,
          tab: "workspace",
        },
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
