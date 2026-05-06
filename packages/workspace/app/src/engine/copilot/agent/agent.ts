import { createStore } from "zustand/vanilla";
import { AgentContext } from "./context.js";
import { AgentEnvironment } from "./environment.js";
import {
  AgentInstructions,
  buildAgentManagerInstructions,
} from "./prompts/manager/instructions/instructions.js";
import { buildAgentManagerPrompt } from "./prompts/manager/prompt/prompt.js";
import { Tool } from "./tool.js";

export type AgentState = {
  tools: Record<string, Tool>;
  agents: Record<string, Agent>;
};

export type Agent = {
  name: string;
  description: string;
  environment: AgentEnvironment;
  logger: {
    warn: (message: string, data?: any) => void;
    error: (message: string, data?: any) => void;
    info: (message: string, data?: any) => void;
  };

  getState: () => AgentState;
  subscribe: (callback: (state: AgentState) => void) => () => void;

  addTool: (tool: Tool) => void;
  removeTool: (name: string) => void;
  addAgent: (agent: Agent) => void;
  removeAgent: (name: string) => void;

  // Logic actions
  getInstructions: () => Promise<string>;
  getPrompt: (context: AgentContext) => Promise<any>;
  resolveTool: (toolRef: string) => Promise<Tool | undefined>;
};

export function createAgent(config: {
  name: string;
  description: string;
  environment: AgentEnvironment;
  getAgentInstructions: () => AgentInstructions | Promise<AgentInstructions>;
}): Agent {
  const store = createStore<AgentState>()(() => ({
    tools: {},
    agents: {},
  }));

  const instance: Agent = {
    name: config.name,
    description: config.description,
    environment: config.environment,
    logger: {
      warn: (m, d) => console.warn(`[${config.name}] ${m}`, d),
      error: (m, d) => console.error(`[${config.name}] ${m}`, d),
      info: (m, d) => console.info(`[${config.name}] ${m}`, d),
    },

    getState: () => store.getState(),
    subscribe: (callback) => store.subscribe(callback),

    addTool: (tool) => {
      store.setState((s) => ({ tools: { ...s.tools, [tool.name]: tool } }));
    },
    removeTool: (name) => {
      store.setState((s) => {
        const { [name]: _, ...rest } = s.tools;
        return { tools: rest };
      });
    },
    addAgent: (agent) => {
      store.setState((s) => ({ agents: { ...s.agents, [agent.name]: agent } }));
    },
    removeAgent: (name) => {
      store.setState((s) => {
        const { [name]: _, ...rest } = s.agents;
        return { agents: rest };
      });
    },

    getInstructions: async () => {
      const state = store.getState();
      const agents = Object.values(state.agents);
      const tools = Object.values(state.tools);
      const toolSets = Object.values(config.environment.toolSets);

      return buildAgentManagerInstructions({
        tools,
        agents: agents.map((a) => ({
          name: a.name,
          description: a.description,
        })),
        toolSets,
        instructions: await config.getAgentInstructions(),
      });
    },

    getPrompt: async (context) => {
      const state = store.getState();
      // We pass a shim that looks like the old Agent for compatibility with buildAgentManagerPrompt
      const agentShim = {
        ...state,
        environment: config.environment,
        name: config.name,
        description: config.description,
      };
      return buildAgentManagerPrompt({
        context,
        agent: agentShim as any,
      });
    },

    resolveTool: async (toolRef) => {
      const state = store.getState();
      const parts = toolRef.split(":");
      if (parts.length === 1) {
        return state.tools[parts[0]];
      }
      if (parts.length === 2) {
        const toolSet = config.environment.toolSets[parts[0]];
        return toolSet?.getTool(parts[1]);
      }
      return undefined;
    },
  };

  return instance;
}
