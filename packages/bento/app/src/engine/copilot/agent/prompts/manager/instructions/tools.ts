import z from "zod";
import { Tool } from "~/lib/agents/tool.js";
import { IToolSet } from "~/lib/agents/tool_set/tool_set.js";
import { DescribeTool, ListTools } from "~/lib/agents/tools/tools.js";
import { renderYaml } from "~/lib/format.js";
import { cleanJsonSchema } from "~/lib/zod.js";

export function toolsSection({
  tools,
  toolSets,
}: {
  tools: Tool[];
  toolSets: IToolSet[];
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
        example: tool.example,
      };
    }),
    {
      name: "finish",
      description:
        "Call this to indicate that the task is complete. Must be called alone after verifying previous actions succeeded.",
      args: null,
    },
  ];

  let toolSetsDoc = `There are no external tool sets currently available.`;

  if (toolSets.length) {
    toolSetsDoc = `
**Available Tool Sets**

${renderYaml(
  toolSets.map((e) => ({
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

In addition to the tools above, You can load additional tools from external tool sets to achieve more advanced capabilities. 
- Use \`${ListTools.toolName}\` with a tool set name to list available tools in that tool set.
- Use \`${DescribeTool.toolName}\` with a tool set name and tool name to get more information about a tool including its input schema.
- **CRITICAL: To use an external tool, you MUST format the tool name as \`tool-set-name:tool_name\`**
  (e.g., if the tool set is 'postgres' and the tool is 'run_query', call \`postgres:run_query\` as the tool name).
- Always explore tool sets if you need capabilities not provided by your built-in tools.

${toolSetsDoc}

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
