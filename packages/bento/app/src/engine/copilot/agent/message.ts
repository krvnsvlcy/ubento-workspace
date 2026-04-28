import z from "zod";
import { AgentExecutionInstance, AgentExecutionErrorCode, AgentExecutionError } from "./execution.js";
import { AgentActionData, AgentActionStatus } from "./message/action.js";
import { AgentError } from "./message/error.js";
import { LLMContent } from "./message/llm.js";
import { AgentMessageData, AgentMessageError } from "./message/message.js";
import { Tool } from "./tool.js";

// Local interface to replace dependency on @elllphnt/backend
export interface IntelligenceMessage {
  id: string;
  getData(): Promise<any>;
  update(data: any): Promise<void>;
  save(): Promise<void>;
}

export interface AgentMessageInstance {
  id: string;
  execution: AgentExecutionInstance;
  message: IntelligenceMessage;
  startAction<T extends Tool>(params: {
    toolRef: string;
    tool: T;
  }): Promise<AgentActionInstance<T>>;
  logError(error: AgentError): Promise<void>;
  logReasoning(reasoning: string): Promise<void>;
  complete(params?: { error?: AgentMessageError }): Promise<void>;
  getActionData(index: number): Promise<AgentActionData>;
  updateAction(index: number, updates: Partial<AgentActionData>): Promise<void>;
}

export interface AgentActionInstance<T extends Tool = Tool> {
  index: number;
  message: AgentMessageInstance;
  tool: T;
  start(): Promise<void>;
  complete(): Promise<void>;
  fail(): Promise<void>;
  abort(): Promise<void>;
  getInput(): Promise<z.infer<T["args"]>>;
  setInput(input: z.infer<T["args"]>): Promise<void>;
  updateInput(input: Partial<z.infer<T["args"]>>): Promise<void>;
  getOutput(): Promise<any>;
  setOutput(output: LLMContent): Promise<void>;
  getStructuredOutput(): Promise<any>;
  setStructuredOutput(output: any): Promise<void>;
  run(): Promise<boolean>;
}

export function createAgentMessage(params: {
  message: IntelligenceMessage;
  execution: AgentExecutionInstance;
  getData: () => Promise<AgentMessageData>;
  setData: (data: AgentMessageData) => Promise<void>;
  save: () => Promise<void>;
}): AgentMessageInstance {
  let _data: AgentMessageData | undefined;

  const ensureLoaded = async () => {
    if (!_data) _data = await params.getData();
    return _data;
  };

  const updateData = async <T>(updater: (data: AgentMessageData) => [AgentMessageData, T]) => {
    const currentData = await ensureLoaded();
    const [newData, extra] = updater(currentData);
    _data = newData;
    await params.setData(newData);
    return [newData, extra] as const;
  };

  const instance: AgentMessageInstance = {
    id: params.message.id,
    execution: params.execution,
    message: params.message,

    async startAction({ toolRef, tool }) {
      const [_, index] = await updateData((data) => {
        const events = data.events || [];
        const newAction: AgentActionData = {
          id: crypto.randomUUID(),
          tool: toolRef,
          status: AgentActionStatus.Pending,
        };
        return [{ ...data, events: [...events, { type: "action", data: newAction }] }, events.length];
      });

      return createAgentAction({ index: index as number, message: instance, tool });
    },

    async getActionData(index) {
      const data = await ensureLoaded();
      const event = data.events?.[index];
      if (!event || event.type !== "action") throw new Error("Event not found");
      return event.data;
    },

    async updateAction(index, updates) {
      await updateData((data) => {
        const events = [...(data.events || [])];
        if (events[index] && events[index].type === "action") {
          events[index] = { ...events[index], data: { ...events[index].data, ...updates } } as any;
        }
        return [{ ...data, events }, undefined];
      });
    },

    async logError(error) {
      await updateData((data) => [{ ...data, events: [...(data.events || []), { type: "error", data: error }] }, undefined]);
    },

    async logReasoning(reasoning) {
      await updateData((data) => [{ ...data, reasoning }, undefined]);
    },

    async complete({ error } = {}) {
      const [updatedData] = await updateData((data) => [{ ...data, status: error ? "error" : "success", error }, undefined]);
      await params.save();
    },
  };

  return instance;
}

export function createAgentAction<T extends Tool>(params: {
  index: number;
  message: AgentMessageInstance;
  tool: T;
}): AgentActionInstance<T> {
  const update = (updates: Partial<AgentActionData>) => params.message.updateAction(params.index, updates);

  const instance: AgentActionInstance<T> = {
    index: params.index,
    message: params.message,
    tool: params.tool,

    start: () => update({ status: AgentActionStatus.Running }),
    complete: () => update({ status: AgentActionStatus.Completed }),
    fail: () => update({ status: AgentActionStatus.Failed }),
    abort: () => update({ status: AgentActionStatus.Aborted }),

    async getInput() {
      const data = await params.message.getActionData(params.index);
      return data.input as any;
    },
    setInput: (input) => update({ input }),
    async updateInput(input) {
      const current = await instance.getInput();
      await instance.setInput({ ...current, ...input });
    },

    async getOutput() {
      const data = await params.message.getActionData(params.index);
      return data.output;
    },
    setOutput: (output) => update({ output }),

    async getStructuredOutput() {
      const data = await params.message.getActionData(params.index);
      return data.structured_output;
    },
    setStructuredOutput: (output) => update({ structured_output: output }),

    async run() {
      const args = await instance.getInput();
      try {
        await instance.start();
        const result = await params.tool.run(args, instance);
        await update({
          output: result.content,
          structured_output: result.structuredContent,
          status: result.isError ? AgentActionStatus.Failed : AgentActionStatus.Completed,
        });
        return !result.shouldEnd;
      } catch (error) {
        await update({
          output: [{ type: "text", text: `Unexpected Error: ${String(error)}` }],
          status: AgentActionStatus.Failed,
        });
        return true;
      }
    },
  };

  return instance;
}

