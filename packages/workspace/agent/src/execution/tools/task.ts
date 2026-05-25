import { z } from "zod";
import { AgentTool } from "../tool/tool.js";

export const taskToolSchema = z.object({
  threadId: z
    .string()
    .optional()
    .describe(
      "Optional thread ID to continue. Use this if you want to continue a previous task.",
    ),
  agent: z.string().describe("The agent name to delegate this task to"),
  title: z.string().describe("A short title for this task"),
  preamble: z
    .string()
    .describe("Why you are starting this task — your reasoning"),
  prompt: z
    .string()
    .describe(
      "The detailed prompt for the agent. Provide all necessary context to complete the task. Define explicitely what you expect as output.",
    ),
});

export type TaskToolOutput = {
  threadId: string;
  status: "success" | "error" | "stopped" | "running";
  response?: string;
  error?: string;
};

export const taskTool: AgentTool<typeof taskToolSchema> & {
  toolName: string;
} = {
  name: "task",
  toolName: "task",
  description:
    "Delegate a task to a specialized agent. The agent will execute using its own tools and return a response.",
  args: taskToolSchema,
  async run({ args, environment, setStructuredOutput, modelId }) {
    const agent = environment.getAgent(args.agent);
    if (!agent) {
      return {
        isError: true,
        content: [{ type: "text", text: `Agent \${args.agent} not found` }],
        structuredContent: {
          threadId: "unknown",
          status: "error",
          response: `Agent \${args.agent} not found`,
        },
      };
    }

    const thread = await environment.createAgentThread({
      agent,
      title: args.title,
    });

    setStructuredOutput({
      threadId: thread.id,
      status: "in-progress",
    });

    const execution = thread.createExecution();

    const unsubscribe = execution.subscribe((state) => {
      setStructuredOutput({
        threadId: thread.id,
        status: state.status,
        response: thread.context.getResponse(),
      });
    });

    await execution.run({
      message: { text: args.prompt, modelId },
    });

    unsubscribe();

    const state = execution.getState();
    const response = thread.context.getResponse() || "No response";

    let status: "error" | "stopped" | "success" = "success";
    if (state.status === "errored") status = "error";
    else if (state.status === "stopped") status = "stopped";

    return {
      isError: status === "error",
      content: [{ type: "text", text: response }],
      structuredContent: {
        threadId: thread.id,
        status,
        response,
      },
    };
  },
};

export { taskTool as TaskTool };
