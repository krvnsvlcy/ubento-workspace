import { z } from "zod";
import { Agent } from "../../agent/agent.js";
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
  message: z
    .string()
    .describe("The detailed instructions/message for the agent"),
});

export type TaskToolOutput = {
  threadId: string;
  status: "success" | "error" | "stopped" | "running";
  response?: string;
  error?: string;
};

export function createTaskTool({
  agent,
  createThread,
}: {
  agent: Agent;
  createThread: (params: { title: string }) => Promise<any>;
}): AgentTool<typeof taskToolSchema> & { toolName: string } {
  const tool: AgentTool<typeof taskToolSchema> & {
    toolName: string;
  } = {
    name: "task",
    toolName: "task",
    description:
      "Delegate a task to a specialized agent. The agent will execute using its own tools and return a response.",
    args: taskToolSchema,
    async run({ args, abortController }) {
      const thread = await createThread({ title: args.title });

      const subExecution = await thread.run({
        message: { text: args.message, modelId: "default" },
        abortController,
      });

      const subExecutionState = subExecution.getState();

      switch (subExecutionState.status) {
        case "errored": {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: subExecutionState.error?.message || "Execution failed",
              },
            ],
            structuredContent: {
              threadId: thread.getState?.()?.id || "unknown",
              status: "error",
              error: subExecutionState.error?.message || "Execution failed",
            },
          };
        }
        case "stopped": {
          const status =
            subExecutionState.stopReason === "aborted"
              ? "stopped"
              : "max_iterations";
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: subExecutionState.error?.message || `Execution ${status}`,
              },
            ],
            structuredContent: {
              threadId: thread.getState?.()?.id || "unknown",
              status: "stopped",
              error: subExecutionState.error?.message || `Execution ${status}`,
            },
          };
        }
      }

      let responseData = "No response";
      const history = thread.context.getHistory();
      const lastMessage = history[history.length - 1];
      if (
        lastMessage &&
        lastMessage.type === "message" &&
        (lastMessage as any).data?.role === "agent"
      ) {
        const actions = (lastMessage as any).data.actions || [];
        const responseAction = actions.find((a: any) => a.tool === "response");
        if (responseAction && responseAction.structuredOutput?.response) {
          responseData = responseAction.structuredOutput.response;
        }
      }

      const output: TaskToolOutput = {
        threadId: thread.getState?.()?.id || "unknown",
        response: responseData,
        status: "success",
      };

      return {
        content: [
          {
            type: "text",
            text: `Thread ID: ${output.threadId}\nResponse:\n${output.response}`,
          },
        ],
        structuredContent: output,
      };
    },
  };
  return tool;
}

export const TaskTool = {
  toolName: "task",
};
