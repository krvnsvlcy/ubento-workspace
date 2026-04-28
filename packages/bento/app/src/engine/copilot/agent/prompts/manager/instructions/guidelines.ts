import { Tool } from "~/lib/agents/tool.js";
import { MessageTool } from "../../../tools/message.js";
import { ResponseTool } from "../../../tools/response.js";

export function guidelinesSection(tools: Tool[]) {
  const hasMessage = tools.some((t) => t.name === MessageTool.toolName);
  const hasResponse = tools.some((t) => t.name === ResponseTool.toolName);

  let communicationRules = "";

  if (hasMessage) {
    communicationRules = `- Use the \`${MessageTool.toolName}\` tool to communicate with the user.`;
  } else if (hasResponse) {
    communicationRules = `
- You cannot communicate with the user directly.
- Once you have fully solved the task, use the \`${ResponseTool.toolName}\` tool to submit your final work and results.
- Only call the \`${ResponseTool.toolName}\` tool after verifying everything is complete.
`.trim();
  }

  return `
# Guidelines

${communicationRules}
- Keep going until the task is fully resolved; only stop when you're sure it's solved.
- When uncertain, deduce a reasonable approach, proceed, and document assumptions afterward.
- Don't ask for confirmation or further details unless essential — You can adjust later.
`.trim();
}
