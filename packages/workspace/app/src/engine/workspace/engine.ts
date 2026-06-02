import { UbentoEngine } from "@/engine/app/engine";
import { appModalRoutes } from "@/modals/app/routes";
import { ConfirmMutationModal } from "@/modals/confirm_mutation/confirm_mutation";
import {
  ModuleData,
  ModuleStatus,
  ModuleSyncer,
} from "@/services/ts/module-syncer";
import { PackageInstallStatus } from "@/services/ts/package_manager/package_manager";
import { TsService, TsServiceStatus } from "@/services/ts/ts-service";
import { createZustandStateController } from "@ubento/bento.arlo-core";
import {
  BentoEngineHostRpcInterface,
  BentoEngineRuntimeRpcInterface,
  BentoLocation,
  BentoWorkspaceData,
  getSpecOrDefault,
  ParsedSpec,
  ServiceData,
  ServiceOperationErrorData,
  ServiceOperationResult,
  WorkspaceSpec,
  workspaceSpecSchema,
} from "@ubento/bento.runtime";
import { createDuplexRpc, createWindowPort, DuplexRpc } from "@ubento/rpc";
import { ubentoAuth } from "@ubento/services.primitives";
import { vertexClient, workspaceClient } from "@ubento/services.sdk";
import { serviceSpecV1Schema } from "@ubento/vertex.core";
import { registerStore, unregisterStore } from "@ubento/zustand-devtool";
import { dequal } from "dequal/lite";
import debounce from "lodash.debounce";
import z from "zod";
import { createStore as createZustandStore } from "zustand/vanilla";
import { ContextMenuContentItem } from "../app/context_menu";
import { UbentoSession } from "../app/session";
import { createUbentoCopilot } from "../copilot/copilot";
import {
  createSettingState,
  teamWorkspaceSettingsSchema,
  userWorkspaceSettingsSchema,
} from "../settings";
import { createWorkspaceCopilotAgentEnvironment } from "./environment";

function parseSpecData<S extends z.ZodTypeAny>(
  schema: S,
  data: unknown,
): ParsedSpec<z.infer<S>> {
  const spec = schema.safeParse(data);
  if (!spec.success) {
    return {
      isValid: false,
      data: data,
      issues: spec.error.issues.map((issue) => ({
        location: issue.path.map((p) => String(p)),
        message: issue.message,
      })),
    };
  } else {
    return {
      isValid: true,
      data: spec.data,
    };
  }
}

export type WorkspaceState = {
  // status
  status: "pending" | "connected" | "ready" | "error";
  error?: any;

  // local state
  workspace: BentoWorkspaceData;

  // synced from runtime
  selectionScope?: string;
  selection: string[];
  hover?: string;

  leftPanelOpen: boolean;
  tsServiceStatus?: TsServiceStatus;
  packageStatuses?: Record<string, PackageInstallStatus>;
  moduleStatuses?: ModuleStatus[];
};

export function createWorkspaceEngine({
  workspace,
  appEngine,
  session,
}: {
  workspace: workspaceClient.Workspace;
  appEngine: UbentoEngine;
  session: UbentoSession;
}) {
  let rpc: DuplexRpc<
    BentoEngineHostRpcInterface,
    BentoEngineRuntimeRpcInterface
  > | null = null;
  let cleanupTargetListeners: (() => void) | null = null;
  let tsService: TsService | null = null;
  const workspaceService = appEngine.ubento.workspace;
  const logger = appEngine.logger.child({ module: "workspace_engine" });

  function deriveBoardsFromSpec(spec: any) {
    const result: Record<string, any> = {};
    if (spec.isValid && spec.data?.boards) {
      for (const [id, board] of Object.entries(spec.data.boards)) {
        const b = board as any;
        result[id] = {
          id: b.id,
          title: b.name,
          spec: {
            isValid: true,
            data: {
              children: b.children || [],
              elements: {},
            },
          },
        };
      }
    }
    return result;
  }

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
      title: workspace.name,
      slug: workspace.slug,
      spec: parsedWorkspaceSpec,
    },
    tsServiceStatus: {
      status: "idle",
      loadedPackagesCount: 0,
      totalPackagesCount: 0,
      packageStatuses: {},
    },
  }));

  const controller = createZustandStateController(store);
  registerStore("workspaceEngine", store);

  function getBentoLocation(): BentoLocation | undefined {
    const board = userSetting.getState().data.board;
    return board?.id
      ? {
          boardId: board.id,
          params: board.params || {},
        }
      : undefined;
  }

  // Standalone functions here

  async function connect() {
    store.setState({ status: "connected" });
    const state = store.getState();
    const styleTag = document.getElementById("theme-variables");
    const themeCss = styleTag?.innerHTML || "";

    return {
      initialState: {
        location: getBentoLocation(),
        workspace: state.workspace,
        user: {
          name: session.name,
          email: session.email,
        },
        theme: {
          css: themeCss,
          isDark: document.documentElement.classList.contains("dark"),
        },
      },
      registryModuleUrlTemplate: appEngine.registryModuleUrlTemplate,
    };
  }

  async function ready() {
    store.setState({ status: "ready" });
  }

  function goTo({ location }: { location?: BentoLocation }) {
    userSetting.update({
      board: location
        ? {
            id: location.boardId,
            params: location.params || {},
          }
        : undefined,
    });
  }

  const userScopes = [
    ubentoAuth.scopes.user({ user_id: session.userId }),
    ubentoAuth.scopes.workspace({
      team_id: session.teamId,
      workspace_id: workspace.id,
    }),
  ];
  const teamScopes = [
    ubentoAuth.scopes.team({ team_id: session.teamId }),
    ubentoAuth.scopes.workspace({
      team_id: session.teamId,
      workspace_id: workspace.id,
    }),
  ];

  const userSetting = createSettingState({
    key: "ubento-workspace",
    scopes: userScopes,
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
  const teamSetting = createSettingState({
    key: "ubento-workspace",
    scopes: teamScopes,
    schema: teamWorkspaceSettingsSchema,
    ubentoService: appEngine.ubento,
    init: {},
  });

  async function listComponents() {
    return [];
  }

  async function describeComponents(names: string[]) {
    return {};
  }

  async function getCatalog() {
    return {};
  }

  async function updateWorkspace(data: Partial<WorkspaceState>) {
    const current = store.getState().workspace;
    if (!current) return;
    const updated = { ...current, ...data } as any;
    await workspaceService.updateWorkspace(current.id, updated);
    store.setState({ workspace: updated });
  }

  // Update metadata
  async function updateBoard({
    boardId,
    update,
  }: {
    boardId: string;
    update: { title?: string; parentId?: string | null };
  }) {
    const wsSpec = readWorkspaceSpec();
    if (!wsSpec || !wsSpec.boards) return;

    const boards = { ...wsSpec.boards };
    const board = boards[boardId];
    if (!board) return;

    if (update.title !== undefined) {
      boards[boardId] = {
        ...board,
        title: update.title,
      };
    }

    updateWorkspaceSpec({
      spec: {
        boards,
      },
    });
  }

  // delete board
  async function deleteBoard({ boardId }: { boardId: string }) {
    const wsSpec = readWorkspaceSpec();
    if (!wsSpec) return;

    const boards = { ...(wsSpec.boards || {}) };
    const board = boards[boardId];
    if (!board) return;

    const collectChildIds = (id: string, ids: Set<string>) => {
      ids.add(id);
      const b = boards[id];
      if (b?.children) {
        for (const childId of b.children) {
          collectChildIds(childId, ids);
        }
      }
    };

    const idsToDelete = new Set<string>();
    collectChildIds(boardId, idsToDelete);

    for (const id of idsToDelete) {
      delete boards[id];
    }

    for (const id in boards) {
      const b = boards[id];
      if (b.children && b.children.includes(boardId)) {
        boards[id] = {
          ...b,
          children: b.children.filter((cid) => cid !== boardId),
        };
      }
    }

    const workspaceRoots = (wsSpec.roots || []).filter(
      (cid: string) => cid !== boardId,
    );

    updateWorkspaceSpec({
      spec: {
        boards,
        roots: workspaceRoots,
      },
    });
  }

  // create board
  async function createBoard({
    title,
    parentId,
  }: {
    title: string;
    parentId?: string | null;
    spec?: any;
    index?: string | null;
  }): Promise<any> {
    const newModule = await appEngine.ubento.sdk.module.createModule({
      name: title,
      team_id: session.teamId,
      source: `export default function Board() {\n  return (\n    <div className="p-8 bg-surface/10 rounded-2xl border border-border">\n      <h1 className="text-2xl font-bold mb-4">${title}</h1>\n      <p className="text-content-muted">Start editing this board module in code.</p>\n    </div>\n  );\n}`,
      scope: "private",
      type: "board",
    });

    const boardId = Math.random().toString(36).substring(7);

    const wsSpec = readWorkspaceSpec();
    const boards = { ...(wsSpec?.boards || {}) };

    boards[boardId] = {
      id: boardId,
      title,
      module: {
        id: newModule.id,
        versionId: newModule.latest_version_id || "",
      },
      children: [],
    };

    let workspaceRoots = [...(wsSpec?.roots || [])];
    if (parentId) {
      const parentBoard = boards[parentId];
      if (parentBoard) {
        boards[parentId] = {
          ...parentBoard,
          children: [...(parentBoard.children || []), boardId],
        };
      }
    } else {
      workspaceRoots.push(boardId);
    }

    updateWorkspaceSpec({
      spec: {
        boards,
        roots: workspaceRoots,
      },
    });

    return {
      isValid: true,
      data: {},
      boardId,
      id: boardId,
    };
  }

  let spec_cache = {} as Record<string, any>;
  async function getServiceSpec(channelId: string) {
    if (spec_cache[channelId]) {
      return parseSpecData(serviceSpecV1Schema, spec_cache[channelId]);
    }
    const specData =
      await appEngine.ubento.sdk.vertex.getServiceChannelSpec(channelId);
    spec_cache[channelId] = specData;
    return parseSpecData(serviceSpecV1Schema, specData);
  }

  async function getServiceSpecForService(serviceName: string) {
    const workspaceSpec = readWorkspaceSpec();
    if (!workspaceSpec) return null;
    const serviceData = workspaceSpec.services?.[serviceName];
    if (!serviceData) return null;
    return getServiceSpec(serviceData.channelId);
  }

  async function runServiceOperation({
    service,
    type,
    name,
    args,
  }: {
    service: string;
    type: "query" | "action";
    name: string;
    args?: Record<string, unknown>;
  }): Promise<ServiceOperationResult> {
    const workspaceSpec = readWorkspaceSpec();
    if (!workspaceSpec) {
      throw new Error("Workspace spec not found");
    }

    const serviceData = workspaceSpec.services?.[service];
    if (!serviceData) {
      throw new Error(`Service "${service}" not found`);
    }

    const channelId = serviceData.channelId;
    const serviceSpec = await getServiceSpec(channelId);
    if (!serviceSpec.isValid) {
      throw new Error(`Invalid service spec for ${channelId}.`);
    }

    // Renamed local variable to avoid collision with the 'result' return key
    let vertexResponse: vertexClient.VertexResult;

    if (type === "query") {
      vertexResponse = await appEngine.ubento.sdk.vertex.runQuery({
        teamId: session.teamId,
        serviceChannelId: channelId,
        query: name,
        args: args,
      });
    } else {
      const confirmed = await appEngine.openModal<any, boolean>(
        ConfirmMutationModal,
        {
          service,
          action: name,
          args,
        },
      );
      if (!confirmed) {
        return {
          ok: false,
          error: {
            code: "CANCELLED",
            message: `Execution of action "${name}" on service "${service}" was cancelled.`,
            isTransient: false,
            isIdempotent: false,
          },
          result: undefined,
        };
      }

      vertexResponse = await appEngine.ubento.sdk.vertex.runAction({
        teamId: session.teamId,
        serviceChannelId: channelId,
        action: name,
        args: args,
      });
    }

    // Determine idempotency: Queries are always safe to retry.
    // Actions are assumed false to prevent duplicate state changes unless explicitly mapped.
    const isIdempotent = type === "query";

    if (vertexResponse.error) {
      // Base template for our structured error
      const errorTemplate: ServiceOperationErrorData = {
        code: vertexResponse.error.code,
        message: vertexResponse.error.message || "An unknown error occurred",
        isTransient: false, // Default to terminal unless we know it's a network glitch
        isIdempotent,
      };

      switch (vertexResponse.error.code) {
        case "INVALID_CREDENTIALS": {
          appEngine.notify({
            title: "Invalid Connection",
            message: `Request failed due to invalid credentials. Please setup a valid connection for service ${service}.`,
            type: "error",
          });
          return {
            ok: false,
            error: errorTemplate,
            result: undefined,
          };
        }
        case "INVALID_REQUEST_ERROR": {
          appEngine.notify({
            title: "Invalid Request",
            message: `Please check the arguments for ${service}.${name}.`,
            type: "error",
          });
          return {
            ok: false,
            error: errorTemplate,
            result: undefined,
          };
        }
        case "USAGE_LIMIT_EXCEEDED": {
          appEngine.notify({
            title: "Usage Limit Exceeded",
            message: `Please upgrade your plan for Vertex requests.`,
            type: "error",
            duration: 20_000,
            action: {
              label: "Upgrade",
              onClick: () => {
                appEngine.pushAppModal(appModalRoutes.team.billing);
              },
            },
          });
          return {
            ok: false,
            error: errorTemplate,
            result: undefined,
          };
        }
        case "UPSTREAM_ERROR": {
          return {
            ok: false,
            error: {
              ...errorTemplate,
              isTransient: true, // Upstream errors (like 502/504) are classic transient candidates
            },
            result: undefined,
          };
        }
        default: {
          // Instead of throwing and breaking the RPC boundary, we return the unknown error safely
          return {
            ok: false,
            error: errorTemplate,
            result: undefined,
          };
        }
      }
    }

    return {
      ok: true,
      error: undefined,
      result: vertexResponse.data,
    };
  }

  const persistWorkspace = debounce(async (data: BentoWorkspaceData) => {
    await workspaceService.updateWorkspace(data.id, {
      name: data.title,
      data: data.spec.data as any,
    });
  }, 1000);
  const unsubscribeWorkspace = store.subscribe(async (state, prevState) => {
    console.log("Workspace changed:", {
      state: state.workspace,
      prevState: prevState.workspace,
      eq: dequal(state.workspace, prevState.workspace),
    });
    if (dequal(state.workspace, prevState.workspace)) return;
    persistWorkspace(state.workspace);
    if (rpc) {
      Promise.resolve(
        rpc.egress.workspaceUpdated({ data: state.workspace }),
      ).catch((err: any) => {
        logger.error("Failed to notify runtime of workspace update", err);
      });
    }
  });
  function readWorkspaceSpec() {
    const state = store.getState();
    const spec = state.workspace.spec;
    if (spec.isValid) {
      return spec.data;
    }
    return undefined;
  }
  function updateWorkspaceSpec({
    spec,
    overwrite,
  }: {
    spec: Partial<WorkspaceSpec>;
    overwrite?: boolean;
  }) {
    store.setState((state) => {
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

  function installService(serviceName: string, data: ServiceData) {
    const spec = readWorkspaceSpec();
    if (!spec) return;

    updateWorkspaceSpec({
      spec: {
        services: {
          ...(spec.services || {}),
          [serviceName]: data,
        },
      },
    });
  }

  // watch boards: Deprecated under ESM
  const unsubscribeBoards = () => {};

  const environment = createWorkspaceCopilotAgentEnvironment(
    {
      listComponents,
      describeComponents,
      focusBoard: async ({ location }) => {
        goTo({ location });
      },
      readNode: async (selector) => {
        if (!rpc) throw new Error("Runtime connection not established");
        return await rpc.egress.readNode({ selector });
      },
      clickNode: async (selector) => {
        if (!rpc) throw new Error("Runtime connection not established");
        await rpc.egress.clickNode({ selector });
      },
      setValue: async ({ selector, value }) => {
        if (!rpc) throw new Error("Runtime connection not established");
        await rpc.egress.setValue({ selector, value });
      },
      getValue: async (selector) => {
        if (!rpc) throw new Error("Runtime connection not established");
        return await rpc.egress.getValue({ selector });
      },
      readLogs: async ({ from, count }) => {
        if (!rpc) throw new Error("Runtime connection not established");
        return await rpc.egress.readLogs({ from, count });
      },
      getServices: async () => {
        const spec = readWorkspaceSpec();
        return spec?.services;
      },
      getServiceSpec: async (serviceChannelId) => {
        return appEngine.ubento.sdk.vertex.getServiceChannelSpec(
          serviceChannelId,
        );
      },
      goTo,
      updateBoard,
      deleteBoard,
      createBoard,
      listBoards: async () => {
        const spec = readWorkspaceSpec();
        if (!spec || !spec.boards) return [];
        return Object.values(spec.boards).map((b: any) => ({
          id: b.id,
          title: b.title || b.name || "",
          children: b.children || [],
        }));
      },
    },
    {
      session,
      ubento: appEngine.ubento,
      logger,
      workspaceId: store.getState().workspace.id,
      getWorkspaceSpec: () => store.getState().workspace.spec,
      updateWorkspaceSpec: async (spec) => {
        updateWorkspaceSpec({ spec, overwrite: true });
      },
    },
  );

  const copilot = createUbentoCopilot({
    environment,
    mainAgentName: "copilot",
  });

  function handleWorkspaceChange() {
    const ws = store.getState().workspace;
    const services = ws.spec.isValid
      ? Object.keys(ws.spec.data.services ?? {})
      : [];

    copilot.setContextAttachments("workspace", [
      {
        type: "bento-workspace",
        data: {
          id: ws.id,
          title: ws.title,
          slug: ws.slug,
          services,
        },
      },
    ]);
  }

  const unsubscribeWorkspaceCopilot = store.subscribe((curr, prev) => {
    if (!dequal(curr.workspace, prev.workspace)) {
      handleWorkspaceChange();
    }
  });
  handleWorkspaceChange();

  function handleLocationChange() {
    const location = getBentoLocation();
    rpc?.egress.setLocation({ location });

    // set copilot context attachments

    if (location) {
      const spec = getSpecOrDefault(store.getState().workspace.spec, {
        version: 1,
        services: {},
        modules: {},
        moduleGroups: {},
        rootModuleGroups: [],
        packages: {},
        boards: {},
        roots: [],
      });

      copilot.setContextAttachments("bento-location", [
        {
          type: "bento-location",
          data: {
            ...location,
            boardTitle: spec.boards?.[location.boardId]?.title,
          },
        },
      ]);
    } else {
      copilot.setContextAttachments("bento-location", []);
    }
  }
  const unsubscribeEngine = userSetting.subscribe((curr, prev) => {
    if (
      curr.data.board?.id !== prev.data.board?.id ||
      !dequal(curr.data.board?.params, prev.data.board?.params)
    ) {
      handleLocationChange();
    }
  });

  function getModuleReferences({
    id,
    versionId,
  }: {
    id: string;
    versionId: string;
  }) {
    const wsSpec = readWorkspaceSpec();
    const refs: { source: "board" | "module" | "component"; name: string }[] =
      [];
    if (!wsSpec) return refs;

    if (wsSpec.boards) {
      for (const board of Object.values(wsSpec.boards)) {
        if (board.module?.id === id && board.module?.versionId === versionId) {
          refs.push({ source: "board", name: board.title });
        }
      }
    }

    if (wsSpec.modules) {
      for (const [name, mod] of Object.entries(wsSpec.modules)) {
        if (mod.id === id && mod.versionId === versionId) {
          refs.push({ source: "module", name });
        }
      }
    }

    return refs;
  }

  async function updateModuleReferences({
    refs,
    module,
  }: {
    refs: { source: "board" | "module" | "component"; name: string }[];
    module: { id: string; versionId: string };
  }) {
    const wsSpec = readWorkspaceSpec();
    if (!wsSpec) return;

    const boards = wsSpec.boards ? { ...wsSpec.boards } : {};
    const modules = wsSpec.modules ? { ...wsSpec.modules } : {};

    for (const ref of refs) {
      if (ref.source === "board") {
        for (const [boardId, board] of Object.entries(boards)) {
          if (board.title === ref.name) {
            boards[boardId] = {
              ...board,
              module,
            };
          }
        }
      } else if (ref.source === "module") {
        modules[ref.name] = module;
      }
    }

    updateWorkspaceSpec({
      spec: {
        boards,
        modules,
      },
    });
  }

  const engine = {
    workspaceId: workspace.id,
    appEngine,
    logger,
    copilot,
    store,
    ...controller,
    userSetting,
    teamSetting,

    connect,
    ready,
    goTo,
    runServiceOperation,
    updateWorkspace,
    installService,
    updateBoard,
    deleteBoard,
    createBoard,
    updateWorkspaceSpec,
    listComponents,
    describeComponents,
    getCatalog,
    getModuleReferences,
    updateModuleReferences,
    setTheme: async (isDark: boolean) => {
      if (rpc) {
        try {
          await rpc.egress.setTheme({ isDark });
        } catch (err) {
          logger.error(
            "Failed to propagate theme change to workspace runtime",
            err as any,
          );
        }
      }
    },
    select: async (selection: string[]) => {
      // stubbed
    },
    hover: async (elementId: string) => {
      // stubbed
    },
    unhover: async (elementId: string) => {
      // stubbed
    },
    watchContextNode: async (path: string) => {
      return "";
    },
    unwatchContextNode: async (key: string, path?: string) => {
      // stubbed
    },

    init: async (target: Window) => {
      rpc = createDuplexRpc<
        BentoEngineHostRpcInterface,
        BentoEngineRuntimeRpcInterface
      >({
        port: createWindowPort(window, target),
        channel: "workspace",
        handlers: {
          connect,
          ready,
          goTo,
          runServiceOperation,
          createBoard: async (args) => {
            const title = args?.title || "";
            await createBoard({
              title,
              parentId: (args as any)?.parentId,
            });
            return store.getState().workspace;
          },
          readModuleSource: async ({ moduleId, versionId }) => {
            let vId = versionId;
            if (!vId) {
              const mod = await appEngine.ubento.sdk.module.getModule(moduleId);
              vId = mod.latest_version_id || "";
            }
            const sourceCode =
              await appEngine.ubento.sdk.module.readModuleVersionFile(
                moduleId,
                vId,
                "index.tsx",
              );
            return { sourceCode };
          },
          getModuleRegistryAccessToken: async () => {
            const { token } =
              await appEngine.ubento.sdk.module.getRegistryToken([
                session.teamId,
              ]);
            return token;
          },
          onContextMenu: async ({ position }) => {
            const iframe = Array.from(document.querySelectorAll("iframe")).find(
              (el) => el.contentWindow === target,
            );
            let x = position.x;
            let y = position.y;
            if (iframe) {
              const rect = iframe.getBoundingClientRect();
              x += rect.left;
              y += rect.top;
            }

            const activeBoard = userSetting.getState().data.board;
            const wsSpec = readWorkspaceSpec();
            const activeBoardDetails =
              activeBoard && wsSpec?.boards
                ? wsSpec.boards[activeBoard.id]
                : null;

            const content: ContextMenuContentItem[] = [
              {
                items: [
                  {
                    id: "create-board",
                    label: "Create New Board",
                    action: () => {
                      const title = prompt("Enter board title:") || "New Board";
                      createBoard({ title });
                    },
                  },
                  {
                    id: "reload",
                    label: "Reload Workspace",
                    action: () => {
                      appEngine.reloadWorkspace();
                    },
                  },
                  {
                    id: "go-home",
                    label: "Go to Home",
                    action: () => {
                      goTo({ location: undefined });
                    },
                  },
                ],
              },
            ];

            const currentMode = userSetting.getState().data.mode;
            const isEditing = currentMode === "edit";
            content.push({
              items: [
                {
                  id: "edit-board",
                  label: isEditing
                    ? "Exit edit mode"
                    : activeBoardDetails?.module
                      ? "Edit this board"
                      : "Switch to edit mode",
                  action: () => {
                    if (isEditing) {
                      userSetting.update({
                        mode: "live",
                        editingModule: undefined,
                      });
                    } else {
                      if (activeBoardDetails) {
                        userSetting.update({
                          editingModule: activeBoardDetails.module,
                          mode: "edit",
                        });
                      } else {
                        userSetting.update({
                          mode: "edit",
                        });
                      }
                    }
                  },
                },
              ],
            });

            appEngine.showContextMenu({ x, y }, content);
          },
        },
      });

      rpc.watch((event) => {
        console.log(`[host.rpc.event] ${event.type}`, event);
      });

      rpc.run();

      const handleCloseMenu = () => {
        appEngine.closeContextMenu();
      };
      target.addEventListener("mousedown", handleCloseMenu);
      target.addEventListener("pointerdown", handleCloseMenu);
      cleanupTargetListeners = () => {
        try {
          target.removeEventListener("mousedown", handleCloseMenu);
          target.removeEventListener("pointerdown", handleCloseMenu);
        } catch (e) {
          // target window might have been unloaded/destroyed
        }
      };
    },

    getTsService: () => {
      if (!tsService) {
        tsService = new TsService({
          workspaceId: workspace.id,
          logger: logger,
          monacoService: appEngine.getMonacoService(),
          onStatusChange: (status) => {
            store.setState({ tsServiceStatus: status });
          },
          onPackageStatusesChange: (statuses) => {
            store.setState({ packageStatuses: statuses });
          },
        });
        const workspaceSpec = store.getState().workspace.spec;
        // package syncer
        if (workspaceSpec.isValid) {
          tsService.updatePackages(
            Object.entries({
              ...workspaceSpec.data.packages,
              react: "19",
              "react-dom": "19",
            }).map(([name, version]) => ({ name, version })),
          );
        }
        store.subscribe((state, prev) => {
          if (state.workspace.spec.isValid) {
            const workspaceSpec = state.workspace.spec.data;

            const packages = workspaceSpec.packages || {};
            const prevPackages =
              (prev.workspace.spec.data as any).packages || {};
            if (dequal(packages, prevPackages)) return;

            tsService?.updatePackages(
              Object.entries({
                ...(workspaceSpec.packages || {}),
                react: "19",
                "react-dom": "19",
              }).map(([name, version]) => ({ name, version })),
            );
          }
        });

        // module syncer
        function getModuleData(workspace: WorkspaceSpec): ModuleData[] {
          return [
            ...Object.entries(workspace.modules || {}).map(([name, m]) => ({
              type: "module",
              name,
              moduleId: m.id,
              versionId: m.versionId,
            })),
            ...Object.values(workspace.boards || {}).map((b) => ({
              type: "board",
              name: b.title,
              moduleId: b.module.id,
              versionId: b.module.versionId,
            })),
          ] as ModuleData[];
        }
        const moduleSyncer = new ModuleSyncer({
          tsService: tsService,
          ubentoService: appEngine.ubento,
          workspaceId: workspace.id,
          onStatusChange: (statuses) => {
            store.setState({ moduleStatuses: statuses });
          },
        });
        if (workspaceSpec.isValid) {
          moduleSyncer.updateModules(getModuleData(workspaceSpec.data));
        }
        store.subscribe((state, prev) => {
          const workspaceSpec = state.workspace.spec;
          const prevWorkspaceSpec = prev.workspace.spec;
          const data = workspaceSpec.isValid
            ? getModuleData(workspaceSpec.data)
            : [];
          const prevData = prevWorkspaceSpec.isValid
            ? getModuleData(prevWorkspaceSpec.data)
            : [];
          if (dequal(data, prevData)) return;
          moduleSyncer.updateModules(data);
        });
      }
      return tsService;
    },

    destroy: () => {
      tsService?.dispose();
      rpc?.dispose();
      cleanupTargetListeners?.();
      unsubscribeEngine();
      unregisterStore("workspaceEngine");
      unsubscribeBoards();
      unsubscribeWorkspace();
      unsubscribeWorkspaceCopilot();
    },
  };

  return engine;
}

export type WorkspaceEngine = ReturnType<typeof createWorkspaceEngine>;
