import { UbentoService } from "@/services/ubento/ubento.js";
import { Agent, createAgent } from "./agent/agent.js";
import { createUbentoAgentEnvironment } from "./copilot/environment.js";
import {
  copilotEnvironmentInstructions,
  copilotRoleInstructions,
} from "./copilot/instructions.js";

export type UbentoCopilot = Agent;

export function createUbentoCopilot({
  ubento,
}: {
  ubento: UbentoService;
}): UbentoCopilot {
  const env = createUbentoAgentEnvironment({ ubento });

  return createAgent({
    name: "ubento-copilot",
    description: "The main AI assistant",
    toolkit: env,
    getAgentInstructions: () => ({
      role: copilotRoleInstructions,
      environment: copilotEnvironmentInstructions,
    }),
  });
}
