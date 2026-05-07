import { AgentEnvironment } from "@/environment/environment";

export function createAgent({
  name,
  description,
  instructions,
  environment,
}: {
  environment: AgentEnvironment;
  name: string;
  description: string;
  instructions: string;
}) {
  const agent = {
    name,
    description,
    instructions,
    environment,

    getThread: async (threadId: string) => {
      return environment.getThread(threadId, agent);
    },
    createThread: async () => {
      return environment.createThread(agent);
    },
  };

  return agent;
}

export type Agent = ReturnType<typeof createAgent>;
