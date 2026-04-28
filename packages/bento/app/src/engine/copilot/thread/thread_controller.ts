import { getModelData } from "../../lib/models.js";
import { charsToTokens } from "../../lib/tokens.js";
import { Agent } from "../agent/agent.js";
import { AgentContext } from "../agent/context.js";
import { IntelligenceMessage } from "../agent/message.js";
import {
  AgentMessageData,
  IntelligenceMessageData,
} from "../agent/message/message.js";
import { summarize } from "../agent/prompts/summarizer/summarizer.js";
import { AgentThreadInstance, createAgentThread } from "../agent/thread.js";
import { createAgentMessageController } from "./agent_message_controller.js";

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

const instances = new Map<string, AgentThreadInstance>();

export function getThreadController({
  thread,
  agent,
}: {
  thread: IntelligenceThread;
  agent: Agent;
}): AgentThreadInstance {
  const key = thread.id;
  if (instances.has(key)) return instances.get(key)!;

  const instance = createAgentThread({
    id: thread.id,
    agent,
    getContext: async () => {
      const data = await thread.getData();
      return (data?.context as AgentContext) || { history: [] };
    },
    setContext: async (context) => {
      await thread.autoFetch();
      await thread.setContext(context);
    },
    getContextStats: async (modelId) => {
      const modelData = await getModelData(modelId);
      const data = await thread.getData();
      const context = (data?.context as AgentContext) || { history: [] };

      const agentState = agent.getState();
      const instructions = await agentState.getInstructions();
      const prompt = await agentState.getPrompt(context);

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
      const context = (data?.context as AgentContext) || { history: [] };
      const newContext = await summarize({ context, agent, model });
      await thread.setContext(newContext);
    },
    save: () => thread.save(),
    pushUserMessage: async (data) => {
      const message = await thread.createMessage({ role: "user", data });
      const currentData = await thread.getData();
      const prevContext = (currentData?.context as AgentContext) || {
        history: [],
      };
      await thread.setContext({
        ...prevContext,
        history: [
          ...(prevContext.history || []),
          { type: "message", role: "user", messageId: message.id, data },
        ],
      });
    },
    startAgentMessage: async (execution) => {
      const data: AgentMessageData = {};
      const message = await thread.createMessage({ role: "agent", data });
      const currentData = await thread.getData();
      const prevContext = (currentData?.context as AgentContext) || {
        history: [],
      };
      await thread.setContext({
        ...prevContext,
        history: [
          ...(prevContext.history || []),
          { type: "message", role: "agent", messageId: message.id, data },
        ],
      });
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
