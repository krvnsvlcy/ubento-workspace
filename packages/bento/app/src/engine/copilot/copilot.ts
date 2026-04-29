import { UbentoSDK } from "@ubento/sdk";
import { Agent, createAgent } from "./agent/agent.js";
import { createUbentoAgentEnvironment } from "./copilot/environment.js";
import {
  copilotEnvironmentInstructions,
  copilotRoleInstructions,
} from "./copilot/instructions.js";

export type UbentoCopilot = Agent;

export function createUbentoCopilot({
  ubentoApi,
}: {
  ubentoApi: UbentoSDK;
}): UbentoCopilot {
  const env = createUbentoAgentEnvironment({ ubentoApi });

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
