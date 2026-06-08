import { UbentoEngine } from "@/engine/app/engine";
import { TsService } from "@/services/ts/ts-service";
import { createZustandStateController } from "@ubento/bento.arlo-core";
import {
  BentoEngineHostRpcInterface,
  BentoEngineRuntimeRpcInterface,
  BentoLocation,
  BentoWorkspaceData,
  WorkspaceSpec,
  workspaceSpecSchema,
} from "@ubento/bento.runtime";
import { DuplexRpc } from "@ubento/rpc";
import { ubentoAuth } from "@ubento/services.primitives";
import { workspaceClient } from "@ubento/services.sdk";
import { registerStore, unregisterStore } from "@ubento/zustand-devtool";
import { dequal } from "dequal/lite";
import debounce from "lodash.debounce";
import { z } from "zod";
import { createStore as createZustandStore, StoreApi } from "zustand/vanilla";
import { UbentoSession } from "../app/session";
import {
  createSettingState,
  SettingState,
  teamWorkspaceSettingsSchema,
  userWorkspaceSettingsSchema,
} from "../settings";
import { BoardManager } from "./parts/board-manager";
import { CopilotManager } from "./parts/copilot-manager";
import { RpcHandler } from "./parts/rpc-handler";
import { ServicesManager } from "./parts/services-manager";
import { TsSyncer } from "./parts/ts-syncer";
import {
  deriveBoardsFromSpec,
  parseSpecData,
  WorkspaceState,
} from "./parts/types";

export class WorkspaceEngine {
  public workspaceId: string;
  public workspace: workspaceClient.Workspace;
  public appEngine: UbentoEngine;
  public session: UbentoSession;
  public logger: any;
  public copilot: any;
  public store: StoreApi<WorkspaceState>;
  public userSetting: SettingState<z.infer<typeof userWorkspaceSettingsSchema>>;
  public teamSetting: SettingState<z.infer<typeof teamWorkspaceSettingsSchema>>;

  public rpc: DuplexRpc<
    BentoEngineHostRpcInterface,
    BentoEngineRuntimeRpcInterface
  > | null = null;
  public tsService: TsService | null = null;
  public cleanupTargetListeners: (() => void) | null = null;

  // Controller properties
  public getState: () => WorkspaceState;
  public setState: (
    recipe:
      | Partial<WorkspaceState>
      | ((state: WorkspaceState) => Partial<WorkspaceState>),
  ) => void;
  public subscribe: (
    listener: (state: WorkspaceState, prevState: WorkspaceState) => void,
  ) => () => void;
  public useState: <T>(
    selector: (state: WorkspaceState) => T,
    equals?: (a: T, b: T) => boolean,
  ) => T;

  private boardManager: BoardManager;
  private servicesManager: ServicesManager;
  private copilotManager: CopilotManager;
  private tsSyncer: TsSyncer;
  private rpcHandler: RpcHandler;
  private unsubscribeWorkspace: () => void;

  constructor({
    workspace,
    appEngine,
    session,
  }: {
    workspace: workspaceClient.Workspace;
    appEngine: UbentoEngine;
    session: UbentoSession;
  }) {
    this.workspace = workspace;
    this.session = session;
    this.workspaceId = workspace.id;
    this.appEngine = appEngine;
    this.logger = appEngine.logger.child({ module: "workspace_engine" });

    const parsedWorkspaceSpec = parseSpecData(
      workspaceSpecSchema,
      workspace.data,
    );

    const store = createZustandStore<WorkspaceState>()(() => ({
      status: "pending",
      selection: [],
      hover: undefined,
      leftPanelOpen: true,
      workspace: {
        id: workspace.id,
        title: workspace.title,
        spec: parsedWorkspaceSpec,
      },
      tsServiceStatus: {
        status: "idle",
        loadedPackagesCount: 0,
        totalPackagesCount: 0,
        packageStatuses: {},
      },
    }));
    this.store = store;

    const controller = createZustandStateController(store);
    this.getState = controller.getState;
    this.setState = controller.setState;
    this.subscribe = controller.subscribe;
    this.useState = controller.useState;

    registerStore("workspaceEngine", this.store);

    this.userSetting = createSettingState({
      key: "ubento-workspace",
      scopes: [
        ubentoAuth.scopes.user({ user_id: session.userId }),
        ubentoAuth.scopes.workspace({
          team_id: session.teamId,
          workspace_id: workspace.id,
        }),
      ],
      schema: userWorkspaceSettingsSchema,
      ubentoService: appEngine.ubento,
      init: {
        activeTab: "workspace",
        mode: "live",
        boardExplorer: {
          expandedStates: {},
        },
        moduleExplorer: {
          expandedStates: {},
        },
      },
    });

    this.teamSetting = createSettingState({
      key: "ubento-workspace",
      scopes: [
        ubentoAuth.scopes.team({ team_id: session.teamId }),
        ubentoAuth.scopes.workspace({
          team_id: session.teamId,
          workspace_id: workspace.id,
        }),
      ],
      schema: teamWorkspaceSettingsSchema,
      ubentoService: appEngine.ubento,
      init: {},
    });

    this.boardManager = new BoardManager(this);
    this.servicesManager = new ServicesManager(this);

    this.copilotManager = new CopilotManager(this, {
      listComponents: () => this.listComponents(),
      describeComponents: (names) => this.describeComponents(names),
      createBoard: (args) => this.boardManager.createBoard(args),
      updateBoard: (args) => this.boardManager.updateBoard(args),
      deleteBoard: (args) => this.boardManager.deleteBoard(args),
    });

    this.copilot = this.copilotManager.copilot;

    this.tsSyncer = new TsSyncer(this, {
      getServiceSpec: (channelId) =>
        this.servicesManager.getServiceSpec(channelId),
    });

    this.rpcHandler = new RpcHandler(this, {
      createBoard: (args) => this.boardManager.createBoard(args),
      runServiceOperation: (args) =>
        this.servicesManager.runServiceOperation(args),
    });

    const persistWorkspace = debounce(async (data: BentoWorkspaceData) => {
      await appEngine.ubento.workspace.updateWorkspace(data.id, {
        title: data.title,
        data: data.spec.data as any,
      });
    }, 1000);

    this.unsubscribeWorkspace = this.store.subscribe(
      async (state: any, prevState: any) => {
        console.log("Workspace changed:", {
          state: state.workspace,
          prevState: prevState.workspace,
          eq: dequal(state.workspace, prevState.workspace),
        });
        if (dequal(state.workspace, prevState.workspace)) return;
        persistWorkspace(state.workspace);
        if (this.rpc) {
          Promise.resolve(
            this.rpc.egress.workspaceUpdated({ data: state.workspace }),
          ).catch((err: any) => {
            this.logger.error(
              "Failed to notify runtime of workspace update",
              err,
            );
          });
        }
      },
    );
  }

  // OOP Methods
  goTo(args: { location?: BentoLocation }) {
    this.userSetting.update({
      board: args.location
        ? {
            id: args.location.boardId,
            params: args.location.params || {},
          }
        : undefined,
    });
  }

  readWorkspaceSpec(): WorkspaceSpec | undefined {
    const state = this.store.getState();
    const spec = state.workspace.spec;
    if (spec.isValid) {
      return spec.data;
    }
    return undefined;
  }

  getBentoLocation(): BentoLocation | undefined {
    const board = this.userSetting.getState().data.board;
    return board?.id
      ? {
          boardId: board.id,
          params: board.params || {},
        }
      : undefined;
  }

  async runServiceOperation(args: any) {
    return this.servicesManager.runServiceOperation(args);
  }

  updateWorkspace(args: any) {
    return this.boardManager.updateWorkspace(args);
  }

  installService(serviceName: string, data: any) {
    return this.servicesManager.installService(serviceName, data);
  }

  updateBoard(args: any) {
    return this.boardManager.updateBoard(args);
  }

  deleteBoard(args: any) {
    return this.boardManager.deleteBoard(args);
  }

  createBoard(args: any) {
    return this.boardManager.createBoard(args);
  }

  updateWorkspaceSpec({
    spec,
    overwrite,
  }: {
    spec: Partial<WorkspaceSpec>;
    overwrite?: boolean;
  }) {
    this.store.setState((state: any) => {
      const workspaceData = state.workspace;
      const currentSpec = overwrite ? {} : workspaceData.spec.data;
      const nextSpec = parseSpecData(workspaceSpecSchema, {
        ...(currentSpec || {}),
        ...spec,
      });

      console.log({ nextSpec });

      return {
        workspace: {
          ...workspaceData,
          spec: nextSpec,
        },
        boards: deriveBoardsFromSpec(nextSpec),
      };
    });
  }

  withCopilotChanges(run: any, getPaths: any) {
    return this.copilotManager.withCopilotChanges(run, getPaths);
  }

  approveCopilotChange(path: string) {
    return this.copilotManager.approveCopilotChange(path);
  }

  denyCopilotChange(path: string) {
    return this.copilotManager.denyCopilotChange(path);
  }

  approveAllCopilotChanges() {
    return this.copilotManager.approveAllCopilotChanges();
  }

  denyAllCopilotChanges() {
    return this.copilotManager.denyAllCopilotChanges();
  }

  async listComponents() {
    return [];
  }

  async describeComponents(names: string[]) {
    return {};
  }

  async getCatalog() {
    return {};
  }

  getModuleReferences(args: any) {
    return this.boardManager.getModuleReferences(args);
  }

  updateModuleReferences(args: any) {
    return this.boardManager.updateModuleReferences(args);
  }

  setTheme(isDark: boolean) {
    return this.rpcHandler.setTheme(isDark);
  }

  select(selection: string[]) {
    return this.rpcHandler.select(selection);
  }

  hover(elementId: string) {
    return this.rpcHandler.hover(elementId);
  }

  unhover(elementId: string) {
    return this.rpcHandler.unhover(elementId);
  }

  watchContextNode(path: string) {
    return this.rpcHandler.watchContextNode(path);
  }

  unwatchContextNode(key: string, path?: string) {
    return this.rpcHandler.unwatchContextNode(key, path);
  }

  init(target: Window) {
    return this.rpcHandler.init(target);
  }

  getTsService() {
    return this.tsSyncer.getTsService();
  }

  destroy() {
    this.tsSyncer.destroy();
    this.rpcHandler.dispose();
    this.copilotManager.destroy();
    this.unsubscribeWorkspace();
    unregisterStore("workspaceEngine");
  }
}

export function createWorkspaceEngine({
  workspace,
  appEngine,
  session,
}: {
  workspace: workspaceClient.Workspace;
  appEngine: UbentoEngine;
  session: UbentoSession;
}): WorkspaceEngine {
  return new WorkspaceEngine({ workspace, appEngine, session });
}
