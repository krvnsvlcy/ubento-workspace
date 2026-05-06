import { createStore } from "zustand/vanilla";
import { Agent } from "./agent.js";
import { IntelligenceMessageData } from "./message/message.js";

import { createZustandStateController } from "@ubento/workspace.primitives";
import { config } from "process";
import { AgentContext } from "./context.js";
import { AgentExecution, createAgentExecution } from "./execution.js";

export interface AgentThreadState {
  id: string;
  activeExecution: AgentExecution | undefined;
  context: AgentContext;
}

export function createAgentThread({
  id,
  agent,
  initialContext,
  writeContext,
  writeMessage,
  listMessages,
}: {
  id: string;
  agent: Agent;
  initialContext?: AgentContext;

  writeContext: (context: AgentContext) => Promise<void>;
  writeMessage: (message: IntelligenceMessageData) => Promise<void>;
  listMessages: () => Promise<IntelligenceMessageData[]>;
}) {
  const store = createStore<AgentThreadState>()(() => ({
    id,
    activeExecution: undefined,
    context: initialContext || { resources: [] },
  }));

  const controller = createZustandStateController(store);

  return {
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
    pushUserMessage: config.createMessage,
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
}

export type AgentThread = ReturnType<typeof createAgentThread>;
