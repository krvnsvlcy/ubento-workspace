import { AgentTool } from "../../tool/tool.js";
import { MessageTool } from "../../tools/message.js";

export function guidelinesSection(tools: AgentTool[]) {
  const hasMessage = tools.some((t) => t.name === MessageTool.toolName);

  let communicationRules = "";

  if (hasMessage) {
    communicationRules = `- Use the \`${MessageTool.toolName}\` tool to communicate with the user.`;
  }

  return `
# Guidelines

${communicationRules}
- Keep going until the task is fully resolved; only stop when you're sure it's solved.
- When you have fully solved the task and want to stop, respond with the \`response\` field containing your final answer, instead of the \`actions\` field.
- When uncertain, deduce a reasonable approach, proceed, and document assumptions afterward.
- Don't ask for confirmation or further details unless essential — You can adjust later.
`.trim();
}
