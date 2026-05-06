import { Agent } from "../agent/agent.js";
import { AgentContext } from "../agent/context.js";
import { IntelligenceMessage } from "../agent/message.js";
import {
  AgentMessageData,
  IntelligenceMessageData,
} from "../agent/message/message.js";
import { summarize } from "../agent/prompts/summarizer/summarizer.js";
import { AgentThread, createAgentThread } from "../agent/thread.js";
import { getModelData } from "../utils/models.js";
import { charsToTokens } from "../utils/tokens.js";
import { createAgentMessageController } from "./agent_message_controller.js";

import { UbentoService } from "@/services/ubento/ubento.js";

const instances = new Map<string, AgentThread>();

export function getThreadController({
  threadId,
  agent,
  ubento,
}: {
  threadId: string;
  agent: Agent;
  ubento: UbentoService;
}): AgentThread {
  const key = threadId;
  if (instances.has(key)) return instances.get(key)!;

  const instance = createAgentThread({
    id: threadId,
    agent,
    storage: {
      getContext: async () => {
        const data = await ubento.intelligence.getThread(threadId);
        return (data?.context as AgentContext) || { resources: [] };
      },
      setContext: async (context) => {
        // Assume context updates happen via standard thread updates later if supported
        // Or if there is an updateThread method, we would call it here.
      },
      getContextStats: async (modelId) => {
        const modelData = await getModelData(modelId);
        const data = await ubento.intelligence.getThread(threadId);
        const context = (data?.context as AgentContext) || { resources: [] };

        const instructions = await agent.getInstructions();
        const prompt = await agent.getPrompt(context);

        const window = modelData.context_window;
        const budget = Math.floor(window * 0.8);

        const instructionsUsage = charsToTokens(instructions.length);
        const promptUsage = charsToTokens(JSON.stringify(prompt).length);
        const usage = instructionsUsage + promptUsage;

        return {
          window,
          budget,
          usage,
          breakdown: {
            instructions: instructionsUsage,
            prompt: promptUsage,
          },
        };
      },
      summarizeContext: async (model) => {
        const data = await ubento.intelligence.getThread(threadId);
        const context = (data?.context as AgentContext) || { resources: [] };
        const newContext = await summarize({ context, agent, model });
        // Assume context updates happen via standard thread updates later if supported
      },
      save: async () => {}, // no-op if context is auto-saved or we don't have update
      createMessage: async (data) => {
        await ubento.intelligence.createMessage({
          thread_id: threadId,
          role: "user",
          messageData: data,
        });
      },
      startAgentMessage: async (execution) => {
        const data: AgentMessageData = {};
        const message = await ubento.intelligence.createMessage({
          thread_id: threadId,
          role: "agent",
          messageData: data,
        });
        return createAgentMessageController({ message: message as any, execution });
      },
      listMessages: async () => {
        const res = await ubento.intelligence.listMessages({ thread_id: threadId });
        return res.data.map(m => m.data) as unknown as IntelligenceMessageData[];
      },
      generateTitle: async () => {}, // no-op, API doesn't expose it
    }
  });

  instances.set(key, instance);
  return instance;
}
