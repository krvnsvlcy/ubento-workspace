import { AgentInstructions } from "~/lib/agents/prompts/manager/instructions/instructions.js";
import { SubAgent } from "~/lib/copilot/agents/sub_agent.js";
import { Copilot } from "~/lib/copilot/copilot.js";
import { ReadDirTool } from "../../tools/read_dir.js";
import { ReadFileTool } from "../../tools/read_file.js";
import { environmentInstructions, roleInstructions } from "./instructions.js";

export class ArchitectAgent extends SubAgent {
  static readonly agentName = "architect";

  constructor({ copilot }: { copilot: Copilot }) {
    super({
      name: ArchitectAgent.agentName,
      description:
        "A specialized agent for creating and managing architecture and project structure.",
      copilot,
    });

    this.addTool(new ReadFileTool({ elll: copilot.elll }));
    this.addTool(new ReadDirTool({ elll: copilot.elll }));
  }

  getAgentInstructions(): AgentInstructions {
    return {
      role: roleInstructions,
      environment: environmentInstructions,
    };
  }
}
