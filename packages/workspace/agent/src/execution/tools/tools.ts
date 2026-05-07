import { z } from "zod";
import { renderYaml } from "../../utils/format.js";
import { AgentTool } from "../tool.js";
import { ToolSet } from "../tool_set/tool_set.js";

export const searchToolsSchema = z.object({
  set: z.string().describe("The name of the set to search in"),
  query: z
    .string()
    .describe(
      "The query to search for. Describe what you want to do in natural language.",
    ),
});

export function createSearchToolsTool(
  toolSets: Record<string, ToolSet>,
): AgentTool<typeof searchToolsSchema> & { toolName: string } {
  return {
    name: "search_tools",
    toolName: "search_tools",
    description:
      "Search for tools in a specific set. Use this tool to find tools that can help you accomplish your task.",
    args: searchToolsSchema,
    async run({ args }) {
      const toolSet = toolSets[args.set];

      if (!toolSet) {
        return {
          isError: true,
          content: [{ type: "text", text: `ToolSet "${args.set}" not found` }],
        };
      }

      const toolDefs = await toolSet.searchTools(args.query);

      let text = "";
      if (!toolDefs.length) {
        text = `No tools found in extension "${args.set}" matching "${args.query}".`;
      } else {
        text = renderYaml(toolDefs);
      }

      return {
        content: [{ type: "text", text }],
      };
    },
  };
}

export const listToolsSchema = z.object({
  set: z.string().describe("The name of the set to list tools from"),
});

export function createListToolsTool(
  toolSets: Record<string, ToolSet>,
): AgentTool<typeof listToolsSchema> & { toolName: string } {
  return {
    name: "list_tools",
    toolName: "list_tools",
    description: "List all tools available in a specific set.",
    args: listToolsSchema,
    async run({ args }) {
      const toolSet = toolSets[args.set];

      if (!toolSet) {
        return {
          isError: true,
          content: [{ type: "text", text: `ToolSet "${args.set}" not found` }],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `Tool set "${args.set}" loaded successfully.`,
          },
        ],
      };
    },
  };
}

export const describeToolSchema = z.object({
  set: z.string().describe("The name of the set the tool belongs to"),
  tool: z.string().describe("The name of the tool to describe"),
});

export function createDescribeToolTool(
  toolSets: Record<string, ToolSet>,
): AgentTool<typeof describeToolSchema> & { toolName: string } {
  return {
    name: "describe_tool",
    toolName: "describe_tool",
    description: "Describe a tool in detail.",
    args: describeToolSchema,
    async run({ args }) {
      const toolSet = toolSets[args.set];

      if (!toolSet) {
        return {
          isError: true,
          content: [{ type: "text", text: `ToolSet "${args.set}" not found` }],
        };
      }

      const tool = await toolSet.getTool(args.tool);
      if (!tool) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Tool "${args.tool}" not found in extension "${args.set}"`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `Tool "${args.tool}" loaded successfully from extension "${args.set}"`,
          },
        ],
      };
    },
  };
}
