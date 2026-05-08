import { llmContentToText } from "@/utils/llm.js";
import z, { undefined } from "zod";
import { renderYaml } from "../../../utils/format.js";
import { cleanJsonSchema } from "../../../utils/zod.js";
import { AgentTool } from "../../tool/tool.js";
import { Toolkit } from "../../tool/toolkit/toolkit.js";

export function toolsSection({
  tools,
  toolkits,
}: {
  tools: AgentTool[];
  toolkits: Toolkit[];
}) {
  type ToolData = {
    name: string;
    description: string;
    args: object | null;
    example?: any;
  };

  const toolList: ToolData[] = [
    ...tools.map((tool) => {
      return {
        name: tool.name,
        description: tool.description,
        args: cleanJsonSchema(z.toJSONSchema(tool.args)),
        examples: tool.examples?.map((e) => ({
          summary: e.summary,
          input: e.input,
          output: e.output ? llmContentToText(e.output) : undefined,
        })),
      };
    }),
    {
      name: "finish",
      description:
        "Call this to indicate that the task is complete. Must be called alone after verifying previous actions succeeded.",
      args: null,
    },
  ];

  let toolkitsDoc = `There are no external toolkits currently available.`;

  if (toolkits.length) {
    toolkitsDoc = `
**Available Toolkits**

${renderYaml(
  toolkits.map((e) => ({
    name: e.name,
    description: e.description,
  })),
)}`.trim();
  }

  return `
# Tools

Following are the tools you have access to perform actions and interact with the system:

${renderYaml(toolList)}

## External Tools

In addition to the tools above, You can load additional tools from external toolkits to achieve more advanced capabilities. 
- Use \`list_tools\` with a toolkit name to list available tools in that toolkit.
- Use \`describe_tool\` with a toolkit name and tool name to get more information about a tool including its input schema.
- **CRITICAL: To use an external tool, you MUST format the tool name as \`toolkit-name:tool_name\`**
  (e.g., if the toolkit is 'postgres' and the tool is 'run_query', call \`postgres:run_query\` as the tool name).
- Always explore toolkits if you need capabilities not provided by your built-in tools.

${toolkitsDoc}

## Tool Usage Guidelines

- Don't ask permission to use tools.
- Never mention tool names to the user — Describe actions naturally.
- **Execution Model:** Actions are executed in parallel. ONLY send multiple actions in a single response if they are independent and safe to run concurrently.
  If an action depends on the result of another, you MUST wait for the first to complete before sending the next.
  Example: Wait for a file to be written before attaching it to a route.
- Break down vague requests and explore the workspace to gather necessary context.
- Don't repeat yourself after tool calls — Continue from where you left off.
- Always check the latest actions for failures and handle them before continuing.
- When finishing, wait for the latest actions to complete and confirm they have succeeded before calling "finish".
- Send the "finish" command in a single message with no other actions.
`.trim();
}
