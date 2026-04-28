import { Agent, createAgent } from "./agent/agent";

export type UbentoCopilot = Agent;

export function createUbentoCopilot(): UbentoCopilot {
  return createAgent({
    name: "ubento-copilot",
    description: "The main AI assistant",
  });
}
