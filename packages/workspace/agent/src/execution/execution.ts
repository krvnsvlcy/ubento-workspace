import { UserMessageData } from "@/data/message/types.js";
import z from "zod";
import { createStore } from "zustand/vanilla";
import { AgentThread } from "../thread/thread.js";
import { LanguageModel } from "../utils/models.js";
import { safeYamlParse } from "../utils/yaml.js";
import { AgentExecutionError, AgentExecutionErrorCode } from "./error.js";
import { MessagePart } from "./prompts/manager/prompt/prompt.js";
import {
  agentManagerSchema,
  fixAgentManagerCommonOutputPitfalls,
} from "./prompts/manager/schema.js";

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
  const abortController = _abortController || new AbortController();
  const store = createStore<AgentExecutionState>(() => ({
    status: "idle",
  }));

  async function runTurn({
    model,
  }: {
    model: LanguageModel;
  }): Promise<{ shouldContinue: boolean }> {
    const context = thread.context;
    const agent = thread.agent;

    const stats = context.getStats();
    if (stats.usage >= stats.budget) {
      await context.summarize();
      return { shouldContinue: true };
    }

    const contextData = context.getData();
    const instructions = await agent.getInstructions();
    const prompt = await agent.getPrompt(contextData);

    return runManager({ model, prompt, instructions });
  }

  async function runManager({
    model,
    prompt,
    instructions,
  }: {
    model: LanguageModel;
    prompt: MessagePart[];
    instructions: string;
  }): Promise<{ shouldContinue: boolean }> {
    const agentMessage = await thread.startAgentMessage();

    try {
      const result = await model.generateText({
        system: instructions,
        messages: [{ role: "user", content: prompt }],
        abortSignal: abortController.signal,
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
        action.setState({ input: argParseResult.data });
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
    thread,
    run: async ({
      message,
      maxIterations = 100,
    }: {
      message: Omit<UserMessageData, "role">;
      maxIterations?: number;
    }) => {
      const model = thread.environment.getModel(message.modelId);
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
