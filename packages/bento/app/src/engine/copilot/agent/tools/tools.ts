import { z } from "zod";
import { renderYaml } from "@/engine/copilot/utils/format.js";
import { Tool, ToolCallResult } from "../tool.js";

export const searchToolsSchema = z.object({
  set: z.string().describe("The name of the set to search in"),
  query: z
    .string()
    .describe(
      "The query to search for. Describe what you want to do in natural language.",
    ),
});

export type SearchToolsOutput = {
  set: string;
  tools: {
    name: string;
    description?: string;
  }[];
};

export const searchTools: Tool<typeof searchToolsSchema, SearchToolsOutput> = {
  name: "search_tools",
  description: "Search for tools in a specific set. Use this tool to find tools that can help you accomplish your task.",
  args: searchToolsSchema,
  async run(args, action) {
    const execution = action.message.execution;
    const agent = execution.thread.getState().agent;
    const agentState = agent.getState();
    const toolSet = agent.environment.toolSets[args.set];

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

export const listToolsSchema = z.object({
  set: z.string().describe("The name of the set to list tools from"),
});

export type ListToolsOutput = {
  set: string;
  tools: {
    name: string;
    description?: string;
  }[];
};

export const listTools: Tool<typeof listToolsSchema, ListToolsOutput> & {
  toolName: string;
} = {
  name: "list_tools",
  toolName: "list_tools",
  description: "List all tools available in a specific set.",
  args: listToolsSchema,
  async run(args, action) {
    const execution = action.message.execution;
    const agent = execution.thread.getState().agent;
    const agentState = agent.getState();
    const toolSet = agent.environment.toolSets[args.set];

    if (!toolSet) {
      return {
        isError: true,
        content: [{ type: "text", text: `ToolSet "${args.set}" not found` }],
      };
    }

    const thread = execution.thread;
    await thread.setResource({
      type: "tool-set",
      key: args.set,
      data: { name: args.set },
    });

    return {
      content: [{ type: "text", text: `Tool set "${args.set}" loaded successfully into the context.` }],
    };
  },
};

export const describeToolSchema = z.object({
  set: z.string().describe("The name of the set the tool belongs to"),
  tool: z.string().describe("The name of the tool to describe"),
});

export type DescribeToolOutput = {
  set: string;
  tool?: {
    name: string;
    description: string;
    args: any;
    example?: any;
  };
};

export const describeTool: Tool<typeof describeToolSchema, DescribeToolOutput> & {
  toolName: string;
} = {
  name: "describe_tool",
  toolName: "describe_tool",
  description: "Describe a tool in detail.",
  args: describeToolSchema,
  async run(args, action) {
    const execution = action.message.execution;
    const agent = execution.thread.getState().agent;
    const agentState = agent.getState();
    const toolSet = agent.environment.toolSets[args.set];

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
        content: [{ type: "text", text: `Tool "${args.tool}" not found in extension "${args.set}"` }],
      };
    }

    const thread = execution.thread;
    await thread.setResource({
      type: "tool",
      key: `${args.set}:${args.tool}`,
      data: { set: args.set, tool: args.tool },
    });

    return {
      content: [{ type: "text", text: `Tool "${args.tool}" loaded successfully from extension "${args.set}"` }],
    };
  },
};

export { listTools as ListTools, describeTool as DescribeTool };
