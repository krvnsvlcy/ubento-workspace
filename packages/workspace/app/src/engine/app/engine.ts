import {
  createWorkspaceEngine,
  WorkspaceEngine,
} from "@/engine/workspace/engine";
import { AppModal } from "@/modals/app/app_modal";
import { createUbentoService, UbentoService } from "@/services/ubento/ubento";
import type { UbentoSDK, workspaceClient } from "@ubento/services.sdk";
import { createZustandStateController, StateController } from "@ubento/state";
import { createLogger, Logger } from "@ubento/telemetry";
import { registerStore } from "@ubento/zustand-devtool";
import React, { ComponentType, createContext, useContext } from "react";
import { toast } from "sonner";
import { createStore } from "zustand";
import { makeLocationString } from "./app_modal";
import { parseLocation, stringifyLocation, UbentoLocation } from "./location";
import { UbentoSession } from "./session";

export interface ModalInstance {
  id: string;
  component: React.ComponentType<any>;
  props: any;
  resolve: (value: any) => void;
  tags: string[];
}

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

  // modal
  appModalHistory: string[];
  modalQueue: ModalInstance[];
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

  pushAppModal: (path: string, params?: Record<string, string>) => void;
  replaceAppModal: (path: string, params?: Record<string, string>) => void;
  popAppModal: () => void;

  notify: (options: {
    title?: string;
    message: string;
    type?: "info" | "success" | "warning" | "error";
    duration?: number;
    action?: {
      label: React.ReactNode;
      onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
      actionButtonStyle?: React.CSSProperties;
    };
  }) => void;
  openModal: <T = any, R = any>(
    component: React.ComponentType<T>,
    props?: T,
  ) => Promise<R>;
  closeModal: (id: string, result?: any) => void;
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
    appModalHistory: [],
    modalQueue: [],
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

  function openModal<T>(
    component: ComponentType<T>,
    props: T,
    tags: string[] = [],
  ) {
    return new Promise((resolve) => {
      const id = Math.random().toString(36).substring(7);
      const instance: ModalInstance = {
        id,
        component,
        props,
        resolve,
        tags,
      };
      stateController.setState((state) => ({
        ...state,
        modalQueue: [instance, ...state.modalQueue],
      }));
    });
  }
  function closeModal(id: string, result: unknown) {
    const { modalQueue } = stateController.getState();
    const instance = modalQueue.find((m) => m.id === id);
    if (instance) {
      instance.resolve(result);
    }
    stateController.setState((state) => ({
      ...state,
      modalQueue: state.modalQueue.filter((m) => m.id !== id),
    }));
  }

  function pushAppModalHistory(path: string) {
    stateController.setState((state) => ({
      ...state,
      appModalHistory: [...state.appModalHistory, path],
    }));
  }
  function popAppModalHistory() {
    stateController.setState((state) => ({
      ...state,
      appModalHistory: state.appModalHistory.slice(0, -1),
    }));
  }
  function replaceAppModalHistory(path: string) {
    stateController.setState((state) => ({
      ...state,
      appModalHistory: [...state.appModalHistory.slice(0, -1), path],
    }));
  }
  function setAppModalHistory(history: string[]) {
    stateController.setState((state) => ({
      ...state,
      appModalHistory: history,
    }));
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

    openModal: openModal as UbentoEngine["openModal"],
    closeModal: closeModal as UbentoEngine["closeModal"],

    popAppModal: () => {
      popAppModalHistory();
    },
    pushAppModal: (path: string, params: Record<string, string> = {}) => {
      const location = makeLocationString(path, params);
      const activeModal = stateController.getState().modalQueue[0];
      if (activeModal?.tags?.includes("app-modal")) {
        pushAppModalHistory(location);
      } else {
        setAppModalHistory([location]);
        openModal(AppModal, { params }, ["app-modal"]);
      }
    },
    replaceAppModal: (path: string, params: Record<string, string> = {}) => {
      const location = makeLocationString(path, params);
      const activeModal = stateController.getState().modalQueue[0];
      if (activeModal?.tags?.includes("app-modal")) {
        replaceAppModalHistory(location);
      } else {
        setAppModalHistory([location]);
        openModal(AppModal, { params }, ["app-modal"]);
      }
    },

    notify(options) {
      const {
        title,
        message,
        type = "info",
        duration = 5000,
        action,
      } = options;
      const toastFn = toast[type];
      toastFn(title || message, {
        description: title ? message : undefined,
        duration,
        action,
      });
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
