import { createZustandStateController } from "@ubento/bento.arlo-core";
import { AgentThread, UserMessageAttachment } from "@ubento/workspace.agent";
import { registerStore } from "@ubento/zustand-devtool";
import { createStore } from "zustand";
import {
  BentoLocationAttachment,
  ubentoLocationAttachmentType,
} from "./attachments/location.js";
import {
  BentoWorkspaceAttachment,
  ubentoWorkspaceAttachmentType,
} from "./attachments/workspace.js";
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
  status: "idle" | "active";
  activeModelId: string;
  activeThreadId?: string;
};

export function createUbentoCopilot({
  environment,
  mainAgentName,
}: {
  environment: CopilotAgentEnvironment;
  mainAgentName: string;
}) {
  const store = createStore<UbentoCopilotState>(() => ({
    input: {
      text: "",
      userAttachments: [],
      contextAttachments: {},
    },
    status: "idle",
    activeModelId: modelIds.gemini3flashLite,
  }));
  registerStore("copilot", store);
  const controller = createZustandStateController(store);

  const logger = environment.logger.child({ module: "copilot" });
  logger.info("Copilot engine initialized", {
    event: "copilot_init",
    modelId: store.getState().activeModelId,
  });

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
    [ubentoLocationAttachmentType, ubentoWorkspaceAttachmentType].map((t) => [
      t.type,
      t,
    ]),
  );
  type UbentoCopilotAttachments =
    | BentoLocationAttachment
    | BentoWorkspaceAttachment;

  return {
    logger,
    attachmentTypes,
    environment,
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
          status: "active",
        }));

        let thread: AgentThread;
        if (threadId) {
          thread = await environment.getThread({
            id: threadId,
            agent: mainAgentName,
          });

          const activeExecution = thread.getState().activeExecution;
          if (activeExecution) {
            logger.info("Active execution found. Injecting steering input.", {
              event: "copilot_inject_steering",
              threadId: thread.id,
              contentLength: content.length,
            });
            activeExecution.injectSteering(content);
            return;
          }
        } else {
          thread = await environment.createThread({
            agent: mainAgentName,
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
        store.setState((s) => ({
          status: "idle",
        }));
      } catch (error) {
        logger.error("Failed to send message to Copilot", {
          event: "copilot_send_error",
          error: String(error),
        });
        console.error("Failed to send message:", error);
        // restore input on failure
        store.setState((s) => ({
          input: { ...s.input, text: content },
          status: "idle",
        }));
      }
    },

    setActiveThread,
    clearActiveThread,
  };
}

export type UbentoCopilot = ReturnType<typeof createUbentoCopilot>;
