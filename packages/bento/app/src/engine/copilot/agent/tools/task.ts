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
}): Tool<typeof taskToolSchema, TaskToolOutput> {
  return {
    name: "task",
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

      const executionState = action.message.execution.getState();
      const thread = await subAgent
        .getState()
        .createThread({ title: args.title });
      const threadState = thread.getState();

      const subExecution = threadState.createExecution({
        model: executionState.model,
        abortController: executionState.abortController,
      });

      const subExecutionState = subExecution.getState();
      await subExecutionState.run({
        message: { text: args.message },
      });

      const finalSubExecutionState = subExecution.getState();

      switch (finalSubExecutionState.status) {
        case AgentExecutionStatus.Idle:
        case AgentExecutionStatus.Running: {
          throw new Error(
            `Unexpected agent execution status after run: ${finalSubExecutionState.status}`,
          );
        }
        case AgentExecutionStatus.Failed: {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text:
                  finalSubExecutionState.error?.message || "Execution failed",
              },
            ],
            structuredContent: {
              threadId: threadState.id,
              status: "error",
              error:
                finalSubExecutionState.error?.message || "Execution failed",
            },
          };
        }
        case AgentExecutionStatus.Stopped:
        case AgentExecutionStatus.MaxIterations: {
          const status =
            finalSubExecutionState.status === AgentExecutionStatus.Stopped
              ? "stopped"
              : "max_iterations";
          return {
            isError: true,
            content: [
              {
                type: "text",
                text:
                  finalSubExecutionState.error?.message ||
                  `Execution ${status}`,
              },
            ],
            structuredContent: {
              threadId: threadState.id,
              status: "stopped",
              error:
                finalSubExecutionState.error?.message || `Execution ${status}`,
            },
          };
        }
      }

      const response = await threadState.getResource("response");
      const output: TaskToolOutput = {
        threadId: threadState.id,
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
}
