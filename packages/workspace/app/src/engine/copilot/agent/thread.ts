import { createStore } from "zustand/vanilla";
import { LanguageModel } from "../utils/models.js";
import { Agent } from "./agent.js";
import { AgentMessageInstance } from "./message.js";
import { IntelligenceMessageData, UserMessageData } from "./message/message.js";

import {
  createZustandStateController,
  StateController,
} from "@ubento/workspace.primitives";
import { AgentContext, AgentContextStats } from "./context.js";
import { AgentExecution, createAgentExecution } from "./execution.js";

export interface AgentThreadState {
  id: string;
  agent: Agent;
  activeExecution: AgentExecution | undefined;
  context: AgentContext;
}

export type AgentThread = StateController<AgentThreadState> & {
  run: (params: {
    message: UserMessageData;
    model: LanguageModel;
    abortController?: AbortController;
  }) => engineStateChanged<AgentExecution>;
  pushUserMessage: (message: UserMessageData) => engineStateChanged<void>;

  getContext: () => engineStateChanged<AgentContext>;
  setContext: (context: AgentContext) => engineStateChanged<void>;
  getContextStats: (modelId: string) => engineStateChanged<AgentContextStats>;
  summarizeContext: (model: LanguageModel) => engineStateChanged<void>;
  save: () => engineStateChanged<void>;
  startAgentMessage: (
    execution: AgentExecution,
  ) => engineStateChanged<AgentMessageInstance>;
  listMessages: () => engineStateChanged<IntelligenceMessageData[]>;
  generateTitle: () => engineStateChanged<void>;

  // Resource helpers
  setResource: (params: {
    type: string;
    key: string;
    data: any;
  }) => engineStateChanged<void>;
  getResource: <T = any>(url: string) => engineStateChanged<T | undefined>;
  deleteResource: (url: string) => engineStateChanged<void>;
};

export function createAgentThread(config: {
  id: string;
  agent: Agent;
  initialContext?: AgentContext;

  // Implementation hooks for storage/logic
  getContext: () => engineStateChanged<AgentContext>;
  setContext: (context: AgentContext) => engineStateChanged<void>;
  getContextStats: (modelId: string) => engineStateChanged<AgentContextStats>;
  summarizeContext: (model: LanguageModel) => engineStateChanged<void>;
  save: () => engineStateChanged<void>;
  pushUserMessage: (message: UserMessageData) => engineStateChanged<void>;
  startAgentMessage: (
    execution: AgentExecution,
  ) => engineStateChanged<AgentMessageInstance>;
  listMessages: () => engineStateChanged<IntelligenceMessageData[]>;
  generateTitle: () => engineStateChanged<void>;
}): AgentThread {
  const store = createStore<AgentThreadState>()(() => ({
    id: config.id,
    agent: config.agent,
    activeExecution: undefined,
    context: config.initialContext || { resources: [] },
  }));

  const controller = createZustandStateController(store);

  const thread: AgentThread = {
    ...controller,

    run: async ({ message, model, abortController }) => {
      const { activeExecution } = store.getState();
      if (activeExecution) {
        throw new Error("There is already a running execution on this thread.");
      }

      const execution = createAgentExecution({
        model,
        thread,
        abortController,
      });

      controller.setState({ activeExecution: execution });

      // Auto-clear active execution when it finishes
      execution.subscribe((state) => {
        if (state.status !== "running" && state.status !== "idle") {
          controller.setState({ activeExecution: undefined });
        }
      });

      // Start the execution
      execution.run({ message }).catch(() => {});

      return execution;
    },

    getContext: config.getContext,
    setContext: async (context) => {
      await config.setContext(context);
      controller.setState({ context });
    },
    getContextStats: config.getContextStats,
    summarizeContext: config.summarizeContext,
    save: config.save,
    pushUserMessage: config.pushUserMessage,
    startAgentMessage: config.startAgentMessage,
    listMessages: config.listMessages,
    generateTitle: config.generateTitle,

    setResource: async ({ type, key, data }) => {
      const context = await thread.getContext();
      const resourcesMap = new Map(context.resources?.map((r) => [r.key, r]));
      resourcesMap.set(key, { type, key, data });
      await thread.setContext({
        ...context,
        resources: Array.from(resourcesMap.values()),
      });
    },

    getResource: async (url) => {
      const context = await thread.getContext();
      return context.resources?.find((r) => r.key === url) as any;
    },

    deleteResource: async (url) => {
      const context = await thread.getContext();
      const resourcesMap = new Map(context.resources?.map((r) => [r.key, r]));
      resourcesMap.delete(url);
      await thread.setContext({
        ...context,
        resources: Array.from(resourcesMap.values()),
      });
    },
  };

  return thread;
}
