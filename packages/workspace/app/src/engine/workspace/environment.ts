import { BoardSpec, ServiceData } from "@ubento/bento.core";
import { ParsedSpec } from "@ubento/bento.runtime";
import {
  CopilotAgentEnvironment,
  createCopilotAgentEnvironment,
} from "../copilot/environment/environment";
import { UbentoService } from "@/services/ubento/ubento.js";
import { Logger } from "@ubento/telemetry";
import { UbentoSession } from "../app/session";
import { createWorkspaceToolkit } from "./toolkits/workspace";
import { createRuntimeToolkit } from "./toolkits/runtime";
import { createCatalogToolkit } from "./toolkits/catalog";
import { createServicesToolkit } from "./toolkits/services";
import { copilotInstructions } from "../copilot/agents/copilot";
import { explorerInstructions } from "../copilot/agents/explorer";
import { contextBuilderInstructions } from "../copilot/agents/context-builder";
import { uiBuilderInstructions } from "../copilot/agents/ui-builder";
import {
  boardResource,
  boardListResource,
  boardSpecResource,
  boardContextResource,
  resolvedBoardContextResource,
  boardUiResource,
  componentsListResource,
  componentDetailResource,
  servicesListResource,
  serviceDetailsResource,
  serviceActionResource,
  serviceQueryResource,
  serviceSchemaResource,
} from "./resources";

export type WorkspaceToolApi = {
  listComponents: () => Promise<unknown>;
  describeComponents: (names: string[]) => Promise<Record<string, unknown>>;
  focusBoard: (args: {
    location: { boardId: string; params: Record<string, string> };
  }) => Promise<void>;
  readNode: (selector: string) => Promise<string>;
  // events
  clickNode: (selector: string) => Promise<void>;
  setValue: (args: { selector: string; value: string }) => Promise<void>;
  getValue: (selector: string) => Promise<string>;
  // logs
  readLogs: (args: { from?: number; count?: number }) => Promise<string>;
  // state
  readContext: (path: string) => Promise<unknown>;
  getServices: () => Promise<Record<string, ServiceData> | undefined>;
  getServiceSpec: (serviceChannelId: string) => Promise<any>;
  goTo: (args: {
    location: { boardId: string; params: Record<string, string> };
  }) => void;
  // boards
  getBoard: (args: {
    boardId: string;
  }) => Promise<{ id: string; title: string; spec: any }>;
  listBoards: () => Promise<{ boards: Array<{ id: string; title: string }> }>;
  updateBoard: (args: {
    boardId: string;
    update: { title?: string };
  }) => Promise<void>;
  deleteBoard: (args: { boardId: string }) => Promise<void>;
  createBoard: (args: {
    title: string;
  }) => Promise<ParsedSpec<BoardSpec> & { boardId: string; id: string }>;
  // board specs
  readBoardSpec: (args: { boardId: string }) => Promise<any>;
  updateBoardSpec: (args: {
    boardId: string;
    patch: any[];
  }) => Promise<ParsedSpec<BoardSpec>>;
  resolveBoardContextSchema: (args: { boardId: string }) => Promise<any>;
};

export type WorkspaceCopilotAgentEnvironment = CopilotAgentEnvironment & {
  toolApi: WorkspaceToolApi;
};

export function createWorkspaceCopilotAgentEnvironment(
  api: WorkspaceToolApi,
  options: {
    ubento: UbentoService;
    session: UbentoSession;
    logger: Logger;
    workspaceId?: string;
  },
): WorkspaceCopilotAgentEnvironment {
  const workspaceToolkit = createWorkspaceToolkit({
    goTo: api.goTo,
    getBoard: api.getBoard,
    listBoards: api.listBoards,
    readBoardSpec: api.readBoardSpec,
    updateBoardSpec: api.updateBoardSpec,
    updateBoard: api.updateBoard,
    deleteBoard: api.deleteBoard,
    createBoard: api.createBoard,
    resolveBoardContextSchema: api.resolveBoardContextSchema,
  });

  const runtimeToolkit = createRuntimeToolkit({
    focusBoard: api.focusBoard,
    readNode: api.readNode,
    clickNode: api.clickNode,
    setValue: api.setValue,
    getValue: api.getValue,
    readLogs: api.readLogs,
    readContext: api.readContext,
  });

  const catalogToolkit = createCatalogToolkit({
    listComponents: api.listComponents,
    describeComponents: api.describeComponents,
  });

  const servicesToolkit = createServicesToolkit({
    getServices: api.getServices,
    getServiceSpec: api.getServiceSpec,
  });

  const environment = createCopilotAgentEnvironment({
    session: options.session,
    ubento: options.ubento,
    logger: options.logger.child({ module: "copilot" }),
    workspaceId: options.workspaceId,
    tools: [
      workspaceToolkit.tools.goToTool,
      workspaceToolkit.tools.getBoardTool,
      workspaceToolkit.tools.updateBoardSpecTool,
      workspaceToolkit.tools.updateBoardTool,
      workspaceToolkit.tools.deleteBoardTool,
      workspaceToolkit.tools.createBoardTool,
      // context
      workspaceToolkit.tools.updateBoardContextTool,
      workspaceToolkit.tools.checkBoardContextTool,
      workspaceToolkit.tools.readBoardContextTool,
      // ui
      workspaceToolkit.tools.readBoardUiTool,
      workspaceToolkit.tools.updateBoardUiTool,
      workspaceToolkit.tools.checkBoardUiTool,
      // spec
      workspaceToolkit.tools.listBoardsTool,
      workspaceToolkit.tools.readBoardSpecTool,
      workspaceToolkit.tools.checkBoardTool,
      //context
      workspaceToolkit.tools.getResolvedBoardContextTool,
      catalogToolkit.tools.listComponents,
      catalogToolkit.tools.describeComponents,
      servicesToolkit.tools.listServices,
      servicesToolkit.tools.describeService,
      servicesToolkit.tools.describeActions,
      servicesToolkit.tools.describeQueries,
      servicesToolkit.tools.describeSchemas,
      // runtime tools
      runtimeToolkit.tools.focusBoard,
      runtimeToolkit.tools.readNode,
      runtimeToolkit.tools.clickNode,
      runtimeToolkit.tools.setValue,
      runtimeToolkit.tools.getValue,
      runtimeToolkit.tools.readLogs,
      runtimeToolkit.tools.readContext,
      runtimeToolkit.tools.wait,
    ],
  });

  environment.addResourceType(boardResource as any);
  environment.addResourceType(boardListResource as any);
  environment.addResourceType(boardSpecResource as any);
  environment.addResourceType(boardContextResource as any);
  environment.addResourceType(resolvedBoardContextResource as any);
  environment.addResourceType(boardUiResource as any);
  environment.addResourceType(componentsListResource as any);
  environment.addResourceType(componentDetailResource as any);
  environment.addResourceType(servicesListResource as any);
  environment.addResourceType(serviceDetailsResource as any);
  environment.addResourceType(serviceActionResource as any);
  environment.addResourceType(serviceQueryResource as any);
  environment.addResourceType(serviceSchemaResource as any);

  environment.addAgent({
    name: "copilot",
    description: "The primary WorkOS orchestration assistant (Supervisor)",
    instructions: copilotInstructions,
    tools: [
      workspaceToolkit.tools.goToTool.name,
      workspaceToolkit.tools.createBoardTool.name,
      workspaceToolkit.tools.updateBoardTool.name,
      workspaceToolkit.tools.deleteBoardTool.name,
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
      runtimeToolkit.tools.focusBoard.name,
      runtimeToolkit.tools.wait.name,
      runtimeToolkit.tools.clickNode.name,
      runtimeToolkit.tools.setValue.name,
      runtimeToolkit.tools.getValue.name,
      runtimeToolkit.tools.readLogs.name,
      runtimeToolkit.tools.readContext.name,
      runtimeToolkit.tools.readNode.name,
    ],
    agents: ["context-builder", "ui-builder"],
    enableMessage: true,
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
      runtimeToolkit.tools.focusBoard.name,
      runtimeToolkit.tools.wait.name,
      runtimeToolkit.tools.clickNode.name,
      runtimeToolkit.tools.setValue.name,
      runtimeToolkit.tools.getValue.name,
      runtimeToolkit.tools.readLogs.name,
      runtimeToolkit.tools.readContext.name,
      runtimeToolkit.tools.readNode.name,
    ],
  });

  environment.addAgent({
    name: "context-builder",
    description:
      "Agent to build the board context including params, state, store, and services integration",
    instructions: contextBuilderInstructions,
    tools: [
      workspaceToolkit.tools.getBoardTool.name,
      workspaceToolkit.tools.listBoardsTool.name,
      workspaceToolkit.tools.readBoardContextTool.name,
      workspaceToolkit.tools.updateBoardContextTool.name,
      workspaceToolkit.tools.checkBoardContextTool.name,
      servicesToolkit.tools.listServices.name,
      servicesToolkit.tools.describeService.name,
      servicesToolkit.tools.describeActions.name,
      servicesToolkit.tools.describeQueries.name,
      servicesToolkit.tools.describeSchemas.name,
      runtimeToolkit.tools.focusBoard.name,
      runtimeToolkit.tools.wait.name,
      runtimeToolkit.tools.clickNode.name,
      runtimeToolkit.tools.setValue.name,
      runtimeToolkit.tools.getValue.name,
      runtimeToolkit.tools.readLogs.name,
      runtimeToolkit.tools.readContext.name,
      runtimeToolkit.tools.readNode.name,
    ],
  });

  environment.addAgent({
    name: "ui-builder",
    description:
      "Agent to build the board UI including elements and context integration",
    instructions: uiBuilderInstructions,
    tools: [
      workspaceToolkit.tools.getBoardTool.name,
      workspaceToolkit.tools.listBoardsTool.name,
      catalogToolkit.tools.listComponents.name,
      catalogToolkit.tools.describeComponents.name,
      workspaceToolkit.tools.readBoardUiTool.name,
      workspaceToolkit.tools.updateBoardUiTool.name,
      workspaceToolkit.tools.checkBoardUiTool.name,
      workspaceToolkit.tools.getResolvedBoardContextTool.name,
      runtimeToolkit.tools.readNode.name,
      runtimeToolkit.tools.clickNode.name,
      runtimeToolkit.tools.setValue.name,
      runtimeToolkit.tools.getValue.name,
      runtimeToolkit.tools.wait.name,
    ],
  });

  return Object.assign(environment, { toolApi: api }) as WorkspaceCopilotAgentEnvironment;
}
