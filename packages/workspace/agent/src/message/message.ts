import { LLMContent } from "@/utils/llm.js";
import { AgentActionData, AgentError, AgentMessageData } from "./types.js";

export function createAgentMessage({
  modelId,
  save,
}: {
  modelId: string;
  save: (data: AgentMessageData) => Promise<void>;
}) {
  const coreData: AgentMessageData = {
    role: "agent",
    actions: [],
    status: "in-progress",
    modelId,
  };
  const actionData: Record<string, AgentActionData> = {};

  function getData(): Readonly<AgentMessageData> {
    return {
      ...coreData,
      actions: Object.values(actionData),
    };
  }

  async function createAction({
    tool,
    input,
  }: {
    tool: string;
    input?: Record<string, any>;
  }) {
    const newAction: AgentActionData = {
      id: crypto.randomUUID(),
      status: "pending",
      tool,
      input,
    };
    actionData[newAction.id] = newAction;
    await save(getData());
    return newAction.id;
  }
  async function updateAction(id: string, update: Partial<AgentActionData>) {
    actionData[id] = { ...actionData[id], ...update };
    await save(getData());
  }

  return {
    getData,
    async abort() {
      coreData.status = "aborted";
      await save(getData());
    },
    async complete() {
      coreData.status = "completed";
      await save(getData());
    },
    async fail(error: AgentError) {
      coreData.status = "errored";
      coreData.error = error;
      await save(getData());
    },

    // actions
    getAction(id: string) {
      return actionData[id];
    },
    getAllActions() {
      return Object.values(actionData);
    },
    writeAction(data: Omit<AgentActionData, "id">) {
      const id = crypto.randomUUID();
      actionData[id] = {
        id,
        ...data,
      };
    },
    createAction,
    updateAction,
    async startAction(id: string) {
      await updateAction(id, { status: "running" });
    },
    async completeAction(
      id: string,
      {
        output,
        structuredOutput,
      }: {
        output: LLMContent;
        structuredOutput?: Record<string, any>;
      },
    ) {
      await updateAction(id, {
        status: "completed",
        output,
        structuredOutput,
      });
    },
    async failAction(id: string, error: AgentError) {
      await updateAction(id, { status: "failed", error });
    },
  };
}
export type AgentMessage = ReturnType<typeof createAgentMessage>;
