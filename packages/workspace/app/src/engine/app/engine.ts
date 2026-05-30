import {
  createWorkspaceEngine,
  WorkspaceEngine,
} from "@/engine/workspace/engine";
import { AppModal } from "@/modals/app/app_modal";
import { createUbentoService, UbentoService } from "@/services/ubento/ubento";
import { ubentoAuth } from "@ubento/services.primitives";
import type { UbentoSDK, workspaceClient } from "@ubento/services.sdk";
import { createZustandStateController, StateController } from "@ubento/state";
import { createLogger, Logger } from "@ubento/telemetry";
import { registerStore } from "@ubento/zustand-devtool";
import React, { ComponentType } from "react";
import { toast } from "sonner";
import { createStore } from "zustand";
import { makeLocationString } from "./app_modal";
import { parseLocation, stringifyLocation, UbentoLocation } from "./location";
import { UbentoSession } from "./session";
const workspaceSettingsKey = "ubento-workspace";

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
  sidePanelPinned: boolean;
  sidePanelWidth: number;
  rightPanelPinned: boolean;
  rightPanelWidth: number;
  dragActive: boolean;
  showControls: boolean;

  // workspace
  workspaceLoadError?: Error;
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
  registryModuleUrlTemplate: string;

  goToLocation: (location: UbentoLocation) => void;
  openWorkspace: (workspaceId: string) => void;
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
  registryModuleUrlTemplate,
  ubentoApi,
  session,
}: {
  workspaceRuntimeUrl: string;
  componentRuntimeUrl: string;
  registryModuleUrlTemplate: string;
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
    sidePanelPinned: true,
    sidePanelWidth: 240,
    rightPanelPinned: false,
    rightPanelWidth: 400,
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
  let lastWorkspaceId: string | undefined = undefined;
  let lastWorkspace: WorkspaceEngine | undefined = undefined;
  function loadWorkspace(workspaceId?: string) {
    const prevWorkspace = lastWorkspace;
    if (!workspaceId) {
      lastWorkspaceId = undefined;
      lastWorkspace = undefined;
    } else {
      lastWorkspaceId = workspaceId;
      function handleWorkspaceData(workspace: workspaceClient.Workspace) {
        if (lastWorkspaceId !== workspaceId) {
          return;
        }
        const scopes = [
          ubentoAuth.scopes.user({ user_id: session.userId }),
          ubentoAuth.scopes.workspace({
            team_id: session.teamId,
            workspace_id: workspace.id,
          }),
        ];
        const key = [...scopes].sort().join("|") + "|" + workspaceSettingsKey;
        appEngine.ubento.settings
          .getSettingByKey(key)
          .then((setting) => {
            if (lastWorkspaceId !== workspaceId) return;
            const engine = createWorkspaceEngine({
              workspace,
              appEngine,
              session,
              initialSettings: setting.data,
            });
            lastWorkspace = engine;
            stateController.setState({
              workspaceStatus: "ready",
              workspace: engine,
            });
          })
          .catch((err) => {
            console.warn(
              "Failed to fetch workspace settings, using default initial settings",
              err,
            );
            if (lastWorkspaceId !== workspaceId) return;
            const engine = createWorkspaceEngine({
              workspace,
              appEngine,
              session,
              initialSettings: undefined,
            });
            lastWorkspace = engine;
            stateController.setState({
              workspaceStatus: "ready",
              workspace: engine,
            });
          });
      }
      const cachedWorkspace =
        ubento.workspace.workspaceStore.getCached(workspaceId);
      if (cachedWorkspace) {
        handleWorkspaceData(cachedWorkspace);
        return;
      } else {
        ubento.workspace
          .getWorkspace(workspaceId)
          .then(handleWorkspaceData)
          .catch((e) => {
            console.error("failed to get workspace", e);
            logger.error("failed to get workspace", {
              event: "getWorkspace",
              error: String(e),
            });
            stateController.setState((state) => {
              return {
                ...state,
                workspaceStatus: "error",
                workspaceLoadError: e,
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
    registryModuleUrlTemplate,
    goToLocation(location: UbentoLocation) {
      stateController.setState((state) => ({
        ...state,
        location,
      }));
    },
    openWorkspace(workspaceId: string) {
      stateController.setState((state) => ({
        ...state,
        location: {
          view: "workspace",
          params: {
            workspaceId,
          },
        } as UbentoLocation,
      }));
    },
    reloadWorkspace() {
      const location = stateController.getState().location;
      if (location.view === "workspace") {
        loadWorkspace(location.params.workspaceId);
      }
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
    const prevId =
      prevState.location.view === "workspace"
        ? prevState.location.params.workspaceId
        : undefined;
    const currId =
      state.location.view === "workspace"
        ? state.location.params.workspaceId
        : undefined;
    if (currId !== prevId) {
      loadWorkspace(currId);
    }
  });
  if (initialLocation.view === "workspace") {
    loadWorkspace(initialLocation.params.workspaceId);
  } else {
    loadWorkspace(undefined);
  }

  return appEngine;
}
