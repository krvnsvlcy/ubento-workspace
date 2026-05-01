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
  tools: TPage<string, Tool>;
  agents: TPage<string, Agent>;
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
  getInstructions: () => engineStateChanged<string>;
  getPrompt: (context: AgentContext) => engineStateChanged<any>;
  resolveTool: (toolRef: string) => engineStateChanged<Tool | undefined>;

  // Thread actions
  createThread: (params: { title: string }) => engineStateChanged<any>;
  sendMessage: (
    content: string,
    params: { threadId?: string; attachments?: any[] },
  ) => engineStateChanged<void>;
};

export interface AgentConfig {
  name: string;
  description: string;
  toolkit: AgentEnvironment;
  getAgentInstructions: () =>
    | AgentInstructions
    | engineStateChanged<AgentInstructions>;
}

export function createAgent(config: AgentConfig): Agent {
  const store = createStore<AgentState>()(() => ({
    tools: {},
    agents: {},
  }));

  const instance: Agent = {
    name: config.name,
    description: config.description,
    environment: config.toolkit,
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
      const toolSets = Object.values(config.toolkit.toolSets);

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
        environment: config.toolkit,
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
        const toolSet = config.toolkit.toolSets[parts[0]];
        return toolSet?.getTool(parts[1]);
      }
      return undefined;
    },

    createThread: async (params) => {
      return config.toolkit.createThread({
        title: params.title,
        agent: instance,
      });
    },

    sendMessage: async (content, params) => {
      let thread;
      if (params.threadId) {
        // In a real impl, we'd fetch the thread from a registry or environment
        throw new Error("Thread resolution by ID not implemented in shim");
      } else {
        thread = await config.toolkit.createThread({
          title: content.slice(0, 50),
          agent: instance,
        });
      }

      await thread.run({
        message: {
          text: content,
          attachments: params.attachments,
        },
        model: (instance as any).model || { modelId: "default" }, // Shim model
      });
    },
  };

  return instance;
}
