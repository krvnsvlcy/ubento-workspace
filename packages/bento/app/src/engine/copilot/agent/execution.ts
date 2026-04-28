import { generateText } from "ai";
import z from "zod";
import { createStore, StoreApi } from "zustand/vanilla";
import { LanguageModel } from "../utils/models.js";
import { safeYamlParse } from "../utils/yaml.js";
import { AgentMessageInstance } from "./message.js";
import { UserMessageData } from "./message/message.js";
import { MessagePart } from "./prompts/manager/prompt/prompt.js";
import {
  agentManagerSchema,
  fixAgentManagerCommonOutputPitfalls,
} from "./prompts/manager/schema.js";

import { AgentThreadInstance } from "./thread.js";

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

  thread: AgentThreadInstance;
  model: LanguageModel;
  agentModels: AgentModelMap;
  abortController: AbortController;
}

export interface AgentExecutionActions {
  run: (params: {
    message: UserMessageData;
    maxIterations?: number;
  }) => Promise<void>;
  stop: () => void;
  setError: (error: AgentExecutionError) => void;
}

export type AgentExecutionInstance = StoreApi<
  AgentExecutionState & AgentExecutionActions
>;

export interface AgentExecutionConfig {
  model: LanguageModel;
  thread: AgentThreadInstance;
  agentModels?: AgentModelMap;
  abortController?: AbortController;
}

export function createAgentExecution(
  config: AgentExecutionConfig,
): AgentExecutionInstance {
  const store = createStore<AgentExecutionState & AgentExecutionActions>()(
    (set, get) => ({
      status: AgentExecutionStatus.Idle,
      error: undefined,
      activeMessage: undefined,
      thread: config.thread,
      model: config.model,
      agentModels: config.agentModels || {},
      abortController: config.abortController || new AbortController(),

      stop: () => {
        const { abortController } = get();
        abortController.abort();
        set({ status: AgentExecutionStatus.Stopped });
      },

      setError: (error) => set({ error }),

      run: async ({ message, maxIterations = 100 }) => {
        const state = get();
        const { thread, model, abortController } = state;

        try {
          set({ error: undefined, status: AgentExecutionStatus.Running });

          const threadState = thread.getState();
          await threadState.pushUserMessage(message);

          let currentStatus = AgentExecutionStatus.Running;

          for (let i = 0; i < maxIterations; ++i) {
            if (abortController.signal.aborted) {
              currentStatus = AgentExecutionStatus.Stopped;
              break;
            }

            const turnResult = await runTurn(get(), i);

            if (!turnResult.shouldContinue) {
              currentStatus = AgentExecutionStatus.Completed;
              break;
            }

            if (i === maxIterations - 1) {
              currentStatus = AgentExecutionStatus.MaxIterations;
            }
          }

          set({ status: currentStatus });
        } catch (e: any) {
          const normalizedError = normalizeError(e, abortController);
          set({
            error: normalizedError,
            status:
              normalizedError.code === AgentExecutionErrorCode.ABORTED
                ? AgentExecutionStatus.Stopped
                : AgentExecutionStatus.Failed,
          });
        } finally {
          const threadState = thread.getState();
          const messages = await threadState.listMessages();
          if (messages.length > 0) {
            threadState.generateTitle().catch(() => {});
          }
        }
      },
    }),
  );

  return store;
}

async function runTurn(
  state: AgentExecutionState,
  iteration: number,
): Promise<{ shouldContinue: boolean }> {
  const { thread, model } = state;
  const threadState = thread.getState();
  const agent = threadState.agent;
  const agentState = agent.getState();

  const stats = await threadState.getContextStats(model.modelId);
  if (stats.usage >= stats.budget) {
    const summarizeModel = state.agentModels.summarize || model;
    await threadState.summarizeContext(summarizeModel);
    return { shouldContinue: true };
  }

  const context = await threadState.getContext();
  const instructions = await agentState.getInstructions();
  const prompt = await agentState.getPrompt(context);

  return runManager(state, { prompt, instructions, iteration });
}

async function runManager(
  state: AgentExecutionState,
  {
    prompt,
    instructions,
    iteration,
  }: { prompt: MessagePart[]; instructions: string; iteration: number },
): Promise<{ shouldContinue: boolean }> {
  const { thread, model, abortController } = state;
  const threadState = thread.getState();
  const agent = threadState.agent;
  const agentState = agent.getState();

  const executionShim = { getState: () => state } as any;
  const agentMessage = await threadState.startAgentMessage(executionShim);

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

      const tool = await agentState.resolveTool(act.tool);
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
