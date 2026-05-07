import { Agent } from "@ubento/workspace.agent";
import {
  copilotEnvironmentInstructions,
  copilotRoleInstructions,
} from "../instructions";

export const copilotAgent: Agent = {
  name: "copilot",
  description: "The main AI assistant",
  instructions: `${copilotRoleInstructions}\n\n${copilotEnvironmentInstructions}`,
};
