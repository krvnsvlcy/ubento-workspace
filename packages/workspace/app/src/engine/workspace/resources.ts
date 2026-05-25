import { BoardSpec } from "@ubento/bento.core";
import { ParsedSpec, SpecIssue } from "@ubento/bento.runtime";
import { ResourceType } from "@ubento/workspace.agent";
import { ServiceSpecV1, serviceSpecV1Schema } from "@ubento/vertex.core";
import { WorkspaceCopilotAgentEnvironment } from "./environment";
import { extractBoardContext } from "./engine";

export const extractBoardUi = (spec: ParsedSpec<BoardSpec>) => {
  const uiFields = new Set(["elements", "children", "style"]);
  let uiData = {};
  if (spec.data && typeof spec.data === "object") {
    uiData = {
      elements: (spec.data as any)?.elements,
      children: (spec.data as any)?.children,
      style: (spec.data as any)?.style,
    };
  }

  let uiIssues: SpecIssue[] = [];
  if (spec.issues) {
    uiIssues = spec.issues.filter((issue: SpecIssue) =>
      uiFields.has(issue.location[0]),
    );
  }

  return {
    isValid: uiIssues.length === 0,
    data: uiData,
    issues: uiIssues,
  };
};

export type SummarizedServiceSpec = {
  type: string;
  description?: string;
  schemas: string[];
  queries: string[];
  actions: string[];
};

function summarizeServiceSpec(spec: ServiceSpecV1): SummarizedServiceSpec {
  return {
    type: spec.type,
    description: spec.description,
    schemas: spec.schemas ? Object.keys(spec.schemas) : [],
    queries: spec.queries ? Object.keys(spec.queries) : [],
    actions: spec.actions ? Object.keys(spec.actions) : [],
  };
}

export type BoardResourceType = ResourceType<
  { id: string },
  WorkspaceCopilotAgentEnvironment
>;

export const boardResource: BoardResourceType = {
  type: "board",
  resolveData: async ({ data, environment }) => {
    const board = await environment.toolApi.getBoard({ boardId: data.id });
    return board;
  },
};

export type BoardListResourceType = ResourceType<
  any,
  WorkspaceCopilotAgentEnvironment
>;

export const boardListResource: BoardListResourceType = {
  type: "board_list",
  resolveData: async ({ environment }) => {
    const result = await environment.toolApi.listBoards();
    return result;
  },
};

export type BoardSpecResourceType = ResourceType<
  { boardId: string },
  WorkspaceCopilotAgentEnvironment
>;

export const boardSpecResource: BoardSpecResourceType = {
  type: "board_spec",
  resolveData: async ({ data, environment }) => {
    const spec = await environment.toolApi.readBoardSpec({ boardId: data.boardId });
    return spec;
  },
};

export type BoardContextResourceType = ResourceType<
  { boardId: string },
  WorkspaceCopilotAgentEnvironment
>;

export const boardContextResource: BoardContextResourceType = {
  type: "board_context",
  resolveData: async ({ data, environment }) => {
    const spec = await environment.toolApi.readBoardSpec({ boardId: data.boardId });
    return extractBoardContext(spec);
  },
};

export type ResolvedBoardContextResourceType = ResourceType<
  { boardId: string },
  WorkspaceCopilotAgentEnvironment
>;

export const resolvedBoardContextResource: ResolvedBoardContextResourceType = {
  type: "resolved_board_context",
  resolveData: async ({ data, environment }) => {
    const result = await environment.toolApi.resolveBoardContextSchema({ boardId: data.boardId });
    return result;
  },
};

export type BoardUiResourceType = ResourceType<
  { boardId: string },
  WorkspaceCopilotAgentEnvironment
>;

export const boardUiResource: BoardUiResourceType = {
  type: "board_ui",
  resolveData: async ({ data, environment }) => {
    const spec = await environment.toolApi.readBoardSpec({ boardId: data.boardId });
    return extractBoardUi(spec);
  },
};

// ==========================================
// Catalog Resources
// ==========================================

export type ComponentsListResourceType = ResourceType<
  any,
  WorkspaceCopilotAgentEnvironment
>;

export const componentsListResource: ComponentsListResourceType = {
  type: "component_list",
  resolveData: async ({ environment }) => {
    const components = await environment.toolApi.listComponents();
    return { components };
  },
};

export type ComponentDetailResourceType = ResourceType<
  { name: string },
  WorkspaceCopilotAgentEnvironment
>;

export const componentDetailResource: ComponentDetailResourceType = {
  type: "component_detail",
  resolveData: async ({ data, environment }) => {
    const details = await environment.toolApi.describeComponents([data.name]);
    return details;
  },
};

// ==========================================
// Services Resources
// ==========================================

export type ServicesListResourceType = ResourceType<
  any,
  WorkspaceCopilotAgentEnvironment
>;

export const servicesListResource: ServicesListResourceType = {
  type: "services_list",
  resolveData: async ({ environment }) => {
    const services = await environment.toolApi.getServices();
    const serviceNames = services ? Object.keys(services) : [];
    return { services: serviceNames };
  },
};

export type ServiceDetailsResourceType = ResourceType<
  { name: string },
  WorkspaceCopilotAgentEnvironment
>;

export const serviceDetailsResource: ServiceDetailsResourceType = {
  type: "service_details",
  resolveData: async ({ data, environment }) => {
    const services = await environment.toolApi.getServices();
    const service = services ? services[data.name] : undefined;
    if (!service) {
      throw new Error(`Service "${data.name}" not found.`);
    }
    const serviceSpec = await environment.toolApi.getServiceSpec(service.channelId);
    const parsed = serviceSpecV1Schema.safeParse(serviceSpec);
    if (!parsed.success) {
      throw new Error(`Invalid service spec for ${data.name}.`);
    }
    return summarizeServiceSpec(parsed.data) as any;
  },
};

export type ServiceActionResourceType = ResourceType<
  { service: string; action: string },
  WorkspaceCopilotAgentEnvironment
>;

export const serviceActionResource: ServiceActionResourceType = {
  type: "service_action",
  resolveData: async ({ data, environment }) => {
    const services = await environment.toolApi.getServices();
    const service = services ? services[data.service] : undefined;
    if (!service) {
      throw new Error(`Service "${data.service}" not found.`);
    }
    const serviceSpec = await environment.toolApi.getServiceSpec(service.channelId);
    const parsed = serviceSpecV1Schema.safeParse(serviceSpec);
    if (!parsed.success) {
      throw new Error(`Invalid service spec for ${data.service}.`);
    }
    const actions = parsed.data.actions || {};
    const action = actions[data.action];
    if (!action) {
      throw new Error(`Action "${data.action}" not found in service "${data.service}".`);
    }
    return { [data.action]: action };
  },
};

export type ServiceQueryResourceType = ResourceType<
  { service: string; query: string },
  WorkspaceCopilotAgentEnvironment
>;

export const serviceQueryResource: ServiceQueryResourceType = {
  type: "service_query",
  resolveData: async ({ data, environment }) => {
    const services = await environment.toolApi.getServices();
    const service = services ? services[data.service] : undefined;
    if (!service) {
      throw new Error(`Service "${data.service}" not found.`);
    }
    const serviceSpec = await environment.toolApi.getServiceSpec(service.channelId);
    const parsed = serviceSpecV1Schema.safeParse(serviceSpec);
    if (!parsed.success) {
      throw new Error(`Invalid service spec for ${data.service}.`);
    }
    const queries = parsed.data.queries || {};
    const query = queries[data.query];
    if (!query) {
      throw new Error(`Query "${data.query}" not found in service "${data.service}".`);
    }
    return { [data.query]: query };
  },
};

export type ServiceSchemaResourceType = ResourceType<
  { service: string; schema: string },
  WorkspaceCopilotAgentEnvironment
>;

export const serviceSchemaResource: ServiceSchemaResourceType = {
  type: "service_schema",
  resolveData: async ({ data, environment }) => {
    const services = await environment.toolApi.getServices();
    const service = services ? services[data.service] : undefined;
    if (!service) {
      throw new Error(`Service "${data.service}" not found.`);
    }
    const serviceSpec = await environment.toolApi.getServiceSpec(service.channelId);
    const parsed = serviceSpecV1Schema.safeParse(serviceSpec);
    if (!parsed.success) {
      throw new Error(`Invalid service spec for ${data.service}.`);
    }
    const schemas = parsed.data.schemas || {};
    const schema = schemas[data.schema];
    if (!schema) {
      throw new Error(`Schema "${data.schema}" not found in service "${data.service}".`);
    }
    return { [data.schema]: schema };
  },
};
