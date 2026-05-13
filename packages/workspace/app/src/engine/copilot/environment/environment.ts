import { UbentoService } from "@/services/ubento/ubento.js";
import { Logger } from "@ubento/telemetry";
import {
  Agent,
  agentContextDataSchema,
  AgentEnvironment,
  AgentThread,
  AgentTool,
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
  thread: (id: string) => AgentThread | undefined;
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
};

export function createCopilotAgentEnvironment({
  ubento,
  session,
  logger,
  toolkits,
  tools,
  workspaceId,
}: {
  ubento: UbentoService;
  session: UbentoSession;
  logger: Logger;
  toolkits?: Toolkit[];
  tools?: AgentTool[];
  workspaceId?: string;
}) {
  const threads: Record<string, AgentThread> = {};

  const baseEnv = createEnvironment({
    tools,
    listToolkits: () => toolkits ?? [],
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
    createAgentThread: ({ agent, title }: { agent: Agent; title?: string }) => {
      return createThread({ agent: agent.name, title });
    },
  });

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
          data: messageData,
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
    const agent = baseEnv.getAgent(agentName);
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
    const agentObj = baseEnv.getAgent(agentName);
    if (!agentObj) {
      throw new Error(`Agent with name ${agentName} not found`);
    }

    const instance = createAgentThreadFromData({ data, agent: agentObj });
    threads[id] = instance;
    return instance;
  }

  const environment: CopilotAgentEnvironment = {
    ...baseEnv,
    ubento,
    session,
    logger,
    thread: (id) => threads[id],
    getThread,
    createThread,
  };

  return environment;
}
