import { createStore, StoreApi } from "zustand/vanilla";
import { LanguageModel } from "../utils/models.js";
import { Agent } from "./agent.js";
import { AgentMessageInstance } from "./message.js";
import { IntelligenceMessageData, UserMessageData } from "./message/message.js";

import { AgentContext, AgentContextStats } from "./context.js";
import {
  AgentExecutionInstance,
  AgentExecutionStatus,
  createAgentExecution,
} from "./execution.js";

export interface AgentThreadState {
  id: string;
  agent: Agent;
  activeExecution: AgentExecutionInstance | undefined;
  context: AgentContext;
}

export interface AgentThreadActions {
  createExecution: (params: {
    model: LanguageModel;
    abortController?: AbortController;
  }) => AgentExecutionInstance;
  getContext: () => Promise<AgentContext>;
  setContext: (context: AgentContext) => Promise<void>;
  getContextStats: (modelId: string) => Promise<AgentContextStats>;
  summarizeContext: (model: LanguageModel) => Promise<void>;
  save: () => Promise<void>;
  pushUserMessage: (message: UserMessageData) => Promise<void>;
  startAgentMessage: (
    execution: AgentExecutionInstance,
  ) => Promise<AgentMessageInstance>;
  listMessages: () => Promise<IntelligenceMessageData[]>;
  generateTitle: () => Promise<void>;

  // Resource helpers
  setResource: (params: {
    type: string;
    key: string;
    data: any;
  }) => Promise<void>;
  getResource: <T = any>(url: string) => Promise<T | undefined>;
  deleteResource: (url: string) => Promise<void>;
}

export type AgentThreadInstance = StoreApi<
  AgentThreadState & AgentThreadActions
>;

export interface AgentThreadConfig {
  id: string;
  agent: Agent;
  initialContext?: AgentContext;

  // Implementation hooks for storage/logic
  getContext: () => Promise<AgentContext>;
  setContext: (context: AgentContext) => Promise<void>;
  getContextStats: (modelId: string) => Promise<AgentContextStats>;
  summarizeContext: (model: LanguageModel) => Promise<void>;
  save: () => Promise<void>;
  pushUserMessage: (message: UserMessageData) => Promise<void>;
  startAgentMessage: (
    execution: AgentExecutionInstance,
  ) => Promise<AgentMessageInstance>;
  listMessages: () => Promise<IntelligenceMessageData[]>;
  generateTitle: () => Promise<void>;
}

export function createAgentThread(
  config: AgentThreadConfig,
): AgentThreadInstance {
  const store = createStore<AgentThreadState & AgentThreadActions>()(
    (set, get) => ({
      id: config.id,
      agent: config.agent,
      activeExecution: undefined,
      context: config.initialContext || { resources: [] },

      createExecution: ({ model, abortController }) => {
        const { activeExecution } = get();
        if (
          activeExecution?.getState().status === AgentExecutionStatus.Running
        ) {
          throw new Error(
            "There is already a running execution on this thread.",
          );
        }

        const execution = createAgentExecution({
          model,
          thread: store,
          abortController,
        });

        set({ activeExecution: execution });
        return execution;
      },

      getContext: config.getContext,
      setContext: async (context) => {
        await config.setContext(context);
        set({ context });
      },
      getContextStats: config.getContextStats,
      summarizeContext: config.summarizeContext,
      save: config.save,
      pushUserMessage: config.pushUserMessage,
      startAgentMessage: config.startAgentMessage,
      listMessages: config.listMessages,
      generateTitle: config.generateTitle,

      setResource: async ({ type, key, data }) => {
        const context = await get().getContext();
        const resourcesMap = new Map(context.resources?.map((r) => [r.key, r]));
        resourcesMap.set(key, { type, key, data });
        await get().setContext({
          ...context,
          resources: Array.from(resourcesMap.values()),
        });
      },

      getResource: async (url) => {
        const context = await get().getContext();
        return context.resources?.find((r) => r.key === url) as any;
      },

      deleteResource: async (url) => {
        const context = await get().getContext();
        const resourcesMap = new Map(context.resources?.map((r) => [r.key, r]));
        resourcesMap.delete(url);
        await get().setContext({
          ...context,
          resources: Array.from(resourcesMap.values()),
        });
      },
    }),
  );

  return store;
}
