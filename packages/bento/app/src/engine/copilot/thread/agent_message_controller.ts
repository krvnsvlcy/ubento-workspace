import { AgentExecutionInstance } from "../agent/execution.js";
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
  execution: AgentExecutionInstance;
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

      const executionState = execution.getState();
      const thread = executionState.thread;

      // Handle both store-based thread and class-based thread shim
      const getContext = thread.getState
        ? () => thread.getState().getContext()
        : () => (thread as any).getContext();
      const setContext = thread.getState
        ? (c: any) => thread.getState().setContext(c)
        : (c: any) => (thread as any).setContext(c);

      const context = await getContext();
      const history = (context.history || []).map((entry: any) => {
        if (entry.type === "message" && entry.messageId === message.id) {
          return { ...entry, data };
        }
        return entry;
      });
      await setContext({ ...context, history });
    },
    save: () => message.save(),
  });
}
