import { UbentoService } from "@/services/ubento/ubento.js";
import { Logger } from "@ubento/telemetry";
import {
  AgentThread,
  Toolkit,
  UserMessageAttachment,
} from "@ubento/workspace.agent";
import { createZustandStateController } from "@ubento/workspace.primitives";
import { registerStore } from "@ubento/zustand-devtool";
import { createStore } from "zustand";
import { UbentoSession } from "../session.js";
import { copilotAgent } from "./agents/copilot.js";
import {
  BentoLocationAttachment,
  ubentoLocationAttachmentType,
} from "./attachments/location.js";
import { createCopilotAgentEnvironment } from "./environment/environment.js";
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
  activeThreadMap: Record<string, string>; // scope -> threadId
  activeModelId: string;
  toolkits: Record<string, Toolkit>;
};

export function createUbentoCopilot({
  ubento,
  session,
  logger,
}: {
  ubento: UbentoService;
  session: UbentoSession;
  logger: Logger;
}) {
  const environment = createCopilotAgentEnvironment({
    ubento,
    session,
    logger,
    listToolkits: () => Object.values(store.getState().toolkits),
  });
  const store = createStore<UbentoCopilotState>(() => ({
    activeThreadMap: {},
    input: {
      text: "",
      userAttachments: [],
      contextAttachments: {},
    },
    activeModelId: modelIds.gemini3flash,
    toolkits: {},
  }));
  registerStore("copilot", store);
  const controller = createZustandStateController(store);

  environment.addAgent(copilotAgent);

  logger.info("Copilot engine initialized", {
    event: "copilot_init",
    modelId: store.getState().activeModelId,
  });

  function setActiveThread({
    scope,
    threadId,
  }: {
    scope: string;
    threadId: string;
  }) {
    logger.debug("Setting active thread", {
      event: "copilot_set_active_thread",
      scope,
      threadId,
    });
    store.setState((state) => ({
      activeThreadMap: { ...state.activeThreadMap, [scope]: threadId },
    }));
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
    setUserAttachments: (attachments: UbentoCopilotAttachments[]) => {
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
    addToolkit: (toolkit: Toolkit) => {
      store.setState((s) => ({
        toolkits: {
          ...s.toolkits,
          [toolkit.name]: toolkit,
        },
      }));
    },
    removeToolkit: (toolkitName: string) => {
      store.setState((s) => {
        const toolkits = { ...s.toolkits };
        delete toolkits[toolkitName];
        return { toolkits };
      });
    },

    sendMessage: async (scope: string) => {
      const state = store.getState();
      const content = state.input.text;

      if (!content.trim()) return;

      let threadId = state.activeThreadMap[scope];

      logger.debug("Sending message to Copilot", {
        event: "copilot_send_message",
        scope,
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
          logger.debug("Resumed existing thread", {
            event: "copilot_resume_thread",
            threadId,
          });
        } else {
          thread = await environment.createThread({
            agent: copilotAgent.name,
            teamId: session.teamId,
          });
          setActiveThread({ scope, threadId: thread.id });
          logger.info("Created new thread", {
            event: "copilot_create_thread",
            scope,
            threadId: thread.id,
          });
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
          scope,
          error: String(error),
        });
        console.error("Failed to send message:", error);
        // restore input on failure
        store.setState((s) => ({
          input: { ...s.input, text: content },
        }));
      }
    },

    setActiveThread(scope: string, threadId: string) {
      setActiveThread({ scope, threadId });
    },
    clearActiveThread(scope: string) {
      logger.debug("Cleared active threads", {
        event: "copilot_clear_active_thread",
        scope,
      });
      store.setState((state) => ({
        activeThreadMap: {},
      }));
    },
  };
}

export type UbentoCopilot = ReturnType<typeof createUbentoCopilot>;
