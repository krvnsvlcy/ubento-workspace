import { createStore } from "zustand/vanilla";
import { Agent } from "../agent/agent.js";
import { UserMessageData } from "../message/types.js";

import { createAgentContext } from "@/context/context.js";
import { AgentEnvironment } from "@/environment/environment.js";
import { AgentMessage, createAgentMessage } from "@/message/message.js";
import { AgentContext } from "../context/types.js";
import {
  AgentExecution,
  createAgentExecution,
} from "../execution/execution.js";

export interface AgentThreadState {
  activeExecution: AgentExecution | undefined;
  context: AgentContext;
}

export function createAgentThread({
  agent,
  initialContext,
  environment,
}: {
  agent: Agent;
  environment: AgentEnvironment;
  initialContext?: AgentContext;
}) {
  const context = createAgentContext({ data: initialContext });
  const store = createStore<AgentThreadState>()(() => ({
    activeExecution: undefined,
    context,
  }));

  const threadApi = {
    agent,
    environment,
    context,
    run: async ({
      message,
      maxIterations,
      abortController,
    }: {
      message: Omit<UserMessageData, "role">;
      maxIterations?: number;
      abortController?: AbortController;
    }) => {
      const { activeExecution } = store.getState();
      if (activeExecution) {
        throw new Error("There is already a running execution on this thread.");
      }

      const execution = createAgentExecution({
        thread: threadApi,
        abortController,
      });

      store.setState({ activeExecution: execution });

      // Auto-clear active execution when it finishes
      execution.subscribe((state: any) => {
        if (state.status !== "running" && state.status !== "idle") {
          store.setState({ activeExecution: undefined });
        }
      });

      // Start the execution
      execution.run({ message, maxIterations }).catch(() => {});

      return execution;
    },
    pushUserMessage: async (message: Omit<UserMessageData, "role">) => {
      context.pushMessage({ ...message, role: "user" });
    },
    startAgentMessage: async (modelId: string): Promise<AgentMessage> => {
      let id: string;
      const message = createAgentMessage({
        modelId,
        save: async (data) => {
          if (id) {
            context.updateMessage(id, data);
          }
        },
      });
      id = context.pushMessage(message.getData());
      return message;
    },
  };

  return threadApi;
}

export type AgentThread = ReturnType<typeof createAgentThread>;
