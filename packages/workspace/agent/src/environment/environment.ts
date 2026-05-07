import { Agent } from "../agent/agent.js";
import { AgentTool } from "../execution/tool.js";
import { ToolSet } from "../execution/tool_set/tool_set.js";
import { LanguageModel } from "../utils/models.js";

export type AgentEnvironment = {
  getModel: (id: string) => LanguageModel | undefined;
  getTool: (name: string) => Promise<AgentTool | undefined>;
  getTools?: () => Promise<AgentTool[]>;
  getToolSets?: () => Promise<ToolSet[]>;
  getAgents?: () => Promise<Agent[]>;
};
