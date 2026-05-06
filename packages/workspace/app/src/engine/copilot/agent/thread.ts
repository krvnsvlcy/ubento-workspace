import { createStore } from "zustand/vanilla";
import { Agent } from "./agent.js";
import {
  AgentMessageData,
  IntelligenceMessageData,
  UserMessageData,
} from "./message/message.js";

import { createZustandStateController } from "@ubento/workspace.primitives";
import { AgentContext, AgentContextStats } from "./context.js";
import { AgentExecution, createAgentExecution } from "./execution.js";
import { AgentMessageInstance } from "./message.js";
import { LanguageModel } from "../utils/models.js";

export interface AgentThreadState {
  id: string;
  activeExecution: AgentExecution | undefined;
  context: AgentContext;
  agent: Agent;
}

export interface ThreadStorage {
  getContext: () => Promise<AgentContext>;
  setContext: (context: AgentContext) => Promise<void>;
  getContextStats: (modelId: string) => Promise<AgentContextStats>;
  summarizeContext: (model: LanguageModel) => Promise<void>;
  save: () => Promise<void>;
  createMessage: (data: IntelligenceMessageData) => Promise<void>;
  startAgentMessage: (execution: AgentExecution) => Promise<AgentMessageInstance>;
  listMessages: () => Promise<IntelligenceMessageData[]>;
  generateTitle: () => Promise<void>;
}

export function createAgentThread(config: {
  id: string;
  agent: Agent;
  storage: ThreadStorage;
}) {
  const store = createStore<AgentThreadState>()(() => ({
    id: config.id,
    agent: config.agent,
    activeExecution: undefined,
    context: { resources: [] },
  }));

  const controller = createZustandStateController(store);

  // Initialize context asynchronously without blocking creation
  config.storage.getContext().then((context) => {
    controller.setState({ context });
  });

  const instance = {
    ...controller,

    run: async ({ message, model, abortController }: { message: UserMessageData; model: LanguageModel; abortController?: AbortController }) => {
      const { activeExecution } = store.getState();
      if (activeExecution) {
        throw new Error("There is already a running execution on this thread.");
      }

      const execution = createAgentExecution({
        model,
        thread: instance as any,
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

    getContext: config.storage.getContext,
    setContext: async (context: AgentContext) => {
      await config.storage.setContext(context);
      controller.setState({ context });
    },
    getContextStats: config.storage.getContextStats,
    summarizeContext: config.storage.summarizeContext,
    save: config.storage.save,
    pushUserMessage: config.storage.createMessage,
    startAgentMessage: config.storage.startAgentMessage,
    listMessages: config.storage.listMessages,
    generateTitle: config.storage.generateTitle,

    setResource: async ({ type, key, data }: { type: string, key: string, data: any }) => {
      const context = await instance.getContext();
      const resourcesMap = new Map(context.resources?.map((r) => [r.key, r]));
      resourcesMap.set(key, { type, key, data });
      await instance.setContext({
        ...context,
        resources: Array.from(resourcesMap.values()),
      });
    },

    getResource: async (url: string) => {
      const context = await instance.getContext();
      return context.resources?.find((r) => r.key === url) as any;
    },

    deleteResource: async (url: string) => {
      const context = await instance.getContext();
      const resourcesMap = new Map(context.resources?.map((r) => [r.key, r]));
      resourcesMap.delete(url);
      await instance.setContext({
        ...context,
        resources: Array.from(resourcesMap.values()),
      });
    },
  };

  return instance;
}

export type AgentThread = ReturnType<typeof createAgentThread>;
