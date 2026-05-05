import { generateText } from "ai";
import z from "zod";
import { createStore } from "zustand/vanilla";
import { LanguageModel } from "../utils/models.js";
import { safeYamlParse } from "../utils/yaml.js";
import { AgentMessageInstance } from "./message.js";
import { UserMessageData } from "./message/message.js";
import { MessagePart } from "./prompts/manager/prompt/prompt.js";
import {
  agentManagerSchema,
  fixAgentManagerCommonOutputPitfalls,
} from "./prompts/manager/schema.js";

import {
  createZustandStateController,
  StateController,
} from "@ubento/workspace.primitives";
import { AgentThread } from "./thread.js";

export enum AgentExecutionStatus {
  Idle = "idle",
  Running = "running",
  Completed = "completed",
  Stopped = "stopped",
  Failed = "failed",
  MaxIterations = "max_iterations",
}

export enum AgentExecutionErrorCode {
  RATE_LIMIT_EXCEEDED = "rate_limit_exceeded",
  MODEL_GENERATION_FAILED = "model_generation_failed",
  PARSING_ERROR = "parsing_error",
  TOOL_EXECUTION_FAILED = "tool_execution_failed",
  NO_ACTIONS_RETURNED = "no_actions_returned",
  ABORTED = "aborted",
  UNKNOWN = "unknown",
}

export class AgentExecutionError extends Error {
  code: AgentExecutionErrorCode;
  cause?: unknown;
  data?: unknown;

  constructor({
    code,
    message,
    cause,
    data,
  }: {
    code: AgentExecutionErrorCode;
    message: string;
    cause?: unknown;
    data?: unknown;
  }) {
    super(message);
    this.name = "AgentExecutionError";
    this.code = code;
    this.cause = cause;
    this.data = data;
  }
}

export type AgentModelMap = {
  summarize?: LanguageModel;
};

export interface AgentExecutionState {
  status: AgentExecutionStatus;
  error: AgentExecutionError | undefined;
  activeMessage: AgentMessageInstance | undefined;
}

export type AgentExecution = StateController<AgentExecutionState> & {
  thread: AgentThread;
  model: LanguageModel;
  abortController: AbortController;
  agentModels: AgentModelMap;

  run: (params: {
    message: UserMessageData;
    maxIterations?: number;
  }) => engineStateChanged<void>;
  stop: () => void;
  setError: (error: AgentExecutionError) => void;
};

export function createAgentExecution({
  model,
  thread,
  agentModels = {},
  abortController: _abortController,
}: {
  model: LanguageModel;
  thread: AgentThread;
  agentModels?: AgentModelMap;
  abortController?: AbortController;
}): AgentExecution {
  const store = createStore<AgentExecutionState>()(() => ({
    status: AgentExecutionStatus.Idle,
    error: undefined,
    activeMessage: undefined,
  }));

  const abortController = _abortController || new AbortController();

  const controller = createZustandStateController(store);

  async function runTurn(
    iteration: number,
  ): engineStateChanged<{ shouldContinue: boolean }> {
    const threadState = thread.getState();
    const agent = threadState.agent;

    const stats = await thread.getContextStats(model.modelId);
    if (stats.usage >= stats.budget) {
      const summarizeModel = agentModels.summarize || model;
      await thread.summarizeContext(summarizeModel);
      return { shouldContinue: true };
    }

    const context = await thread.getContext();
    const instructions = await agent.getInstructions();
    const prompt = await agent.getPrompt(context);

    return runManager({ prompt, instructions, iteration });
  }

  async function runManager({
    prompt,
    instructions,
    iteration,
  }: {
    prompt: MessagePart[];
    instructions: string;
    iteration: number;
  }): engineStateChanged<{ shouldContinue: boolean }> {
    const threadState = thread.getState();
    const agent = threadState.agent;

    // Use a shim for the execution instance since it's needed for message creation
    const executionInstance = {
      ...controller,
      thread,
      model,
      abortController,
      agentModels,
    } as AgentExecution;

    const agentMessage = await thread.startAgentMessage(executionInstance);

    try {
      const result = await generateText({
        model: model as any,
        system: instructions,
        messages: [{ role: "user", content: prompt as any }],
        abortSignal: abortController.signal,
      }).catch((e: any) => {
        throw normalizeError(e, abortController);
      });

      const outputData = safeYamlParse(result.text);
      const [fixedOutputData] = fixAgentManagerCommonOutputPitfalls(outputData);

      const parsed = agentManagerSchema.safeParse(fixedOutputData);
      if (!parsed.success) {
        await agentMessage.logError({
          message: "Response schema mismatch",
          data: {
            error:
              (z as any).treeifyError?.(parsed.error) || parsed.error.message,
            input: result.text,
          },
        });
        return { shouldContinue: true };
      }

      const output = parsed.data;
      if (!output.actions?.length) {
        return { shouldContinue: true };
      }

      let toolFinished = false;
      for (const act of output.actions) {
        if (abortController.signal.aborted) break;
        if (act.tool === "finish") {
          toolFinished = true;
          break;
        }

        const tool = await agent.resolveTool(act.tool);
        if (!tool) {
          await agentMessage.logError({ message: `Unknown tool: ${act.tool}` });
          continue;
        }

        const argParseResult = tool.args.safeParse(act.args);
        if (!argParseResult.success) {
          await agentMessage.logError({
            message: `Invalid arguments for ${act.tool}`,
            data: { received: act.args },
          });
          continue;
        }

        const action = await agentMessage.startAction({
          toolRef: act.tool,
          tool,
        });
        await action.setInput(argParseResult.data);
        await action.run();
      }

      await agentMessage.complete();
      return { shouldContinue: !toolFinished };
    } catch (e) {
      await agentMessage.complete();
      throw e;
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
    ...controller,
    thread,
    model,
    abortController,
    agentModels,

    stop: () => {
      abortController.abort();
      controller.setState({ status: AgentExecutionStatus.Stopped });
    },
    setError: (error) => controller.setState({ error }),
    run: async ({ message, maxIterations = 100 }) => {
      try {
        controller.setState({
          error: undefined,
          status: AgentExecutionStatus.Running,
        });

        await thread.pushUserMessage(message);
        let currentStatus = AgentExecutionStatus.Running;

        for (let i = 0; i < maxIterations; ++i) {
          if (abortController.signal.aborted) {
            currentStatus = AgentExecutionStatus.Stopped;
            break;
          }

          const turnResult = await runTurn(i);

          if (!turnResult.shouldContinue) {
            currentStatus = AgentExecutionStatus.Completed;
            break;
          }

          if (i === maxIterations - 1) {
            currentStatus = AgentExecutionStatus.MaxIterations;
          }
        }

        controller.setState({ status: currentStatus });
      } catch (e: any) {
        const normalizedError = normalizeError(e, abortController);
        controller.setState({
          error: normalizedError,
          status:
            normalizedError.code === AgentExecutionErrorCode.ABORTED
              ? AgentExecutionStatus.Stopped
              : AgentExecutionStatus.Failed,
        });
      } finally {
        const threadState = thread.getState();
        const messages = await thread.listMessages();
        if (messages.length > 0) {
          thread.generateTitle().catch(() => {});
        }
      }
    },
  };
}
