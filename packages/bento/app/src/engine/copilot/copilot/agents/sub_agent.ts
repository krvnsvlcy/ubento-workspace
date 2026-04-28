import { Agent } from "../../agent/agent.js";
import { AgentThread } from "../../agent/thread.js";
import { Copilot } from "../copilot.js";

export abstract class SubAgent extends Agent {
  readonly copilot: Copilot;

  constructor({
    name,
    description,
    copilot,
  }: {
    name: string;
    description: string;
    copilot: Copilot;
  }) {
    super({
      name,
      description,
      // Share the copilot's environment so sub-agents get the same
      // integrations, searchTools, and getIntegration access.
      environment: copilot.environment,
      logger: copilot.logger?.child({ agent: name }),
      tools: {
        response: true,
      },
    });
    this.copilot = copilot;
  }

  createThread(init?: { title?: string }): Promise<AgentThread> {
    return this.copilot.createThread({
      ...init,
      agent: this,
    });
  }

  getThread(id: string): Promise<AgentThread | undefined> {
    return this.copilot.getThread(id);
  }
}
