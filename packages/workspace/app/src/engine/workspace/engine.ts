import { UbentoEngine, UbentoEngineState } from "@/engine/app/engine";
import { appModalRoutes } from "@/modals/app/routes";
import { ConfirmMutationModal } from "@/modals/confirm_mutation/confirm_mutation";
import { JsonPatch } from "@/utils/json";
import { createZustandStateController } from "@ubento/bento.arlo-core";
import {
  resolveBoardContextSchema as __resolveBoardContextSchema,
  BoardSpec,
  boardSpecSchema,
  FunctionSchema,
  ObjectNodeSchema,
  ServiceData,
  WorkspaceSpec,
  workspaceSpecSchema,
} from "@ubento/bento.core";
import {
  BentoBoardData,
  BentoEngineHostRpcInterface,
  BentoEngineRuntimeRpcInterface,
  BentoLocation,
  BentoWorkspaceData,
  boardDataSchema,
  DropRect,
  ParsedSpec,
  ServiceOperationErrorData,
  ServiceOperationResult,
  SpecIssue,
} from "@ubento/bento.runtime";
import { createDuplexRpc, createWindowPort, DuplexRpc } from "@ubento/rpc";
import { vertexClient, workspaceClient } from "@ubento/services.sdk";
import { OperationSpec, serviceSpecV1Schema } from "@ubento/vertex.core";
import { registerStore, unregisterStore } from "@ubento/zustand-devtool";
import { dequal } from "dequal/lite";
import { applyPatch } from "fast-json-patch";
import debounce from "lodash.debounce";
import z from "zod";
import { createStore as createZustandStore } from "zustand/vanilla";
import { UbentoSession } from "../app/session";
import { createUbentoCopilot } from "../copilot/copilot";
import { createWorkspaceCopilotAgentEnvironment } from "./environment";
import { generateInitialBoardSpec } from "./init";

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

export function extractBoardContext(spec: ParsedSpec<BoardSpec>) {
  const contextFields = new Set(["params", "state", "initialState", "store"]);
  let contextData = {};
  if (spec.data && typeof spec.data === "object") {
    contextData = {
      params: (spec.data as any)?.params,
      state: (spec.data as any)?.state,
      initialState: (spec.data as any)?.initialState,
      store: (spec.data as any)?.store,
    };
  }

  let contextIssues: SpecIssue[] = [];
  if (spec.issues) {
    contextIssues = spec.issues.filter((issue: SpecIssue) =>
      contextFields.has(issue.location[0]),
    );
  }

  return {
    isValid: contextIssues.length === 0,
    data: contextData,
    issues: contextIssues,
  };
}

export function resolveOperationSchema<THandlerSpec extends z.ZodType>(
  spec: OperationSpec<THandlerSpec>,
): FunctionSchema {
  const parameters: ObjectNodeSchema = {
    type: "object",
    properties: {},
    required: [],
  };

  // 1. Map args to parameter properties
  if (spec.args) {
    for (const [argName, argDef] of Object.entries(spec.args)) {
      // Cast the inferred schema to your standard schema AST type
      parameters.properties![argName] = argDef.schema as any;

      // By default, treat arguments as required unless explicitly marked false
      if (argDef.required !== false) {
        parameters.required!.push(argName);
      }
    }
  }

  // Clean up empty required arrays to keep the AST clean
  if (parameters.required && parameters.required.length === 0) {
    delete parameters.required;
  }

  // 2. Construct and return the FunctionSchema
  return {
    type: "function",
    parameters:
      Object.keys(parameters.properties || {}).length > 0
        ? parameters
        : { type: "object", properties: {} },
    returns: spec.schema as any,
  };
}

/**
 * Pre-flights JSON patches to ensure all intermediate parent paths exist.
 * Mutates the provided document directly.
 */
function ensureDeepPaths(document: any, patch: any) {
  // Ensure we are iterating over an array of operations
  const ops = Array.isArray(patch) ? patch : [patch];

  for (const op of ops) {
    // We only need to auto-populate for 'add' and 'replace' operations
    if (op.op === "add" || op.op === "replace") {
      // Split the path (e.g., "/settings/ui/theme" -> ["settings", "ui", "theme"])
      const parts = op.path.split("/").filter(Boolean);
      let current = document;

      // Iterate up to the second-to-last element (the parent of the target key)
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];

        // If the current level is missing, initialize it
        if (current[part] === undefined || current[part] === null) {
          // Smart heuristic: if the *next* key is a number, assume an array.
          // Otherwise, assume an object.
          const nextPart = parts[i + 1];
          current[part] = !isNaN(Number(nextPart)) ? [] : {};
        }

        // Move deeper into the tree
        current = current[part];
      }
    }
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
  boards: Record<string, BentoBoardData>;
  selectionScope?: string;
  selection: string[];
  hover?: string;

  // drag and drop
  dropRects: DropRect[];
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

  const store = createZustandStore<WorkspaceState>()(() => ({
    status: "pending",
    mode: "live",
    location: {
      boardId: appEngine.getState().location.board || "",
      params: appEngine.getState().location.params || {},
    },
    boards: {},
    selection: [],
    hover: undefined,
    dropRects: [],
    leftPanelOpen: true,
    workspace: {
      id: workspace.id,
      title: workspace.name,
      slug: workspace.slug,
      spec: parseSpecData(workspaceSpecSchema, workspace.data),
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

  async function getBoard({ boardId }: { boardId: string }) {
    const data = await workspaceService.getBoard(boardId);
    return {
      id: data.id,
      title: data.name,
      spec: parseSpecData(boardDataSchema, data.data),
    };
  }

  async function listBoards() {
    const res = await workspaceService.listBoards({
      workspaceId: workspace.id,
    });
    const boards = res.data
      .map((b) => {
        return {
          id: b.id,
          title: b.name,
          spec: parseSpecData(boardDataSchema, b.data),
        };
      })
      .filter((b) => !!b);
    return {
      boards,
      nextCursor: res.nextPage?.cursor,
    };
  }

  async function listComponents() {
    return rpc?.egress.listComponents({}) || [];
  }

  async function describeComponents(names: string[]) {
    return rpc?.egress.describeComponents({ names }) || {};
  }

  async function getCatalog() {
    return (await rpc?.egress.getCatalog({})) as
      | Record<
          string,
          {
            props: any;
            events?: any;
            bindings?: any;
            summary?: string;
            instruction?: string;
          }
        >
      | undefined;
  }

  async function updateWorkspace(data: Partial<WorkspaceState>) {
    const current = store.getState().workspace;
    if (!current) return;
    const updated = { ...current, ...data } as any;
    await workspaceService.updateWorkspace(current.id, updated);
    store.setState({ workspace: updated });
  }

  async function readBoard({ boardId }: { boardId: string }) {
    let boardData = await rpc?.egress.readBoard({ boardId });
    if (!boardData) {
      boardData = await getBoard({ boardId });
    }
    return boardData;
  }
  async function writeBoard(data: BentoBoardData) {
    await rpc?.egress.writeBoard({ boardId: data.id, data });
  }

  async function resolveBoardContextSchema({ boardId }: { boardId: string }) {
    const board = await readBoardSpec({ boardId });
    const context = extractBoardContext(board);
    return __resolveBoardContextSchema({
      spec: context.data,
      getServiceOperationSchema: async ({ type, name, service }) => {
        const serviceSpec = await getServiceSpecForService(service);
        if (!serviceSpec || !serviceSpec.isValid) return { type: "function" };
        const specData = serviceSpec.data;
        if (type === "query") {
          const operationSchema = specData.queries?.[name];
          if (!operationSchema) return { type: "function" };
          return resolveOperationSchema(operationSchema);
        } else if (type === "action") {
          const operationSchema = specData.actions?.[name];
          if (!operationSchema) return { type: "function" };
          return resolveOperationSchema(operationSchema);
        }
        return { type: "function" };
      },
    });
  }

  // update spec

  async function readBoardSpec({ boardId }: { boardId: string }) {
    const data = await readBoard({ boardId });
    return data.spec;
  }

  async function checkBoard({ boardId }: { boardId: string }) {
    const data = await readBoard({ boardId });
    const spec = data.spec;
    if (spec.isValid) {
      return await deepValidateBoard(spec.data);
    }
    return spec;
  }
  async function updateBoardSpec({
    boardId,
    patch,
  }: {
    boardId: string;
    patch: JsonPatch; // Assuming this is an array of patch operations
  }) {
    const data = await readBoard({ boardId });

    // 1. Deep clone the data to avoid mutating the original read cache
    // (structuredClone is native in Node 17+ and modern browsers)
    const draftSpec =
      typeof structuredClone === "function"
        ? structuredClone(data.spec.data)
        : JSON.parse(JSON.stringify(data.spec.data));

    // 2. Pre-fill any missing intermediate paths
    ensureDeepPaths(draftSpec, patch);

    // 3. Safely apply the patch now that the tree structure is guaranteed
    const updatedSpec = applyPatch(draftSpec, patch).newDocument;

    // 4. Proceed with your existing parsing and validation logic
    const parsed = parseSpecData(boardSpecSchema, {
      ...(updatedSpec as any),
      id: boardId,
      title: data.title,
    });

    const validated = parsed.isValid
      ? await deepValidateBoard(parsed.data)
      : parsed;

    await writeBoard({
      ...data,
      spec: validated,
    });

    return validated;
  }
  async function writeBoardSpec({
    boardId,
    spec,
  }: {
    boardId: string;
    spec: any;
  }) {
    const data = await readBoard({ boardId });
    let parsed = parseSpecData(boardSpecSchema, {
      ...(spec as any),
      id: boardId,
      title: data.title,
    });
    const validated = parsed.isValid
      ? await deepValidateBoard(parsed.data)
      : parsed;

    await writeBoard({
      ...data,
      spec: validated,
    });
  }

  async function deepValidateBoard(
    parsed: BoardSpec,
  ): Promise<ParsedSpec<BoardSpec>> {
    // Replace with your actual RPC call
    const components = (await rpc?.egress.getCatalog({})) as
      | Record<string, { props: any; events?: any; bindings?: any }>
      | undefined;

    if (!components) {
      return { isValid: true, data: parsed, issues: [] };
    }

    const issues: SpecIssue[] = [];

    for (const [elementId, element] of Object.entries(parsed.elements || {})) {
      const comp = components[element.component];
      if (!comp) {
        issues.push({
          location: ["elements", elementId],
          message: `Component ${element.component} used by element ${elementId} not found`,
        });
        continue;
      }

      const schema = z.fromJSONSchema(comp.props);
      const rawProps = element.props || {};
      const validated = schema.safeParse(rawProps);

      if (!validated.success) {
        for (const issue of validated.error.issues) {
          // 1. Traverse the raw props object using Zod's error path
          let valueAtPath: any = rawProps;
          for (const key of issue.path) {
            if (valueAtPath && typeof valueAtPath === "object") {
              valueAtPath = valueAtPath[key];
            } else {
              valueAtPath = undefined;
              break;
            }
          }

          // 2. Check if the rejected value perfectly matches the Ubento directive shape
          const isUseDirective =
            valueAtPath &&
            typeof valueAtPath === "object" &&
            "$use" in valueAtPath &&
            typeof valueAtPath.$use === "string" &&
            Object.keys(valueAtPath).length === 1; // Strict check to prevent bloated objects

          const isEvalDirective =
            valueAtPath &&
            typeof valueAtPath === "object" &&
            "$eval" in valueAtPath &&
            typeof valueAtPath.$eval === "string" &&
            Object.keys(valueAtPath).length === 1;

          const isRunDirective =
            valueAtPath &&
            typeof valueAtPath === "object" &&
            "$run" in valueAtPath &&
            typeof valueAtPath.$run === "string" &&
            Object.keys(valueAtPath).length === 1;

          const isDirective =
            isUseDirective || isEvalDirective || isRunDirective;

          // 3. Only register the error if it is NOT a directive
          if (!isDirective) {
            issues.push({
              location: ["elements", elementId, ...issue.path.map(String)],
              message: issue.message,
            });
          }
        }
      }
    }

    if (issues.length > 0) {
      return { isValid: false, issues: issues, data: parsed };
    }
    return { isValid: true, data: parsed };
  }
  // Update metadata
  async function updateBoard({
    boardId,
    update,
  }: {
    boardId: string;
    update: Partial<Pick<BentoBoardData, "title">> &
      Partial<{ parentId: string | null; index: string | null }>;
  }) {
    await workspaceService.updateBoard(boardId, {
      name: update.title,
      parentId: update.parentId,
      index: update.index,
    });
  }

  // delete board
  async function deleteBoard({ boardId }: { boardId: string }) {
    await workspaceService.deleteBoard(boardId);
  }

  // create board
  async function createBoard({
    title,
    parentId,
    spec,
    index,
  }: {
    title: string;
    parentId?: string | null;
    spec?: any;
    index?: string | null;
  }): Promise<ParsedSpec<BoardSpec> & { boardId: string; id: string }> {
    const state = store.getState();
    const workspaceId = state.workspace.id;

    const parsed = parseSpecData(boardSpecSchema, {
      ...(spec || generateInitialBoardSpec()),
      title: title,
    });
    const validated = parsed.isValid
      ? await deepValidateBoard(parsed.data)
      : parsed;

    const board = await workspaceService.createBoard({
      name: title,
      parentId,
      workspace_id: workspaceId,
      data: validated.data as any,
      index,
    });

    return {
      ...validated,
      boardId: board.id,
      id: board.id,
    };
  }

  const persistBoard = debounce(async (data: BentoBoardData) => {
    await workspaceService.updateBoard(data.id, {
      name: data.title,
      data: data.spec.data as any,
    });
  }, 1000);
  function boardUpdated({ data }: { data: BentoBoardData }) {
    store.setState((state) => {
      const boards = state.boards;
      boards[data.id] = data;
      return { boards };
    });
    persistBoard(data);
  }

  function selectionUpdated({ selection }: { selection: string[] }) {
    store.setState({ selection });
  }

  function hoverUpdated({ hovered }: { hovered?: string }) {
    store.setState({ hover: hovered });
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
    if (dequal(state.workspace, prevState.workspace)) return;
    persistWorkspace(state.workspace);
  });
  function readWorkspaceSpec() {
    const state = store.getState();
    const spec = state.workspace.spec;
    if (spec.isValid) {
      return spec.data;
    }
    return undefined;
  }
  function updateWorkspaceSpec({ spec }: { spec: Partial<WorkspaceSpec> }) {
    store.setState((state) => {
      const workspaceData = state.workspace;
      const currentSpec = workspaceData.spec.data;
      return {
        workspace: {
          ...workspaceData,
          spec: parseSpecData(workspaceSpecSchema, {
            ...(currentSpec || {}),
            ...spec,
          }),
        },
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

  // watch boards
  const unsubscribeBoards = workspaceService.boardStore.store.subscribe(
    async (state, prevState) => {
      for (const boardId in state.data) {
        const board = state.data[boardId];
        const prevBoard = prevState.data[boardId];
        if (board.name !== prevBoard?.name) {
          const data = await readBoard({ boardId });
          rpc?.egress.writeBoard({
            boardId,
            data: { ...data, title: board.name },
          });
        }
      }
    },
  );

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
      readContext: async (path) => {
        if (!rpc) throw new Error("Runtime connection not established");
        return await rpc.egress.readContext({ path });
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
      getBoard,
      listBoards,
      updateBoard,
      deleteBoard,
      createBoard,
      readBoardSpec,
      updateBoardSpec,
      resolveBoardContextSchema,
    },
    {
      session,
      ubento: appEngine.ubento,
      logger,
      workspaceId: store.getState().workspace.id,
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
      copilot.setContextAttachments("bento-location", [
        {
          type: "bento-location",
          data: {
            ...location,
            boardTitle: store.getState().boards[location.boardId]?.title,
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
    getBoard,
    listBoards,
    updateWorkspace,
    installService,
    readBoardSpec,
    checkBoard,
    updateBoardSpec,
    writeBoardSpec,
    updateBoard,
    deleteBoard,
    createBoard,
    updateWorkspaceSpec,
    resolveBoardContextSchema,
    listComponents,
    describeComponents,
    getCatalog,
    setInteractionMode: async (mode: "edit" | "live") => {
      await rpc?.egress.setInteractionMode({ mode });
      store.setState({ mode });
    },
    select: async (selection: string[]) => {
      await rpc?.egress.select({ selection });
    },
    hover: async (elementId: string) => {
      await rpc?.egress.hover({ elementId });
    },
    unhover: async (elementId: string) => {
      await rpc?.egress.unhover({ elementId });
    },
    watchContextNode: async (path: string) => {
      if (!rpc) return "";
      return await rpc.egress.watchContextNode({ path });
    },
    unwatchContextNode: async (key: string, path?: string) => {
      if (!rpc) return;
      await rpc.egress.unwatchContextNode({ key });
      if (path) {
        store.setState((state) => {
          const next = { ...state.watchedContextNodes };
          delete next[path];
          return { watchedContextNodes: next };
        });
      }
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
          getBoard,
          listBoards,
          boardUpdated,
          selectionUpdated,
          hoverUpdated,
          contextNodeUpdated: async ({ path, data }) => {
            store.setState((state) => ({
              watchedContextNodes: {
                ...state.watchedContextNodes,
                [path]: data,
              },
            }));
          },
          runServiceOperation,
          createBoard: async (args) => {
            const title = args?.title || "";
            const result = await createBoard({
              title,
              parentId: (args as any)?.parentId,
              spec: args?.spec,
              index: (args as any)?.index,
            });
            return await getBoard({ boardId: result.id });
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
