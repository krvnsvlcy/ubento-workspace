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

/**
 * IntelligenceThread represents the underlying storage/API for a thread.
 */
export interface IntelligenceThread {
  id: string;
  getData(): Promise<any>;
  autoFetch(): Promise<void>;
  setContext(context: any): Promise<void>;
  save(): Promise<void>;
  generateTitle(): Promise<void>;
  createMessage(params: {
    role: string;
    data: any;
  }): Promise<IntelligenceMessage>;
  messages(): { fetchAll(): Promise<IntelligenceMessage[]> };
  addDisposer(disposer: () => void): void;
}

const instances = new Map<string, AgentThread>();

export function getThreadController({
  thread,
  agent,
}: {
  thread: IntelligenceThread;
  agent: Agent;
}): AgentThread {
  const key = thread.id;
  if (instances.has(key)) return instances.get(key)!;

  const instance = createAgentThread({
    id: thread.id,
    agent,
    getContext: async () => {
      const data = await thread.getData();
      return (data?.context as AgentContext) || { resources: [] };
    },
    setContext: async (context) => {
      await thread.autoFetch();
      await thread.setContext(context);
    },
    getContextStats: async (modelId) => {
      const modelData = await getModelData(modelId);
      const data = await thread.getData();
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
      const data = await thread.getData();
      const context = (data?.context as AgentContext) || { resources: [] };
      const newContext = await summarize({ context, agent, model });
      await thread.setContext(newContext);
    },
    save: () => thread.save(),
    createMessage: async (data) => {
      const message = await thread.createMessage({ role: "user", data });
      const currentData = await thread.getData();
      const prevContext = (currentData?.context as AgentContext) || {
        resources: [],
      };
      await thread.setContext({
        ...prevContext,
        resources: prevContext.resources || [],
      });
    },
    startAgentMessage: async (execution) => {
      const data: AgentMessageData = {};
      const message = await thread.createMessage({ role: "agent", data });
      return createAgentMessageController({ message, execution });
    },
    listMessages: async () => {
      const messages = await thread.messages().fetchAll();
      const data = await Promise.all(
        messages.map((m) => m.getData().then((d) => d?.data)),
      );
      return data.filter(Boolean) as IntelligenceMessageData[];
    },
    generateTitle: () => thread.generateTitle(),
  });

  instances.set(key, instance);
  thread.addDisposer(() => instances.delete(key));
  return instance;
}
