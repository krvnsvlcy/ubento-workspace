import { UbentoService } from "@/services/ubento/ubento.js";
import { Logger } from "@ubento/telemetry";
import {
  Agent,
  agentContextDataSchema,
  AgentEnvironment,
  AgentThread,
  createAgentThread,
  createEnvironment,
  Toolkit,
} from "@ubento/workspace.agent";
import { generateText } from "ai";
import { UbentoSession } from "../../app/session";
import { getModel } from "../models/models";

export type CopilotAgentEnvironment = AgentEnvironment & {
  ubento: UbentoService;
  session: UbentoSession;
  logger: Logger;
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
  removeAgent: (name: string) => void;
};

export function createCopilotAgentEnvironment({
  ubento,
  session,
  logger,
  toolkits,
  workspaceId,
}: {
  ubento: UbentoService;
  session: UbentoSession;
  logger: Logger;
  toolkits: Toolkit[];
  workspaceId?: string;
}) {
  const threads: Record<string, AgentThread> = {};
  const agents: Record<string, Agent> = {};

  const baseEnv = createEnvironment({
    listToolkits: () => toolkits,
    logger: logger.child({ module: "agent_env" }),
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
  });

  function getAgent(name: string): Agent | undefined {
    return agents[name];
  }

  function createAgentThreadFromData({
    data,
    agent,
  }: {
    data: any;
    agent: Agent;
  }) {
    const parsedContext = agentContextDataSchema.safeParse(
      data.context || { resources: [], history: [] },
    );
    if (!parsedContext.success) {
      throw new Error("Invalid agent context");
    }

    return createAgentThread({
      id: data.id,
      agent,
      initialContext: parsedContext.data,
      environment,
      saveContext: async (context) => {
        await ubento.intelligence.updateThread(data.id, { context });
      },
      createMessage: async (messageData) => {
        const msg = await ubento.intelligence.createMessage({
          thread_id: data.id,
          role: messageData.role,
          messageData,
        });
        logger.debug("Message created: ", {
          event: "thread_message_created",
          messageId: msg.id,
          threadId: data.id,
          role: messageData.role,
        });
        return msg.id;
      },
      updateMessage: async (messageId, messageData) => {
        await ubento.intelligence.updateMessage(messageId, {
          data: messageData,
        });
        logger.debug("Message updated: ", {
          event: "thread_message_updated",
          messageId,
          threadId: data.id,
          role: messageData.role,
        });
      },
    });
  }

  async function createThread({
    agent: agentName,
    title,
  }: {
    agent: string;
    title?: string | undefined;
  }) {
    const agent = getAgent(agentName);
    if (!agent) {
      throw new Error(`Agent with name ${agentName} not found`);
    }

    const data = await ubento.intelligence.createThread({
      workspaceId,
      teamId: session.teamId,
      title,
    });

    const instance = createAgentThreadFromData({ data, agent });
    threads[data.id] = instance;
    return instance;
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
    const agent = getAgent(agentName);
    if (!agent) {
      throw new Error(`Agent with name ${agentName} not found`);
    }

    const instance = createAgentThreadFromData({ data, agent });
    threads[id] = instance;
    return instance;
  }

  const environment: CopilotAgentEnvironment = {
    ...baseEnv,
    ubento,
    session,
    logger,
    getThread,
    createThread,
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
