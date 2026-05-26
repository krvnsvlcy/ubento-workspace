import { UbentoService } from "@/services/ubento/ubento.js";
import { BoardSpec, ServiceData, WorkspaceSpec } from "@ubento/bento.core";
import { ParsedSpec } from "@ubento/bento.runtime";
import { Logger } from "@ubento/telemetry";
import { UbentoSession } from "../app/session";
import { copilotInstructions } from "../copilot/agents/copilot";
import {
  CopilotAgentEnvironment,
  createCopilotAgentEnvironment,
} from "../copilot/environment/environment";
import {
  componentDetailResource,
  componentsListResource,
  serviceActionResource,
  serviceDetailsResource,
  serviceQueryResource,
  serviceSchemaResource,
  servicesListResource,
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
  createBoard: (args: {
    title: string;
  }) => Promise<ParsedSpec<BoardSpec> & { boardId: string; id: string }>;
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
  const workspaceToolkit = createWorkspaceToolkit({
    goTo: api.goTo,
    updateBoard: api.updateBoard,
    deleteBoard: api.deleteBoard,
    createBoard: api.createBoard,
  });

  const runtimeToolkit = createRuntimeToolkit({
    focusBoard: api.focusBoard,
    readNode: api.readNode,
    clickNode: api.clickNode,
    setValue: api.setValue,
    getValue: api.getValue,
    readLogs: api.readLogs,
  });

  const catalogToolkit = createCatalogToolkit({
    listComponents: api.listComponents,
    describeComponents: api.describeComponents,
  });

  const servicesToolkit = createServicesToolkit({
    getServices: api.getServices,
    getServiceSpec: api.getServiceSpec,
  });

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
    ],
  });

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
    ],
    enableMessage: true,
  });

  return Object.assign(environment, {
    toolApi: api,
  }) as WorkspaceCopilotAgentEnvironment;
}
