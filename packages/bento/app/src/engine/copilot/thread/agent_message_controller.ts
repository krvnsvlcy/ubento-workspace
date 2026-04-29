import { AgentExecution } from "../agent/execution.js";
import {
  AgentMessageInstance,
  createAgentMessage,
  IntelligenceMessage,
} from "../agent/message.js";
import { AgentMessageData } from "../agent/message/message.js";

export function createAgentMessageController({
  message,
  execution,
}: {
  message: IntelligenceMessage;
  execution: AgentExecution;
}): AgentMessageInstance {
  return createAgentMessage({
    message,
    execution,
    getData: async () => {
      const data = await message.getData();
      return (data?.data as AgentMessageData) || {};
    },
    setData: async (data) => {
      await message.update({ data: JSON.parse(JSON.stringify(data)) });

      const thread = execution.thread;

      const context = await thread.getContext();
      const history = (context.history || []).map((entry: any) => {
        if (entry.type === "message" && entry.messageId === message.id) {
          return { ...entry, data };
        }
        return entry;
      });
      await thread.setContext({ ...context, history });
    },
    save: () => message.save(),
  });
}
