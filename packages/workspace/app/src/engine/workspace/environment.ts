import { UbentoService } from "@/services/ubento/ubento.js";
import {
  ParsedSpec,
  ServiceData,
  WorkspaceBoardSpec,
  WorkspaceSpec,
} from "@ubento/bento.runtime";
import { Logger } from "@ubento/telemetry";
import { UbentoSession } from "../app/session";
import { copilotInstructions } from "../copilot/agents/copilot";
import { codebaseInvestigatorInstructions } from "../copilot/agents/codebase_investigator";
import { browserAgentInstructions } from "../copilot/agents/browser_agent";
import { generalistAgentInstructions } from "../copilot/agents/generalist_agent";
import {
  CopilotAgentEnvironment,
  createCopilotAgentEnvironment,
} from "../copilot/environment/environment";
import {
  componentDetailResource,
  componentsListResource,
  planModeResource,
  serviceActionResource,
  serviceDetailsResource,
  serviceQueryResource,
  serviceSchemaResource,
  servicesListResource,
  tasksResource,
} from "./resources";
import { createCatalogToolkit } from "./toolkits/catalog";
import { createModuleToolkit } from "./toolkits/module";
import { createRuntimeToolkit } from "./toolkits/runtime";
import { createServicesToolkit } from "./toolkits/services";
import { createWorkspaceToolkit } from "./toolkits/workspace";



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
  getServices: () => Promise<Record<string, ServiceData> | undefined>;
  getServiceSpec: (serviceChannelId: string) => Promise<any>;
  goTo: (args: {
    location: { boardId: string; params: Record<string, string> };
  }) => void;
  updateBoard: (args: {
    boardId: string;
    update: { title?: string };
  }) => Promise<void>;
  deleteBoard: (args: { boardId: string }) => Promise<void>;
  createBoard: (args: { title: string }) => Promise<WorkspaceBoardSpec>;
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
    getWorkspaceSpec: () => ParsedSpec<WorkspaceSpec> | undefined;
    updateWorkspaceSpec: (spec: WorkspaceSpec) => Promise<void>;
  },
): WorkspaceCopilotAgentEnvironment {
  const workspaceToolkit = createWorkspaceToolkit(api);

  const runtimeToolkit = createRuntimeToolkit(api);

  const catalogToolkit = createCatalogToolkit(api);

  const servicesToolkit = createServicesToolkit(api);

  const moduleToolkit = createModuleToolkit({
    ubento: options.ubento,
    getWorkspaceSpec: () => {
      const spec = options.getWorkspaceSpec();
      return spec?.isValid ? spec.data : undefined;
    },
    updateWorkspaceSpec: options.updateWorkspaceSpec,
  });

  const environment = createCopilotAgentEnvironment({
    session: options.session,
    ubento: options.ubento,
    logger: options.logger.child({ module: "copilot" }),
    workspaceId: options.workspaceId,
    tools: [
      workspaceToolkit.tools.goToTool,
      workspaceToolkit.tools.updateBoardTool,
      workspaceToolkit.tools.deleteBoardTool,
      workspaceToolkit.tools.createBoardTool,
      // services
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
      runtimeToolkit.tools.wait,
      // modules
      moduleToolkit.tools.readBoardModule,
      moduleToolkit.tools.writeBoardModule,
      moduleToolkit.tools.editBoardModule,
    ],
  });


  environment.addResourceType(componentsListResource as any);
  environment.addResourceType(componentDetailResource as any);
  environment.addResourceType(servicesListResource as any);
  environment.addResourceType(serviceDetailsResource as any);
  environment.addResourceType(serviceActionResource as any);
  environment.addResourceType(serviceQueryResource as any);
  environment.addResourceType(serviceSchemaResource as any);
  environment.addResourceType(planModeResource as any);
  environment.addResourceType(tasksResource as any);

  environment.addAgent({
    name: "copilot",
    description: "The primary WorkOS orchestration assistant (Supervisor)",
    instructions: copilotInstructions,
    agents: ["codebase_investigator", "browser_agent", "generalist"],
    tools: [
      workspaceToolkit.tools.goToTool.name,
      workspaceToolkit.tools.createBoardTool.name,
      workspaceToolkit.tools.updateBoardTool.name,
      workspaceToolkit.tools.deleteBoardTool.name,
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
      runtimeToolkit.tools.readNode.name,
      moduleToolkit.tools.readBoardModule.name,
      moduleToolkit.tools.writeBoardModule.name,
      moduleToolkit.tools.editBoardModule.name,
      "enter_plan_mode",
      "approve_plan",
      "create_task",
      "update_task",
      "list_tasks",
      "add_task_dependency",
      "visualize_tasks",
    ],
    enableMessage: true,
  });


  environment.addAgent({
    name: "codebase_investigator",
    description: "Specialized in codebase analysis, architectural mapping, and reverse-engineering workspace modules and services",
    instructions: codebaseInvestigatorInstructions,
    tools: [
      servicesToolkit.tools.listServices.name,
      servicesToolkit.tools.describeService.name,
      servicesToolkit.tools.describeActions.name,
      servicesToolkit.tools.describeQueries.name,
      servicesToolkit.tools.describeSchemas.name,
      moduleToolkit.tools.readBoardModule.name,
      moduleToolkit.tools.editBoardModule.name,
      runtimeToolkit.tools.readLogs.name,
    ],
    enableMessage: true,
  });

  environment.addAgent({
    name: "browser_agent",
    description: "Specialized in real-time browser automation, user flow execution, and live UI/UX verification",
    instructions: browserAgentInstructions,
    tools: [
      workspaceToolkit.tools.goToTool.name,
      moduleToolkit.tools.readBoardModule.name,
      moduleToolkit.tools.writeBoardModule.name,
      moduleToolkit.tools.editBoardModule.name,
      catalogToolkit.tools.listComponents.name,
      catalogToolkit.tools.describeComponents.name,
      runtimeToolkit.tools.focusBoard.name,
      runtimeToolkit.tools.readNode.name,
      runtimeToolkit.tools.clickNode.name,
      runtimeToolkit.tools.setValue.name,
      runtimeToolkit.tools.getValue.name,
      runtimeToolkit.tools.wait.name,
      runtimeToolkit.tools.readLogs.name,
    ],
    enableMessage: true,
  });

  environment.addAgent({
    name: "generalist",
    description: "A general-purpose AI agent with access to all tools, recommended for turn-intensive tasks or batch refactoring",
    instructions: generalistAgentInstructions,
    tools: [
      workspaceToolkit.tools.goToTool.name,
      workspaceToolkit.tools.updateBoardTool.name,
      workspaceToolkit.tools.deleteBoardTool.name,
      workspaceToolkit.tools.createBoardTool.name,
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
      runtimeToolkit.tools.readNode.name,
      moduleToolkit.tools.readBoardModule.name,
      moduleToolkit.tools.writeBoardModule.name,
      moduleToolkit.tools.editBoardModule.name,
      "enter_plan_mode",
      "approve_plan",
      "create_task",
      "update_task",
      "list_tasks",
      "add_task_dependency",
      "visualize_tasks",
    ],
    enableMessage: true,
  });

  return Object.assign(environment, {
    toolApi: api,
  }) as WorkspaceCopilotAgentEnvironment;
}

