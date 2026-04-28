import { createStore } from "zustand/vanilla";
import { AgentContext } from "./context.js";
import { Tool } from "./tool.js";

export type AgentState = {
  tools: Record<string, Tool>;
  agents: Record<string, Agent>;
};

export type Agent = {
  name: string;
  description: string;

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

export interface AgentConfig {
  name: string;
  description: string;
}

export function createAgent(config: AgentConfig): Agent {
  const store = createStore<AgentState>()(() => ({
    tools: {},
    agents: {},
  }));

  return {
    name: config.name,
    description: config.description,

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
      return "";
    },

    getPrompt: async () => {
      return "";
    },

    resolveTool: async () => {
      return undefined;
    },
  };
}
