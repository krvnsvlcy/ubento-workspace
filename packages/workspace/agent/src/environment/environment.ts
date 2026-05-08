import { Logger } from "@ubento/telemetry";
import { Agent } from "../agent/agent.js";
import { AgentTool } from "../execution/tool/tool.js";
import { Toolkit } from "../execution/tool/toolkit/toolkit.js";
import { LanguageModel } from "../utils/models.js";

import { messageTool } from "../execution/tools/message.js";
import { responseTool } from "../execution/tools/response.js";
import {
  describeToolTool,
  listToolsTool,
  searchToolsTool,
} from "../execution/tools/tools.js";

export type AgentEnvironment = {
  getModel: (id: string) => LanguageModel | undefined;

  getTool: (name: string) => Promise<AgentTool | undefined>;
  listTools: () => Promise<AgentTool[]>;
  addTool: (tool: AgentTool) => void;
  removeTool: (name: string) => void;

  listToolkits?: () => Toolkit[];
  listAgents?: () => Agent[];

  logger?: Logger;
};

export function createEnvironment({
  getModel,
  logger,
  listToolkits = () => [],
}: {
  getModel: (id: string) => LanguageModel | undefined;
  logger?: Logger;
  listToolkits?: () => Toolkit[];
}): AgentEnvironment {
  const tools = new Map<string, AgentTool>([
    [messageTool.name, messageTool],
    [responseTool.name, responseTool],
    [searchToolsTool.name, searchToolsTool],
    [listToolsTool.name, listToolsTool],
    [describeToolTool.name, describeToolTool],
  ]);

  return {
    getModel,
    logger,
    listToolkits,

    async getTool(name: string) {
      const builtIn = tools.get(name);
      if (builtIn) return builtIn;

      const parts = name.split(":");
      if (parts.length === 2) {
        const [toolkitName, toolName] = parts;
        const toolkits = listToolkits();
        const toolkit = toolkits.find((t) => t.name === toolkitName);
        if (toolkit) {
          const tool = await toolkit.getTool(toolName);
          return tool;
        }
      }

      return undefined;
    },
    async listTools() {
      return Array.from(tools.values());
    },
    addTool(tool: AgentTool) {
      tools.set(tool.name, tool);
    },
    removeTool(name: string) {
      tools.delete(name);
    },
  };
}
