import z from "zod";
import {
  agentManagerSchema,
  AgentManagerSchema,
} from "~/lib/agents/prompts/manager/schema.js";
import { Tool } from "~/lib/agents/tool.js";
import { TaskTool } from "~/lib/agents/tools/task.js";
import { renderYaml } from "~/lib/format.js";
import { cleanJsonSchema } from "~/lib/zod.js";
import { MessageTool } from "../../../tools/message.js";
import { ResponseTool } from "../../../tools/response.js";

export function outputFormat(tools: Tool[], hasAgents: boolean) {
  const hasMessage = tools.some((t) => t.name === MessageTool.toolName);
  const hasResponse = tools.some((t) => t.name === ResponseTool.toolName);

  const examples: string[] = [];

  if (hasMessage) {
    examples.push(
      `**Send single message example**  \n${renderYaml({
        actions: [
          {
            tool: MessageTool.toolName,
            args: {
              content: "Hello, how can I assist you today?",
              after: "await_response",
            },
          },
        ],
      } satisfies AgentManagerSchema)}`,
    );
  }

  if (hasResponse) {
    examples.push(
      `**Submit final response example**  \n${renderYaml({
        actions: [
          {
            tool: ResponseTool.toolName,
            args: {
              content:
                "I have successfully refactored the module and updated the tests.",
            },
          },
        ],
      } satisfies AgentManagerSchema)}`,
    );
  }

  if (hasAgents) {
    examples.push(
      `**Delegate task to a subagent**  \n${renderYaml({
        actions: [
          {
            tool: TaskTool.toolName,
            args: {
              agent: "ui_specialist",
              title: "Create navigation bar",
              preamble: "Creating a navigation bar for the app.",
              message: "Create a new .elll module for the navigation bar.",
            },
          },
        ],
      } satisfies AgentManagerSchema)}`,
    );

    examples.push(
      `**Continue an existing task**  \n${renderYaml({
        actions: [
          {
            tool: TaskTool.toolName,
            args: {
              threadId: "thr_123456",
              agent: "ui_specialist",
              title: "Update navigation bar",
              preamble: "Updating the navigation bar.",
              message: "Please change the color to blue.",
            },
          },
        ],
      } satisfies AgentManagerSchema)}`,
    );
  }

  // Standalone finish example to reinforce the rule
  examples.push(
    `**Finish task example (Send only after confirming all previous actions succeeded)**  \n${renderYaml(
      {
        actions: [
          {
            tool: "finish",
            args: null,
          },
        ],
      } satisfies AgentManagerSchema,
    )}`,
  );

  return `
# Output

Respond with a YAML object with the following structure:

${renderYaml(cleanJsonSchema(z.toJSONSchema(agentManagerSchema)))}

Follow the tool JSON schemas precisely;
Replace args with the schema of the tool you want to use.
Include all required properties.

## Output Examples

${examples.join("\n\n")}
`.trim();
}
