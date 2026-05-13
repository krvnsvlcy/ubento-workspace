import { UbentoEngine, UbentoEngineState } from "@/engine/app/engine";
import { JsonPatch } from "@/utils/json";
import {
  BoardSpec,
  boardSpecSchema,
  ServiceData,
  WorkspaceSpec,
  workspaceSpecSchema,
} from "@ubento/bento.core";
import {
  BentoBoardData,
  BentoEngineHostRpcInterface,
  BentoEngineRuntimeRpcInterface,
  BentoLocation,
  BentoMode,
  BentoWorkspaceData,
  boardDataSchema,
  DropRect,
  ParsedSpec,
} from "@ubento/bento.runtime";
import { createDuplexRpc, createWindowPort, DuplexRpc } from "@ubento/rpc";
import { workspaceClient } from "@ubento/services.sdk";
import { createZustandStateController } from "@ubento/workspace.primitives";
import { registerStore, unregisterStore } from "@ubento/zustand-devtool";
import { dequal } from "dequal/lite";
import { applyPatch } from "fast-json-patch";
import debounce from "lodash.debounce";
import z from "zod";
import { createStore as createZustandStore } from "zustand/vanilla";
import { UbentoSession } from "../app/session";
import { copilotInstructions } from "../copilot/agents/copilot";
import { editorInstructions } from "../copilot/agents/editor";
import { explorerInstructions } from "../copilot/agents/explorer";
import { createUbentoCopilot } from "../copilot/copilot";
import { createCopilotAgentEnvironment } from "../copilot/environment/environment";
import { generateInitialBoardSpec } from "./init";
import { createCatalogToolkit } from "./toolkits/catalog";
import { createServicesToolkit } from "./toolkits/services";
import { createWorkspaceToolkit } from "./toolkits/workspace";

function parseSpecData<S extends z.ZodTypeAny>(
  schema: S,
  data: unknown,
): ParsedSpec<z.infer<S>> {
  const spec = schema.safeParse(data);
  if (!spec.success) {
    return {
      status: "invalid",
      data: data,
      errors: [String(spec.error)],
    };
  } else {
    return {
      status: "valid",
      data: spec.data,
    };
  }
}

export type WorkspaceState = {
  // status
  status: "pending" | "connected" | "ready" | "error";
  error?: any;

  // local state
  mode: BentoMode;
  workspace: BentoWorkspaceData;

  // synced from runtime
  boards: Record<string, BentoBoardData>;
  selectionScope?: string;
  selection: string[];
  hover?: string;

  // drag and drop
  dropRects: DropRect[];
  leftPanelOpen: boolean;
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
  console.log("create workspace engine", id);
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
    dropRects: [],
    leftPanelOpen: true,
    workspace: {
      id: workspace.id,
      title: workspace.name,
      slug: workspace.slug,
      spec: parseSpecData(workspaceSpecSchema, workspace.data),
    },
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
  const unsubscribeEngine = appEngine.subscribe(
    (curr: UbentoEngineState, prev: UbentoEngineState) => {
      // sync host location to runtime
      if (
        curr.location.board !== prev.location.board ||
        !dequal(curr.location.params, prev.location.params)
      ) {
        const location = getBentoLocation(curr);
        console.log("location changed", { location, rpc, id });
        rpc?.egress.setLocation({ location });

        // set copilot context attachments

        if (location) {
          copilot.setContextAttachments("bento-location", [
            {
              type: "bento-location",
              data: {
                ...location,
                boardTitle: store.getState().boards[location.boardId].title,
              },
            },
          ]);
        } else {
          copilot.setContextAttachments("bento-location", []);
        }
      }
    },
  );

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

  // update spec

  async function readBoardSpec({ boardId }: { boardId: string }) {
    const data = await readBoard({ boardId });
    return data.spec;
  }

  async function checkBoard({ boardId }: { boardId: string }) {
    const data = await readBoard({ boardId });
    const spec = data.spec;
    if (spec.status === "valid") {
      return await deepValidateBoard(spec.data);
    }
    return spec;
  }
  async function updateBoardSpec({
    boardId,
    patch,
  }: {
    boardId: string;
    patch: JsonPatch;
  }) {
    const data = await readBoard({ boardId });
    const updatedSpec = applyPatch(data.spec.data, patch).newDocument;
    const parsed = parseSpecData(boardSpecSchema, {
      ...(updatedSpec as any),
      id: boardId,
      title: data.title,
    });
    const validated =
      parsed.status === "valid" ? await deepValidateBoard(parsed.data) : parsed;

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
    const validated =
      parsed.status === "valid" ? await deepValidateBoard(parsed.data) : parsed;

    await writeBoard({
      ...data,
      spec: validated,
    });
  }

  async function deepValidateBoard(
    parsed: BoardSpec,
  ): Promise<ParsedSpec<BoardSpec>> {
    const components = (await rpc?.egress.getCatalog({})) as
      | Record<string, { schema: any }>
      | undefined;
    if (!components) {
      return { status: "valid", data: parsed };
    }

    let errors: string[] = [];

    for (const [elementId, element] of Object.entries(parsed.elements || {})) {
      const comp = components[element.component];
      if (!comp) {
        errors.push(
          `Component ${element.component} used by element ${elementId} not found`,
        );
        continue;
      }
      const schema = z.fromJSONSchema(comp.schema);
      const validated = schema.safeParse(element.inputs || {});
      if (!validated.success) {
        errors.push(
          ...validated.error.issues.map((e) => {
            return `Error in element ${elementId}: ${e.message}`;
          }),
        );
      }
    }

    if (errors.length > 0) {
      return { status: "invalid", errors, data: parsed };
    }
    return { status: "valid", data: parsed };
  }

  // Update metadata
  async function updateBoardMetadata({
    boardId,
    metadata,
  }: {
    boardId: string;
    metadata: Partial<Pick<BentoBoardData, "title">>;
  }) {
    await workspaceService.updateBoard(boardId, { name: metadata.title });
  }

  // delete board
  async function deleteBoard({ boardId }: { boardId: string }) {
    await workspaceService.deleteBoard(boardId);
  }

  // create board
  async function createBoard({
    name,
    parentId,
    spec,
  }: {
    name: string;
    parentId?: string;
    spec?: any;
  }) {
    const state = store.getState();
    const workspaceId = state.workspace.id;

    const result = await workspaceService.createBoard({
      name,
      parentId,
      workspace_id: workspaceId,
      data: generateInitialBoardSpec({ title: name }),
    });

    if (spec) {
      const parsed = parseSpecData(boardSpecSchema, {
        ...(spec as any),
        id: result.id,
        title: name,
      });
      const validated =
        parsed.status === "valid"
          ? await deepValidateBoard(parsed.data)
          : parsed;

      await workspaceService.updateBoard(result.id, {
        name,
        data: validated.data as any,
      });

      return {
        id: result.id,
        status: validated.status,
        errors: "errors" in validated ? (validated as any).errors : undefined,
      };
    }

    return {
      id: result.id,
      status: "valid",
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

  async function runQuery({
    service,
    query,
    params,
  }: {
    service: string;
    query: string;
    params?: Record<string, unknown>;
  }) {
    alert(`runQuery: ${service}.${query}`);
    throw new Error("runQuery not implemented");
  }

  async function runAction({
    service,
    action,
    params,
  }: {
    service: string;
    action: string;
    params?: Record<string, unknown>;
  }) {
    alert(`runAction: ${service}.${action}`);
    throw new Error("runAction not implemented");
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
    if (spec.status === "valid") {
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
          rpc?.egress.writeBoard({ boardId, data: { title: board.name } });
        }
      }
    },
  );

  const workspaceToolkit = createWorkspaceToolkit({
    goTo,
    getBoard,
    listBoards,
    readBoardSpec,
    updateBoardSpec,
    updateBoardMetadata,
    deleteBoard,
    createBoard,
    checkBoard,
  });
  const catalogToolkit = createCatalogToolkit({
    listComponents,
    describeComponents,
  });
  const servicesToolkit = createServicesToolkit({
    getServices: async () => {
      const spec = readWorkspaceSpec();
      return spec?.services;
    },
    getServiceSpec: async (serviceChannelId) => {
      return appEngine.ubento.sdk.vertex.getServiceChannelSpec(
        serviceChannelId,
      );
    },
  });
  const environment = createCopilotAgentEnvironment({
    session,
    ubento: appEngine.ubento,
    logger: logger.child({ module: "copilot" }),
    tools: [
      workspaceToolkit.tools.goToTool,
      workspaceToolkit.tools.getBoardTool,
      workspaceToolkit.tools.listBoardsTool,
      workspaceToolkit.tools.readBoardSpecTool,
      workspaceToolkit.tools.updateBoardSpecTool,
      workspaceToolkit.tools.updateBoardMetadataTool,
      workspaceToolkit.tools.deleteBoardTool,
      workspaceToolkit.tools.createBoardTool,
      workspaceToolkit.tools.checkBoardTool,
      catalogToolkit.tools.listComponents,
      catalogToolkit.tools.describeComponents,
      servicesToolkit.tools.listServices,
      servicesToolkit.tools.describeService,
      servicesToolkit.tools.describeActions,
      servicesToolkit.tools.describeQueries,
      servicesToolkit.tools.describeSchemas,
    ],
  });
  environment.addAgent({
    name: "copilot",
    description: "The primary WorkOS orchestration assistant (Supervisor)",
    instructions: copilotInstructions,
    tools: [workspaceToolkit.tools.goToTool.name],
    communicationInterface: "message",
  });
  environment.addAgent({
    name: "explorer",
    description:
      "Agent to gather information and discover components in the workspace",
    instructions: explorerInstructions,
    tools: [
      workspaceToolkit.tools.getBoardTool.name,
      workspaceToolkit.tools.listBoardsTool.name,
      workspaceToolkit.tools.readBoardSpecTool.name,
      catalogToolkit.tools.listComponents.name,
      catalogToolkit.tools.describeComponents.name,
      servicesToolkit.tools.listServices.name,
      servicesToolkit.tools.describeService.name,
      servicesToolkit.tools.describeActions.name,
      servicesToolkit.tools.describeQueries.name,
      servicesToolkit.tools.describeSchemas.name,
    ],
    communicationInterface: "response",
  });
  environment.addAgent({
    name: "editor",
    description: "Agent to edit the workspace and modify board specifications",
    instructions: editorInstructions,
    tools: [
      catalogToolkit.tools.listComponents.name,
      catalogToolkit.tools.describeComponents.name,
      workspaceToolkit.tools.getBoardTool.name,
      workspaceToolkit.tools.listBoardsTool.name,
      workspaceToolkit.tools.readBoardSpecTool.name,
      workspaceToolkit.tools.updateBoardSpecTool.name,
      workspaceToolkit.tools.updateBoardMetadataTool.name,
      workspaceToolkit.tools.deleteBoardTool.name,
      workspaceToolkit.tools.createBoardTool.name,
      workspaceToolkit.tools.checkBoardTool.name,
    ],
    communicationInterface: "response",
  });

  const copilot = createUbentoCopilot({
    environment,
    mainAgentName: "copilot",
  });

  // watch theme changes
  const handleThemeChanged = ((e: CustomEvent<{ css: string }>) => {
    rpc?.egress.setTheme({ css: e.detail.css });
  }) as EventListener;
  window.addEventListener("ubento:theme-changed", handleThemeChanged);

  return {
    id,
    appEngine,
    logger,
    copilot,
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
    updateBoardMetadata,
    deleteBoard,
    createBoard,
    updateWorkspaceSpec,

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
          runQuery,
          runAction,
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
      window.removeEventListener("ubento:theme-changed", handleThemeChanged);
    },
  };
}

export type WorkspaceEngine = ReturnType<typeof createWorkspaceEngine>;
