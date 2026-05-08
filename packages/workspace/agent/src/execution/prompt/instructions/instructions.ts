import { Agent } from "@/agent/agent.js";
import { AgentEnvironment } from "@/environment/environment.js";
import { agentsSection } from "./agents.js";
import { guidelinesSection } from "./guidelines.js";
import { metaInstructions } from "./meta.js";
import { outputFormat } from "./output.js";
import { toolsSection } from "./tools.js";

export type AgentInstructions = {
  role: string;
  environment: string;
};

const roleSection = (role: string) => `
# Role

${role}
`;

const environmentSection = (environment: string) => `
# Environment

${environment}
`;

export const buildAgentOrchestratorInstructions = ({
  environment,
  agent,
  tools,
  toolkits,
  agents,
}: {
  environment: AgentEnvironment;
  agent: Agent;
  tools: any[];
  toolkits: any[];
  agents: Agent[];
}) => {
  const hasAgents = agents && agents.length > 0;

  return metaInstructions
    .replace("<ToolsSection/>", toolsSection({ tools, toolkits }))
    .replace(
      "<AgentsSection/>",
      agentsSection(agents.filter((a) => a.name !== agent.name)),
    )
    .replace("<CurrentAgentSection/>", roleSection(agent.instructions))
    .replace("<GuidelinesSection/>", guidelinesSection(tools))
    .replace("<OutputFormat/>", outputFormat(tools, hasAgents));
};
