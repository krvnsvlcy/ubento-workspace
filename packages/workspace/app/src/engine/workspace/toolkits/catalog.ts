import { AgentTool, createLocalToolkit } from "@ubento/workspace.agent";
import z from "zod";
import {
  componentDetailResource,
  ComponentDetailResourceType,
  componentsListResource,
  ComponentsListResourceType,
} from "../resources";

import { WorkspaceToolApi } from "../environment";

export const createCatalogToolkit = (api: WorkspaceToolApi) => {
  const listComponentsTool: AgentTool = {
    name: "list_components",
    description: "List all components available in the catalog.",
    args: z.object({}),
    run: async ({ thread }) => {
      thread.context.addResource<ComponentsListResourceType>({
        key: "component_list",
        type: componentsListResource.type,
        label: "Component Catalog List",
        data: {},
      });
      return {
        content: [
          {
            type: "text",
            text: "Components list resource has been added to the context.",
          },
        ],
      };
    },
  };

  const describeComponentsArgs = z.object({
    names: z
      .array(z.string())
      .describe("The names of the components to describe"),
  });
  const describeComponentsTool: AgentTool<typeof describeComponentsArgs> = {
    name: "describe_components",
    description:
      "Get detailed information about specific components in the catalog.",
    args: describeComponentsArgs,
    run: async ({ args, thread }) => {
      await Promise.all(
        args.names.map((name) =>
          thread.context.addResource<ComponentDetailResourceType>({
            key: `component_detail:${name}`,
            type: componentDetailResource.type,
            label: `Component Detail: ${name}`,
            data: { name },
          }),
        ),
      );
      return {
        content: [
          {
            type: "text",
            text: "Component details resource has been added to the context.",
          },
        ],
      };
    },
  };

  return createLocalToolkit({
    name: "catalog",
    description: "Tools for inspecting the component catalog",
    tools: {
      listComponents: listComponentsTool,
      describeComponents: describeComponentsTool,
    },
  });
};
