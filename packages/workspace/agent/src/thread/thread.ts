import { createStore } from "zustand/vanilla";
import { Agent } from "../agent/agent.js";
import { MessageData, UserMessageData } from "../message/types.js";

import { createAgentContext } from "@/context/context.js";
import { AgentEnvironment } from "@/environment/environment.js";
import { AgentMessage, createAgentMessage } from "@/message/message.js";
import { AgentContextData } from "../context/types.js";
import {
  AgentExecution,
  createAgentExecution,
} from "../execution/execution.js";

export interface AgentThreadState {
  activeExecution: AgentExecution | undefined;
}

export function createAgentThread({
  id,
  agent,
  initialContext,
  environment,
  saveContext,
  createMessage,
  updateMessage,
}: {
  id: string;
  agent: Agent;
  environment: AgentEnvironment;
  initialContext?: AgentContextData;
  saveContext: (context: AgentContextData) => Promise<void>;
  createMessage: (data: MessageData) => Promise<string>; // id
  updateMessage: (id: string, data: MessageData) => Promise<void>;
}) {
  const context = createAgentContext({
    data: initialContext,
    save: async (data) => saveContext?.(data),
  });

  const store = createStore<AgentThreadState>()(() => ({
    activeExecution: undefined,
  }));

  const threadApi = {
    id,
    agent,
    environment,
    context,
    createExecution: ({
      abortController,
    }: {
      abortController?: AbortController;
    } = {}) => {
      const { activeExecution } = store.getState();
      if (activeExecution) {
        throw new Error("There is already an active execution on this thread.");
      }

      const execution = createAgentExecution({
        thread: threadApi,
        abortController,
      });

      store.setState({ activeExecution: execution });
      // Auto-clear active execution when it finishes
      execution.subscribe((state) => {
        if (state.status !== "running" && state.status !== "idle") {
          store.setState({ activeExecution: undefined });
        }
      });

      return execution;
    },
    pushUserMessage: async (message: Omit<UserMessageData, "role">) => {
      const data: MessageData = { ...message, role: "user" };
      const id = await createMessage(data);
      await context.writeMessage(id, data);
    },
    startAgentMessage: async (modelId: string): Promise<AgentMessage> => {
      let id: string | undefined = undefined;
      const message = createAgentMessage({
        modelId,
        save: async (data) => {
          if (!id) {
            throw Error("id is not defined");
          }
          await updateMessage(id, data);
          await context.writeMessage(id, message.getData());
        },
      });
      id = await createMessage(message.getData());
      await context.writeMessage(id, message.getData());
      return message;
    },
  };

  return threadApi;
}

export type AgentThread = ReturnType<typeof createAgentThread>;
