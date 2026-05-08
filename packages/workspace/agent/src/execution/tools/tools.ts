import { z } from "zod";
import { renderYaml } from "../../utils/format.js";
import { AgentTool } from "../tool/tool.js";

export const searchToolsSchema = z.object({
  set: z.string().describe("The name of the toolkit to search in"),
  query: z
    .string()
    .describe(
      "The query to search for. Describe what you want to do in natural language.",
    ),
});

export const searchToolsTool: AgentTool<typeof searchToolsSchema> & { toolName: string } = {
  name: "search_tools",
  toolName: "search_tools",
  description:
    "Search for tools in a specific toolkit. Use this tool to find tools that can help you accomplish your task.",
  args: searchToolsSchema,
  async run({ args, environment }) {
    const toolkits = environment.listToolkits?.() || [];
    const toolkit = toolkits.find((t) => t.name === args.set);

    if (!toolkit) {
      return {
        isError: true,
        content: [{ type: "text", text: `Toolkit "${args.set}" not found` }],
      };
    }

    const tools = await toolkit.listTools();
    const toolDefs = tools.filter(
      (t) => t.name.includes(args.query) || t.description?.includes(args.query)
    );

    let text = "";
    if (!toolDefs.length) {
      text = `No tools found in toolkit "${args.set}" matching "${args.query}".`;
    } else {
      text = renderYaml(toolDefs);
    }

    return {
      content: [{ type: "text", text }],
    };
  },
};

export const listToolsSchema = z.object({
  set: z.string().describe("The name of the toolkit to list tools from"),
});

export const listToolsTool: AgentTool<typeof listToolsSchema> & { toolName: string } = {
  name: "list_tools",
  toolName: "list_tools",
  description: "List all tools available in a specific toolkit.",
  args: listToolsSchema,
  async run({ args, environment }) {
    const toolkits = environment.listToolkits?.() || [];
    const toolkit = toolkits.find((t) => t.name === args.set);

    if (!toolkit) {
      return {
        isError: true,
        content: [{ type: "text", text: `Toolkit "${args.set}" not found` }],
      };
    }

    const tools = await toolkit.listTools();

    return {
      content: [
        {
          type: "text",
          text: `Toolkit "${args.set}" loaded successfully.\n\n${renderYaml(tools)}`,
        },
      ],
    };
  },
};

export const describeToolSchema = z.object({
  set: z.string().describe("The name of the toolkit the tool belongs to"),
  tool: z.string().describe("The name of the tool to describe"),
});

export const describeToolTool: AgentTool<typeof describeToolSchema> & { toolName: string } = {
  name: "describe_tool",
  toolName: "describe_tool",
  description: "Describe a tool in detail.",
  args: describeToolSchema,
  async run({ args, environment }) {
    const toolkits = environment.listToolkits?.() || [];
    const toolkit = toolkits.find((t) => t.name === args.set);

    if (!toolkit) {
      return {
        isError: true,
        content: [{ type: "text", text: `Toolkit "${args.set}" not found` }],
      };
    }

    const tool = await toolkit.getTool(args.tool);
    if (!tool) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Tool "${args.tool}" not found in toolkit "${args.set}"`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: `Tool "${args.tool}" loaded successfully from toolkit "${args.set}"\n\n${renderYaml({ name: tool.name, description: tool.description })}`,
        },
      ],
    };
  },
};
