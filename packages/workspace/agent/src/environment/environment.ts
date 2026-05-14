import { Logger } from "@ubento/telemetry";
import { Agent } from "../agent/agent.js";
import { AgentTool } from "../execution/tool/tool.js";
import { Toolkit } from "../execution/tool/toolkit/toolkit.js";
import { LanguageModel } from "../utils/models.js";

import { ResourceType } from "@/context/resource.js";
import { taskTool } from "@/execution/tools/task.js";
import { messageTool } from "../execution/tools/message.js";
import { describeToolTool, listToolsTool } from "../execution/tools/tools.js";
import { AgentThread } from "../thread/thread.js";

export type AgentEnvironment = {
  getModel: (id: string) => LanguageModel | undefined;

  getTool: (name: string) => Promise<AgentTool | undefined>;
  getAgentTools: (agent: Agent) => AgentTool[];
  addTool: (tool: AgentTool) => void;
  removeTool: (name: string) => void;

  resourceTypes?: ResourceType[];
  addResourceType: (resourceType: ResourceType) => void;
  removeResourceType: (type: string) => void;
  getResourceType: (type: string) => ResourceType | undefined;

  listToolkits: () => Toolkit[];
  listAgents: () => Agent[];
  addAgent: (agent: Agent) => void;
  removeAgent: (name: string) => void;
  getAgent: (name: string) => Agent | undefined;

  createAgentThread: (input: {
    agent: Agent;
    title: string;
  }) => Promise<AgentThread>;

  logger?: Logger;
};

export function createEnvironment({
  tools: upstreamTools = [],
  getModel,
  logger,
  listToolkits = () => [],
  createAgentThread,
}: {
  tools?: AgentTool[];
  getModel: (id: string) => LanguageModel | undefined;
  logger?: Logger;
  listToolkits?: () => Toolkit[];
  createAgentThread: ({
    agent,
    title,
  }: {
    agent: Agent;
    title: string;
  }) => Promise<AgentThread>;
}): AgentEnvironment {
  const coreTools = new Map<string, AgentTool>([
    [messageTool.name, messageTool],
    [listToolsTool.name, listToolsTool],
    [describeToolTool.name, describeToolTool],
    [taskTool.name, taskTool],
  ]);
  const envTools = new Map<string, AgentTool>([
    ...upstreamTools.map((t) => [t.name, t] as const),
  ]);
  const allTools = new Map<string, AgentTool>([
    ...coreTools.entries(),
    ...envTools.entries(),
  ]);

  const resourceTypes = new Map<string, ResourceType>();

  const agents = new Map<string, Agent>([]);

  const environment: AgentEnvironment = {
    getModel,
    logger,
    listToolkits,

    listAgents: () => Array.from(agents.values()),
    addAgent: (agent: Agent) => {
      agents.set(agent.name, agent);
    },
    removeAgent: (name: string) => {
      agents.delete(name);
    },
    getAgent: (name: string) => agents.get(name),

    async getTool(name: string) {
      const builtIn = allTools.get(name);
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
    getAgentTools(agent: Agent) {
      let tools = [...coreTools.values()];
      if (!agent.enableMessage) {
        tools = tools.filter((t) => t.name !== messageTool.name);
      }

      for (const name of agent.tools ?? []) {
        const tool = envTools.get(name);
        if (tool) {
          tools.push(tool);
        }
      }
      return tools;
    },
    addTool(tool: AgentTool) {
      allTools.set(tool.name, tool);
    },
    removeTool(name: string) {
      allTools.delete(name);
    },

    get resourceTypes() {
      return Array.from(resourceTypes.values());
    },
    addResourceType(resourceType: ResourceType) {
      resourceTypes.set(resourceType.type, resourceType);
    },
    removeResourceType(type: string) {
      resourceTypes.delete(type);
    },
    getResourceType(type: string) {
      return resourceTypes.get(type);
    },
    createAgentThread,
  };
  return environment;
}
