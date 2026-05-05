import { Agent, createAgent } from "../../agent/agent.js";

export interface SubAgentConfig {
  name: string;
  description: string;
  copilot: Agent;
  getAgentInstructions: () => any;
}

export function createSubAgent({
  name,
  description,
  copilot,
  getAgentInstructions,
}: SubAgentConfig): Agent {
  const agent = createAgent({
    name,
    description,
    toolkit: copilot.environment,
    getAgentInstructions,
  });

  // Share the copilot's thread creation logic
  (agent as any).createThread = async (params: { title: string }) => {
    return copilot.createThread(params);
  };

  return agent;
}
