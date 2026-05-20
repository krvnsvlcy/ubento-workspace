import {
  AgentTool,
  createLocalToolkit,
  renderYaml,
} from "@ubento/workspace.agent";
import z from "zod";

export const createCatalogToolkit = ({
  listComponents,
  describeComponents,
}: {
  listComponents: () => Promise<unknown>;
  describeComponents: (names: string[]) => Promise<Record<string, unknown>>;
}) => {
  const listComponentsTool: AgentTool = {
    name: "list_components",
    description: "List all components available in the catalog.",
    args: z.object({}),
    run: async () => {
      const components = await listComponents();
      return {
        content: [{ type: "text", text: renderYaml(components) }],
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
    run: async ({ args }) => {
      const description = await describeComponents(args.names);
      return {
        content: [{ type: "text", text: renderYaml(description) }],
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
