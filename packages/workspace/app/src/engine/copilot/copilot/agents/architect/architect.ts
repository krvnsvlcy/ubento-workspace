import { Agent } from "@ubento/workspace.agent";
import { createSubAgent } from "../sub_agent.js";
import { environmentInstructions, roleInstructions } from "./instructions.js";

export function createArchitectAgent(): Agent {
  const agent = createSubAgent({
    name: "architect",
    description: "A specialized agent for creating and managing architecture and project structure.",
    getAgentInstructions: () => `${roleInstructions}\n\n${environmentInstructions}`,
  });

  // Tools should be added here
  // agent.addTool(createReadFileTool({ ... }));
  
  return agent;
}
