import { AgentMessage } from "@/message/message.js";
import { AgentError, UserMessageData } from "@/message/types.js";
import { llmContentToText } from "@/utils/llm.js";
import z from "zod";
import { createStore } from "zustand/vanilla";
import { AgentThread } from "../thread/thread.js";
import { LanguageModel } from "../utils/models.js";
import { safeYamlParse } from "../utils/yaml.js";
import { AgentExecutionError, AgentExecutionErrorCode } from "./error.js";
import { buildAgentOrchestratorInstructions } from "./prompt/instructions/instructions.js";
import {
  buildAgentOrchestratorPrompt,
  MessagePart,
  messagePartsToMarkdown,
} from "./prompt/prompt/prompt.js";
import {
  agentOrchestratorOutputSchema,
  fixAgentOrchestratorCommonOutputPitfalls,
} from "./prompt/schema.js";
import { AgentTool } from "./tool/tool.js";

export type AgentExecutionStatus =
  | "idle"
  | "thinking"
  | "working"
  | "completed"
  | "errored"
  | "stopped";

export type AgentModelMap = {
  summarize?: LanguageModel;
};

export type AgentStopReason = "aborted" | "max-iterations";

export interface AgentExecutionState {
  status: AgentExecutionStatus;
  error?: AgentExecutionError;
  stopReason?: AgentStopReason;
}

export function createAgentExecution({
  thread,
  abortController: _abortController,
}: {
  thread: AgentThread;
  abortController?: AbortController;
}) {
  const context = thread.context;
  const agent = thread.agent;
  const environment = thread.environment;
  const abortController = _abortController || new AbortController();

  const steeringQueue: string[] = [];
  let isFinalRecoveryTurn = false;

  const store = createStore<AgentExecutionState>(() => ({
    status: "idle",
  }));

  async function runTurn({
    model,
  }: {
    model: LanguageModel;
  }): Promise<{ shouldContinue: boolean }> {
    // Ensure we are in the thinking state whenever we start a new turn
    store.setState({ status: "thinking" });

    const stats = context.getStats();
    if (stats.budget > 0 && stats.usage >= stats.budget) {
      const summarizeModel = environment.getModel("summarize") || model;
      await context.summarize({ agent, model: summarizeModel });
      return { shouldContinue: true };
    }

    const contextData = context.getData();
    const prompt = await buildAgentOrchestratorPrompt({
      context: contextData,
      environment,
      agent,
    });
    const tools = environment.getAgentTools(agent);
    const agents = environment.getAgentSubAgents(agent);
    const toolkits = environment.listToolkits?.() ?? [];

    const instructions = buildAgentOrchestratorInstructions({
      agent,
      environment,
      tools,
      toolkits,
      agents,
    });

    return runOrchestrator({ model, prompt, instructions });
  }

  async function runAction({
    tool,
    args,
    message,
    model,
  }: {
    tool: AgentTool;
    args: unknown;
    message: AgentMessage;
    model: LanguageModel;
  }): Promise<{
    error?: AgentError;
    shouldEnd?: boolean;
  }> {
    environment.logger?.debug(`Running tool ${tool.name}`, {
      event: "tool_run",
      tool: tool.name,
      args,
    });

    const argParseResult = tool.args.safeParse(args);
    if (!argParseResult.success) {
      return {
        error: {
          code: "tool_args_schema_mismatch",
          message: `Invalid arguments for ${tool.name}`,
          data: {
            tool: tool.name,
            received: args,
            error:
              z.treeifyError?.(argParseResult.error) ||
              argParseResult.error.message,
          },
        },
      };
    }

    const planModeResource = thread.context.getResource("plan_mode");
    const isPlanModeActive = (planModeResource?.data as any)?.active === true;
    const MUTATING_TOOL_NAMES = new Set([
      "write_board_module",
      "edit_board_module",
      "create_board",
      "update_board_metadata",
      "delete_boards"
    ]);

    if (isPlanModeActive && MUTATING_TOOL_NAMES.has(tool.name)) {
      const errorMsg = `Error: Cannot execute tool "${tool.name}" because Plan Mode is active. You are restricted to read-only actions and planning/tracker tools. Please formulate your plan, create tasks/dependencies, write the design details, and call 'approve_plan' or exit plan mode before executing code-modifying tools.`;
      const actionId = await message.createAction({
        tool: tool.name,
        input: argParseResult.data,
      });
      await message.startAction(actionId);
      const error = {
        code: "tool_execution_failed" as const,
        message: errorMsg,
        data: { tool: tool.name, input: argParseResult.data },
      };
      await message.failAction(actionId, error);
      return { error };
    }

    const actionId = await message.createAction({
      tool: tool.name,
      input: argParseResult.data,
    });

    try {
      await message.startAction(actionId);
      const result = await tool.run({
        args: argParseResult.data,
        abortController,
        environment,
        thread,
        stop: () => {
          abortController.abort();
        },
        setStructuredOutput: (output: Record<string, unknown>) => {
          message.updateAction(actionId, { structuredOutput: output });
        },
        modelId: model.id,
      });

      if (result.isError) {
        const error: AgentError = {
          code: "tool_execution_failed",
          message: llmContentToText(result.content),
          data: result.structuredContent,
        };
        await message.failAction(actionId, error);

        environment.logger?.error("Tool execution failed", {
          event: "tool_execution_error",
          tool: tool.name,
          error: error.message,
        });

        return { error };
      }

      await message.completeAction(actionId, {
        output: result.content,
        structuredOutput: result.structuredContent,
      });

      environment.logger?.info("Tool execution completed", {
        event: "tool_execution_completed",
        tool: tool.name,
        shouldEnd: result.shouldEnd,
      });

      return { shouldEnd: result.shouldEnd };
    } catch (e) {
      const error: AgentError = {
        code: "tool_execution_failed",
        message: String(e),
        data: {
          tool: tool.name,
          input: argParseResult.data,
        },
      };
      await message.failAction(actionId, error);

      environment.logger?.error("Tool execution threw exception", {
        event: "tool_execution_exception",
        tool: tool.name,
        error: String(e),
      });

      return { error };
    }
  }

  async function runOrchestrator({
    model,
    prompt,
    instructions,
  }: {
    model: LanguageModel;
    prompt: MessagePart[];
    instructions: string;
  }): Promise<{ shouldContinue: boolean }> {
    const agentMessage = await thread.startAgentMessage(model.id);
    const result = await model.generateText({
      system: instructions,
      messages: [{ role: "user", content: prompt }],
      abortSignal: abortController.signal,
    });

    environment.logger?.debug(
      `Orchestrator Model generated response for ${agent.name}`,
      {
        event: "orchestrator_model_response",
        instructions,
        prompt: messagePartsToMarkdown(prompt),
        content: result.text,
        modelId: model.id,
      },
    );

    const outputData = safeYamlParse(result.text);
    const [fixedOutputData] =
      fixAgentOrchestratorCommonOutputPitfalls(outputData);

    const parsed = agentOrchestratorOutputSchema.safeParse(fixedOutputData);
    if (!parsed.success) {
      await agentMessage.fail({
        code: "response_schema_mismatch",
        message: "Response schema mismatch",
        data: {
          error: z.treeifyError?.(parsed.error) || parsed.error.message,
          input: result.text,
        },
      });
      return { shouldContinue: true };
    }

    const output = parsed.data;

    if ("actions" in output) {
      if (!output.actions?.length) {
        await agentMessage.fail({
          code: "response_schema_mismatch",
          message: "No actions to take",
          data: {
            error: "Response schema mismatch",
          },
        });
        return { shouldContinue: true };
      }

      let shouldContinue = true;
      for (const act of output.actions) {
        if (abortController.signal.aborted) break;
        if (act.tool === "finish") {
          shouldContinue = false;
          break;
        }

        const tool = await environment.getTool(act.tool);
        if (!tool) {
          await agentMessage.fail({
            code: "tool_not_found",
            message: `Unknown tool: ${act.tool}`,
            data: { tool: act.tool },
          });
          break;
        }

        // Transition to working state before executing the tool action
        store.setState({ status: "working" });

        const result = await runAction({
          tool,
          message: agentMessage,
          args: act.args,
          model,
        });

        if (result.error) {
          await agentMessage.fail(result.error);
          return { shouldContinue: true };
        }
        if (result.shouldEnd) {
          shouldContinue = false;
          break;
        }
      }

      await agentMessage.complete();
      return { shouldContinue };
    } else {
      await context.setResponse(output.response);
      agentMessage.writeAction({
        tool: "message",
        status: "completed",
        input: { content: output.response },
      });
      await agentMessage.complete();
      return { shouldContinue: false };
    }
  }

  function normalizeError(
    e: unknown,
    abortController: AbortController,
  ): AgentExecutionError {
    if (e instanceof AgentExecutionError) return e;
    if (abortController.signal.aborted) {
      return new AgentExecutionError({
        code: AgentExecutionErrorCode.ABORTED,
        message: "Execution aborted",
        cause: e,
      });
    }
    return new AgentExecutionError({
      code: AgentExecutionErrorCode.UNKNOWN,
      message: e instanceof Error ? e.message : String(e),
      cause: e,
    });
  }

  return {
    thread,
    store,
    subscribe: store.subscribe,
    getState: store.getState,
    injectSteering: (text: string) => {
      steeringQueue.push(text);
      environment.logger?.debug("Steering input injected into execution queue", {
        event: "steering_injected",
        text,
      });
    },
    runAction,
    run: async ({
      message,
      maxIterations = 100,
    }: {
      message: Omit<UserMessageData, "role">;
      maxIterations?: number;
    }) => {
      const model = environment.getModel(message.modelId);
      if (!model) {
        throw new Error(`Model ${message.modelId} not found`);
      }

      try {
        store.setState({
          error: undefined,
          status: "thinking", // Start with thinking instead of running
        });

        await thread.pushUserMessage(message);

        let stateUpdate: Partial<AgentExecutionState> = {};

        environment.logger?.debug("Agent execution started", {
          event: "execution_start",
          modelId: message.modelId,
        });

        for (let i = 0; i < maxIterations; ++i) {
          if (abortController.signal.aborted) {
            stateUpdate.status = "stopped";
            stateUpdate.stopReason = "aborted";
            break;
          }

          if (i === 3) {
            environment.logger?.info(
              "Process is taking longer than expected... Continued execution.",
              {
                event: "execution_long",
                iterations: i,
              },
            );
          }

          if (steeringQueue.length > 0) {
            const steeringText = steeringQueue.join("\n");
            steeringQueue.length = 0;
            environment.logger?.info("Processing injected steering input", {
              event: "processing_steering",
              text: steeringText,
            });
            await thread.pushUserMessage({
              text: `USER STEERING: ${steeringText}`,
              modelId: message.modelId,
            });
          }

          if (i === maxIterations - 2 && !isFinalRecoveryTurn) {
            // Inject final recovery warning
            environment.logger?.info("Execution limit reached. Initiating graceful recovery turn.", {
              event: "execution_recovery_initiated",
              iterations: i,
            });
            await thread.pushUserMessage({
              text: "SYSTEM WARNING: You have reached the execution turn limit. You MUST call the finish action or return your final response immediately. Explain what remains unfinished. Do not call any other tools.",
              modelId: message.modelId,
            });
            isFinalRecoveryTurn = true;
          }

          const turnResult = await runTurn({ model });

          if (!turnResult.shouldContinue) {
            stateUpdate.status = "completed";
            break;
          }
        }

        if (!stateUpdate.status) {
          stateUpdate.status = "stopped";
          stateUpdate.stopReason = "max-iterations";
        }

        store.setState(stateUpdate);

        environment.logger?.info("Agent execution completed", {
          event: "execution_completed",
          status: stateUpdate.status,
          stopReason: stateUpdate.stopReason,
        });
      } catch (e) {
        const normalizedError = normalizeError(e, abortController);

        environment.logger?.error("Agent execution failed", {
          event: "execution_error",
          error: normalizedError.message,
        });

        if (normalizedError.code === AgentExecutionErrorCode.ABORTED) {
          store.setState({
            error: normalizedError,
            status: "stopped",
            stopReason: "aborted",
          });
        } else {
          store.setState({
            error: normalizedError,
            status: "errored",
          });
        }
      }
    },
    stop: () => {
      abortController.abort();
      store.setState({ status: "stopped", stopReason: "aborted" });
    },
  };
}

export type AgentExecution = ReturnType<typeof createAgentExecution>;
