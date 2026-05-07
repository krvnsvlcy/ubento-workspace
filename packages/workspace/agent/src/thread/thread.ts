import { createStore } from "zustand/vanilla";
import { Agent } from "../agent/agent.js";
import { UserMessageData } from "../message/types.js";

import { createAgentContext } from "@/context/context.js";
import { AgentEnvironment } from "@/environment/environment.js";
import { AgentMessage } from "@/message/message.js";
import { createZustandStateController } from "@ubento/state";
import { AgentContext } from "../context/types.js";
import {
  AgentExecution,
  createAgentExecution,
} from "../execution/execution.js";
import { LanguageModel } from "../utils/models.js";

export interface AgentThreadState {
  activeExecution: AgentExecution | undefined;
  context: AgentContext;
}

export function createAgentThread({
  id,
  agent,
  environment,
}: {
  id: string;
  agent: Agent;
  environment: AgentEnvironment;
}) {
  const context = createAgentContext();
  const store = createStore<AgentThreadState>()(() => ({
    activeExecution: undefined,
    context,
  }));

  const controller = createZustandStateController(store);

  return {
    agent,
    environment,
    context,
    run: async ({
      message,
      model,
      abortController,
    }: {
      message: UserMessageData;
      model: LanguageModel;
      abortController?: AbortController;
    }) => {
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
      execution.subscribe((state: any) => {
        if (state.status !== "running" && state.status !== "idle") {
          controller.setState({ activeExecution: undefined });
        }
      });

      // Start the execution
      execution.run({ message }).catch(() => {});

      return execution;
    },
    pushUserMessage: async (message: Omit<UserMessageData, "role">) => {
      controller.getState().context.history.push({
        type: "message",
        id: crypto.randomUUID(),
        data: { ...message, role: "user" },
      });
    },
    startAgentMessage: async (): Promise<AgentMessage> => {},
  };
}

export type AgentThread = ReturnType<typeof createAgentThread>;
