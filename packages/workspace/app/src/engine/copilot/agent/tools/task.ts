import { z } from "zod";
import { Agent } from "../agent.js";
import { AgentExecutionStatus } from "../execution.js";
import { Tool } from "../tool.js";

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
}: {
  agent: Agent;
}): Tool<typeof taskToolSchema, TaskToolOutput> & { toolName: string } {
  const tool: Tool<typeof taskToolSchema, TaskToolOutput> & {
    toolName: string;
  } = {
    name: "task",
    toolName: "task",
    description:
      "Delegate a task to a specialized agent. The agent will execute using its own tools and return a response.",
    args: taskToolSchema,
    async run(args, action) {
      const state = agent.getState();
      const subAgent = state.agents[args.agent];

      if (!subAgent) {
        return {
          isError: true,
          content: [{ type: "text", text: `Agent ${args.agent} not found` }],
        };
      }

      const execution = action.message.execution;
      const thread = await subAgent.createThread({ title: args.title });

      const subExecution = await thread.run({
        message: { text: args.message },
        model: execution.model,
        abortController: execution.abortController,
      });

      const subExecutionState = subExecution.getState();

      switch (subExecutionState.status) {
        case AgentExecutionStatus.Failed: {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text:
                  subExecutionState.error?.message || "Execution failed",
              },
            ],
            structuredContent: {
              threadId: thread.getState().id,
              status: "error",
              error:
                subExecutionState.error?.message || "Execution failed",
            },
          };
        }
        case AgentExecutionStatus.Stopped:
        case AgentExecutionStatus.MaxIterations: {
          const status =
            subExecutionState.status === AgentExecutionStatus.Stopped
              ? "stopped"
              : "max_iterations";
          return {
            isError: true,
            content: [
              {
                type: "text",
                text:
                  subExecutionState.error?.message ||
                  `Execution ${status}`,
              },
            ],
            structuredContent: {
              threadId: thread.getState().id,
              status: "stopped",
              error:
                subExecutionState.error?.message || `Execution ${status}`,
            },
          };
        }
      }

      const response = await thread.getResource("response");
      const output: TaskToolOutput = {
        threadId: thread.getState().id,
        response: response?.data || "No response",
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
