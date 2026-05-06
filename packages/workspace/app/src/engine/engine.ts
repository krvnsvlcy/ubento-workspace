import { WorkspaceEngine } from "@/app/workspace/main/workspace/engine/engine";
import { createUbentoService, UbentoService } from "@/services/ubento/ubento";
import type { UbentoSDK } from "@ubento/services.sdk";
import {
  createZustandStateController,
  StateController,
} from "@ubento/workspace.primitives";
import { registerStore } from "@ubento/zustand-devtool";
import { createContext, useContext } from "react";
import { createStore } from "zustand";
import { createUbentoCopilot, UbentoCopilot } from "./copilot/copilot";
import { parseLocation, stringifyLocation, UbentoLocation } from "./location";
import { UbentoSession } from "./session";

export type UbentoEngineState = {
  session: UbentoSession;
  location: UbentoLocation;
  leftPanelPinned: boolean;
  leftPanelWidth: number;
  dragActive: boolean;
  activeWorkspaceEngine?: WorkspaceEngine;
  showControls: boolean;
};

export type UbentoEngine = StateController<UbentoEngineState> & {
  ubento: UbentoService;
  copilot: UbentoCopilot;
  workspaceRuntimeUrl: string;
  componentRuntimeUrl: string;
  moduleUrlTemplate: string;

  goToLocation: (location: Partial<UbentoLocation>) => void;
  openWorkspace: (slug: string) => void;
  setDragActive: (active: boolean) => void;
  setActiveWorkspaceEngine: (engine: WorkspaceEngine) => void;
  clearActiveWorkspaceEngine: (engine: WorkspaceEngine) => void;
  setShowControls: (show: boolean) => void;
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
  session: UbentoSession;
}) {
  const initialLocation = parseLocation();
  const store = createStore<UbentoEngineState>()(() => ({
    session,
    location: initialLocation,
    leftPanelPinned: true,
    leftPanelWidth: 240,
    dragActive: false,
    showControls: false,
  }));
  registerStore("ubentoEngine", store);
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

  // Global drag state
  window.addEventListener("dragstart", () => {
    stateController.setState((state) => ({ ...state, dragActive: true }));
  });
  window.addEventListener("dragend", () => {
    stateController.setState((state) => ({ ...state, dragActive: false }));
  });

  const ubento = createUbentoService({ ubentoSdk: ubentoApi });
  const copilot = createUbentoCopilot({ ubento, session });

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
          workspaceTab: "workspace",
        },
      }));
    },
    setDragActive(active: boolean) {
      stateController.setState((state) => ({
        ...state,
        dragActive: active,
      }));
    },
    setActiveWorkspaceEngine(engine: WorkspaceEngine) {
      stateController.setState((state) => ({
        ...state,
        activeWorkspaceEngine: engine,
      }));
    },
    clearActiveWorkspaceEngine(engine: WorkspaceEngine) {
      stateController.setState((state) => ({
        ...state,
        activeWorkspaceEngine:
          state.activeWorkspaceEngine === engine
            ? undefined
            : state.activeWorkspaceEngine,
      }));
    },
    setShowControls(show: boolean) {
      stateController.setState((state) => ({
        ...state,
        showControls: show,
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
