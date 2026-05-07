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
} from "./prompt/prompt/prompt.js";
import {
  agentOrchestratorOutputSchema,
  fixAgentOrchestratorCommonOutputPitfalls,
} from "./prompt/schema.js";
import { AgentTool } from "./tool.js";

export type AgentExecutionStatus =
  | "idle"
  | "running"
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

  const store = createStore<AgentExecutionState>(() => ({
    status: "idle",
  }));

  async function runTurn({
    model,
  }: {
    model: LanguageModel;
  }): Promise<{ shouldContinue: boolean }> {
    const stats = context.getStats();
    if (stats.usage >= stats.budget) {
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
    const tools = (await environment.getTools?.()) ?? [];
    const toolSets = (await environment.getToolSets?.()) ?? [];
    const agents = (await environment.getAgents?.()) ?? [];

    const instructions = buildAgentOrchestratorInstructions({
      agent,
      environment,
      tools,
      toolSets,
      agents,
    });

    return runOrchestrator({ model, prompt, instructions });
  }

  async function runAction({
    tool,
    args,
    message,
  }: {
    tool: AgentTool;
    args: unknown;
    message: AgentMessage;
  }): Promise<{
    error?: AgentError;
    shouldEnd?: boolean;
  }> {
    const argParseResult = tool.args.safeParse(args);
    if (!argParseResult.success) {
      return {
        shouldEnd: true,
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

    const actionId = await message.createAction({
      tool: tool.name,
      input: argParseResult.data,
    });

    try {
      await message.startAction(actionId);
      const result = await tool.run({
        args: argParseResult.data,
        abortController,
      });

      if (result.isError) {
        const error: AgentError = {
          code: "tool_execution_failed",
          message: llmContentToText(result.content),
          data: result.structuredContent,
        };
        await message.failAction(actionId, error);
        return { shouldEnd: true, error };
      }

      await message.completeAction(actionId, {
        output: result.content,
        structuredOutput: result.structuredContent,
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
      return { shouldEnd: true, error };
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

    // FIX: Yield back to the user instead of looping infinitely if no actions are taken
    if (!output.actions?.length) {
      return { shouldContinue: false };
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
        continue;
      }

      const result = await runAction({
        tool,
        message: agentMessage,
        args: act.args,
      });

      // FIX: Halt execution if the action dictates it should end
      if (result.shouldEnd) {
        shouldContinue = false;
        break;
      }
    }

    await agentMessage.complete();
    return { shouldContinue };
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
    subscribe: store.subscribe,
    getState: store.getState,
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
          status: "running",
        });

        await thread.pushUserMessage(message);

        let stateUpdate: Partial<AgentExecutionState> = {};

        for (let i = 0; i < maxIterations; ++i) {
          if (abortController.signal.aborted) {
            stateUpdate.status = "stopped";
            stateUpdate.stopReason = "aborted";
            break;
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
      } catch (e) {
        const normalizedError = normalizeError(e, abortController);

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
