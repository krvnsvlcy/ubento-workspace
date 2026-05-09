import { AgentThread, UserMessageAttachment } from "@ubento/workspace.agent";
import { createZustandStateController } from "@ubento/workspace.primitives";
import { registerStore } from "@ubento/zustand-devtool";
import { createStore } from "zustand";
import { copilotAgent } from "./agents/copilot.js";
import {
  BentoLocationAttachment,
  ubentoLocationAttachmentType,
} from "./attachments/location.js";
import { CopilotAgentEnvironment } from "./environment/environment.js";
import { modelIds } from "./models/models.js";

export const copilotScope = {
  team: "team",
  workspace: (workspaceId: string) => `workspace.${workspaceId}`,
};

export type UbentoCopilotInput = {
  text: string;
  userAttachments: UserMessageAttachment[]; // user provided attachments
  contextAttachments: Record<string, UserMessageAttachment[]>; // attachments from the current context
};
export type UbentoCopilotState = {
  input: UbentoCopilotInput;
  activeModelId: string;
  activeThreadId?: string;
};

export function createUbentoCopilot({
  environment,
}: {
  environment: CopilotAgentEnvironment;
}) {
  const store = createStore<UbentoCopilotState>(() => ({
    input: {
      text: "",
      userAttachments: [],
      contextAttachments: {},
    },
    activeModelId: modelIds.gemini3flash,
  }));
  registerStore("copilot", store);
  const controller = createZustandStateController(store);

  const logger = environment.logger.child({ module: "copilot" });
  logger.info("Copilot engine initialized", {
    event: "copilot_init",
    modelId: store.getState().activeModelId,
  });

  environment.addAgent(copilotAgent);

  function setActiveThread(threadId: string) {
    store.setState({
      activeThreadId: threadId,
    });
  }
  function clearActiveThread() {
    store.setState({
      activeThreadId: undefined,
    });
  }

  const attachmentTypes = Object.fromEntries(
    [ubentoLocationAttachmentType].map((t) => [t.type, t]),
  );
  type UbentoCopilotAttachments = BentoLocationAttachment;

  return {
    logger,
    attachmentTypes,
    ...controller,
    setInputText: (text: string) => {
      store.setState((s) => ({
        input: { ...s.input, text },
      }));
    },
    setUserAttachments: (attachments: UserMessageAttachment[]) => {
      store.setState((s) => ({
        input: { ...s.input, userAttachments: attachments },
      }));
    },
    setContextAttachments: (
      context: string,
      attachments: UbentoCopilotAttachments[],
    ) => {
      store.setState((s) => ({
        input: {
          ...s.input,
          contextAttachments: {
            ...s.input.contextAttachments,
            [context]: attachments,
          },
        },
      }));
    },
    sendMessage: async () => {
      const state = store.getState();
      const content = state.input.text;

      if (!content.trim()) return;

      let threadId = state.activeThreadId;

      logger.debug("Sending message to Copilot", {
        event: "copilot_send_message",
        threadId,
        contentLength: content.length,
      });

      try {
        // Clear input immediately for better UX
        store.setState((s) => ({
          input: { ...s.input, text: "" },
        }));

        let thread: AgentThread;
        if (threadId) {
          thread = await environment.getThread({
            id: threadId,
            agent: copilotAgent.name,
          });
        } else {
          thread = await environment.createThread({
            agent: copilotAgent.name,
          });
          setActiveThread(thread.id);
        }

        const execution = thread.createExecution();

        logger.info("Running agent execution", {
          event: "copilot_run_execution",
          threadId: thread.id,
          modelId: state.activeModelId,
        });
        await execution.run({
          message: {
            text: content,
            modelId: state.activeModelId,
            attachments: [
              ...Object.values(state.input.contextAttachments).flat(),
              ...state.input.userAttachments,
            ],
          },
        });
        logger.info("Agent execution completed", {
          event: "copilot_run_execution_completed",
          threadId: thread.id,
          modelId: state.activeModelId,
          executionEndState: execution.getState(),
        });
      } catch (error) {
        logger.error("Failed to send message to Copilot", {
          event: "copilot_send_error",
          error: String(error),
        });
        console.error("Failed to send message:", error);
        // restore input on failure
        store.setState((s) => ({
          input: { ...s.input, text: content },
        }));
      }
    },

    setActiveThread,
    clearActiveThread,
  };
}

export type UbentoCopilot = ReturnType<typeof createUbentoCopilot>;
