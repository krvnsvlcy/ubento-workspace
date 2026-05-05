import { Agent } from "@/engine/copilot/agent/agent.js";
import { createSubAgent } from "../sub_agent.js";
import { environmentInstructions, roleInstructions } from "./instructions.js";

export function createArchitectAgent({ copilot }: { copilot: Agent }): Agent {
  const agent = createSubAgent({
    name: "architect",
    description: "A specialized agent for creating and managing architecture and project structure.",
    copilot,
    getAgentInstructions: () => ({
      role: roleInstructions,
      environment: environmentInstructions,
    }),
  });

  // Tools should be added here
  // agent.addTool(createReadFileTool({ ... }));
  
  return agent;
}
