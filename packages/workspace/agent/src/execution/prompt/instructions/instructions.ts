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
}: {
  environment: AgentEnvironment;
  agent: Agent;
}) => {
  const hasAgents = agents && agents.length > 0;

  const tools = allTools;

  return metaInstructions
    .replace("<ToolsSection/>", toolsSection({ tools, toolSets }))
    .replace("<SkillsSection/>", "")
    .replace("<AgentsSection/>", agentsSection(agents as any))
    .replace("<RoleSection/>", roleSection(instructions.role))
    .replace(
      "<EnvironmentSection/>",
      environmentSection(instructions.environment),
    )
    .replace("<GuidelinesSection/>", guidelinesSection(tools))
    .replace("<OutputFormat/>", outputFormat(tools, hasAgents));
};
