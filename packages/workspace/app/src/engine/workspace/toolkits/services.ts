import { ServiceData } from "@ubento/bento.core";
import { ServiceSpecV1, serviceSpecV1Schema } from "@ubento/vertex.core";
import {
  AgentTool,
  createLocalToolkit,
  renderYaml,
} from "@ubento/workspace.agent";
import z from "zod";

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

export const createServicesToolkit = ({
  getServices,
  getServiceSpec,
}: {
  getServices: () => Promise<Record<string, ServiceData> | undefined>;
  getServiceSpec: (serviceChannelId: string) => Promise<any>;
}) => {
  const listServicesTool: AgentTool = {
    name: "list_services",
    description: "List all installed services in the workspace.",
    args: z.object({}),
    run: async () => {
      const services = await getServices();
      const serviceNames = services ? Object.keys(services) : [];
      return {
        content: [{ type: "text", text: renderYaml(serviceNames) }],
      };
    },
  };

  const describeServiceArgs = z.object({
    name: z.string().describe("The name of the service to describe"),
  });

  const describeServiceTool: AgentTool<typeof describeServiceArgs> = {
    name: "describe_service",
    description: "Get summary information about a specific installed service.",
    args: describeServiceArgs,
    run: async ({ args }) => {
      const services = await getServices();
      const service = services ? services[args.name] : undefined;

      if (!service) {
        return {
          content: [
            { type: "text", text: `Service "${args.name}" not found.` },
          ],
        };
      }

      const serviceSpec = await getServiceSpec(service.channelId);
      const parsed = serviceSpecV1Schema.safeParse(serviceSpec);
      if (!parsed.success) {
        return {
          content: [
            { type: "text", text: `Invalid service spec for ${args.name}.` },
          ],
        };
      }

      const summarized = summarizeServiceSpec(parsed.data);

      return {
        content: [{ type: "text", text: renderYaml(summarized) }],
        structuredContent: summarized,
      };
    },
  };

  const describeActionsArgs = z.object({
    service: z.string().describe("The name of the service"),
    actions: z
      .array(z.string())
      .describe("The names of the actions to describe"),
  });

  const describeActionsTool: AgentTool<typeof describeActionsArgs> = {
    name: "describe_actions",
    description:
      "Get detailed information about specific actions of a service.",
    args: describeActionsArgs,
    run: async ({ args }) => {
      const services = await getServices();
      const service = services ? services[args.service] : undefined;

      if (!service) {
        return {
          content: [
            { type: "text", text: `Service "${args.service}" not found.` },
          ],
        };
      }

      const serviceSpec = await getServiceSpec(service.channelId);
      const parsed = serviceSpecV1Schema.safeParse(serviceSpec);
      if (!parsed.success) {
        return {
          content: [
            { type: "text", text: `Invalid service spec for ${args.service}.` },
          ],
        };
      }

      const actions = parsed.data.actions || {};
      const result: Record<string, any> = {};
      for (const name of args.actions) {
        if (actions[name]) {
          result[name] = actions[name];
        }
      }

      return {
        content: [{ type: "text", text: renderYaml(result) }],
        structuredContent: result,
      };
    },
  };

  const describeQueriesArgs = z.object({
    service: z.string().describe("The name of the service"),
    queries: z
      .array(z.string())
      .describe("The names of the queries to describe"),
  });

  const describeQueriesTool: AgentTool<typeof describeQueriesArgs> = {
    name: "describe_queries",
    description:
      "Get detailed information about specific queries of a service.",
    args: describeQueriesArgs,
    run: async ({ args }) => {
      const services = await getServices();
      const service = services ? services[args.service] : undefined;

      if (!service) {
        return {
          content: [
            { type: "text", text: `Service "${args.service}" not found.` },
          ],
        };
      }

      const serviceSpec = await getServiceSpec(service.channelId);
      const parsed = serviceSpecV1Schema.safeParse(serviceSpec);
      if (!parsed.success) {
        return {
          content: [
            { type: "text", text: `Invalid service spec for ${args.service}.` },
          ],
        };
      }

      const queries = parsed.data.queries || {};
      const result: Record<string, any> = {};
      for (const name of args.queries) {
        if (queries[name]) {
          result[name] = queries[name];
        }
      }

      return {
        content: [{ type: "text", text: renderYaml(result) }],
        structuredContent: result,
      };
    },
  };

  const describeSchemasArgs = z.object({
    service: z.string().describe("The name of the service"),
    schemas: z
      .array(z.string())
      .describe("The names of the schemas to describe"),
  });

  const describeSchemasTool: AgentTool<typeof describeSchemasArgs> = {
    name: "describe_schemas",
    description:
      "Get detailed information about specific schemas of a service.",
    args: describeSchemasArgs,
    run: async ({ args }) => {
      const services = await getServices();
      const service = services ? services[args.service] : undefined;

      if (!service) {
        return {
          content: [
            { type: "text", text: `Service "${args.service}" not found.` },
          ],
        };
      }

      const serviceSpec = await getServiceSpec(service.channelId);
      const parsed = serviceSpecV1Schema.safeParse(serviceSpec);
      if (!parsed.success) {
        return {
          content: [
            { type: "text", text: `Invalid service spec for ${args.service}.` },
          ],
        };
      }

      const schemas = parsed.data.schemas || {};
      const result: Record<string, any> = {};
      for (const name of args.schemas) {
        if (schemas[name]) {
          result[name] = schemas[name];
        }
      }

      return {
        content: [{ type: "text", text: renderYaml(result) }],
        structuredContent: result,
      };
    },
  };

  return createLocalToolkit({
    name: "services",
    description: "Tools for inspecting installed services",
    tools: {
      listServices: listServicesTool,
      describeService: describeServiceTool,
      describeActions: describeActionsTool,
      describeQueries: describeQueriesTool,
      describeSchemas: describeSchemasTool,
    },
  });
};
