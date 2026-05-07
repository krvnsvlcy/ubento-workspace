import { renderYaml } from "../../../utils/format";

export function agentsSection(agents: { name: string; description: string }[]) {
  let agentsDoc = `There are no agents currently available.`;

  if (agents.length) {
    agentsDoc = `
**Available Agents**

${renderYaml(agents.map((a) => ({ name: a.name, description: a.description })))}
`.trim();
  }

  return `
# Agents

You can delegate specialized tasks to subagents.
- Use the \`task\` tool to delegate a task to a subagent.

${agentsDoc}
`.trim();
}
