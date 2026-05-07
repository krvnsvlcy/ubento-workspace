import { Agent } from "@ubento/workspace.agent";

export interface SubAgentConfig {
  name: string;
  description: string;
  getAgentInstructions: () => any;
}

export function createSubAgent({
  name,
  description,
  getAgentInstructions,
}: SubAgentConfig): Agent {
  return {
    name,
    description,
    instructions: getAgentInstructions(),
  };
}
