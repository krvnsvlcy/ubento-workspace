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
    getAgentInstructions,
  });

  const copilotState = copilot.getState();
  for (const toolSet of Object.values(copilotState.toolSets)) {
    agent.addToolSet(toolSet);
  }
  for (const resourceType of Object.values(copilotState.resourceTypes)) {
    agent.addResourceType(resourceType);
  }
  for (const attachmentType of Object.values(copilotState.attachmentTypes)) {
    agent.addAttachmentType(attachmentType);
  }

  return agent;
}
