import { UbentoService } from "@/services/ubento/ubento.js";
import {
  Agent,
  agentContextSchema,
  AgentEnvironment,
  AgentThread,
  createAgentThread,
} from "@ubento/workspace.agent";
import { generateText } from "ai";
import { UbentoSession } from "../session";
import { getModel } from "./utils/models";

export type CopilotAgentEnvironment = AgentEnvironment & {
  getThread: ({
    id,
    agent,
  }: {
    id: string;
    agent: string;
  }) => Promise<AgentThread>;
  createThread: (
    options: {
      agent: string;
      title?: string;
    } & ({ teamId?: string } | { workspaceId?: string }),
  ) => Promise<AgentThread>;

  addAgent: (agent: Agent) => void;
  getAgent: (name: string) => Agent | undefined;
  listAgents: () => Agent[];
  removeAgent: (name: string) => void;
};

export function createCopilotAgentEnvironment({
  ubento,
  session,
}: {
  ubento: UbentoService;
  session: UbentoSession;
}) {
  const threads: Record<string, AgentThread> = {};
  const agents: Record<string, Agent> = {};

  function getAgent(name: string): Agent | undefined {
    return agents[name];
  }

  async function createThread({
    agent: agentName,
    teamId,
    workspaceId,
    title,
  }: {
    agent: string;
    teamId?: string | undefined;
    workspaceId?: string | undefined;
    title?: string | undefined;
  }) {
    const agent = getAgent(agentName);
    if (!agent) {
      throw new Error(`Agent with name ${agentName} not found`);
    }

    const data = await ubento.intelligence.createThread({
      workspaceId,
      teamId,
      title,
    });
    const parsedContext = agentContextSchema.safeParse(
      data.context || { resources: [], history: [] },
    );
    if (!parsedContext.success) {
      throw new Error("Invalid agent context");
    }

    return createAgentThread({
      agent,
      initialContext: parsedContext.data,
      environment,
    });
  }
  async function getThread({
    id,
    agent: agentName,
  }: {
    id: string;
    agent: string;
  }) {
    const cachedThread = threads[id];
    if (cachedThread) return cachedThread;

    const data = await ubento.intelligence.getThread(id);
    console.log("Thread data", data.context);
    const parsedContext = agentContextSchema.safeParse(
      data.context || { resources: [], history: [] },
    );
    if (!parsedContext.success) {
      throw new Error("Invalid agent context");
    }

    const agent = getAgent(agentName);
    if (!agent) {
      throw new Error(`Agent with name ${agentName} not found`);
    }
    const instance = createAgentThread({
      agent,
      initialContext: parsedContext.data,
      environment,
    });

    threads[id] = instance;
    return instance;
  }

  const environment: CopilotAgentEnvironment = {
    getThread,
    createThread,
    getModel: (id) => {
      const v3Model = getModel({ modelId: id, ubento, session });
      return {
        id,
        provider: "ubento",
        generateText: async (options) => {
          const res = await generateText({
            model: v3Model,
            ...options,
          });
          return {
            text: res.text,
            finishReason: res.finishReason,
            usage: {
              promptTokens: (res.usage as any).promptTokens,
              completionTokens: (res.usage as any).completionTokens,
              totalTokens: (res.usage as any).totalTokens ?? 0,
            },
          };
        },
      };
    },
    getTool: async () => {
      return undefined;
    },
    getTools: async () => {
      return [];
    },

    addAgent: (agent) => {
      agents[agent.name] = agent;
    },
    getAgent,
    listAgents: () => Object.values(agents),
    removeAgent: (name) => {
      delete agents[name];
    },
  };

  return environment;
}
