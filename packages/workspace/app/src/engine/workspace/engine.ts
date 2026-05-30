import { UbentoEngine, UbentoEngineState } from "@/engine/app/engine";
import { appModalRoutes } from "@/modals/app/routes";
import { ConfirmMutationModal } from "@/modals/confirm_mutation/confirm_mutation";
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
import { vertexClient, workspaceClient } from "@ubento/services.sdk";
import { serviceSpecV1Schema } from "@ubento/vertex.core";
import { registerStore, unregisterStore } from "@ubento/zustand-devtool";
import { dequal } from "dequal/lite";
import debounce from "lodash.debounce";
import z from "zod";
import { createStore as createZustandStore } from "zustand/vanilla";
import { UbentoSession } from "../app/session";
import { createUbentoCopilot } from "../copilot/copilot";
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
  mode: "edit" | "live";
  workspace: BentoWorkspaceData;

  // synced from runtime
  selectionScope?: string;
  selection: string[];
  hover?: string;

  leftPanelOpen: boolean;

  // watched context nodes
  watchedContextNodes: Record<string, any>;
};

let i = 0;
export function createWorkspaceEngine({
  workspace,
  appEngine,
  session,
}: {
  workspace: workspaceClient.Workspace;
  appEngine: UbentoEngine;
  session: UbentoSession;
}) {
  const id = i;
  i++;
  let rpc: DuplexRpc<
    BentoEngineHostRpcInterface,
    BentoEngineRuntimeRpcInterface
  > | null = null;
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
    mode: "live",
    location: {
      boardId: appEngine.getState().location.board || "",
      params: appEngine.getState().location.params || {},
    },
    boards: deriveBoardsFromSpec(parsedWorkspaceSpec),
    selection: [],
    hover: undefined,
    leftPanelOpen: true,
    workspace: {
      id: workspace.id,
      title: workspace.name,
      slug: workspace.slug,
      spec: parsedWorkspaceSpec,
    },
    watchedContextNodes: {},
  }));

  const controller = createZustandStateController(store);
  registerStore("workspaceEngine", store);

  function getBentoLocation(
    engineState: UbentoEngineState,
  ): BentoLocation | undefined {
    const location = engineState.location;
    return location.board
      ? {
          boardId: location.board,
          params: location.params || {},
        }
      : undefined;
  }

  // Standalone functions here

  async function connect() {
    console.log("[workspace.connect]", id);
    store.setState({ status: "connected" });
    const engineState = appEngine.getState();
    const state = store.getState();
    const styleTag = document.getElementById("theme-variables");
    const themeCss = styleTag?.innerHTML || "";

    return {
      initialState: {
        location: getBentoLocation(engineState),
        workspace: state.workspace,
        user: {
          name: session.name,
          email: session.email,
        },
        theme: { css: themeCss },
      },
      registryModuleUrlTemplate: appEngine.registryModuleUrlTemplate,
    };
  }

  async function ready() {
    store.setState({ status: "ready" });
  }

  function goTo({ location }: { location?: BentoLocation }) {
    appEngine.goToLocation({
      board: location?.boardId,
      params: location?.params,
    });
  }

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
    const location = getBentoLocation(appEngine.getState());
    console.log("location changed", { location, rpc, id });
    rpc?.egress.setLocation({ location });

    // set copilot context attachments

    if (location) {
      const spec = getSpecOrDefault(store.getState().workspace.spec, {
        version: 1,
        services: {},
        components: {},
        libraries: {},
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
  const unsubscribeEngine = appEngine.subscribe(
    (curr: UbentoEngineState, prev: UbentoEngineState) => {
      if (
        curr.location.board !== prev.location.board ||
        !dequal(curr.location.params, prev.location.params)
      ) {
        handleLocationChange();
      }
    },
  );
  handleLocationChange();

  return {
    id,
    appEngine,
    logger,
    copilot,
    store,
    ...controller,

    connect,
    ready,
    goTo,
    updateWorkspace,
    installService,
    updateBoard,
    deleteBoard,
    createBoard,
    updateWorkspaceSpec,
    listComponents,
    describeComponents,
    getCatalog,
    setInteractionMode: async (mode: "edit" | "live") => {
      await rpc?.egress.setInteractionMode({ mode });
      store.setState({ mode });
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
        },
      });

      rpc.watch((event) => {
        console.log(`[host.rpc.event] ${event.type}`, event);
      });

      rpc.run();
    },

    destroy: () => {
      rpc?.dispose();
      unsubscribeEngine();
      unregisterStore("workspaceEngine");
      unsubscribeBoards();
      unsubscribeWorkspace();
      unsubscribeWorkspaceCopilot();
    },
  };
}

export type WorkspaceEngine = ReturnType<typeof createWorkspaceEngine>;
