import { ServiceData } from "@ubento/bento.runtime";
import { AgentTool, createLocalToolkit } from "@ubento/workspace.agent";
import z from "zod";
import {
  serviceActionResource,
  ServiceActionResourceType,
  serviceDetailsResource,
  ServiceDetailsResourceType,
  serviceQueryResource,
  ServiceQueryResourceType,
  serviceSchemaResource,
  ServiceSchemaResourceType,
  servicesListResource,
  ServicesListResourceType,
} from "../resources";

import { WorkspaceToolApi } from "../environment";

export const createServicesToolkit = (api: WorkspaceToolApi) => {
  const listServicesTool: AgentTool = {
    name: "list_services",
    description: "List all installed services in the workspace.",
    args: z.object({}),
    run: async ({ thread }) => {
      thread.context.addResource<ServicesListResourceType>({
        key: "services_list",
        type: servicesListResource.type,
        label: "Installed Services List",
        data: {},
      });
      return {
        content: [
          {
            type: "text",
            text: "Services list resource has been added to the context.",
          },
        ],
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
    run: async ({ args, thread }) => {
      const services = await api.getServices();
      const service = services ? services[args.name] : undefined;

      if (!service) {
        return {
          content: [
            { type: "text", text: `Service "${args.name}" not found.` },
          ],
        };
      }

      thread.context.addResource<ServiceDetailsResourceType>({
        key: `service_details:${args.name}`,
        type: serviceDetailsResource.type,
        label: `Service Details: ${args.name}`,
        data: { name: args.name },
      });

      return {
        content: [
          {
            type: "text",
            text: `Service details for "${args.name}" have been added to the context.`,
          },
        ],
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
    run: async ({ args, thread }) => {
      const services = await api.getServices();
      const service = services ? services[args.service] : undefined;

      if (!service) {
        return {
          content: [
            { type: "text", text: `Service "${args.service}" not found.` },
          ],
        };
      }

      await Promise.all(
        args.actions.map((action) =>
          thread.context.addResource<ServiceActionResourceType>({
            key: `service_action:${args.service}:${action}`,
            type: serviceActionResource.type,
            label: `Service Action (${args.service}): ${action}`,
            data: { service: args.service, action },
          }),
        ),
      );

      return {
        content: [
          {
            type: "text",
            text: `Actions for service "${args.service}" have been added to the context.`,
          },
        ],
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
    run: async ({ args, thread }) => {
      const services = await api.getServices();
      const service = services ? services[args.service] : undefined;

      if (!service) {
        return {
          content: [
            { type: "text", text: `Service "${args.service}" not found.` },
          ],
        };
      }

      await Promise.all(
        args.queries.map((query) =>
          thread.context.addResource<ServiceQueryResourceType>({
            key: `service_query:${args.service}:${query}`,
            type: serviceQueryResource.type,
            label: `Service Query (${args.service}): ${query}`,
            data: { service: args.service, query },
          }),
        ),
      );

      return {
        content: [
          {
            type: "text",
            text: `Queries for service "${args.service}" have been added to the context.`,
          },
        ],
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
    run: async ({ args, thread }) => {
      const services = await api.getServices();
      const service = services ? services[args.service] : undefined;

      if (!service) {
        return {
          content: [
            { type: "text", text: `Service "${args.service}" not found.` },
          ],
        };
      }

      await Promise.all(
        args.schemas.map((schema) =>
          thread.context.addResource<ServiceSchemaResourceType>({
            key: `service_schema:${args.service}:${schema}`,
            type: serviceSchemaResource.type,
            label: `Service Schema (${args.service}): ${schema}`,
            data: { service: args.service, schema },
          }),
        ),
      );

      return {
        content: [
          {
            type: "text",
            text: `Schemas for service "${args.service}" have been added to the context.`,
          },
        ],
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
