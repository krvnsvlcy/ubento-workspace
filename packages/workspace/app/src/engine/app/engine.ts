import {
  createWorkspaceEngine,
  WorkspaceEngine,
} from "@/engine/workspace/engine";
import { createUbentoService, UbentoService } from "@/services/ubento/ubento";
import type { UbentoSDK, workspaceClient } from "@ubento/services.sdk";
import { createZustandStateController, StateController } from "@ubento/state";
import { createLogger, Logger } from "@ubento/telemetry";
import { registerStore } from "@ubento/zustand-devtool";
import { createContext, useContext } from "react";
import { createStore } from "zustand";
import { parseLocation, stringifyLocation, UbentoLocation } from "./location";
import { UbentoSession } from "./session";

export type UbentoEngineState = {
  session: UbentoSession;
  location: UbentoLocation;
  leftPanelPinned: boolean;
  leftPanelWidth: number;
  dragActive: boolean;
  showControls: boolean;

  // workspace
  workspaceStatus: "inactive" | "initializing" | "ready" | "error";
  workspace?: WorkspaceEngine;
};

export type UbentoEngine = StateController<UbentoEngineState> & {
  logger: Logger;
  ubento: UbentoService;
  workspaceRuntimeUrl: string;
  componentRuntimeUrl: string;

  goToLocation: (location: Partial<UbentoLocation>) => void;
  openWorkspace: (slug: string) => void;
  reloadWorkspace: () => void;
  setDragActive: (active: boolean) => void;
  setActiveWorkspaceEngine: (engine: WorkspaceEngine) => void;
  clearActiveWorkspaceEngine: (engine: WorkspaceEngine) => void;
  setShowControls: (show: boolean) => void;
};

export function createUbentoEngine({
  workspaceRuntimeUrl,
  componentRuntimeUrl,
  ubentoApi,
  session,
}: {
  workspaceRuntimeUrl: string;
  componentRuntimeUrl: string;
  ubentoApi: UbentoSDK;
  session: UbentoSession;
}) {
  const initialLocation = parseLocation();
  const logger = createLogger({
    serviceName: "ubento-app",
    module: "engine",
    logToConsole: true,
    level: "debug",
  });

  const store = createStore<UbentoEngineState>()(() => ({
    session,
    location: initialLocation,
    leftPanelPinned: true,
    leftPanelWidth: 240,
    dragActive: false,
    showControls: false,
    workspaceStatus: "inactive",
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

  const ubento = createUbentoService({
    ubentoSdk: ubentoApi,
    logger: logger.child({ module: "service" }),
  });

  // update workspace when location changes
  let lastWorkspaceSlug: string | undefined = undefined;
  let lastWorkspace: WorkspaceEngine | undefined = undefined;
  function loadWorkspaceFromSlug(slug?: string) {
    const prevWorkspace = lastWorkspace;
    if (!slug) {
      lastWorkspaceSlug = undefined;
      lastWorkspace = undefined;
    } else {
      lastWorkspaceSlug = slug;
      function handleWorkspaceData(workspace: workspaceClient.Workspace) {
        if (lastWorkspaceSlug !== slug) {
          return;
        }
        const engine = createWorkspaceEngine({
          workspace,
          appEngine,
          session,
        });
        lastWorkspace = engine;
        stateController.setState({
          workspaceStatus: "ready",
          workspace: engine,
        });
        return engine;
      }
      const cachedWorkspace = ubento.workspace.getCachedWorkspaceBySlug(slug);
      if (cachedWorkspace) {
        handleWorkspaceData(cachedWorkspace);
        return;
      } else {
        ubento.workspace
          .getWorkspaceBySlug(slug)
          .then(handleWorkspaceData)
          .catch((e) => {
            logger.error("failed to get workspace", e);
            stateController.setState((state) => {
              return {
                ...state,
                workspaceStatus: "error",
                workspace: undefined,
              };
            });
          });
      }
    }
    prevWorkspace?.destroy();
  }

  const appEngine: UbentoEngine = {
    logger,
    ...stateController,
    ubento,
    workspaceRuntimeUrl,
    componentRuntimeUrl,
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
    reloadWorkspace() {
      const slug = stateController.getState().location.workspace;
      loadWorkspaceFromSlug(slug);
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
        workspace: engine,
      }));
    },
    clearActiveWorkspaceEngine(engine: WorkspaceEngine) {
      stateController.setState((state) => ({
        ...state,
        workspace: state.workspace === engine ? undefined : state.workspace,
      }));
    },
    setShowControls(show: boolean) {
      stateController.setState((state) => ({
        ...state,
        showControls: show,
      }));
    },
  };

  store.subscribe((state, prevState) => {
    if (state.location.workspace !== prevState.location.workspace) {
      loadWorkspaceFromSlug(state.location.workspace);
    }
  });
  loadWorkspaceFromSlug(initialLocation.workspace);

  return appEngine;
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
