import {
  createWorkspaceEngine,
  WorkspaceEngine,
} from "@/engine/workspace/engine";
import { AppModal } from "@/modals/app/app_modal";
import { MonacoService } from "@/services/monaco/monaco-service";
import { createUbentoService, UbentoService } from "@/services/ubento/ubento";
import { QueryClient } from "@tanstack/react-query";
import { ubentoAuth } from "@ubento/services.primitives";
import type { UbentoSDK, workspaceClient } from "@ubento/services.sdk";
import { createZustandStateController, StateController } from "@ubento/state";
import { createLogger, Logger } from "@ubento/telemetry";
import { registerStore } from "@ubento/zustand-devtool";
import React, { ComponentType } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { createStore } from "zustand";
import {
  createSettingState,
  SettingState,
  teamAppSettingsSchema,
  userAppSettingsSchema,
} from "../settings";
import { makeLocationString } from "./app_modal";
import {
  ContextMenuInstance,
  ContextMenuItem,
  ContextMenuItemGroup,
} from "./context_menu";
import { parseLocation, stringifyLocation, UbentoLocation } from "./location";
import { UbentoSession } from "./session";

export interface ModalInstance {
  id: string;
  component: React.ComponentType<any>;
  props: any;
  resolve: (value: any) => void;
  tags: string[];
}

export type DevOptions = {
  enableAiInspector?: boolean;
};

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

  // context menu
  contextMenu: ContextMenuInstance | null;
};

export type UbentoEngine = StateController<UbentoEngineState> & {
  logger: Logger;
  ubento: UbentoService;
  queryClient: QueryClient;
  workspaceRuntimeUrl: string;
  componentRuntimeUrl: string;
  registryModuleUrlTemplate: string;
  userSetting: SettingState<z.infer<typeof userAppSettingsSchema>>;
  teamSetting: SettingState<z.infer<typeof teamAppSettingsSchema>>;

  // dev options
  devOptions: DevOptions;

  goToLocation: (location: UbentoLocation) => void;
  openWorkspace: (workspaceId: string) => void;
  reloadWorkspace: () => void;
  getMonacoService: () => MonacoService;
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

  openContextMenu: (
    position: { x: number; y: number },
    content: (ContextMenuItem | ContextMenuItemGroup | React.ReactNode)[],
  ) => void;
  showContextMenu: (
    position: { x: number; y: number },
    content: (ContextMenuItem | ContextMenuItemGroup | React.ReactNode)[],
  ) => void;
  closeContextMenu: () => void;
};

export function createUbentoEngine({
  workspaceRuntimeUrl,
  componentRuntimeUrl,
  registryModuleUrlTemplate,
  ubentoApi,
  session,
  devOptions = {},
}: {
  workspaceRuntimeUrl: string;
  componentRuntimeUrl: string;
  registryModuleUrlTemplate: string;
  ubentoApi: UbentoSDK;
  session: UbentoSession;
  devOptions?: DevOptions;
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
    contextMenu: null,
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

  const queryClient = new QueryClient();
  const ubento = createUbentoService({
    queryClient,
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
      stateController.setState({
        workspaceStatus: "inactive",
        workspace: undefined,
      });
    } else {
      lastWorkspaceId = workspaceId;
      async function handleWorkspaceData(workspace: workspaceClient.Workspace) {
        if (lastWorkspaceId !== workspaceId) {
          return;
        }
        const engine = createWorkspaceEngine({
          workspace,
          appEngine,
          session,
        });
        // make sure settings are loaded before setting the workspace
        await Promise.all([
          engine.userSetting.isLoaded,
          engine.teamSetting.isLoaded,
          // enforce a minimum of 500ms to show the workspace skeleton
          new Promise((resolve) => setTimeout(resolve, 500)),
        ]);
        lastWorkspace = engine;
        stateController.setState({
          workspaceStatus: "ready",
          workspace: engine,
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

  const userScopes = [ubentoAuth.scopes.user({ user_id: session.userId })];
  const teamScopes = [ubentoAuth.scopes.team({ team_id: session.teamId })];

  const userSetting = createSettingState({
    key: "ubento",
    scopes: userScopes,
    schema: userAppSettingsSchema,
    ubentoService: ubento,
    init: {
      sidePanelPinned: true,
      sidePanelWidth: 240,
    },
  });

  const teamSetting = createSettingState({
    key: "ubento",
    scopes: teamScopes,
    schema: teamAppSettingsSchema,
    ubentoService: ubento,
    init: {},
  });

  let monacoService: MonacoService | null = null;

  const appEngine: UbentoEngine = {
    logger,
    ...stateController,
    devOptions,
    ubento,
    queryClient,
    userSetting,
    teamSetting,
    workspaceRuntimeUrl,
    componentRuntimeUrl,
    registryModuleUrlTemplate,
    getMonacoService() {
      if (!monacoService) {
        monacoService = new MonacoService();
      }
      return monacoService;
    },
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

    openContextMenu(position, content) {
      stateController.setState((state) => ({
        ...state,
        contextMenu: { position, content },
      }));
    },
    showContextMenu(position, content) {
      stateController.setState((state) => ({
        ...state,
        contextMenu: { position, content },
      }));
    },
    closeContextMenu() {
      stateController.setState((state) => ({
        ...state,
        contextMenu: null,
      }));
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
